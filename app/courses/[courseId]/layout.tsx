import CourseSidebar from '@/components/course/CourseSidebar';
import { ChevronLeft, Menu, Rocket } from 'lucide-react';
import Link from 'next/link';

export default async function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ courseId: string }>;
}) {
  const resolvedParams = await params;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Course Header */}
      <header className="glass sticky top-0 z-50 px-6 h-20 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1 rounded-lg">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold tracking-tight text-primary hidden sm:block">
              Silver<span className="text-primary-light">Startup</span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none mb-1">Your Progress</span>
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-32 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full w-[15%] bg-emerald-500" />
              </div>
              <span className="text-xs font-black text-emerald-600">15%</span>
            </div>
          </div>
          <button className="lg:hidden p-2 text-slate-500">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Pass through courseId for navigation */}
        <CourseSidebar courseId={resolvedParams.courseId} />

        <main className="flex-1 h-[calc(100vh-5rem)] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
