-- =========================================================
-- SILVER STARTUP: MASTER SCHEMA v3 (FINAL - PRODUCTION READY)
-- =========================================================
-- Best of: Gemini Security + Claude Features + All Fixes

-- 1. CLEANUP (Start Fresh)
DROP TABLE IF EXISTS public.certificates CASCADE;
DROP TABLE IF EXISTS public.quiz_attempts CASCADE;
DROP TABLE IF EXISTS public.quizzes CASCADE;
DROP TABLE IF EXISTS public.lesson_progress CASCADE;
DROP TABLE IF EXISTS public.enrollments CASCADE;
DROP TABLE IF EXISTS public.lessons CASCADE;
DROP TABLE IF EXISTS public.modules CASCADE;
DROP TABLE IF EXISTS public.courses CASCADE;
DROP TABLE IF EXISTS public.user_profiles CASCADE;
DROP TYPE IF EXISTS track_type CASCADE;

-- 2. CORE TABLES
create type track_type as enum ('essentials', 'mastery');

-- User Profiles (Auto-created via trigger)
create table public.user_profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  email text,
  full_name text,
  role text default 'student' check (role in ('student', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Courses
create table public.courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  image_url text,
  track_type track_type default 'essentials',
  price_cents integer default 0 check (price_cents >= 0),
  stripe_price_id text,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Modules
create table public.modules (
  id uuid default gen_random_uuid() primary key,
  course_id uuid references public.courses(id) on delete cascade not null,
  title text not null,
  description text,
  sort_order integer not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(course_id, sort_order)
);

-- Lessons
create table public.lessons (
  id uuid default gen_random_uuid() primary key,
  module_id uuid references public.modules(id) on delete cascade not null,
  title text not null,
  slug text not null,
  video_url text,
  content text,
  is_preview boolean default false,
  sort_order integer not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(module_id, sort_order),
  unique(module_id, slug)
);

-- 3. FEATURE TABLES

-- Enrollments (Gate 2: Payment tracking)
create table public.enrollments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  stripe_payment_id text,
  amount_paid_cents integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, course_id)
);

-- Lesson Progress (Gate 3: Track completion)
create table public.lesson_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  is_completed boolean default false,
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, lesson_id)
);

-- Quizzes (Gate 4: Assessments)
create table public.quizzes (
  id uuid default gen_random_uuid() primary key,
  lesson_id uuid references public.lessons(id) on delete cascade,
  module_id uuid references public.modules(id) on delete cascade,
  title text not null,
  description text,
  questions jsonb not null,
  passing_score_percent integer default 70 check (passing_score_percent >= 0 and passing_score_percent <= 100),
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  check (lesson_id is not null or module_id is not null)
);

