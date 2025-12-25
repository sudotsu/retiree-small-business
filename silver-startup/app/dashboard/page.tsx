import CourseGrid from '@/components/dashboard/CourseGrid';
import { getCourses } from '@/lib/actions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Courses | Silver Startup',
  description: 'Access your enrolled courses and continue your learning journey.',
};

export default async function DashboardPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navigation */}
      <nav
        className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
            Silver<span className="text-blue-700">Startup</span>
          </h2>

          {/* User Avatar Placeholder */}
          <div
            className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700 text-sm ring-4 ring-blue-50"
            aria-label="User profile"
            role="img"
          >
            D
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Courses</h1>
          <p className="text-slate-600 text-lg">
            Select a course to continue your journey.
          </p>
        </header>

        <CourseGrid courses={courses} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-slate-500">
          <p>© 2025 Silver Startup. Built for retirees, by retirees.</p>
        </div>
      </footer>
    </div>
  );
}
