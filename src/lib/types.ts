// =========================================================
// SILVER STARTUP: TYPE DEFINITIONS (COMPLETE)
// =========================================================
// Matches FINAL_MASTER_SCHEMA.sql exactly

export type TrackType = 'essentials' | 'mastery';
export type UserRole = 'student' | 'admin';

// ========== CORE TYPES ==========

export interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  track_type: TrackType;
  price_cents: number;
  stripe_price_id: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  slug: string;
  video_url: string | null;
  content: string | null;
  is_preview: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ========== FEATURE TYPES ==========

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  stripe_payment_id: string | null;
  amount_paid_cents: number | null;
  created_at: string;
  updated_at: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  is_completed: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Quiz {
  id: string;
  lesson_id: string | null;
  module_id: string | null;
  title: string;
  description: string | null;
  questions: QuizQuestion[];
  passing_score_percent: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct_index: number;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  user_id: string;
  score_percent: number;
  passed: boolean;
  answers: number[] | null;
  created_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  certificate_number: string;
  pdf_url: string | null;
  issued_at: string;
}

// ========== NESTED TYPES (for queries with joins) ==========

export interface CourseWithModules extends Course {
  modules: ModuleWithLessons[];
}

export interface ModuleWithLessons extends Module {
  lessons: Lesson[];
}

export interface EnrollmentWithCourse extends Enrollment {
  course: Course;
}

export interface LessonProgressWithLesson extends LessonProgress {
  lesson: Lesson;
}

// ========== UTILITY TYPES ==========

export interface CourseProgress {
  course_id: string;
  total_lessons: number;
  completed_lessons: number;
  completion_percent: number;
  last_accessed: string | null;
}

export interface DashboardData {
  enrollments: EnrollmentWithCourse[];
  progress: CourseProgress[];
  certificates: Certificate[];
}
