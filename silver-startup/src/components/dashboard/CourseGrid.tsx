import type { Course } from '@/lib/types';
import { ArrowRight, BookOpen, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CourseGridProps {
  courses: Course[];
}

export default function CourseGrid({ courses }: CourseGridProps) {
  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
          <BookOpen className="w-8 h-8 text-slate-300" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-bold text-slate-700">No Courses Available</h3>
        <p className="text-slate-500 max-w-sm text-center mt-2">
          We are currently curating the content. Check back shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
  // Format price for display
  const priceFormatted = course.price_cents === 0
    ? 'Free'
    : `$${(course.price_cents / 100).toFixed(0)}`;

  // Track-specific colors
  const trackColors = {
    mastery: {
      bg: 'bg-purple-50',
      badge: 'bg-purple-600',
      icon: <Star className="w-10 h-10 text-purple-300" aria-hidden="true" />,
    },
    essentials: {
      bg: 'bg-blue-50',
      badge: 'bg-blue-600',
      icon: <BookOpen className="w-10 h-10 text-blue-300" aria-hidden="true" />,
    },
  };

  const trackType: keyof typeof trackColors =
    course.track_type === 'mastery' || course.track_type === 'essentials'
      ? course.track_type
      : 'essentials';
  const colors = trackColors[trackType];

  return (
    <article
      className="group flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      aria-label={`Course: ${course.title}`}
    >
      {/* Thumbnail Section */}
      <div className={`h-40 relative flex items-center justify-center ${colors.bg}`}>
        {course.image_url ? (
          <Image
            src={course.image_url}
            alt={`Thumbnail for ${course.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <div className="text-center">{colors.icon}</div>
        )}

        {/* Track Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-sm ${colors.badge} text-white`}
            aria-label={`Track: ${course.track_type}`}
          >
            {course.track_type}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-700 transition-colors">
          {course.title}
        </h3>

        <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
          {course.description || 'No description available.'}
        </p>

        {/* Footer with Price and CTA */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
          <span
            className="font-bold text-slate-900 text-lg"
            aria-label={`Price: ${priceFormatted}`}
          >
            {priceFormatted}
          </span>

          <Link
            href={`/courses/${course.id}`}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-100 focus:outline-none"
            aria-label={`Start ${course.title}`}
          >
            Start Course
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
