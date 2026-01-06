import type { Course } from '@/lib/types';
import { ArrowRight, BookOpen, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CourseGridProps {
  courses: Course[];
}

export default function CourseGrid({ courses }: CourseGridProps) {
  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 animate-in">
        <div className="bg-slate-50 p-4 rounded-full mb-4">
          <BookOpen className="w-8 h-8 text-slate-300" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-slate-700">No Courses Yet</h3>
        <p className="text-slate-500 max-w-sm text-center mt-2 px-6">
          Your learning journey is just beginning. Enrolled courses will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 animate-in">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps) {
  const priceFormatted = course.price_cents === 0
    ? 'Complimentary'
    : `$${(course.price_cents / 100).toFixed(0)}`;

  const isMastery = course.track_type === 'mastery';

  return (
    <article
      className="group relative flex flex-col bg-white rounded-4xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden"
      aria-label={`Course: ${course.title}`}
    >
      {/* Visual Header */}
      <div className="h-48 relative overflow-hidden bg-slate-100">
        {course.image_url ? (
          <Image
            src={course.image_url}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary to-primary-light/50 opacity-10" />
        )}

        {/* Track Badge */}
        <div className="absolute top-5 left-5 z-10">
          <span
            className={`text-[10px] uppercase tracking-[0.15em] font-black px-4 py-1.5 rounded-full shadow-lg ${
              isMastery ? 'bg-track-mastery text-white' : 'bg-track-essentials text-white'
            }`}
          >
            {course.track_type} Track
          </span>
        </div>
      </div>

      {/* Course Details */}
      <div className="p-8 md:p-10 flex-1 flex flex-col">
        <header className="mb-6">
          <h3 className="text-3xl font-black text-primary mb-4 leading-tight tracking-tight group-hover:text-primary-light transition-colors">
            {course.title}
          </h3>
          <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-500">
            <span className="flex items-center gap-2 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <Clock className="w-4 h-4 text-primary-light" /> Self-Paced
            </span>
            <span className="flex items-center gap-2 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              {isMastery ? <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> : <BookOpen className="w-4 h-4 text-primary-light" />}
              {isMastery ? 'Premium Mastery' : 'Core Essentials'}
            </span>
          </div>
        </header>

        <p className="text-slate-600 text-lg leading-relaxed mb-10 line-clamp-3">
          {course.description || 'Master the specific skills needed to build your own profitable service business during retirement.'}
        </p>

        {/* Footer Action */}
        <div className="mt-auto flex items-center justify-between pt-8 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-xs uppercase font-black text-slate-400 tracking-widest mb-1">Tuition Fee</span>
            <span className="text-3xl font-black text-primary">{priceFormatted}</span>
          </div>

          <Link
            href={`/courses/${course.id}`}
            className="flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 rounded-3xl shadow-2xl shadow-primary/20 hover:bg-primary-light hover:scale-105 active:scale-95 transition-all text-base font-black text-center"
            aria-label={`Start Course: ${course.title}`}
          >
            Start Course
            <ArrowRight className="w-5 h-5 border-l border-white/20 pl-2" />
          </Link>
        </div>
      </div>
    </article>
  );
}
