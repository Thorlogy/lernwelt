import React, { useState } from 'react';
import { playPop } from '../utils/audio';
import { BookOpen, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

export default function PenGripGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border-2 border-indigo-200 rounded-3xl overflow-hidden shadow-soft-tactile max-w-md mx-auto transition-all duration-300">
      {/* Header bar / Toggle button */}
      <button
        onClick={() => { playPop(); setIsOpen(!isOpen); }}
        className="w-full bg-gradient-to-r from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 px-5 py-3.5 flex items-center justify-between text-indigo-950 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">✏️</span>
          <span className="font-sans font-black text-sm uppercase tracking-wider">
            Lumis Schreib- & Stift-Tipps
          </span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-700" /> : <ChevronDown className="w-4 h-4 text-indigo-700" />}
      </button>

      {isOpen && (
        <div className="p-5 space-y-5 animate-wiggle-soft font-body text-xs sm:text-sm text-indigo-950">
          
          {/* Visual SVG illustration of the Dreipunktgriff */}
          <div className="flex items-center gap-4 bg-indigo-50/50 p-3 rounded-2xl border border-indigo-100">
            <svg className="w-24 h-24 shrink-0 overflow-visible" viewBox="0 0 100 100">
              {/* Pencil */}
              <g transform="rotate(-30 50 50)">
                <rect x="45" y="10" width="10" height="70" rx="1.5" className="fill-orange-400 stroke-orange-600 stroke-2" />
                <path d="M 45 80 L 50 95 L 55 80 Z" className="fill-amber-100 stroke-orange-600 stroke-2" />
                <path d="M 48 90 L 50 95 L 52 90 Z" className="fill-slate-800" />
                {/* Stripes on pencil */}
                <line x1="48" y1="20" x2="48" y2="75" stroke="#ea580c" strokeWidth="1" />
                <line x1="52" y1="20" x2="52" y2="75" stroke="#ea580c" strokeWidth="1" />
              </g>

              {/* Hand representation nodes (Thumb, Index, Middle) */}
              {/* Index Finger (top-right pinch) */}
              <path d="M 68 35 Q 52 35 48 45" stroke="#6366f1" strokeWidth="7" strokeLinecap="round" fill="none" className="opacity-90" />
              {/* Thumb (left pinch) */}
              <path d="M 28 55 Q 40 50 44 48" stroke="#4f46e5" strokeWidth="8" strokeLinecap="round" fill="none" />
              {/* Middle Finger (supporting below) */}
              <path d="M 52 56 Q 52 64 56 64" stroke="#818cf8" strokeWidth="6" strokeLinecap="round" fill="none" className="opacity-80" />

              {/* Pointers / Descriptions */}
              {/* Zeigefinger label pointer */}
              <circle cx="51" cy="38" r="2.5" className="fill-indigo-600" />
              {/* Daumen pointer */}
              <circle cx="38" cy="51" r="2.5" className="fill-indigo-800" />
              {/* Mittelfinger pointer */}
              <circle cx="52" cy="60" r="2.5" className="fill-indigo-400" />
            </svg>

            <div className="space-y-1 text-[11px] leading-tight">
              <p className="font-extrabold text-indigo-900 text-xs">Der Dreipunktgriff ✏️</p>
              <p>• <strong className="text-indigo-800">Daumen & Zeigefinger</strong> bilden eine Zange und halten den Stift.</p>
              <p>• Der <strong className="text-indigo-700">Mittelfinger</strong> dient als bequemes Kissen darunter.</p>
              <p>• Die restlichen Finger liegen locker auf dem Tisch auf.</p>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            <h4 className="font-sans font-black text-[10px] uppercase tracking-widest text-indigo-800">
              Checkliste für entspanntes Schreiben:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span><strong>Locker bleiben:</strong> Drücke den Stift nicht zu fest, sonst wird deine Hand müde!</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span><strong>Sitzhaltung:</strong> Setze dich aufrecht hin, beide Füße berühren den Boden.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span><strong>Blatt eindrehen:</strong> Lege dein Heft oder Papier leicht schräg (Rechtshänder leicht nach links gedreht, Linkshänder leicht nach rechts).</span>
              </li>
            </ul>
          </div>

          <div className="text-[10px] text-slate-400 text-center italic border-t pt-2.5">
            Tipp: Zeige diesen Griff einmal deinen Eltern oder Lehrern!
          </div>
        </div>
      )}
    </div>
  );
}
