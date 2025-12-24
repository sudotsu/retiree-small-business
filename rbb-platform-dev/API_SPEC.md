# RBB Platform - API Specification

**Last Updated:** 2024-12-18  
**Database:** PostgreSQL (via Supabase)

---

## Database Schema

### users (Supabase Auth)
Managed by Supabase Auth, extended with metadata.

```sql
-- Auth table (managed by Supabase)
auth.users (
  id uuid PRIMARY KEY,
  email text UNIQUE NOT NULL,
  created_at timestamptz,
  -- Supabase manages password, confirmation, etc.
)

-- Our extension (public schema)
CREATE TABLE user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### courses
```sql
CREATE TYPE track_type AS ENUM ('essentials', 'mastery');

CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  description text,
  track_type track_type NOT NULL,
  price_cents integer NOT NULL, -- $197 = 19700
  stripe_price_id text, -- Stripe Price ID
  is_published boolean DEFAULT false,
  thumbnail_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Sample data
-- Course 1: "Retiree Business Blueprint - Essentials" ($149)
-- Course 2: "Retiree Business Blueprint - Mastery" ($197)
```

### modules
```sql
CREATE TABLE modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL, -- 0, 1, 2, etc.
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(course_id, order_index)
);

-- Module 0: Welcome & Course Setup
-- Module 1: Foundation & Decision Drivers
-- Module 2: Big Picture Planning
-- etc.
```

### lessons
```sql
CREATE TABLE lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL,
  
  -- Content
  video_url text, -- Vimeo embed URL
  video_duration_seconds integer,
  worksheet_url text, -- PDF in Supabase Storage
  transcript_url text,
  
  -- Prerequisites (array of lesson IDs that must be completed first)
  prerequisite_lesson_ids uuid[],
  
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(module_id, order_index)
);

-- Lesson 0.1: Course Orientation
-- Lesson 0.2: Mindset Preparation
-- Lesson 1.1: What Drives Your Decisions
-- etc.
```

### enrollments
```sql
CREATE TABLE enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  
  -- Payment tracking
  stripe_payment_intent_id text,
  amount_paid_cents integer,
  
  enrolled_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id, course_id) -- User can only enroll once per course
);

-- RLS: Users can only see their own enrollments
```

### lesson_progress
```sql
CREATE TABLE lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  
  -- Progress tracking
  watched_duration_seconds integer DEFAULT 0,
  is_completed boolean DEFAULT false,
  completed_at timestamptz,
  
  -- Timestamps
  first_accessed_at timestamptz DEFAULT now(),
  last_accessed_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id, lesson_id)
);

-- RLS: Users can only see/update their own progress
```

### quizzes
```sql
CREATE TABLE quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  module_id uuid REFERENCES modules(id) ON DELETE CASCADE, -- Can be lesson-specific or module-specific
  
  title text NOT NULL,
  description text,
  
  -- Questions stored as JSONB
  -- Format: [{ question: "...", options: ["A", "B", "C"], correct_index: 1 }]
  questions jsonb NOT NULL,
  
  passing_score_percent integer NOT NULL DEFAULT 70,
  
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  CHECK (lesson_id IS NOT NULL OR module_id IS NOT NULL) -- Must belong to lesson OR module
);
```

### quiz_attempts
```sql
CREATE TABLE quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id uuid NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  
  -- Attempt data
  answers jsonb NOT NULL, -- User's selected answers
  score_percent integer NOT NULL,
  passed boolean NOT NULL,
  
  attempted_at timestamptz DEFAULT now()
);

-- RLS: Users can only see their own attempts
```

### certificates
```sql
CREATE TABLE certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  
  -- Certificate details
  certificate_number text UNIQUE NOT NULL, -- e.g., "RBB-2024-00123"
  issued_at timestamptz DEFAULT now(),
  pdf_url text, -- Generated PDF in Storage
  
  UNIQUE(user_id, course_id) -- One certificate per course per user
);
```

---

## Row Level Security (RLS) Policies

All tables have RLS enabled. Example policies:

```sql
-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Anyone can view published courses
CREATE POLICY "Public courses viewable"
  ON courses FOR SELECT
  USING (is_published = true);

-- Users can view courses they're enrolled in (even if unpublished)
CREATE POLICY "Enrolled users can view their courses"
  ON courses FOR SELECT
  USING (
    id IN (
      SELECT course_id FROM enrollments WHERE user_id = auth.uid()
    )
  );

-- Users can only see their own progress
CREATE POLICY "Users view own progress"
  ON lesson_progress FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users update own progress"
  ON lesson_progress FOR UPDATE
  USING (user_id = auth.uid());

-- Admins can do everything (special role check)
CREATE POLICY "Admins full access"
  ON courses FOR ALL
  USING (
    auth.jwt() ->> 'role' = 'admin'
  );
