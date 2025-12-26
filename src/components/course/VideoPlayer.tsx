import { Maximize, Play, Settings, Volume2 } from 'lucide-react';

export default function VideoPlayer({ title }: { title: string }) {
  return (
    <div className="relative aspect-video bg-slate-900 rounded-4xl overflow-hidden group shadow-2xl">
      {/* Placeholder Image/Background */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-slate-900 flex items-center justify-center">
        <div className="text-center animate-in">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform cursor-pointer">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </div>
          <p className="text-white/70 text-sm font-medium tracking-widest uppercase">Video Placeholder</p>
        </div>
      </div>

      {/* Video UI Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex flex-col gap-4">
          <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-primary-light" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Play className="w-5 h-5 text-white fill-white cursor-pointer" />
              <Volume2 className="w-5 h-5 text-white cursor-pointer" />
              <span className="text-white text-xs font-bold font-mono tracking-tighter">12:45 / 35:00</span>
            </div>

            <div className="flex items-center gap-6">
              <Settings className="w-5 h-5 text-white cursor-pointer" />
              <Maximize className="w-5 h-5 text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
