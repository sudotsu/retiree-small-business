import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  ChevronRight, 
  Users, 
  Award, 
  Menu, 
  X,
  Briefcase,
  Lightbulb,
  DollarSign,
  ArrowRight,
  Download,
  MessageSquare,
  Eye,
  Loader2,
  Settings
} from 'lucide-react';

// --- MOCK DATA ---

const COURSES = [
  {
    id: 1,
    title: "Turning Hobbies into Income",
    description: "Learn how to take your lifelong passions—woodworking, knitting, consulting—and turn them into a small business.",
    icon: <Lightbulb className="w-6 h-6 text-amber-600" />,
    color: "bg-amber-100",
    totalLessons: 4,
    lessons: [
      { id: '1-1', title: "Identifying Your Marketable Skills", duration: "10 min", type: "video" },
      { id: '1-2', title: "Pricing Your Work (Without Underselling)", duration: "15 min", type: "text" },
      { id: '1-3', title: "Finding Your First 5 Customers", duration: "12 min", type: "video" },
      { id: '1-4', title: "Project: Your First Offer", duration: "30 min", type: "project" },
    ]
  },
  {
    id: 2,
    title: "Technology for Business Simplified",
    description: "We strip away the jargon. Learn only the tools you actually need to run a business in 2025.",
    icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    color: "bg-blue-100",
    totalLessons: 5,
    lessons: [
      { id: '2-1', title: "Setting Up a Professional Email", duration: "8 min", type: "video" },
      { id: '2-2', title: "Do You Need a Website?", duration: "10 min", type: "text" },
      { id: '2-3', title: "Using Digital Payments (Square, PayPal)", duration: "15 min", type: "video" },
      { id: '2-4', title: "Video Calls for Consultants", duration: "12 min", type: "video" },
      { id: '2-5', title: "Safety & Scams: Protecting Your Business", duration: "20 min", type: "text" },
    ]
  },
  {
    id: 3,
    title: "Legal & Finances for Seniors",
    description: "Protect your nest egg while building something new. LLCs, taxes, and insurance explained simply.",
    icon: <DollarSign className="w-6 h-6 text-green-600" />,
    color: "bg-green-100",
    totalLessons: 3,
    lessons: [
      { id: '3-1', title: "LLC vs Sole Proprietorship", duration: "15 min", type: "video" },
      { id: '3-2', title: "Tax Deductions You Can Claim", duration: "20 min", type: "text" },
      { id: '3-3', title: "Business Insurance Basics", duration: "10 min", type: "video" },
    ]
  }
];

// --- COMPONENTS ---

