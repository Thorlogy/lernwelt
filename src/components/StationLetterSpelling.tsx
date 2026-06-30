import React, { useState, useEffect } from 'react';
import { SpellingExercise, UserProgress } from '../types';
import { playPop, playSuccess, playFailure } from '../utils/audio';
import { Star, HelpCircle, ArrowRight, RotateCcw, CheckCircle } from 'lucide-react';
import { SpeakButton } from './SpeakButton';

interface StationLetterSpellingProps {
 exercise: SpellingExercise;
 onCorrectAnswer: (xpGained: number) => void;
 onIncorrectAnswer: () => void;
 onNext: () => void;
 progress: UserProgress;
 isLastExercise: boolean;
}

export default function StationLetterSpelling({
 exercise,
 onCorrectAnswer,
 onIncorrectAnswer,
 onNext,
 progress,
 isLastExercise,
}: StationLetterSpellingProps) {
 const [selectedLetters, setSelectedLetters] = useState<number[]>([]); // indexes of letters chosen from scrambled pool
 const [shuffledPool, setShuffledPool] = useState<{ letter: string; originalIndex: number }[]>([]);
 const [hasChecked, setHasChecked] = useState(false);
 const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
 const [shakeTrigger, setShakeTrigger] = useState(false);
 const [showHint, setShowHint] = useState(false);

 // Initialize and scramble letters
 useEffect(() => {
 const letters = exercise.word.split('');
 const mapped = letters.map((l, idx) => ({ letter: l, originalIndex: idx }));
 
 // Simple deterministic shuffling to prevent infinite render loops
 const shuffled = [...mapped].sort(() => Math.random() - 0.5);
 // If by chance the shuffled is same as correct word, shuffle once more
 if (shuffled.map(s => s.letter).join('') === exercise.word) {
 shuffled.reverse();
 }

 setShuffledPool(shuffled);
 setSelectedLetters([]);
 setHasChecked(false);
 setIsCorrect(null);
 setShakeTrigger(false);
 setShowHint(false);
 }, [exercise]);

 const handleLetterClick = (poolIndex: number) => {
 if (hasChecked) return;
 playPop();

 if (selectedLetters.includes(poolIndex)) {
 // Remove it (put it back)
 setSelectedLetters(prev => prev.filter(idx => idx !== poolIndex));
 } else {
 // Choose it
 setSelectedLetters(prev => [...prev, poolIndex]);
 }
 };

 const clearAnswer = () => {
 if (hasChecked) return;
 playPop();
 setSelectedLetters([]);
 };

 const handleCheck = () => {
 if (hasChecked) return;
 
 const constructedWord = selectedLetters
 .map(idx => shuffledPool[idx].letter)
 .join('');

 const correct = constructedWord === exercise.word;
 setIsCorrect(correct);
 setHasChecked(true);

 if (correct) {
 playSuccess();
 onCorrectAnswer(15); // Gained 15 stars/XP
 } else {
 playFailure();
 setShakeTrigger(true);
 onIncorrectAnswer();
 // Auto reset after shake so they can try again
 setTimeout(() => {
 setShakeTrigger(false);
 }, 800);
 }
 };

 const handleRetry = () => {
 setHasChecked(false);
 setIsCorrect(null);
 setSelectedLetters([]);
 };

 // Helper to render cute childlike vector SVGs
 const renderItemIllustration = () => {
 switch (exercise.imagePlaceholder) {
 case 'cat':
 return (
 <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100">
 <circle cx="50" cy="55" r="30" fill="#ffb74d" />
 {/* Ears */}
 <polygon points="20,35 32,15 40,32" fill="#e65100" />
 <polygon points="80,35 68,15 60,32" fill="#e65100" />
 {/* Eyes */}
 <circle cx="38" cy="48" r="4" fill="#212121" />
 <circle cx="62" cy="48" r="4" fill="#212121" />
 <circle cx="37" cy="46" r="1.5" fill="#ffffff" />
 <circle cx="61" cy="46" r="1.5" fill="#ffffff" />
 {/* Nose & Whiskers */}
 <polygon points="50,56 46,52 54,52" fill="#ff8a80" />
 <path d="M50,56 Q48,62 45,62 M50,56 Q52,62 55,62" stroke="#212121" strokeWidth="2" strokeLinecap="round" fill="none" />
 <line x1="28" y1="56" x2="12" y2="54" stroke="#e65100" strokeWidth="2.5" strokeLinecap="round" />
 <line x1="28" y1="62" x2="14" y2="64" stroke="#e65100" strokeWidth="2.5" strokeLinecap="round" />
 <line x1="72" y1="56" x2="88" y2="54" stroke="#e65100" strokeWidth="2.5" strokeLinecap="round" />
 <line x1="72" y1="62" x2="86" y2="64" stroke="#e65100" strokeWidth="2.5" strokeLinecap="round" />
 </svg>
 );
 case 'apple':
 return (
 <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100">
 <ellipse cx="43" cy="54" rx="22" ry="24" fill="#e53935" />
 <ellipse cx="57" cy="54" rx="22" ry="24" fill="#e53935" />
 {/* Leaf and Stem */}
 <path d="M50,32 Q52,18 42,12" stroke="#5d4037" strokeWidth="4" strokeLinecap="round" fill="none" />
 <path d="M50,26 Q64,18 64,30 Q50,34 50,26 Z" fill="#4caf50" />
 {/* Highlight */}
 <ellipse cx="34" cy="44" rx="4" ry="8" fill="#ffffff" opacity="0.3" transform="rotate(-15 34 44)" />
 </svg>
 );
 case 'mouse':
 return (
 <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100">
 {/* Tail */}
 <path d="M20,68 Q10,75 5,60" stroke="#b0bec5" strokeWidth="3" strokeLinecap="round" fill="none" />
 {/* Body */}
 <ellipse cx="54" cy="58" rx="28" ry="18" fill="#90a4ae" />
 {/* Ears */}
 <circle cx="36" cy="40" r="10" fill="#78909c" />
 <circle cx="36" cy="40" r="6" fill="#ffab91" />
 <circle cx="58" cy="42" r="10" fill="#78909c" />
 {/* Eyes */}
 <circle cx="68" cy="52" r="3" fill="#212121" />
 {/* Pink Nose */}
 <ellipse cx="83" cy="58" rx="4" ry="4" fill="#ff8a80" />
 </svg>
 );
 case 'sun':
 return (
 <svg className="w-24 h-24 mx-auto animate-spin-slow" viewBox="0 0 100 100">
 {/* Sun Rays */}
 <g stroke="#ffb300" strokeWidth="5" strokeLinecap="round">
 <line x1="50" y1="10" x2="50" y2="20" />
 <line x1="50" y1="80" x2="50" y2="90" />
 <line x1="10" y1="50" x2="20" y2="50" />
 <line x1="80" y1="50" x2="90" y2="50" />
 <line x1="22" y1="22" x2="30" y2="30" />
 <line x1="70" y1="70" x2="78" y2="78" />
 <line x1="78" y1="22" x2="70" y2="30" />
 <line x1="30" y1="70" x2="22" y2="78" />
 </g>
 <circle cx="50" cy="50" r="22" fill="#ffca28" />
 {/* Rosy Cheeks */}
 <circle cx="41" cy="52" r="2" fill="#e53935" opacity="0.4" />
 <circle cx="59" cy="52" r="2" fill="#e53935" opacity="0.4" />
 {/* Eye smiles */}
 <path d="M40,46 Q43,44 45,46" stroke="#5d4037" strokeWidth="2.5" strokeLinecap="round" fill="none" />
 <path d="M55,46 Q57,44 60,46" stroke="#5d4037" strokeWidth="2.5" strokeLinecap="round" fill="none" />
 {/* Friendly mouth */}
 <path d="M46,54 Q50,58 54,54" stroke="#5d4037" strokeWidth="2.5" strokeLinecap="round" fill="none" />
 </svg>
 );
 case 'fir':
 return (
 <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100">
 {/* Trunk */}
 <rect x="46" y="66" width="8" height="18" rx="2" fill="#5d4037" />
 {/* Pine Layers */}
 <polygon points="50,15 25,48 75,48" fill="#2e7d32" />
 <polygon points="50,30 20,60 80,60" fill="#388e3c" />
 <polygon points="50,45 15,72 85,72" fill="#4caf50" />
 </svg>
 );
 default:
 return (
 <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-4xl shadow-inner">
 🔍
 </div>
 );
 }
 };

 return (
 <div className={`bg-white rounded-3xl p-6 shadow-high-tactile border border-slate-100 max-w-xl mx-auto ${shakeTrigger ? 'animate-shake' : ''}`}>
 {/* Title block */}
 <div className="text-center mb-4">
 <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-[#00639a] flex items-center justify-center gap-2">
 <span>{exercise.question}</span>
 <SpeakButton text={exercise.word} size={24} label="Gesuchtes Wort vorlesen" />
 </h3>
 </div>

 {/* Picture Frame */}
 <div className="bg-gradient-to-b from-sky-50 to-white/60 p-4 rounded-2xl border-2 border-sky-100 shadow-inner mb-6 relative">
 {renderItemIllustration()}
 
 {/* Floating Stars reward count preview */}
 <div className="absolute top-2 right-2 flex items-center gap-1 bg-yellow-100 text-yellow-800 text-base font-bold px-2.5 py-1 rounded-full border border-yellow-300">
 <Star className="w-3.5 h-3.5 fill-yellow-400" />
 +15 Sterne
 </div>
 </div>

 {/* The Target Area slots */}
 <div className="mb-6">
 <div className="text-center text-base text-[#404750] font-sans mb-2 font-bold">
 Dein geschriebenes Wort:
 </div>
 
 <div className="flex flex-wrap justify-center gap-3">
 {Array.from({ length: exercise.word.length }).map((_, placeholderIdx) => {
 const hasLetter = selectedLetters.length > placeholderIdx;
 const letterObj = hasLetter ? shuffledPool[selectedLetters[placeholderIdx]] : null;

 return (
 <div
 key={placeholderIdx}
 className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-black transition-all duration-150 ${
 isCorrect === true 
 ? 'bg-emerald-100 border-2 border-emerald-400 text-emerald-800' 
 : isCorrect === false
 ? 'bg-red-50 border-2 border-red-300 text-red-700'
 : hasLetter
 ? 'bg-[#003c60]/10 border-2 border-[#00639a] text-[#00639a] scale-102 shadow-sm'
 : 'bg-slate-50 border-2 border-dashed border-slate-300 text-slate-300'
 }`}
 >
 {letterObj ? letterObj.letter : ''}
 </div>
 );
 })}
 </div>
 </div>

 {/* Letter Bank (Scrambled Letters) */}
 <div className="bg-[#fcfdfe] p-4 rounded-2xl border border-slate-200/80 mb-6">
 <div className="text-center text-base text-slate-400 font-sans mb-3 font-bold">
 Wähle die passenden Buchstaben Blöcke:
 </div>

 <div className="flex flex-wrap justify-center gap-3">
 {shuffledPool.map((item, idx) => {
 const isChosen = selectedLetters.includes(idx);
 
 return (
 <button
 key={idx}
 disabled={hasChecked}
 onClick={() => handleLetterClick(idx)}
 className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl text-xl sm:text-2xl font-extrabold flex items-center justify-center letter-block transform transition-transform cursor-pointer ${
 isChosen
 ? 'bg-slate-100 text-slate-300 opacity-40 scale-95 border-dashed pointer-events-none'
 : 'bg-white hover:bg-yellow-50 text-slate-800 border-brand-surface-highest focus:ring-4 focus:ring-yellow-300/50'
 }`}
 >
 {item.letter}
 </button>
 );
 })}
 </div>
 </div>

 {/* Action Buttons & Feedback */}
 <div className="space-y-4">
 {/* Validation States */}
 {hasChecked && isCorrect === true && (
 <div className="bg-emerald-100 text-emerald-800 p-3 rounded-2xl border-2 border-emerald-300 text-center font-bold text-lg sm:text-base flex items-center justify-center gap-2">
 <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" /> Super! Du hast das Wort perfekt buchstabiert!
 </div>
 )}

 {hasChecked && isCorrect === false && (
 <div className="bg-yellow-50 text-yellow-800 p-3 rounded-2xl border-2 border-yellow-200 text-center font-bold text-lg sm:text-base">
 Huch, fast! Lass es uns noch einmal korrigieren! 🤔
 </div>
 )}

 <div className="flex justify-between items-center gap-3">
 {/* Hint button */}
 <button
 onClick={() => { playPop(); setShowHint(!showHint); }}
 className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-300 text-slate-500 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-300 transition-colors cursor-pointer text-base sm:text-lg font-bold font-body"
 >
 <HelpCircle className="w-4 h-4" /> Tipp
 </button>

 <div className="flex gap-2">
 {/* Reset current attempt */}
 {!hasChecked && selectedLetters.length > 0 && (
 <button
 onClick={clearAnswer}
 className="btn-tactile-outline px-4 py-2.5 rounded-xl text-base sm:text-lg font-bold flex items-center gap-1.5 cursor-pointer text-slate-600"
 >
 <RotateCcw className="w-4 h-4" /> Löschen
 </button>
 )}

 {/* Check or Next Action */}
 {!hasChecked ? (
 <button
 disabled={selectedLetters.length !== exercise.word.length}
 onClick={handleCheck}
 className={`px-6 py-2.5 rounded-xl text-lg sm:text-base font-extrabold shadow-md flex items-center gap-1.5 cursor-pointer ${
 selectedLetters.length === exercise.word.length
 ? 'btn-tactile-secondary text-[#725c00]'
 : 'bg-slate-200 text-slate-400 border-b-4 border-slate-300 cursor-not-allowed'
 }`}
 >
 Prüfen! 🎯
 </button>
 ) : isCorrect === true ? (
 <button
 onClick={onNext}
 className="btn-tactile-primary text-white px-7 py-3 rounded-xl text-lg sm:text-base font-black flex items-center gap-2 cursor-pointer shadow-lg hover:brightness-105"
 >
 Nächstes Wort! <ArrowRight className="w-5 h-5 animate-pulse" />
 </button>
 ) : (
 <button
 onClick={handleRetry}
 className="btn-tactile-outline px-6 py-2.5 rounded-xl text-slate-700 text-lg font-bold cursor-pointer border border-slate-300"
 >
 Nochmal versuchen 🔄
 </button>
 )}
 </div>
 </div>

 {/* Slidout Hint panel */}
 {showHint && (
 <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-base sm:text-lg text-amber-900 leading-relaxed font-semibold">
 🔑 <strong>Tipp von Lumi:</strong> {exercise.hint}
 </div>
 )}
 </div>
 </div>
 );
}
