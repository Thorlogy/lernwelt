import React, { useState } from 'react';
import { playPop } from '../utils/audio';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function PenGripGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border-2 border-indigo-200 rounded-3xl overflow-hidden shadow-soft-tactile max-w-sm mx-auto transition-all duration-300">
      {/* Header bar / Toggle button */}
      <button
        onClick={() => { playPop(); setIsOpen(!isOpen); }}
        className="w-full bg-gradient-to-r from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 px-5 py-3 flex items-center justify-between text-indigo-950 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">✏️</span>
          <span className="font-sans font-black text-xs sm:text-sm uppercase tracking-wider">
            Lumis Stift-Tipps (Dreipunktgriff)
          </span>
        </div>
        {isOpen ? <ChevronUp className="w-4.5 h-4.5 text-indigo-700" /> : <ChevronDown className="w-4.5 h-4.5 text-indigo-700" />}
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 text-center font-body">
          {/* Headline for kids */}
          <h4 className="text-sm sm:text-base font-extrabold text-indigo-950">
            So hältst du deinen Stift richtig! 🌟
          </h4>

          {/* Large, clear child-friendly SVG illustration */}
          <div className="flex justify-center bg-indigo-50/40 p-2 rounded-2xl border border-indigo-100/50">
            <svg className="w-64 h-48 overflow-visible" viewBox="0 0 120 90">
              {/* Pencil - drawn diagonally */}
              <g transform="rotate(-30 60 45)">
                <rect x="25" y="38" width="70" height="14" rx="2" fill="#fb923c" stroke="#ea580c" strokeWidth="1.5" />
                <path d="M 25 38 L 10 45 L 25 52 Z" fill="#fef3c7" stroke="#ea580c" strokeWidth="1.5" />
                <path d="M 15 42.5 L 10 45 L 15 47.5 Z" fill="#475569" />
                {/* Pencil stripes */}
                <line x1="25" y1="42" x2="95" y2="42" stroke="#ea580c" strokeWidth="0.8" />
                <line x1="25" y1="48" x2="95" y2="48" stroke="#ea580c" strokeWidth="0.8" />
              </g>

              {/* Hand Pinching - Simplified cartoon fingers */}
              {/* Middle finger supporting below */}
              <path d="M 50,53 Q 53,60 59,59 C 63,59 64,55 63,52" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.8" />
              
              {/* Thumb from the bottom-left */}
              <path d="M 28,60 C 36,57 44,48 48,47 C 50,47 51,49 50,51 C 47,56 38,67 28,68 Z" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.8" />
              
              {/* Index finger pinching from top-right */}
              <path d="M 64,28 C 55,28 51,32 49,38 Q 47,42 50,44 C 53,46 55,42 59,37 Q 62,33 67,33" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.8" strokeLinecap="round" />

              {/* Large, colorful child-friendly labels directly on SVG */}
              {/* Zeigefinger */}
              <text x="68" y="24" fontSize="6.5" fontWeight="bold" fill="#4f46e5" fontFamily="sans-serif">1. Zeigefinger (oben)</text>
              <line x1="68" y1="26" x2="52" y2="35" stroke="#4f46e5" strokeWidth="0.8" strokeDasharray="1.5 1.5" />

              {/* Daumen */}
              <text x="8" y="74" fontSize="6.5" fontWeight="bold" fill="#0369a1" fontFamily="sans-serif">2. Daumen (zur Seite)</text>
              <line x1="26" y1="68" x2="42" y2="52" stroke="#0369a1" strokeWidth="0.8" strokeDasharray="1.5 1.5" />

              {/* Mittelfinger */}
              <text x="66" y="68" fontSize="6.5" fontWeight="bold" fill="#b45309" fontFamily="sans-serif">3. Mittelfinger (drunter)</text>
              <line x1="72" y1="62" x2="55" y2="56" stroke="#b45309" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
            </svg>
          </div>

          {/* Simple key message for kids */}
          <div className="bg-indigo-50/50 p-3 rounded-2xl border border-indigo-100 text-xs sm:text-sm font-extrabold text-indigo-900 leading-snug">
            🧸 <span className="text-[#00639a]">Locker halten:</span> Drücke den Stift ganz sanft. Deine Hand soll ganz entspannt sein!
          </div>
        </div>
      )}
    </div>
  );
}