-- Quiz Attempts (Gate 4: Track scores)
create table public.quiz_attempts (
  id uuid default gen_random_uuid() primary key,
  quiz_id uuid references public.quizzes(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  score_percent integer not null check (score_percent >= 0 and score_percent <= 100),
  passed boolean not null,
  answers jsonb,
  created_at timestamptz default now()
);

-- Certificates (Gate 6: Completion proof)
create table public.certificates (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  certificate_number text unique not null,
  pdf_url text,
  issued_at timestamptz default now(),
  unique(user_id, course_id)
);

-- 4. INDEXES (Performance optimization)
create index idx_modules_course_id on public.modules(course_id);
create index idx_modules_sort_order on public.modules(course_id, sort_order);
create index idx_lessons_module_id on public.lessons(module_id);
create index idx_lessons_sort_order on public.lessons(module_id, sort_order);
create index idx_enrollments_user_id on public.enrollments(user_id);
create index idx_enrollments_course_id on public.enrollments(course_id);
create index idx_lesson_progress_user_id on public.lesson_progress(user_id);
create index idx_lesson_progress_lesson_id on public.lesson_progress(lesson_id);
create index idx_quiz_attempts_user_id on public.quiz_attempts(user_id);
create index idx_quiz_attempts_quiz_id on public.quiz_attempts(quiz_id);
create index idx_certificates_user_id on public.certificates(user_id);

-- 5. SECURITY (RLS Policies)
alter table public.user_profiles enable row level security;
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.certificates enable row level security;

-- Public read policies
create policy "Anyone can view published courses"
  on public.courses for select
  using (is_published = true);

create policy "Anyone can view modules of published courses"
  on public.modules for select
  using (
    exists (
      select 1 from public.courses
      where courses.id = modules.course_id
      and courses.is_published = true
    )
  );

create policy "Anyone can view lessons"
  on public.lessons for select
  using (
    exists (
      select 1 from public.modules m
      join public.courses c on c.id = m.course_id
      where m.id = lessons.module_id
      and (c.is_published = true or lessons.is_preview = true)
    )
  );

create policy "Anyone can view published quizzes"
  on public.quizzes for select
  using (is_published = true);

-- User profile policies
create policy "Users can view own profile"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.user_profiles for update
  using (auth.uid() = id);

-- Enrollment policies (FIXED)
create policy "Users can view own enrollments"
  on public.enrollments for select
  using (auth.uid() = user_id);

create policy "Users can create own enrollments"
  on public.enrollments for insert
  with check (auth.uid() = user_id);

-- Lesson progress policies
create policy "Users can view own progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can create own progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.lesson_progress for update
  using (auth.uid() = user_id);

-- Quiz attempt policies
create policy "Users can view own attempts"
  on public.quiz_attempts for select
  using (auth.uid() = user_id);

create policy "Users can create own attempts"
  on public.quiz_attempts for insert
  with check (auth.uid() = user_id);

-- Certificate policies
-- Note: Certificates are issued by admin/system only upon course completion
create policy "Users can view own certificates"
  on public.certificates for select
  using (auth.uid() = user_id);

create policy "Admins can create certificates"
  on public.certificates for insert
  with check (
    exists (
      select 1 from public.user_profiles
      where user_profiles.id = auth.uid()
      and user_profiles.role = 'admin'
    )
  );

-- Admin policies (Gate 5)
create policy "Admins have full access to courses"
  on public.courses for all
  using (
    exists (
      select 1 from public.user_profiles
      where user_profiles.id = auth.uid()
      and user_profiles.role = 'admin'
    )
  );

create policy "Admins have full access to modules"
  on public.modules for all
  using (
    exists (
      select 1 from public.user_profiles
      where user_profiles.id = auth.uid()
      and user_profiles.role = 'admin'
    )
  );

create policy "Admins have full access to lessons"
  on public.lessons for all
  using (
    exists (
      select 1 from public.user_profiles
      where user_profiles.id = auth.uid()
      and user_profiles.role = 'admin'
    )
  );

-- 6. AUTOMATION (User profile auto-creation)
-- Note: No exception handler - if profile creation fails, signup should fail to maintain data consistency
-- RLS policies depend on user_profiles existing, so orphaned auth.users records would cause access issues
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 7. AUTO-UPDATE TIMESTAMPS
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on public.user_profiles
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.courses
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.modules
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.lessons
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.enrollments
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.lesson_progress
  for each row execute function public.handle_updated_at();
create trigger set_updated_at before update on public.quizzes
  for each row execute function public.handle_updated_at();

-- 8. SEED DATA (Courses + Modules + Lessons)

-- Courses
INSERT INTO public.courses (id, title, description, image_url, track_type, price_cents, is_published)
VALUES
(
  '00000000-0000-0000-0000-000000000001',
  'Retiree Business Blueprint: Mastery Track',
  'The complete A-Z system for launching your service business. Includes 1-on-1 coaching calls and legal templates.',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000',
  'mastery',
  19700,
  true
),
(
  '00000000-0000-0000-0000-000000000002',
  'Retiree Business Blueprint: Essentials',
  'The core video curriculum. Perfect for self-starters who want to learn at their own pace.',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000',
  'essentials',
  4900,
  true
);

-- Module 0: Orientation
INSERT INTO public.modules (id, course_id, title, description, sort_order)
VALUES
(
  '00000000-0000-0000-0000-000000000011',
  '00000000-0000-0000-0000-000000000001',
  'Welcome & Course Setup',
  'Get oriented with the course structure and prepare your mindset for success.',
  0
);

-- Module 1: Foundation
INSERT INTO public.modules (id, course_id, title, description, sort_order)
VALUES
(
  '00000000-0000-0000-0000-000000000012',
  '00000000-0000-0000-0000-000000000001',
  'Foundation & Decision-Making',
  'Understand what drives your business decisions and map your personal defaults.',
  1
);

-- Lessons for Module 0
INSERT INTO public.lessons (id, module_id, title, slug, content, sort_order, is_preview)
VALUES
(
  '00000000-0000-0000-0000-000000000111',
  '00000000-0000-0000-0000-000000000011',
  'Course Orientation',
  'course-orientation',
  'Welcome to the Retiree Business Blueprint! In this lesson, we will cover the course objectives, materials you will need, the timeline, and the differences between the Essentials and Mastery tracks.',
  0,
  true
),
(
  '00000000-0000-0000-0000-000000000112',
  '00000000-0000-0000-0000-000000000011',
  'Mindset Preparation',
  'mindset-preparation',
  'Before diving into tactics, let us address the mental game. We will challenge limiting beliefs and help you create your Second Act Declaration.',
  1,
  false
);

-- Lessons for Module 1
INSERT INTO public.lessons (id, module_id, title, slug, content, sort_order)
VALUES
(
  '00000000-0000-0000-0000-000000000121',
  '00000000-0000-0000-0000-000000000012',
  'What Drives Your Decisions',
  'what-drives-your-decisions',
  'Every business owner has invisible decision drivers. In this lesson, we will uncover yours and learn how to leverage them.',
  0
),
(
  '00000000-0000-0000-0000-000000000122',
  '00000000-0000-0000-0000-000000000012',
  'Mapping Your Defaults',
  'mapping-your-defaults',
  'Your default behaviors determine 80% of your outcomes. Let us map them and optimize for better results.',
  1
);

-- Success message
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '========================================';
  RAISE NOTICE '✅ SILVER STARTUP SCHEMA INITIALIZED';
  RAISE NOTICE '========================================';
  RAISE NOTICE '📊 Data: 2 courses, 2 modules, 4 lessons';
  RAISE NOTICE '🔒 Security: RLS enabled with granular policies';
  RAISE NOTICE '🤖 Automation: Profile trigger + timestamp updates';
  RAISE NOTICE '⚡ Performance: 11 indexes created';
  RAISE NOTICE '🎯 Ready for: Gates 2-6';
  RAISE NOTICE '';
END $$;
