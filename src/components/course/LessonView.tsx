"use client";

import { useAccessibility } from '@/context/AccessibilityContext';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Eye,
  FileText,
  MessageSquare,
  Play,
  Volume2
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface LessonViewProps {
  lessonTitle?: string;
  moduleTitle?: string;
  videoUrl?: string;
  actionGoal?: string;
  transcript?: string;
  hideHeader?: boolean;
}

export default function LessonView({
  lessonTitle = "Why 'Risk Logic' is Your Nest Egg's Best Friend",
  moduleTitle = "Module 1: Your Bank-Ready Business Plan",
  videoUrl = "#",
  actionGoal = "Define your primary service in one sentence.",
  transcript = "The core of Risk Logic is understanding that as a retiree, your most valuable asset isn't just your money—it's your time and your peace of mind. In this lesson, we explore how to validate a business idea using 'The $0 Test'...",
  hideHeader = false
}: LessonViewProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [actionValue, setActionValue] = useState("");
  const { toggleVisionMode } = useAccessibility();

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-gold/20" role="main">
      {/* Lesson Header - Accessibility: Sticky + High Contrast Labels */}
      {!hideHeader && (
        <header className="h-20 border-b-2 border-silver-200 px-6 flex items-center justify-between sticky top-0 bg-white z-50 shadow-sm">
          <Link
            href="/dashboard"
            aria-label="Back to dashboard"
            className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-sm hover:text-gold transition-colors min-h-11 min-w-11"
          >
            <div className="p-2 bg-silver-100 rounded-full group-hover:bg-silver-200">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="hidden md:inline">Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Current Module</p>
              <p className="text-sm font-bold text-primary leading-none uppercase">{moduleTitle}</p>
            </div>
            <button
              onClick={toggleVisionMode}
              aria-label="Toggle High Contrast Vision Mode"
              className="w-12 h-12 flex items-center justify-center bg-silver-100 rounded-xl hover:bg-gold hover:text-white transition-all shadow-sm"
            >
              <Eye className="w-6 h-6" />
            </button>
          </div>
        </header>
      )}

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-0">
        {/* Main Content Area (8 Cols) */}
        <div className="lg:col-span-8 p-6 lg:p-12 border-r-2 border-silver-200">
          <nav aria-label="Progress" className="mb-6">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gold mb-2">
              <span className="px-2 py-1 bg-gold/10 rounded border border-gold/20">Lesson 02 of 12</span>
            </div>
          </nav>

          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight leading-[1.1] mb-6">
              {lessonTitle}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
              In this session, we break down the logic of protecting your nest egg. We move from
              theory to practice, ensuring you never spend a dime of your savings until your
              market has already said &quot;Yes.&quot;
            </p>
          </div>

          {/* Premium Cinema Player - Accessibility: Large Controls + Title */}
          <div
            className="aspect-video bg-primary rounded-[2.5rem] shadow-2xl relative overflow-hidden group cursor-pointer ring-12 ring-silver-100 mb-12"
            aria-label="Video Lesson Player"
            data-video-url={videoUrl}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
              <button
                aria-label="Play Lesson Video"
                className="w-24 h-24 bg-gold rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(180,83,9,0.4)] hover:scale-110 transition-transform duration-300"
              >
                <Play className="w-10 h-10 text-white fill-white ml-2" />
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-10 bg-linear-to-t from-black/90 via-black/40 to-transparent">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button aria-label="Audio Settings" className="text-white hover:text-gold transition-colors">
                      <Volume2 className="w-6 h-6" />
                    </button>
                    <span className="text-white font-black uppercase tracking-widest text-xs">12:45 remaining</span>
                  </div>
                  <div className="h-1.5 w-48 bg-white/20 rounded-full overflow-hidden">
                    <div className="bg-gold h-full w-1/3 shadow-[0_0_10px_#D4AF37]" />
                  </div>
               </div>
            </div>
          </div>

          {/* Lesson Recap / Transcript - Critical for Senior Accessibility */}
          <div className="bg-silver-100/50 rounded-3xl p-10 mb-12">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Lesson Recap & Transcript
            </h3>
            <div className="prose prose-slate max-w-none prose-lg">
              <p className="text-primary font-bold leading-relaxed">{transcript}</p>
            </div>
          </div>

          {/* Nav Buttons - Accessibility: Large 44px+ hit areas */}
          <div className="flex justify-between items-center py-10 border-t-2 border-silver-200">
            <button className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-sm opacity-30 cursor-not-allowed min-h-12 px-6 rounded-2xl bg-silver-100">
              <ArrowLeft className="w-5 h-5" />
              Previous
            </button>
            <button className="flex items-center gap-3 text-white bg-primary hover:bg-gold transition-all font-black uppercase tracking-widest text-sm min-h-12 px-8 rounded-2xl shadow-lg hover:shadow-gold/20">
              Next Lesson
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Sidebar (4 Cols) - role="complementary" */}
        <aside className="lg:col-span-4 bg-silver-50 p-6 lg:p-12 min-h-screen border-l border-silver-100" role="complementary" aria-label="Lesson Activities">
          <div className="sticky top-32">
            <div className="bg-white rounded-4xl p-10 shadow-2xl shadow-primary/5 border border-silver-200 mb-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12">
                <CheckCircle2 className="w-32 h-32" />
               </div>

              <h2 className="text-2xl font-black text-primary uppercase tracking-tighter mb-2">The Action Win</h2>
              <p className="text-base text-slate-500 font-bold mb-8 italic leading-relaxed">Build your future, one sentence at a time.</p>

              <div className="space-y-8 relative z-10">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-4 px-1">
                    {actionGoal}
                  </label>
                  <textarea
                    aria-label="Your Action Goal Submission"
                    className="w-full bg-silver-100 border-4 border-transparent focus:border-gold focus:bg-white rounded-3xl p-6 text-lg font-bold text-primary min-h-40 transition-all outline-none shadow-inner placeholder:text-slate-300"
                    placeholder="Example: I provide trusted local estate cleanup for families in transition..."
                    value={actionValue}
                    onChange={(e) => setActionValue(e.target.value)}
                  />
                </div>

                <button
                  onClick={() => setIsCompleted(!isCompleted)}
                  aria-pressed={isCompleted}
                  className={`w-full py-5 rounded-3xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-base transition-all ${
                    isCompleted
                    ? 'bg-green-600 text-white shadow-green-200 shadow-2xl scale-95'
                    : 'bg-primary text-white hover:bg-gold shadow-xl hover:shadow-gold/30 hover:-translate-y-1'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      Win Secured!
                    </>
                  ) : (
                    'Complete This Win'
                  )}
                </button>
              </div>
            </div>

            {/* Quick Resources */}
            <div className="px-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 px-1">Lesson Assets</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-5 bg-white rounded-2xl border-2 border-silver-100 hover:border-gold transition-all group shadow-sm">
                  <div className="flex items-center gap-4">
                    <FileText className="w-6 h-6 text-slate-400 group-hover:text-gold" />
                    <span className="text-sm font-bold text-primary">Worksheet: The Risk Logic Guardrail</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-300" />
                </button>
                <button className="w-full flex items-center justify-between p-5 bg-white rounded-2xl border-2 border-silver-100 hover:border-gold transition-all group shadow-sm">
                  <div className="flex items-center gap-4">
                    <MessageSquare className="w-6 h-6 text-slate-400 group-hover:text-gold" />
                    <span className="text-sm font-bold text-primary">Discuss with the Community</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-300" />
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
