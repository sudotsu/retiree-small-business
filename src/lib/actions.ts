'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Course, CourseProgress, CourseWithModules, Lesson, Module } from './types';

/**
 * Creates a Supabase client configured for Next.js Server Components
 * Uses cookies for auth state management
 */
async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Cookie setting can fail in Server Components
            // This is expected and can be safely ignored
          }
        },
      },
    }
  );
}

/**
 * Fetches all published courses, ordered by creation date (oldest first)
 * @returns Array of Course objects, empty array on error
 */
export async function getCourses(): Promise<Course[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[getCourses] Error fetching courses:', error.message);
    return [];
  }

  return data as Course[];
}

/**
 * Fetches a single course by ID with all its modules and lessons
 * Modules and lessons are sorted by sort_order
 * @param courseId - UUID of the course
 * @returns Course with nested modules and lessons, or null if not found/error
 */
export async function getCourseWithContent(
  courseId: string
): Promise<CourseWithModules | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('courses')
    .select(
      `
      *,
      modules (
        *,
        lessons (
          *
        )
      )
    `
    )
    .eq('id', courseId)
    .eq('is_published', true)
    .order('sort_order', { foreignTable: 'modules', ascending: true })
    .order('sort_order', { foreignTable: 'modules.lessons', ascending: true })
    .single();

  if (error) {
    console.error(
      '[getCourseWithContent] Error fetching course:',
      error.message
    );
    return null;
  }

  // Sort nested arrays to ensure correct order (Supabase doesn't always respect foreign table ordering)
  if (data?.modules) {
    data.modules.sort((a: Module, b: Module) => a.sort_order - b.sort_order);
    data.modules.forEach((module: Module & { lessons: Lesson[] }) => {
      if (module.lessons) {
        module.lessons.sort((a: Lesson, b: Lesson) => a.sort_order - b.sort_order);
      }
    });
  }

  return data as CourseWithModules;
}

/**
 * Fetches a single module with its lessons
 * @param moduleId - UUID of the module
 * @returns Module with lessons, or null if not found/error
 */
export async function getModuleWithLessons(moduleId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('modules')
    .select(
      `
      *,
      lessons (*)
    `
    )
    .eq('id', moduleId)
    .single();

  if (error) {
    console.error('[getModuleWithLessons] Error:', error.message);
    return null;
  }

  // Sort lessons
  if (data?.lessons) {
    data.lessons.sort((a: Lesson, b: Lesson) => a.sort_order - b.sort_order);
  }

  return data;
}

/**
 * Fetches a single lesson by slug
 * @param moduleId - UUID of the parent module
 * @param slug - URL-friendly lesson identifier
 * @returns Lesson object, or null if not found/error
 */
export async function getLessonBySlug(
  moduleId: string,
  slug: string
): Promise<Lesson | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('module_id', moduleId)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('[getLessonBySlug] Error:', error.message);
    return null;
  }

  return data as Lesson;
}

/**
 * Checks if a user is enrolled in a course
 * @param userId - UUID of the user (from auth.uid())
 * @param courseId - UUID of the course
 * @returns boolean - true if enrolled, false otherwise
 */
export async function checkEnrollment(
  userId: string,
  courseId: string
): Promise<boolean> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .single();

  if (error) {
    // Not found is expected for non-enrolled users
    return false;
  }

  return !!data;
}

/**
 * Marks a lesson as completed for the current user
 * @param lessonId - UUID of the lesson
 * @returns boolean - true if successful, false otherwise
 */
export async function markLessonComplete(lessonId: string): Promise<boolean> {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error('[markLessonComplete] Auth error:', authError?.message);
    return false;
  }

  // Upsert lesson progress
  const { error } = await supabase
    .from('lesson_progress')
    .upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        is_completed: true,
        completed_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id,lesson_id',
      }
    );

  if (error) {
    console.error('[markLessonComplete] Error:', error.message);
    return false;
  }

  return true;
}

/**
 * Gets user's progress for a specific course
 * @param userId - UUID of the user
 * @param courseId - UUID of the course
 * @returns Object with completion stats, or null on error
 */
export async function getCourseProgress(userId: string, courseId: string): Promise<CourseProgress | null> {
  const supabase = await createClient();

  // Get all lessons in the course
  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select(
      `
      id,
      module_id,
      modules!inner (
        course_id
      )
    `
    )
    .eq('modules.course_id', courseId);

  if (lessonsError) {
    console.error('[getCourseProgress] Error fetching lessons:', lessonsError.message);
    return null;
  }

  // Get user's completed lessons
  const { data: progress, error: progressError } = await supabase
    .from('lesson_progress')
    .select('lesson_id')
    .eq('user_id', userId)
    .eq('is_completed', true)
    .in(
      'lesson_id',
      lessons.map((l: { id: string }) => l.id)
    );

  if (progressError) {
    console.error('[getCourseProgress] Error fetching progress:', progressError.message);
    return null;
  }

  const totalLessons = lessons.length;
  const completedLessons = Array.isArray(progress) ? progress.length : 0;
  const completionPercent = totalLessons > 0
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;

  return {
    course_id: courseId,
    total_lessons: totalLessons,
    completed_lessons: completedLessons,
    completion_percent: completionPercent,
    last_accessed: null,
  };
}
