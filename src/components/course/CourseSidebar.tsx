"use client";

import { BookOpen, CheckCircle, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Mock data structure for the sidebar
const MOCK_MODULES = [
  {
    id: 'm1',
    title: 'Orientation & Mindset',
    lessons: [
      { id: 'l1', title: 'Welcome to the Blueprint', slug: 'welcome', completed: true, type: 'video' },
      { id: 'l2', title: 'The "Hour-a-Day" Philosophy', slug: 'the-philosophy', completed: true, type: 'video' },
      { id: 'l3', title: 'Support & Tech-Light Setup', slug: 'tech-setup', completed: false, type: 'text' },
    ]
  },
  {
    id: 'm2',
    title: 'Module 01: Your Foundation',
    lessons: [
      { id: 'l4', title: 'What Drives Your Decisions?', slug: 'decision-drivers', completed: false, type: 'video' },
      { id: 'l5', title: 'Inventorying Your Defaults', slug: 'inventory-defaults', completed: false, type: 'text' },
      { id: 'l6', title: 'Style Fit & Business Ideas', slug: 'style-fit', completed: false, type: 'video' },
    ]
  },
  {
    id: 'm3',
    title: 'Module 02: Big Picture Vision',
    lessons: [
      { id: 'l7', title: 'Mapping Your Life Goals', slug: 'life-goals', completed: false, type: 'video' },
      { id: 'l8', title: 'Defining Business Success', slug: 'business-success', completed: false, type: 'text' },
    ]
  }
];

export default function CourseSidebar({ courseId }: { courseId: string }) {
  const params = useParams();
  const currentLessonSlug = params?.slug as string;

  return (
    <aside className="w-80 h-[calc(100vh-5rem)] overflow-y-auto bg-white border-r border-slate-200 hidden lg:block">
      <div className="p-6">
        <h3 className="text-xs uppercase tracking-widest font-black text-slate-400 mb-6">Course Curriculum</h3>

        <div className="space-y-6">
          {MOCK_MODULES.map((module, mIdx) => (
            <div key={module.id} className="space-y-3">
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                  {mIdx + 1}
                </div>
                <h4 className="font-bold text-sm text-primary group-hover:text-primary-light transition-colors">
                  {module.title}
                </h4>
              </div>

              <div className="pl-8 space-y-1">
                {module.lessons.map((lesson) => {
                  const isActive = lesson.slug === currentLessonSlug;
                  return (
                    <Link
                      key={lesson.id}
                      href={`/courses/${courseId}/lessons/${lesson.slug}`}
                      className={`flex items-center gap-4 p-3 rounded-xl text-base transition-all ${
                        isActive
                          ? 'bg-primary text-white font-black shadow-xl shadow-primary/20 scale-[1.02]'
                          : 'text-slate-600 font-bold hover:bg-slate-50 hover:text-primary'
                      }`}
                    >
                      {lesson.completed ? (
                        <CheckCircle className={`w-5 h-5 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                      ) : lesson.type === 'video' ? (
                        <PlayCircle className="w-5 h-5 text-primary-light" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-primary-light" />
                      )}
                      <span className="truncate">{lesson.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
