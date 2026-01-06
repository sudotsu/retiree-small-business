"use client";

import { useAccessibility } from '@/context/AccessibilityContext';
import { Eye, EyeOff, LayoutPanelLeft, LayoutPanelTop, Settings2 } from 'lucide-react';
import { useState } from 'react';

export default function AccessibilityToolbar() {
  const { isVisionMode, toggleVisionMode, isSimpleMode, toggleSimpleMode } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-100 flex flex-col items-end gap-4">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="bg-white rounded-4xl shadow-2xl border-2 border-primary/10 p-4 mb-2 animate-in slide-in-from-bottom-4 duration-300 min-w-64">
          <div className="mb-4 pb-4 border-b border-silver-200">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 px-2">Reading Assistance</h4>
             <button
               onClick={toggleVisionMode}
               className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                 isVisionMode ? 'bg-primary text-white shadow-xl' : 'bg-silver-100 text-primary hover:bg-gold hover:text-white'
               }`}
             >
               <div className="flex items-center gap-3">
                 {isVisionMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                 <span className="font-bold text-sm">Vision Mode (High Contrast)</span>
               </div>
               <div className={`w-10 h-6 rounded-full relative transition-colors ${isVisionMode ? 'bg-gold' : 'bg-slate-300'}`}>
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isVisionMode ? 'translate-x-4' : ''}`} />
               </div>
             </button>
          </div>

          <div>
             <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 px-2">Layout Preference</h4>
             <button
               onClick={toggleSimpleMode}
               className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                 isSimpleMode ? 'bg-primary text-white shadow-xl' : 'bg-silver-100 text-primary hover:bg-gold hover:text-white'
               }`}
             >
               <div className="flex items-center gap-3">
                 {isSimpleMode ? <LayoutPanelTop className="w-5 h-5" /> : <LayoutPanelLeft className="w-5 h-5" />}
                 <span className="font-bold text-sm">Focused View (Less Busy)</span>
               </div>
               <div className={`w-10 h-6 rounded-full relative transition-colors ${isSimpleMode ? 'bg-gold' : 'bg-slate-300'}`}>
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isSimpleMode ? 'translate-x-4' : ''}`} />
               </div>
             </button>
          </div>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative border-4 border-gold/20"
        aria-label="Accessibility Settings"
      >
        <Settings2 className={`w-8 h-8 transition-transform duration-500 ${isOpen ? 'rotate-90 text-gold' : ''}`} />
        {!isOpen && (
           <span className="absolute -top-2 -left-2 bg-gold text-white text-[8px] font-black px-2 py-1 rounded-full animate-bounce shadow-lg ring-2 ring-white uppercase">
             Settings
           </span>
        )}
      </button>
    </div>
  );
}
