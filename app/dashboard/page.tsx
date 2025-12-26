import CourseGrid from '@/components/dashboard/CourseGrid';
import { getCourses } from '@/lib/actions';
import { BookOpen, Rocket, UserCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learning Dashboard',
  description: 'Access your retiree business blueprint courses.',
};

export default async function DashboardPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-silver-100">
      {/* Premium Navigation */}
      <nav className="glass sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-primary">
              Silver<span className="text-primary-light">Startup</span>
            </h2>
          </div>

          <button className="flex items-center gap-2 text-primary font-medium hover:opacity-80 transition-opacity">
            <UserCircle className="w-6 h-6" />
            <span className="hidden sm:inline">My Account</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-primary text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-primary-light/10 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl animate-in">
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              Welcome back to your <br />
              <span className="text-primary-light italic">Second Act</span>
            </h1>
            <p className="text-silver-200 text-lg md:text-xl leading-relaxed opacity-90">
              Your journey to building a sustainable, profitable service business
              continues here. Browse your courses or resume your last lesson below.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 -mt-8 relative z-20">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Enrolled Courses
          </h2>
          <div className="text-sm font-medium text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            {courses.length} Courses Found
          </div>
        </div>

        <CourseGrid courses={courses} />
      </main>

      {/* Premium Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-2 grayscale opacity-50">
            <Rocket className="w-5 h-5" />
            <span className="text-lg font-bold">SilverStartup</span>
          </div>
          <p className="text-slate-500 text-sm max-w-md mb-8">
            Empowering retirees with the tools, knowledge, and community to launch
            successful service businesses.
          </p>
          <div className="text-slate-400 text-xs">
            © {new Date().getFullYear()} Silver Startup. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
