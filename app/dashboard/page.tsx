"use client";

import CourseGrid from '@/components/dashboard/CourseGrid';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAccessibility } from '@/context/AccessibilityContext';
import {
    Award,
    BookOpen,
    HelpCircle,
    Rocket,
    Target,
    UserCircle
} from 'lucide-react';

export default function DashboardPage({ courses }: { courses: any[] }) {
  const { isSimpleMode } = useAccessibility();

  return (
    <div className="min-h-screen bg-silver-100 font-sans selection:bg-gold/20">
      {/* Gold Edition Navigation */}
      <nav className="glass sticky top-0 z-50 px-6 h-16 flex items-center shadow-xs">
        <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl shadow-lg ring-1 ring-white/20">
              <Rocket className="w-5 h-5 text-gold-light" />
            </div>
            <h2 className="text-xl font-black tracking-tighter text-primary uppercase">
              Silver<span className="text-gold">Startup</span>
              <span className="ml-2 px-1.5 py-0.5 bg-gold/10 text-gold text-[10px] rounded border border-gold/20 tracking-normal">GOLD EDITION</span>
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden md:flex items-center gap-2 text-primary/60 hover:text-primary transition-colors font-bold text-xs uppercase tracking-widest">
              <HelpCircle className="w-4 h-4" />
              Support
            </button>
            <button className="flex items-center gap-3 pl-6 border-l border-silver-200">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Student</p>
                <p className="text-sm font-bold text-primary leading-none">James Wilson</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-4 border-white shadow-md">
                <UserCircle className="w-6 h-6 text-gold-light" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex min-h-[calc(100vh-64px)]">
        {/* Dynamic Sidebar */}
        <Sidebar hideOnSimple={isSimpleMode} />

        {/* Main Command Center */}
        <main className={`flex-1 p-6 lg:p-10 animate-in ${isSimpleMode ? 'max-w-5xl mx-auto' : ''}`}>
          {/* Status Bar */}
          {!isSimpleMode && (
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex-1 min-w-70 bg-white p-6 rounded-3xl border border-silver-200 shadow-sm flex items-center gap-5">
                <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Milestone</p>
                  <h3 className="text-lg font-bold text-primary leading-tight">Week 1: Bank-Ready Business Plan</h3>
                  <p className="text-[10px] text-gold font-bold mt-1 uppercase tracking-tight">Free Access Active</p>
                </div>
              </div>
              <div className="flex-1 min-w-70 bg-primary p-6 rounded-3xl shadow-xl flex items-center gap-5 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-gold-light" />
                </div>
                <div className="relative z-10">
                  <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Resume Study</p>
                  <h3 className="text-lg font-bold text-white leading-tight">Video: Risk Logic</h3>
                </div>
              </div>
              {/* New Current Goal Widget */}
              <div className="flex-1 min-w-70 bg-white p-6 rounded-3xl border border-silver-200 shadow-sm flex items-center gap-5">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Goal</p>
                  <h3 className="text-lg font-bold text-primary leading-tight">Complete Module 1: Business Foundations</h3>
                  <p className="text-[10px] text-primary font-bold mt-1 uppercase tracking-tight">Due: Next Friday</p>
                </div>
              </div>
            </div>
          )}

          {/* Premium Weekly Strategy Widget */}
          {!isSimpleMode && (
            <div className="bg-primary rounded-[2.5rem] p-10 mb-10 relative overflow-hidden shadow-2xl group">
               <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -mr-48 -mt-48 transition-transform group-hover:scale-110 duration-1000" />
               <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                  <div>
                     <h3 className="text-sm font-black text-gold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                       <Target className="w-4 h-4" />
                       Strategy of the Week
                     </h3>
                     <h2 className="text-4xl font-black text-white leading-tight mb-6">
                       The &quot;Zero-Risk&quot; <br /> Validation Loop.
                     </h2>
                     <p className="text-white/60 font-medium leading-relaxed mb-8 max-w-sm">
                       Learn how to secure your first client using nothing but a simple conversation and a napkin sketch.
                     </p>
                     <button className="bg-gold text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-primary transition-all shadow-xl shadow-gold/20">
                       Watch Deep Dive
                     </button>
                  </div>
                  <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
                     <div className="space-y-6">
                        <div className="flex items-center justify-between pb-6 border-b border-white/10">
                           <span className="text-xs font-black text-white/40 uppercase tracking-widest">Enrollment Status</span>
                           <span className="px-3 py-1 bg-green-500/20 text-green-400 text-[10px] font-black rounded-full border border-green-500/30">Active</span>
                        </div>
                        <div className="space-y-4">
                           {[
                             { label: 'Market Interest', value: 'High', color: 'text-gold' },
                             { label: 'Tech Required', value: 'Low', color: 'text-white' },
                             { label: 'Time Investment', value: '4 hrs/wk', color: 'text-white' }
                           ].map((stat) => (
                             <div key={stat.label} className="flex justify-between items-center text-sm font-bold">
                                <span className="text-white/40">{stat.label}</span>
                                <span className={stat.color}>{stat.value}</span>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-3xl font-black text-primary tracking-tight flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-gold" />
              Your Blueprint
            </h2>
            {isSimpleMode && (
              <p className="text-slate-500 font-bold hidden md:block">Focused view active for better readability.</p>
            )}
            <div className="text-[10px] font-black tracking-widest uppercase text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              Active Learning Session
            </div>
          </div>

          <CourseGrid courses={courses} />

          {/* Gold Footer */}
          <footer className="mt-20 pt-10 border-t border-silver-200 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 italic">
            <p className="text-sm text-slate-500">© 2024 Silver Startup Gold Edition. Built for the next classic business.</p>
            <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-primary">
              <a href="#" className="hover:text-gold transition-colors">Privacy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms</a>
              <a href="#" className="hover:text-gold transition-colors">Community Guidelines</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

