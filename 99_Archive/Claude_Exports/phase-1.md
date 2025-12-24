# Phase 1: Database Schema Implementation (Gate 1)

**Goal:** Supabase project set up, schema deployed, test data working

**Estimated Time:** 3-4 hours

---

## Prerequisites

- [x] Gate 0 passed
- [ ] Supabase account created (free tier is fine)
- [ ] Supabase CLI installed locally

---

## Step-by-Step Instructions

### 1. Create Supabase Project (15 min)

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - Name: "rbb-platform-dev"
   - Database Password: (save this securely!)
   - Region: Choose closest to target users (US East recommended)
4. Wait for provisioning (~2 min)
5. Save the following from Settings → API:
   - Project URL (starts with https://)
   - Anon/Public key
   - Service Role key (keep secret!)

### 2. Install Supabase CLI (5 min)

```bash
# macOS/Linux
brew install supabase/tap/supabase

# Or npm
npm install -g supabase

# Verify
supabase --version
```

### 3. Initialize Supabase in Project (5 min)

```bash
cd /home/claude/rbb-platform
supabase init

# This creates /supabase folder with:
# - /migrations
# - /functions
# - config.toml
```

### 4. Create Initial Migration (30 min)

Create file: `/supabase/migrations/20241218000000_initial_schema.sql`

Copy the full schema from `API_SPEC.md`:
- All CREATE TABLE statements
- All CREATE TYPE enums
- All RLS policies
- Indexes

**Important notes:**
- Migration files must be timestamped (YYYYMMDDHHMMSS format)
- Run in order (alphabetically)
- Never edit existing migrations (create new ones)

### 5. Apply Migration Locally (10 min)

```bash
# Start local Supabase (Docker required)
supabase start

# Apply migrations
supabase db reset

# Check status
supabase status
```

You should see:
- API URL: http://localhost:54321
- DB URL: postgresql://postgres:postgres@localhost:54322/postgres
- Studio URL: http://localhost:54323

### 6. Create Seed Data (20 min)

Create file: `/supabase/seed.sql`

```sql
-- Create sample course (Mastery Track)
INSERT INTO courses (id, title, subtitle, track_type, price_cents, is_published) 
VALUES 
  ('00000000-0000-0000-0000-000000000001', 
   'Retiree Business Blueprint - Mastery Track',
   'Give us an hour a day, we''ll give you the launching pad for your business',
   'mastery',
   19700,
   true);

-- Create Module 0
INSERT INTO modules (id, course_id, title, description, order_index, is_published)
VALUES
  ('00000000-0000-0000-0000-000000000011',
   '00000000-0000-0000-0000-000000000001',
   'Welcome & Course Setup',
   'Orientation and mindset preparation',
   0,
   true);

-- Create Lesson 0.1
INSERT INTO lessons (id, module_id, title, description, order_index, video_url, video_duration_seconds, is_published)
VALUES
  ('00000000-0000-0000-0000-000000000111',
   '00000000-0000-0000-0000-000000000011',
   'Course Orientation',
   'Explain objectives, materials, timeline, differences between tracks',
   0,
   'https://player.vimeo.com/video/PLACEHOLDER',
   900,
   true);

-- Create Lesson 0.2
INSERT INTO lessons (id, module_id, title, description, order_index, video_url, video_duration_seconds, is_published)
VALUES
  ('00000000-0000-0000-0000-000000000112',
   '00000000-0000-0000-0000-000000000011',
   'Mindset Preparation',
   'Challenge limiting beliefs, create Second Act Declaration',
   1,
   'https://player.vimeo.com/video/PLACEHOLDER',
   900,
   true);

-- Create test user (for development)
-- Password will be set in Supabase Auth UI

-- Create quiz for Module 0
INSERT INTO quizzes (id, module_id, title, questions, passing_score_percent, is_published)
VALUES
  ('00000000-0000-0000-0000-000000000211',
   '00000000-0000-0000-0000-000000000011',
   'Module 0 Check-In',
   '[
     {
       "question": "What are the two learning tracks available?",
       "options": ["Essentials and Mastery", "Beginner and Advanced", "Quick and Deep", "Start and Finish"],
       "correct_index": 0
     },
     {
       "question": "How long is the Mastery Track?",
       "options": ["4 weeks", "6 weeks", "8 weeks", "12 weeks"],
       "correct_index": 2
     }
   ]',
   70,
   true);
```

Run seed:
```bash
supabase db reset # Resets DB and runs seed
```

### 7. Test Queries (15 min)

Open Supabase Studio: http://localhost:54323

Run test queries from `API_SPEC.md`:
- Get all published courses
- Get modules for a course
- Get lessons for a module
- Create test enrollment
- Mark lesson as complete

**Example test:**
```sql
-- Get course with modules and lessons
SELECT 
  c.title as course_title,
  m.title as module_title,
  l.title as lesson_title,
  l.order_index
FROM courses c
JOIN modules m ON m.course_id = c.id
JOIN lessons l ON l.module_id = m.id
WHERE c.is_published = true
ORDER BY m.order_index, l.order_index;
```

Should return Module 0 with Lessons 0.1 and 0.2.

### 8. Deploy to Production Supabase (10 min)

```bash
# Link to your Supabase project
supabase link --project-ref YOUR_PROJECT_REF

# Push migrations to production
supabase db push

# Verify in Supabase Dashboard → Table Editor
```

### 9. Update Environment Variables (5 min)

Create `/rbb-platform/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Create `/rbb-platform/.env.example` (for Git):
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### 10. Write Database Helper Functions (30 min)

Create `/src/lib/db.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions
export async function getCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true);
  
  if (error) throw error;
  return data;
}

export async function getCourseWithContent(courseId: string) {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      modules (
        *,
        lessons (*)
      )
    `)
    .eq('id', courseId)
    .single();
  
  if (error) throw error;
  return data;
}

// Add more helpers as needed
```

---

## Validation Checklist

Run through this before marking Gate 1 complete:

- [ ] Supabase project created and accessible
- [ ] All migrations applied successfully
- [ ] Test data inserted (courses, modules, lessons)
- [ ] Can query courses and get results
- [ ] Can create enrollment record
- [ ] Can track lesson progress
- [ ] Environment variables set up
- [ ] Database helper functions created
- [ ] No SQL errors in Supabase logs

**If all checked, Gate 1 PASSED ✓**

---

## Common Issues

**Issue:** "relation 'courses' does not exist"
**Fix:** Migrations didn't run. Check `supabase/migrations/` and run `supabase db reset`

**Issue:** RLS blocking queries
**Fix:** Check policies. For development, you can temporarily disable RLS:
```sql
ALTER TABLE courses DISABLE ROW LEVEL SECURITY;
```
(But re-enable for production!)

**Issue:** Can't connect to local Supabase
**Fix:** Make sure Docker is running, then `supabase start`

---

## Next Phase

Once Gate 1 passes, proceed to **Phase 2** (Gate 2: Auth + Payment)
