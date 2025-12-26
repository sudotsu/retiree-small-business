import VideoPlayer from '@/components/course/VideoPlayer';
import { ArrowLeft, ArrowRight, CheckCircle2, Download, FileText, MessageSquare } from 'lucide-react';

export default async function LessonPage({ params }: { params: Promise<{ courseId: string, slug: string }> }) {
  const resolvedParams = await params;

  // We'll normalize the slug for the placeholder title
  const title = resolvedParams.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="animate-in bg-slate-50/50 min-h-full">
      {/* Lesson Hero / Video Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-8 py-10 md:py-14">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-black text-primary-light uppercase tracking-[0.25em] bg-blue-50 px-3 py-1 rounded-full">Module 01: The Foundation</span>
              <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight">{title}</h1>
            </div>

            <button className="flex items-center justify-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-2xl text-base font-black shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95">
              <CheckCircle2 className="w-5 h-5" />
              Complete Lesson
            </button>
          </div>

          <VideoPlayer title={title} />
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-8 py-16 grid lg:grid-cols-3 gap-16">
        {/* Main Article */}
        <div className="lg:col-span-2 space-y-12">
          <article className="prose prose-slate prose-xl max-w-none prose-headings:text-primary prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-primary prose-strong:font-black">
            <h2>Session Overview</h2>
            <p className="text-xl md:text-2xl font-medium text-slate-700 leading-snug">
              In this session, we dive deep into the core mechanics of <strong>{title}</strong>.
              This is where the theory we covered in orientation meets the practical
              realities of your new business.
            </p>
            <p>
              Success in your "Second Act" requires a different approach than the 9-to-5 world.
              We're going to examine how to leverage your existing strengths without taking on
              unnecessary traditional business "clutter."
            </p>
            <h3>What you will achieve:</h3>
            <ul className="space-y-4 marker:text-primary-light">
              <li className="pl-2">Identify your primary business decision drivers.</li>
              <li className="pl-2">Map your "Invisible Defaults" to potential service models.</li>
              <li className="pl-2">Establish your "First Safety Net" boundaries.</li>
            </ul>
            <div className="my-12 p-10 bg-linear-to-br from-primary/5 to-primary-light/5 border-l-8 border-primary rounded-3xl">
              <span className="text-sm font-black text-primary uppercase tracking-widest block mb-4">The Big Thought</span>
              <p className="text-2xl md:text-3xl font-black text-primary italic leading-tight m-0">
                "The goal isn't just to start a business; it's to start the right business for who you are right now."
              </p>
            </div>
            <p>
              As you go through the video above, keep your workbook open to page 12. We've designed
              these exercises to be completed in "real-time" alongside the recording.
            </p>
          </article>

          {/* Discussion Trigger */}
          <div className="bg-white rounded-4xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="bg-primary/5 p-4 rounded-3xl text-primary">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-primary">Questions about {title}?</h4>
                <p className="text-base text-slate-500 font-medium">Join our community of lifelong learners.</p>
              </div>
            </div>
            <button className="whitespace-nowrap bg-primary text-white px-10 py-4 rounded-2xl font-black hover:bg-primary-light transition-all shadow-xl shadow-primary/10 text-lg">
              Join Discussion
            </button>
          </div>
        </div>

        {/* Sidebar Assets */}
        <div className="space-y-10">
          <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-10">
            <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-8 flex items-center gap-2">
              <Download className="w-5 h-5 text-primary-light" />
              Resources
            </h4>
            <div className="space-y-5">
              {[
                { name: 'Decision Drivers Worksheet', type: 'PDF', size: '1.2 MB' },
                { name: 'Module 01 Checklist', type: 'XLS', size: '450 KB' },
                { name: 'Large-Print Transcript', type: 'PDF', size: '2.4 MB' },
              ].map((asset, i) => (
                <div key={i} className="group cursor-pointer flex items-center justify-between p-5 rounded-2xl border border-slate-50 hover:bg-slate-50 hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-100 p-3 rounded-xl text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary group-hover:text-primary-light transition-colors">{asset.name}</p>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">{asset.type} • {asset.size}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-linear-to-br from-primary to-primary-light rounded-4xl p-12 text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
            <h4 className="text-2xl font-black mb-3">Need Help?</h4>
            <p className="text-white/80 text-lg mb-8 font-medium leading-relaxed">Stuck on this lesson? Our senior-support team is ready to assist you by phone or email.</p>
            <button className="w-full bg-white text-primary py-5 rounded-2xl font-black text-base hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10">
              Request Phone Support
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <footer className="border-t border-slate-200 bg-white px-8 py-8 sticky bottom-0 z-40 shadow-2xl shadow-black/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <button className="flex items-center gap-4 text-slate-500 font-bold hover:text-primary transition-colors group">
            <div className="w-12 h-12 rounded-2xl border border-slate-200 flex items-center justify-center group-hover:bg-slate-50 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[10px] uppercase text-slate-400 font-black tracking-widest mb-1">Previous Lesson</span>
              <span className="text-lg font-black tracking-tight">The Philosophy</span>
            </div>
          </button>

          <button className="flex items-center justify-center gap-5 bg-primary text-white px-10 py-5 rounded-2xl font-black shadow-2xl shadow-primary/20 hover:bg-primary-light hover:scale-105 active:scale-95 transition-all">
            <div className="flex flex-col items-end leading-tight">
              <span className="text-[10px] uppercase text-white/50 font-black tracking-widest mb-1">Up Next</span>
              <span className="text-lg font-black tracking-tight">Inventorying Defaults</span>
            </div>
            <ArrowRight className="w-6 h-6 border-l border-white/20 pl-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
