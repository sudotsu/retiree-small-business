import { ArrowRight, CheckCircle2, Rocket, Shield, Target, Users } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-gold/20 scroll-smooth">
      {/* Premium Navigation */}
      <nav className="glass fixed top-0 w-full z-50 px-6 h-20 flex items-center justify-between border-b border-silver-200">
        <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl shadow-lg ring-1 ring-white/20">
              <Rocket className="w-5 h-5 text-gold-light" />
            </div>
            <h1 className="text-xl font-black tracking-tighter text-primary uppercase">
              Silver<span className="text-gold">Startup</span>
            </h1>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="hidden md:block text-sm font-bold text-primary hover:text-gold transition-colors uppercase tracking-widest">
              Success Stories
            </Link>
            <Link
              href="/dashboard"
              className="bg-primary text-white px-6 py-2.5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-gold transition-all shadow-xl shadow-primary/10"
            >
              Access Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Modern Hero Section */}
        <section className="relative pt-40 pb-20 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-gold/5 opacity-20 pointer-events-none" />
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold text-xs font-black uppercase tracking-widest mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                </span>
                Now Enrolling for Q1 2026
              </div>
              <h2 className="text-6xl md:text-7xl font-black text-primary leading-[1.05] tracking-tight mb-8">
                Your Experience is Your <span className="text-gold italic">Unfair Advantage.</span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-xl font-medium">
                The business blueprint designed exclusively for retirees. Turn decades of expertise into a high-profit, low-risk service business in 30 days.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  href="/dashboard"
                  className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-gold hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/20 group"
                >
                  Start Your Blueprint
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex flex-col justify-center">
                  <div className="flex -space-x-3 mb-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-silver-200 flex items-center justify-center text-[10px] font-black">
                        James
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-4 border-white bg-gold flex items-center justify-center text-white text-[10px] font-black">
                      +12k
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-400">Trusted by retirees globally</p>
                </div>
              </div>
            </div>

            <div className="relative lg:h-150 bg-silver-100 rounded-[3rem] border border-silver-200 shadow-2xl flex items-center justify-center overflow-hidden">
               <div className="p-12 text-center">
                  <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 transform rotate-6 animate-pulse">
                    <Rocket className="w-12 h-12 text-gold" />
                  </div>
                  <h3 className="text-3xl font-black text-primary mb-4">Risk Logic Inside</h3>
                  <p className="text-slate-500 font-bold max-w-sm mx-auto">
                    The only system that prioritizes nest egg protection over rapid growth.
                  </p>
               </div>
               {/* Visual Accent */}
               <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gold opacity-10 rounded-full blur-3xl" />
            </div>
          </div>
        </section>

        {/* The Pillars */}
        <section className="py-24 px-6 bg-silver-50">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-20">
                <h3 className="text-sm font-black text-gold uppercase tracking-[0.3em] mb-4">The Methodology</h3>
                <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight">Built on the Three Pillars.</h2>
             </div>

             <div className="grid md:grid-cols-3 gap-10">
                <div className="bg-white p-12 rounded-[2.5rem] border border-silver-200 shadow-sm hover:shadow-2xl transition-all duration-500">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-primary/10">
                    <Shield className="w-8 h-8 text-gold-light" />
                  </div>
                  <h4 className="text-2xl font-black text-primary mb-4 leading-tight uppercase tracking-tighter">Nest Egg Protection</h4>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Zero-cost validation framework. We ensure your market says &quot;yes&quot; before you spend a single dollar.
                  </p>
                </div>

                <div className="bg-white p-12 rounded-[2.5rem] border border-silver-200 shadow-sm hover:shadow-2xl transition-all duration-500 transform lg:-translate-y-8">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-primary/10">
                    <Target className="w-8 h-8 text-gold-light" />
                  </div>
                  <h4 className="text-2xl font-black text-primary mb-4 leading-tight uppercase tracking-tighter">Asset Recognition</h4>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Inventorying 40 years of skills to find the one &quot;fit&quot; that creates high-margin low-stress income.
                  </p>
                </div>

                <div className="bg-white p-12 rounded-[2.5rem] border border-silver-200 shadow-sm hover:shadow-2xl transition-all duration-500">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-primary/10">
                    <Users className="w-8 h-8 text-gold-light" />
                  </div>
                  <h4 className="text-2xl font-black text-primary mb-4 leading-tight uppercase tracking-tighter">Senior-Optimized Tech</h4>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    No complex funnels or coding. We use proven, reliable tools that respect your time and patience.
                  </p>
                </div>
             </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-linear-to-tr from-gold/20 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase">Ready for your Second Act?</h2>
              <div className="flex flex-wrap justify-center gap-10 mb-12">
                 {['Bank Ready', 'No Tech Debt', 'Low Stress'].map((item) => (
                   <div key={item} className="flex items-center gap-2 text-white/80 font-bold uppercase tracking-widest text-xs">
                     <CheckCircle2 className="w-4 h-4 text-gold" />
                     {item}
                   </div>
                 ))}
              </div>
              <Link
                href="/dashboard"
                className="inline-flex bg-white text-primary px-12 py-6 rounded-2xl font-black text-xl uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-2xl active:scale-95"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-silver-100 py-16 px-6 border-t border-silver-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Rocket className="w-5 h-5 text-gold" />
            <span className="text-lg font-black text-primary uppercase tracking-tighter">SilverStartup</span>
          </div>
          <p className="text-slate-500 font-bold text-sm">© 2026 Silver Startup Blueprint. Education for the Experienced.</p>
          <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-primary/60">
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-gold transition-colors">Academy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}