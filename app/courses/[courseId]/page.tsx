import { ArrowRight, BookOpen, Clock, Star, Trophy } from 'lucide-react';
import Link from 'next/link';

export default async function CourseIntroPage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = await params;

  return (
    <div className="max-w-4xl mx-auto px-8 py-12 animate-in">
      <div className="flex flex-col gap-12">
        {/* Breadcrumb / Title */}
        <header className="space-y-8">
          <div className="flex items-center gap-3 text-primary font-black text-sm uppercase tracking-[0.3em] bg-white border border-slate-100 w-fit px-6 py-2 rounded-2xl shadow-sm">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            Mastery Track
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary leading-[0.95] tracking-tighter">
            Retiree <br />
            Business <br />
            <span className="text-primary-light italic">Blueprint</span>
          </h1>
          <p className="text-slate-600 text-2xl md:text-3xl leading-snug max-w-2xl font-medium">
            A step-by-step roadmap for your <br />
            <span className="text-primary underline decoration-primary-light decoration-4 underline-offset-8 font-black">most profitable chapter yet.</span>
          </p>
        </header>

        {/* Hero Illustration Placeholder */}
        <div className="relative h-112 w-full rounded-[4rem] overflow-hidden bg-slate-900 shadow-2xl group">
          <div className="absolute inset-0 bg-linear-to-br from-primary via-primary-light/40 to-slate-900 opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
             <Trophy className="w-32 h-32 text-white opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700" />
          </div>
          <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl">
                <p className="text-white font-black text-sm uppercase tracking-widest mb-1">Verified Curriculum</p>
                <p className="text-white text-2xl font-black">2025 Edition</p>
             </div>
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Clock className="w-6 h-6" />, label: 'Duration', val: '8 Weeks' },
            { icon: <BookOpen className="w-6 h-6" />, label: 'Lessons', val: '45 Sessions' },
            { icon: <Trophy className="w-6 h-6" />, label: 'Reward', val: 'Certificate' },
            { icon: <Star className="w-6 h-6" />, label: 'Support', val: 'Live Labs' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:bg-primary transition-all duration-500">
              <div className="text-primary-light mb-4 group-hover:text-white transition-colors">{stat.icon}</div>
              <span className="text-xs uppercase font-black text-slate-600 tracking-tighter mb-2 group-hover:text-white transition-colors">{stat.label}</span>
              <span className="text-xl font-black text-primary group-hover:text-white transition-colors">{stat.val}</span>
            </div>
          ))}
        </div>

        {/* Start CTA */}
        <div className="bg-white p-2 rounded-[3.5rem] shadow-2xl border border-slate-100 relative group overflow-hidden">
           <div className="absolute inset-0 bg-linear-to-r from-primary to-primary-light opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
           <div className="p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
              <div className="max-w-md">
                <h2 className="text-4xl font-black text-primary mb-4 leading-tight">Ready to build your <br /> legacy?</h2>
                <p className="text-slate-500 text-xl font-medium leading-relaxed">Start with the 20-minute Orientation module to find your unique path.</p>
              </div>
              <Link
                href={`/courses/${resolvedParams.courseId}/lessons/welcome`}
                className="flex items-center gap-6 bg-primary text-white px-12 py-6 rounded-3xl font-black shadow-2xl shadow-primary/30 hover:bg-primary-light hover:scale-105 active:scale-95 transition-all text-xl"
              >
                Start Learning
                <ArrowRight className="w-7 h-7" />
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
