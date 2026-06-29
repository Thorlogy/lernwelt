import React from 'react';
import { STATIONEN } from '../data';
import { Station, UserProgress } from '../types';
import { BookOpen, Music, Layers, Search, Lock, CheckCircle, Star, Sparkles, HelpCircle, Award } from 'lucide-react';
import { playPop } from '../utils/audio';

interface LessonMapProps {
  progress: UserProgress;
  onSelectStation: (stationId: number) => void;
  activeStationId: number | null;
}

const ICON_MAP: Record<string, any> = {
  Keyboard: BookOpen,
  Music: Music,
  FolderGit: Layers,
  Search: Search,
  Award: Award,
};

export default function LessonMap({ progress, onSelectStation, activeStationId }: LessonMapProps) {
  
  const handleStationClick = (station: Station, isLocked: boolean) => {
    playPop();
    if (isLocked) {
      // Allow overriding or playing anyway to ensure smooth tester experience, but with a warning or visual unlock
      onSelectStation(station.id);
    } else {
      onSelectStation(station.id);
    }
  };

  return (
    <div className="relative py-10 px-4 max-w-lg mx-auto bg-gradient-to-b from-[#f2f6fa] to-[#e4eaf0] rounded-3xl border-4 border-white shadow-high-tactile overflow-hidden">
      {/* Background Graphic Landmarks */}
      <div className="absolute top-4 left-6 text-4xl opacity-25 select-none animate-wiggle-soft">☁️</div>
      <div className="absolute top-24 right-8 text-3xl opacity-20 select-none animate-wiggle-soft" style={{ animationDelay: '1s' }}>☁️</div>
      <div className="absolute bottom-20 left-10 text-4xl opacity-20 select-none animate-wiggle-soft" style={{ animationDelay: '2s' }}>🌲</div>
      <div className="absolute bottom-6 right-16 text-3xl opacity-25 select-none animate-wiggle-soft" style={{ animationDelay: '1.5s' }}>🌳</div>
      <div className="absolute top-1/2 left-4 text-2xl opacity-15 select-none text-brand-secondary">🌈</div>

      {/* Map Header */}
      <div className="text-center mb-8 relative z-10">
        <span className="inline-block bg-[#fdd758] text-[#725c00] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-yellow-400">
          Dein Abenteuer-Pfad
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00639a] leading-tight font-sans">
          Lern-Landkarte
        </h2>
        <p className="text-xs text-slate-500 font-body mt-1">
          Klicke auf eine Station, um dein Lernspiel zu starten!
        </p>
      </div>

      {/* SVG S-Curve Connection Path Line running behind the stations */}
      <div className="absolute inset-x-0 top-[110px] bottom-[80px] pointer-events-none z-0">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M 50 5 Q 75 15, 75 30 T 25 60 T 75 90 L 50 100"
            fill="none"
            stroke="#a5c4d9"
            strokeWidth="4"
            strokeDasharray="6 6"
            className="stroke-cyan-300"
          />
        </svg>
      </div>

      {/* Stations Stack */}
      <div className="flex flex-col gap-10 relative z-10">
        {STATIONEN.map((station, index) => {
          const isCompleted = progress.completedStations.includes(station.id);
          // Unlock condition: first station is always unlocked, others if previous is completed.
          // Note: for convenience we allow playing anything, but visually lock it.
          const isLocked = index > 0 && !progress.completedStations.includes(STATIONEN[index - 1].id);
          const isActive = activeStationId === station.id;

          const StationIcon = ICON_MAP[station.icon] || HelpCircle;

          // Alignment layout for S-curve: index 0 center/left, 1 center/right, 2 center/left, 3 center/right
          const alignClass = 
            index % 2 === 0
              ? 'self-start ml-2 sm:ml-6'
              : 'self-end mr-2 sm:mr-6';

          const getCardColorTheme = () => {
            if (isCompleted) {
              return 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-emerald-500/10';
            }
            if (isActive) {
              return 'bg-sky-50 border-sky-400 ring-4 ring-sky-200 text-sky-900 animate-wiggle-double';
            }
            if (isLocked) {
              return 'bg-slate-100 border-slate-300 text-slate-500 opacity-80';
            }
            return 'bg-white border-blue-200 text-slate-800 hover:border-blue-400';
          };

          return (
            <div 
              key={station.id} 
              className={`w-[85%] sm:w-[80%] ${alignClass} transition-transform duration-200`}
            >
              <button
                onClick={() => handleStationClick(station, isLocked)}
                className={`w-full text-left p-4 rounded-2xl border-2 shadow-soft-tactile transition-all duration-200 cursor-pointer ${getCardColorTheme()} relative overflow-hidden`}
                style={{ transform: isActive ? 'scale(1.02)' : 'none' }}
              >
                {/* Visual tactile bottom border offset if not completed nor locked */}
                {!isLocked && !isCompleted && !isActive && (
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-200"></div>
                )}

                {/* Left/Right Icon container */}
                <div className="flex items-start gap-3.5">
                  <div className={`p-3 rounded-xl flex-shrink-0 ${
                    isCompleted 
                      ? 'bg-emerald-500 text-white' 
                      : isActive 
                        ? 'bg-sky-500 text-white animate-pulse'
                        : isLocked 
                          ? 'bg-slate-300 text-slate-500'
                          : 'bg-[#00639a] text-white'
                  }`}>
                    {isLocked ? <Lock className="w-5 h-5" /> : <StationIcon className="w-5 h-5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${
                        isCompleted 
                          ? 'text-emerald-600' 
                          : isLocked 
                            ? 'text-slate-400' 
                            : 'text-[#00639a]'
                      }`}>
                        Klasse {station.grade}
                      </span>
                      {isCompleted && (
                        <span className="flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-3.5 h-3.5" /> Fertig!
                        </span>
                      )}
                      {isLocked && (
                        <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-200 px-1.5 py-0.5 rounded-sm">
                          Sperre
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold truncate leading-tight font-sans mt-0.5">
                      {station.title.split(': ')[1] || station.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1 font-body mt-0.5">
                      {station.subtitle}
                    </p>
                  </div>
                </div>

                {/* Tiny Star collection summary on station if done */}
                {isCompleted && (
                  <div className="absolute right-2 bottom-2 flex gap-0.5 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </div>
                )}
                
                {/* Pulse circle indicators for active Station */}
                {isActive && (
                  <div className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Decorative Finish Banner */}
      <div className="mt-12 text-center p-4 bg-yellow-50 rounded-2xl border-2 border-dashed border-yellow-300">
        <span className="text-3xl">🏆</span>
        <h4 className="text-sm font-bold text-yellow-800 font-sans mt-1">Lernkönig Urkunde</h4>
        <p className="text-xs text-slate-500 font-body">Schließe alle 6 Stationen ab, um deine goldene Urkunde freizuschalten!</p>
      </div>
    </div>
  );
}
