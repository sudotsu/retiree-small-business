import {
    BarChart3,
    BookOpen,
    CheckCircle2,
    ChevronRight,
    Lock,
    PlayCircle,
    Trophy
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'locked';
  lessons: number;
}

const modules: Module[] = [
  { id: '0', title: 'Orientation: The Blueprint Mindset', status: 'completed', lessons: 3 },
  { id: '1', title: 'Week 1: Your Bank-Ready Business Plan', status: 'current', lessons: 5 },
  { id: '2', title: 'Week 2: Low-Risk Validation', status: 'locked', lessons: 4 },
  { id: '3', title: 'Week 3: The Offer Engine', status: 'locked', lessons: 6 },
  { id: '4', title: 'Week 4: Sales Without Sleaze', status: 'locked', lessons: 5 },
];

interface SidebarProps {
  hideOnSimple?: boolean;
}

export default function Sidebar({ hideOnSimple = false }: SidebarProps) {
  if (hideOnSimple) return null;
  return (
    <aside className="w-80 h-[calc(100vh-64px)] overflow-y-auto bg-white border-r border-silver-200 sticky top-16 p-6 hidden lg:block">
      <div className="mb-8">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
          Training Progress
        </h3>
        <div className="bg-silver-100 rounded-2xl p-4 border border-silver-200">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-primary">20% Complete</span>
            <Trophy className="w-4 h-4 text-gold" />
          </div>
          <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-silver-200/50">
            <div className="bg-gold h-full w-1/5 shadow-[0_0_8px_rgba(180,83,9,0.3)] transition-all duration-1000" />
          </div>
        </div>
      </div>

      <nav className="space-y-1">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
          Course Modules
        </h3>
        {modules.map((mod, idx) => (
          <div
            key={mod.id}
            className={`group relative p-4 rounded-xl transition-all duration-300 cursor-pointer border ${
              mod.status === 'current'
                ? 'bg-primary text-white border-primary shadow-lg scale-[1.02]'
                : 'hover:bg-silver-100 border-transparent text-primary'
            } ${mod.status === 'locked' ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {mod.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-gold" />}
                {mod.status === 'current' && <PlayCircle className="w-5 h-5 text-gold-light" />}
                {mod.status === 'locked' && <Lock className="w-5 h-5 opacity-40" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1.5">
                   <span className={`text-xs font-black uppercase tracking-wider ${mod.status === 'current' ? 'text-gold-light' : 'text-slate-500'}`}>
                    WEEK {idx}
                   </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${mod.status === 'current' ? 'rotate-90 text-gold-light' : 'text-slate-400 group-hover:translate-x-1'}`} />
                </div>
                <h4 className="font-black text-base leading-tight group-hover:text-gold transition-colors flex items-center gap-2">
                  {mod.title}
                  {idx === 1 && (
                    <span className="text-[10px] px-2 py-0.5 bg-gold text-white rounded-md font-black tracking-widest leading-none">FREE</span>
                  )}
                </h4>
                <div className={`mt-3 flex items-center gap-2 font-bold ${mod.status === 'current' ? 'text-white/80' : 'text-slate-400'}`}>
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wide">{mod.lessons} Lessons</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-12 pt-8 border-t border-silver-200">
        <button className="w-full bg-silver-100 hover:bg-silver-200 text-primary p-4 rounded-xl flex items-center justify-center gap-3 transition-colors group">
          <BarChart3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Growth Metrics</span>
        </button>
      </div>
    </aside>
  );
}