```

---

## API Endpoints (Next.js Server Actions)

### Authentication

**POST /api/auth/signup**
```typescript
{
  email: string;
  password: string;
  full_name: string;
}
→ { user: User, session: Session }
```

**POST /api/auth/login**
```typescript
{
  email: string;
  password: string;
}
→ { user: User, session: Session }
```

**POST /api/auth/logout**
```typescript
→ { success: boolean }
```

### Courses

**GET /api/courses**
Query: `?track=essentials|mastery`
```typescript
→ { courses: Course[] }
```

**GET /api/courses/[id]**
```typescript
→ {
  course: Course,
  modules: Module[],
  enrollment?: Enrollment // If user is enrolled
}
```

**GET /api/courses/[id]/content**
Auth required, user must be enrolled
```typescript
→ {
  course: Course,
  modules: Module[],
  lessons: Lesson[], // All lessons for enrolled course
  progress: LessonProgress[] // User's progress
}
```

### Enrollment & Payment

**POST /api/checkout**
```typescript
{
  course_id: string;
  success_url: string;
  cancel_url: string;
}
→ { checkout_url: string } // Stripe Checkout URL
```

**POST /api/webhooks/stripe**
Stripe webhook handler (verifies signature, creates enrollment)
```typescript
// Handles: checkout.session.completed
→ Creates enrollment record
→ Sends welcome email
```

### Progress Tracking

**POST /api/progress/lesson**
```typescript
{
  lesson_id: string;
  watched_duration_seconds?: number;
  is_completed?: boolean;
}
→ { progress: LessonProgress }
```

**GET /api/progress/course/[course_id]**
```typescript
→ {
  overall_percent: number,
  modules: {
    module_id: string,
    completion_percent: number,
    lessons: {
      lesson_id: string,
      is_completed: boolean
    }[]
  }[]
}
```

### Quizzes

**GET /api/quizzes/[quiz_id]**
```typescript
→ {
  quiz: Quiz,
  questions: QuizQuestion[] // Without correct answers
}
```

**POST /api/quizzes/[quiz_id]/submit**
```typescript
{
  answers: number[] // Array of selected option indices
}
→ {
  score_percent: number,
  passed: boolean,
  correct_answers: number[], // Show correct answers after submission
  attempt_id: string
}
```

### Admin (Protected)

**POST /api/admin/lessons**
```typescript
{
  module_id: string;
  title: string;
  description?: string;
  video_url?: string;
  worksheet_file?: File;
}
→ { lesson: Lesson }
```

**PUT /api/admin/lessons/[id]**
```typescript
// Same as POST, updates existing
```

**POST /api/admin/lessons/[id]/publish**
```typescript
→ { lesson: Lesson } // is_published = true
```

---

## Database Queries (Common)

### Get user's enrolled courses with progress
```sql
SELECT 
  c.*,
  e.enrolled_at,
  COUNT(l.id) as total_lessons,
  COUNT(lp.id) FILTER (WHERE lp.is_completed = true) as completed_lessons,
  ROUND(
    COUNT(lp.id) FILTER (WHERE lp.is_completed = true)::numeric / 
    NULLIF(COUNT(l.id), 0) * 100, 
    2
  ) as completion_percent
FROM courses c
JOIN enrollments e ON e.course_id = c.id
JOIN modules m ON m.course_id = c.id
JOIN lessons l ON l.module_id = m.id
LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = $1
WHERE e.user_id = $1
GROUP BY c.id, e.enrolled_at;
```

### Get next lesson for user
```sql
-- Find first incomplete lesson in course
SELECT l.*
FROM lessons l
JOIN modules m ON m.id = l.module_id
LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = $1
WHERE m.course_id = $2
  AND l.is_published = true
  AND (lp.is_completed IS NULL OR lp.is_completed = false)
ORDER BY m.order_index, l.order_index
LIMIT 1;
```

### Check if lesson is accessible (prerequisites met)
```sql
-- Returns true if all prerequisite lessons are completed
SELECT COALESCE(
  bool_and(lp.is_completed), 
  true -- If no prerequisites, return true
) as is_accessible
FROM unnest($1::uuid[]) as prereq_id
LEFT JOIN lesson_progress lp ON lp.lesson_id = prereq_id AND lp.user_id = $2;
```

---

## Migrations

Migrations stored in `/supabase/migrations/` as timestamped SQL files.

**Example: 20241218_initial_schema.sql**
```sql
-- Run all CREATE TABLE statements above
-- Add RLS policies
-- Insert seed data
```

**Apply migrations:**
```bash
supabase db push
```

---

## Seed Data (Development)

```sql
-- Create sample course
INSERT INTO courses (title, track_type, price_cents, is_published) VALUES
('Retiree Business Blueprint - Mastery Track', 'mastery', 19700, true);

-- Create Module 0
INSERT INTO modules (course_id, title, order_index, is_published) VALUES
((SELECT id FROM courses WHERE track_type = 'mastery'), 'Welcome & Course Setup', 0, true);

-- Create Lesson 0.1
INSERT INTO lessons (module_id, title, video_url, order_index, is_published) VALUES
((SELECT id FROM modules WHERE title = 'Welcome & Course Setup'), 
 'Course Orientation', 
 'https://vimeo.com/placeholder', 
 0, 
 true);
```

---

## Notes

- All timestamps use `timestamptz` (timezone-aware)
- UUIDs for all primary keys (security, scalability)
- JSONB for flexible data (quiz questions, user metadata)
- Indexes added on foreign keys automatically
- Full-text search on lessons TBD (use `tsvector` if needed)
