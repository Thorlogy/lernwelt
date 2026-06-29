import React, { useState } from 'react';
import { UserProgress } from '../types';
import { Star, Award, Sparkles, Printer, RotateCcw, Heart, Share2 } from 'lucide-react';
import { playPop, playTrophy } from '../utils/audio';

interface CertificateProps {
 progress: UserProgress;
 onResetProgress: () => void;
 onClose: () => void;
}

type FrameStyle = 'gold' | 'rainbow' | 'forest' | 'cosmic';

export default function Certificate({ progress, onResetProgress, onClose }: CertificateProps) {
 const [frame, setFrame] = useState<FrameStyle>('gold');
 const [showConfetti, setShowConfetti] = useState(false);

 const getFrameClasses = () => {
 switch (frame) {
 case 'rainbow':
 return 'border-[16px] border-sky-300 bg-gradient-to-b from-sky-50 via-white to-pink-50 shadow-pink-200/50';
 case 'forest':
 return 'border-[16px] border-emerald-400 bg-gradient-to-b from-emerald-50 via-white to-amber-50 shadow-emerald-200/50';
 case 'cosmic':
 return 'border-[16px] border-purple-400 bg-gradient-to-b from-purple-50 via-white to-indigo-50 shadow-purple-200/50';
 case 'gold':
 default:
 return 'border-[16px] border-yellow-400 bg-gradient-to-b from-amber-50 via-white to-yellow-50 shadow-yellow-200/50';
 }
 };

 const getFrameHeaderEmoji = () => {
 switch (frame) {
 case 'rainbow': return '🌈🦄✨';
 case 'forest': return '🌲🦉🦊';
 case 'cosmic': return '🚀⭐️🪐';
 case 'gold':
 default: return '👑🏆👑';
 }
 };

 const handlePrint = () => {
 playPop();
 window.print();
 };

 const handleCelebrate = () => {
 playTrophy();
 setShowConfetti(true);
 setTimeout(() => setShowConfetti(false), 3000);
 };

 return (
 <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-slate-50 rounded-3xl border border-slate-200 shadow-xl relative">
 
 {/* Printable Area */}
 <div id="urkunde-print-area" className={`p-6 sm:p-10 rounded-2xl border-double text-center relative shadow-high-tactile transition-all duration-300 ${getFrameClasses()}`}>
 
 {/* Floating Sparkly items */}
 <div className="absolute top-4 left-4 text-3xl animate-bounce">✨</div>
 <div className="absolute top-4 right-4 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>⭐</div>
 <div className="absolute bottom-4 left-4 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🎨</div>
 <div className="absolute bottom-4 right-4 text-3xl animate-bounce" style={{ animationDelay: '0.8s' }}>🎈</div>

 <div className="mb-4">
 <span className="text-3.5xl sm:text-5xl filter drop-shadow select-none block leading-none">
 {getFrameHeaderEmoji()}
 </span>
 </div>

 <span className="font-sans font-black text-base sm:text-lg text-[#00639a] bg-blue-100/60 px-4 py-1 rounded-full border border-blue-200 inline-block mb-3">
 Offizielle Auszeichnung
 </span>

 <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-slate-800 leading-none">
 LERNKÖNIG URKUNDE
 </h1>

 <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto my-4 sm:my-5"></div>

 <p className="text-lg sm:text-base font-semibold text-slate-500 font-body block mb-2">
 Mit Stolz und Freude wird verliehen an:
 </p>

 {/* Child Personalization Name Box */}
 <div className="bg-white/80 border-2 border-slate-200 inline-block px-8 py-3.5 rounded-2xl shadow-inner mb-5">
 <h2 className="text-2xl sm:text-3xl font-black text-amber-900 font-sans">
 {progress.childName || "Mucki der schlaue Lerner"}
 </h2>
 </div>

 <p className="text-base sm:text-lg font-bold text-slate-700 leading-relaxed font-body max-w-md mx-auto mb-6">
 für den herausragenden Erfolg in der <strong className="text-[#00639a]">Lernwelt</strong>.<br />
 Du hast alle kniffligen Aufgaben der Klassenstufen 1 bis 4 mit Bravour und viel Fleiß gemeistert!
 </p>

 {/* Scores & Trophy Grid */}
 <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
 <div className="bg-white p-3 rounded-xl border border-dashed border-slate-300 text-center">
 <span className="text-lg font-bold text-slate-400 block font-sans">Sterne gesammelt</span>
 <span className="text-2xl sm:text-3xl font-black text-amber-500 flex items-center justify-center gap-1.5 mt-0.5">
 <Star className="w-6 h-6 fill-amber-400 text-amber-500" /> {progress.starsCount}
 </span>
 </div>

 <div className="bg-white p-3 rounded-xl border border-dashed border-slate-300 text-center">
 <span className="text-lg font-bold text-slate-400 block font-sans">Rang</span>
 <span className="text-lg sm:text-2xl font-black text-emerald-700 mt-0.5 block">
 Super-Schüler 👑
 </span>
 </div>
 </div>

 {/* Cute Signature Stamp mockup */}
 <div className="flex justify-between items-end px-4 sm:px-10">
 <div className="text-left">
 <div className="w-28 sm:w-32 border-b-2 border-slate-400 h-8"></div>
 <span className="text-base sm:text-base font-bold text-slate-400 font-body">Datum & Unterschrift</span>
 </div>

 <div className="relative">
 {/* Round Golden Stamp Vector SVG */}
 <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 100 100">
 <circle cx="50" cy="50" r="42" fill="#ffd54f" stroke="#ffb300" strokeWidth="3" />
 <circle cx="50" cy="50" r="36" fill="none" stroke="#ffb300" strokeWidth="1" strokeDasharray="4 2" />
 <path d="M50,22 L53,32 L63,32 L55,38 L58,48 L50,42 L42,48 L45,38 L37,32 L47,32 Z" fill="#ff8f00" />
 <text x="50" y="65" textAnchor="middle" fill="#ff8f00" fontSize="10" fontWeight="900" fontFamily="sans-serif">LERNWELT</text>
 <text x="50" y="76" textAnchor="middle" fill="#ff8f00" fontSize="7" fontWeight="bold" fontFamily="sans-serif">PROFI 2026</text>
 </svg>
 </div>
 </div>
 </div>

 {/* Frame style customizer options */}
 <div className="mt-8 bg-white p-4 rounded-2xl border border-slate-200">
 <h3 className="text-center text-base font-bold text-slate-400 mb-3 font-sans">
 Wähle dein Lieblings-Rahmendesign:
 </h3>
 
 <div className="grid grid-cols-4 gap-2 mb-4">
 <button
 onClick={() => { playPop(); setFrame('gold'); }}
 className={`px-2 py-2.5 rounded-xl border-2 text-base font-bold text-yellow-800 transition-all cursor-pointer ${
 frame === 'gold' ? 'bg-yellow-100 border-yellow-400 scale-102 ring-2 ring-yellow-200' : 'bg-slate-50 border-slate-200'
 }`}
 >
 🥇 Goldkönig
 </button>
 
 <button
 onClick={() => { playPop(); setFrame('rainbow'); }}
 className={`px-2 py-2.5 rounded-xl border-2 text-base font-bold text-pink-700 transition-all cursor-pointer ${
 frame === 'rainbow' ? 'bg-pink-100 border-sky-400 scale-102 ring-2 ring-pink-200' : 'bg-slate-50 border-slate-200'
 }`}
 >
 🌈 Regenbogen
 </button>

 <button
 onClick={() => { playPop(); setFrame('forest'); }}
 className={`px-2 py-2.5 rounded-xl border-2 text-base font-bold text-emerald-800 transition-all cursor-pointer ${
 frame === 'forest' ? 'bg-emerald-100 border-emerald-400 scale-102 ring-2 ring-emerald-200' : 'bg-slate-50 border-slate-200'
 }`}
 >
 🌲 Abenteuer
 </button>

 <button
 onClick={() => { playPop(); setFrame('cosmic'); }}
 className={`px-2 py-2.5 rounded-xl border-2 text-base font-bold text-purple-800 transition-all cursor-pointer ${
 frame === 'cosmic' ? 'bg-purple-100 border-purple-400 scale-102 ring-2 ring-purple-200' : 'bg-slate-50 border-slate-200'
 }`}
 >
 🚀 Weltraum
 </button>
 </div>

 {/* Certificate Actions */}
 <div className="flex flex-wrap items-center justify-center gap-3">
 <button
 onClick={handleCelebrate}
 className="btn-tactile-secondary text-amber-950 px-5 py-2.5 rounded-xl text-base sm:text-lg font-extrabold flex items-center gap-2 cursor-pointer"
 >
 <Sparkles className="w-4 h-4" /> Lumi-Jubel anfeuern! 🎉
 </button>

 <button
 onClick={handlePrint}
 className="btn-tactile-primary text-white px-5 py-2.5 rounded-xl text-base sm:text-lg font-extrabold flex items-center gap-2 cursor-pointer"
 >
 <Printer className="w-4 h-4" /> Urkunde drucken 🖨️
 </button>

 <button
 onClick={onClose}
 className="btn-tactile-outline text-slate-700 px-5 py-2.5 rounded-xl text-base sm:text-lg font-bold cursor-pointer"
 >
 Zurück zur Landkarte
 </button>

 <button
 onClick={() => {
 if (confirm("Möchtest du dein Abenteuer wirklich zurücksetzen und von vorn beginnen?")) {
 playPop();
 onResetProgress();
 }
 }}
 className="text-red-500 hover:text-red-700 hover:bg-red-50 text-base font-bold px-2 py-1 rounded-lg transition-colors cursor-pointer"
 >
 Fortschritt löschen
 </button>
 </div>
 </div>

 {showConfetti && (
 <div className="absolute inset-0 bg-yellow-500/10 rounded-3xl overflow-hidden pointer-events-none flex items-center justify-center">
 <div className="text-3xl text-center select-none animate-ping">
 🎊 🎈 ✨ 👑 ⭐ 🥳 ⭐️ 🎈 🎊
 </div>
 </div>
 )}
 </div>
 );
}
