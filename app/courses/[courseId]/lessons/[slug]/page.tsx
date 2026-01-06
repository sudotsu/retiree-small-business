import LessonView from '@/components/course/LessonView';

export default async function LessonPage({ params }: { params: Promise<{ courseId: string, slug: string }> }) {
  const resolvedParams = await params;

  // We'll normalize the slug for the placeholder title
  const title = resolvedParams.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="animate-in min-h-full">
      <LessonView
        lessonTitle={title}
        moduleTitle="Module 01: The Foundation"
        hideHeader={true}
      />
    </div>
  );
}