const Button = ({ children, onClick, variant = 'primary', className = '', icon: Icon, isLoading = false, disabled = false }) => {
  const baseStyle = "flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  // High contrast handling included in generic styles
  const variants = {
    primary: "bg-blue-700 hover:bg-blue-800 text-white focus:ring-blue-500 shadow-md hover:shadow-lg active:scale-95",
    secondary: "bg-white text-blue-900 border-2 border-blue-200 hover:border-blue-700 focus:ring-blue-500",
    outline: "border-2 border-slate-300 text-slate-700 hover:border-slate-800 hover:text-slate-900 focus:ring-slate-400",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-blue-700"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};

const ProgressBar = ({ progress, highContrast }) => (
  <div className={`w-full rounded-full h-4 ${highContrast ? 'bg-white border-2 border-black' : 'bg-slate-200'}`}>
    <div 
      className={`h-full rounded-full transition-all duration-700 ${highContrast ? 'bg-black' : 'bg-green-600'}`} 
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

// --- MAIN APPLICATION ---

export default function App() {
  const [view, setView] = useState('home');
  const [activeCourse, setActiveCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(['1-1']); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // "Gold Edition" State
  const [highContrast, setHighContrast] = useState(false);
  const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);
  const [activeTab, setActiveTab] = useState('content'); // content, resources, discussion

  const simulateNetworkRequest = (callback) => {
    setIsSimulatingLoad(true);
    setTimeout(() => {
      setIsSimulatingLoad(false);
      callback();
    }, 800); // Simulate 800ms server latency
  };

  const navigateTo = (newView, course = null, lesson = null) => {
    simulateNetworkRequest(() => {
      setView(newView);
      if (course) setActiveCourse(course);
      if (lesson) setActiveLesson(lesson);
      window.scrollTo(0, 0);
      setIsMenuOpen(false);
    });
  };

  const toggleLessonComplete = (lessonId) => {
    simulateNetworkRequest(() => {
      if (completedLessons.includes(lessonId)) {
        setCompletedLessons(prev => prev.filter(id => id !== lessonId));
      } else {
        setCompletedLessons(prev => [...prev, lessonId]);
      }
    });
  };

  // --- THEME UTILS ---
  const bgMain = highContrast ? 'bg-white' : 'bg-slate-50';
  const textMain = highContrast ? 'text-black' : 'text-slate-900';
  const textMuted = highContrast ? 'text-black' : 'text-slate-600';
  const borderMain = highContrast ? 'border-black' : 'border-slate-200';
  const cardBg = highContrast ? 'bg-white border-2 border-black' : 'bg-white border border-slate-200 shadow-sm';
  const navBg = highContrast ? 'bg-white border-b-2 border-black' : 'bg-white/80 backdrop-blur-md border-b border-slate-200';

  // --- VIEWS ---

  const HomeView = () => (
    <div className={`flex flex-col min-h-screen ${bgMain}`}>
      <section className={`py-24 px-4 md:px-8 border-b ${borderMain} ${highContrast ? 'bg-white' : 'bg-gradient-to-b from-blue-50 via-white to-slate-50'}`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 space-y-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm ${highContrast ? 'border-2 border-black text-black' : 'bg-blue-100 text-blue-800'}`}>
              <Award className="w-5 h-5" />
              <span>Built for the Second Act</span>
            </div>
            <h1 className={`text-5xl md:text-7xl font-extrabold ${textMain} leading-[1.1] tracking-tight`}>
              Experience is your <span className={highContrast ? 'underline decoration-4' : 'text-blue-700'}>greatest asset.</span>
            </h1>
            <p className={`text-xl md:text-2xl ${textMuted} leading-relaxed max-w-lg`}>
              The premium platform for retirees launching small businesses. No jargon. No ads. Just clear, proven steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={() => navigateTo('dashboard')} icon={Play} className={highContrast ? 'border-2 border-black bg-black text-white hover:bg-gray-800' : ''}>
                Start Learning Now
              </Button>
              <Button variant={highContrast ? "outline" : "secondary"} onClick={() => document.getElementById('courses').scrollIntoView({behavior: 'smooth'})}>
                Explore Curriculum
              </Button>
            </div>
          </div>
          
          {/* Hero Image / Trust Element */}
          <div className="md:w-1/2 w-full relative">
             <div className={`aspect-[4/3] rounded-2xl overflow-hidden relative ${highContrast ? 'border-4 border-black' : 'shadow-2xl shadow-blue-900/10'}`}>
                <div className="absolute inset-0 bg-slate-200 animate-pulse"></div>
                {/* Mock Image Content */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                    <div className="text-center space-y-4">
                        <Users className={`w-20 h-20 mx-auto ${highContrast ? 'text-black' : 'text-slate-300'}`} />
                        <p className={`font-bold ${textMuted}`}>Premium Video Content Preview</p>
                    </div>
                </div>
             </div>
             
             {/* Floating Trust Badge */}
             <div className={`absolute -bottom-8 -left-8 p-6 rounded-xl ${highContrast ? 'bg-white border-2 border-black' : 'bg-white shadow-xl'} max-w-xs`}>
               <div className="flex gap-1 mb-2">
                 {[1,2,3,4,5].map(i => <div key={i} className={`w-5 h-5 ${highContrast ? 'text-black' : 'text-amber-400'}`}>★</div>)}
               </div>
               <p className={`text-sm font-bold ${textMain}`}>"The only course that didn't treat me like I was born yesterday."</p>
               <p className={`text-xs ${textMuted} mt-2`}>— Robert D., 68</p>
             </div>
          </div>
        </div>
      </section>

      <section id="courses" className={`py-24 px-4 ${bgMain}`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className={`text-4xl font-bold ${textMain} mb-4`}>The Gold Standard Curriculum</h2>
            <p className={`text-xl ${textMuted} max-w-2xl`}>We've stripped away the noise. This is the exact roadmap to a profitable small business.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map(course => (
              <div key={course.id} className={`flex flex-col rounded-2xl overflow-hidden transition-all duration-300 ${highContrast ? 'border-2 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' : 'bg-white border border-slate-200 hover:shadow-xl hover:-translate-y-1'}`}>
                <div className={`h-40 ${highContrast ? 'bg-slate-100 border-b-2 border-black' : course.color} flex items-center justify-center`}>
                  <div className={`p-4 rounded-xl ${highContrast ? 'bg-white border-2 border-black' : 'bg-white/90 shadow-sm backdrop-blur'}`}>
                    {course.icon}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className={`text-2xl font-bold ${textMain} mb-3`}>{course.title}</h3>
                  <p className={`${textMuted} mb-8 flex-1 leading-relaxed`}>{course.description}</p>
                  <Button variant={highContrast ? "outline" : "outline"} className="w-full justify-between group" onClick={() => navigateTo('dashboard')}>
                    View Details
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const DashboardView = () => (
    <div className={`max-w-6xl mx-auto px-4 py-12 min-h-screen ${bgMain}`}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
           <h1 className={`text-4xl font-bold ${textMain}`}>My Learning Portal</h1>
           <p className={`${textMuted} mt-2 text-lg`}>Good afternoon, Dad. You're making great progress.</p>
        </div>
        <div className={`px-6 py-4 rounded-xl ${highContrast ? 'border-2 border-black bg-white' : 'bg-blue-50 border border-blue-100'}`}>
          <div className="flex items-center gap-3">
             <div className={`p-2 rounded-lg ${highContrast ? 'bg-black text-white' : 'bg-blue-600 text-white'}`}>
                <Eye className="w-5 h-5" />
             </div>
             <div>
                <div className={`text-sm font-semibold ${textMain}`}>Current Streak</div>
                <div className={`text-2xl font-bold ${highContrast ? 'text-black' : 'text-blue-700'}`}>3 Days</div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {COURSES.map(course => {
            const courseLessonIds = course.lessons.map(l => l.id);
            const completedCount = courseLessonIds.filter(id => completedLessons.includes(id)).length;
            const percent = Math.round((completedCount / course.totalLessons) * 100);

            return (
              <div key={course.id} className={`rounded-2xl overflow-hidden ${cardBg}`}>
                <div className="p-8 border-b border-slate-100">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className={`text-2xl font-bold ${textMain}`}>{course.title}</h3>
                        <p className={`${textMuted} mt-1`}>{completedCount} of {course.totalLessons} lessons completed</p>
                    </div>
                    {percent === 100 && <Award className="w-8 h-8 text-amber-500" />}
                  </div>
                  <ProgressBar progress={percent} highContrast={highContrast} />
                </div>
                
                <div className="bg-slate-50/50">
                  {course.lessons.map((lesson, idx) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    const isLocked = idx > 0 && !completedLessons.includes(course.lessons[idx-1].id);
                    
                    return (
                      <div key={lesson.id} className={`p-5 flex items-center justify-between border-b last:border-0 ${borderMain} ${isLocked ? 'opacity-50' : 'hover:bg-white transition-colors'}`}>
                        <div className="flex items-center gap-4">
                          {isCompleted ? (
                            <CheckCircle className={`w-6 h-6 ${highContrast ? 'text-black' : 'text-green-500'} flex-shrink-0`} />
                          ) : (
                            <div className={`w-6 h-6 rounded-full border-2 ${highContrast ? 'border-black' : 'border-slate-300'} flex items-center justify-center text-xs font-bold`}>
                                {idx + 1}
                            </div>
                          )}
                          <span className={`text-lg ${isCompleted ? 'text-slate-500 line-through decoration-2' : `font-medium ${textMain}`}`}>
                            {lesson.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-mono text-slate-500 hidden sm:block">{lesson.duration}</span>
                          <Button 
                            variant="ghost" 
                            disabled={isLocked}
                            onClick={() => !isLocked && navigateTo('classroom', course, lesson)}
                            className="text-sm"
                          >
                            {isCompleted ? 'Review' : isLocked ? 'Locked' : 'Start'}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-6">
          <div className={`p-8 rounded-2xl ${highContrast ? 'bg-black text-white' : 'bg-slate-900 text-white'} shadow-2xl`}>
            <h3 className="font-bold text-xl mb-4">Need a hand?</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              We have a team of real people (not robots) ready to help you with any tech issues or business questions.
            </p>
            <Button className={`w-full ${highContrast ? 'bg-white text-black' : 'bg-blue-600 hover:bg-blue-500 border-none'}`}>
               Message Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const ClassroomView = () => {
    if (!activeCourse || !activeLesson) return null;

    const isCompleted = completedLessons.includes(activeLesson.id);
    const currentIndex = activeCourse.lessons.findIndex(l => l.id === activeLesson.id);
    const nextLesson = activeCourse.lessons[currentIndex + 1];

    return (
      <div className={`flex flex-col lg:flex-row h-[calc(100vh-80px)] ${bgMain}`}>
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 md:p-12">
            <button 
              onClick={() => navigateTo('dashboard')}
              className={`flex items-center gap-2 ${textMuted} hover:${textMain} mb-8 font-medium transition-colors`}
            >
              <ChevronRight className="w-4 h-4 rotate-180" /> Back to Course Overview
            </button>

            <h1 className={`text-3xl md:text-4xl font-extrabold ${textMain} mb-8 leading-tight`}>{activeLesson.title}</h1>
            
            {/* The Stage */}
            <div className={`aspect-video rounded-xl flex items-center justify-center mb-10 overflow-hidden relative group ${highContrast ? 'border-4 border-black bg-slate-200' : 'shadow-2xl bg-slate-900'}`}>
               <div className="absolute inset-0 bg-slate-800 flex flex-col items-center justify-center text-white z-10">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm mb-4 cursor-pointer hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                  <p className="font-medium tracking-wide">Watch High-Definition Video</p>
                  <p className="text-sm text-slate-400 mt-2 font-mono">({activeLesson.duration}) • 1080p</p>
               </div>
            </div>

            {/* Content Tabs */}
            <div className={`flex gap-8 border-b ${borderMain} mb-8`}>
                {['content', 'resources', 'discussion'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-lg font-medium capitalize transition-colors border-b-2 ${activeTab === tab ? (highContrast ? 'border-black text-black' : 'border-blue-600 text-blue-700') : 'border-transparent text-slate-500'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Dynamic Content Pane */}
            <div className="min-h-[200px]">
                {activeTab === 'content' && (
                    <div className={`prose prose-lg max-w-none ${highContrast ? 'prose-black' : 'prose-slate'}`}>
                        <p className="lead">In this comprehensive lesson, we break down the mechanics of {activeLesson.title.toLowerCase()}.</p>
                        <h3>Lesson Transcript</h3>
                        <p>Welcome back. Today we're focusing on execution. Many new business owners get stuck in the planning phase...</p>
                        <div className={`p-6 rounded-lg my-8 ${highContrast ? 'border-l-4 border-black bg-slate-100' : 'bg-blue-50 border-l-4 border-blue-600'}`}>
                            <h4 className={`font-bold mt-0 ${highContrast ? 'text-black' : 'text-blue-900'}`}>Gold Tip: The 24-Hour Rule</h4>
                            <p className="mb-0">When you have a new idea for a product, try to validate it within 24 hours by asking 3 potential customers.</p>
                        </div>
                    </div>
                )}
                {activeTab === 'resources' && (
                    <div className="space-y-4">
                        <div className={`p-4 rounded-xl flex items-center justify-between ${cardBg}`}>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-100 rounded-lg"><Download className="w-6 h-6 text-slate-700" /></div>
                                <div>
                                    <h4 className={`font-bold ${textMain}`}>Lesson Worksheet.pdf</h4>
                                    <p className="text-sm text-slate-500">2.4 MB • Printable PDF</p>
                                </div>
                            </div>
                            <Button variant="outline" className="text-sm">Download</Button>
                        </div>
                    </div>
                )}
                 {activeTab === 'discussion' && (
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0" />
                            <div className="flex-1">
                                <textarea 
                                    placeholder="Ask a question or share your thoughts..." 
                                    className={`w-full p-4 rounded-xl border ${borderMain} focus:ring-2 focus:ring-blue-500 outline-none`}
                                    rows={3}
                                ></textarea>
                                <div className="flex justify-end mt-2">
                                    <Button className="text-sm">Post Comment</Button>
                                </div>
                            </div>
                        </div>
                        <div className="pt-6 border-t border-slate-100">
                             <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700">S</div>
                                <div>
                                    <div className={`font-bold ${textMain}`}>Sarah J.</div>
                                    <p className={`${textMuted} mt-1`}>Has anyone tried the pricing model mentioned at 5:30? It seems aggressive.</p>
                                </div>
                             </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Action Bar */}
            <div className={`mt-16 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 ${highContrast ? 'bg-slate-100 border-2 border-black' : 'bg-slate-50 border border-slate-200'}`}>
              <div className="flex items-center gap-3">
                 <div className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                 <span className={`font-medium ${textMuted}`}>{isCompleted ? 'Lesson Completed' : 'Status: In Progress'}</span>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                  <Button 
                    variant={isCompleted ? "outline" : "primary"}
                    onClick={() => toggleLessonComplete(activeLesson.id)}
                    icon={isCompleted ? CheckCircle : undefined}
                    className="flex-1 sm:flex-none"
                    isLoading={isSimulatingLoad}
                  >
                    {isCompleted ? 'Mark Incomplete' : 'Complete Lesson'}
                  </Button>
                  {nextLesson && (
                    <Button 
                        variant="ghost" 
                        onClick={() => navigateTo('classroom', activeCourse, nextLesson)}
                        className="flex-1 sm:flex-none"
                        disabled={!isCompleted} // Enforce linear progression
                    >
                        Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className={`lg:w-96 border-l ${borderMain} overflow-y-auto hidden lg:flex flex-col bg-white`}>
          <div className={`p-6 border-b ${borderMain} ${highContrast ? 'bg-white' : 'bg-slate-50'}`}>
            <h2 className={`font-bold ${textMain}`}>{activeCourse.title}</h2>
            <div className="text-sm text-slate-500 mt-2 flex items-center gap-2">
               <Briefcase className="w-4 h-4" /> Professional Certification Track
            </div>
          </div>
          <div className="flex-1 p-2 space-y-1">
            {activeCourse.lessons.map((lesson, idx) => {
              const isActive = lesson.id === activeLesson.id;
              const isDone = completedLessons.includes(lesson.id);
              
              return (
                <button
                  key={lesson.id}
                  onClick={() => navigateTo('classroom', activeCourse, lesson)}
                  className={`w-full text-left p-4 rounded-xl flex gap-4 transition-all ${isActive ? (highContrast ? 'bg-black text-white' : 'bg-blue-600 text-white shadow-md') : `hover:bg-slate-100 ${textMuted}`}`}
                >
                  <div className="mt-0.5">
                     {isDone ? (
                       <CheckCircle className={`w-5 h-5 ${isActive ? 'text-white' : 'text-green-600'}`} />
                     ) : (
                       <span className={`text-xs font-bold w-5 h-5 flex items-center justify-center rounded border ${isActive ? 'border-white/50' : 'border-slate-300'}`}>{idx+1}</span>
                     )}
                  </div>
                  <div>
                    <div className={`text-sm font-bold leading-snug`}>
                      {lesson.title}
                    </div>
                    <div className={`text-xs mt-1.5 flex items-center gap-2 ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                      {lesson.type === 'video' ? <Play className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                      {lesson.duration}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`font-sans antialiased min-h-screen ${bgMain} selection:bg-blue-200 selection:text-blue-900`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className={`p-2 rounded-xl transition-colors ${highContrast ? 'bg-black text-white' : 'bg-blue-600 text-white group-hover:bg-blue-700'}`}>
              <Briefcase className="w-6 h-6" />
            </div>
            <span className={`text-xl font-bold tracking-tight ${textMain}`}>
              Silver<span className={highContrast ? 'underline' : 'text-blue-600'}>Startup</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigateTo('home')} className={`text-sm font-bold ${view === 'home' ? (highContrast ? 'underline' : 'text-blue-700') : 'text-slate-500 hover:text-slate-900'}`}>
              Overview
            </button>
            <button onClick={() => navigateTo('dashboard')} className={`text-sm font-bold ${view === 'dashboard' ? (highContrast ? 'underline' : 'text-blue-700') : 'text-slate-500 hover:text-slate-900'}`}>
              My Portal
            </button>
            
            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            <button 
                onClick={() => setHighContrast(!highContrast)} 
                className={`p-2 rounded-full transition-colors ${highContrast ? 'bg-black text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                title="Toggle High Contrast Mode"
            >
                <Settings className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pl-2">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${highContrast ? 'border-2 border-black bg-white text-black' : 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700'}`}>
                 D
               </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 ${textMuted}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4 shadow-lg absolute w-full z-50">
            <button onClick={() => navigateTo('home')} className="block w-full text-left font-bold text-slate-700 py-3 border-b border-slate-50">Overview</button>
            <button onClick={() => navigateTo('dashboard')} className="block w-full text-left font-bold text-slate-700 py-3 border-b border-slate-50">My Portal</button>
            <button onClick={() => setHighContrast(!highContrast)} className="block w-full text-left font-bold text-slate-700 py-3">
                {highContrast ? 'Disable' : 'Enable'} High Contrast
            </button>
          </div>
        )}
      </nav>

      {/* Main Content Render */}
      <main className="animate-in fade-in duration-500">
        {isSimulatingLoad ? (
            <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
                <Loader2 className={`w-12 h-12 animate-spin ${highContrast ? 'text-black' : 'text-blue-600'}`} />
                <p className={`${textMuted} font-medium animate-pulse`}>Loading securely...</p>
            </div>
        ) : (
            <>
                {view === 'home' && <HomeView />}
                {view === 'dashboard' && <DashboardView />}
                {view === 'classroom' && <ClassroomView />}
            </>
        )}
      </main>
    </div>
  );
}
