import React, { useState, useEffect } from 'react';
import { SyllableExercise, UserProgress } from '../types';
import { playPop, playSuccess, playFailure } from '../utils/audio';
import { Star, HelpCircle, ArrowRight, RotateCcw, CheckCircle } from 'lucide-react';
import { SpeakButton } from './SpeakButton';

interface StationSyllablesProps {
 exercise: SyllableExercise;
 onCorrectAnswer: (xpGained: number) => void;
 onIncorrectAnswer: () => void;
 onNext: () => void;
 progress: UserProgress;
 isLastExercise: boolean;
}

const EMOJI_MAP: Record<string, string> = {
 water: '💧',
 school: '🏫',
 tulip: '🌷',
 rainbow: '🌈',
 tomato: '🍅',
};

export default function StationSyllables({
 exercise,
 onCorrectAnswer,
 onIncorrectAnswer,
 onNext,
 progress,
 isLastExercise,
}: StationSyllablesProps) {
 const [selectedSyllableIndices, setSelectedSyllableIndices] = useState<number[]>([]);
 const [choicesPool, setChoicesPool] = useState<string[]>([]);
 const [hasChecked, setHasChecked] = useState(false);
 const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
 const [shakeTrigger, setShakeTrigger] = useState(false);
 const [showHint, setShowHint] = useState(false);

 // Load choices and shuffle
 useEffect(() => {
 const syllables = exercise.correctAnswer as string[];
 // Generate pool of distractors
 const distractors = ['SEN', 'TER', 'LOK', 'MA', 'BO', 'RUF', 'TEN'].filter(s => !syllables.includes(s));
 
 // Choose 2 random distractors
 const chosenDistractors = [...distractors].sort(() => Math.random() - 0.5).slice(0, 2);
 const combined = [...syllables, ...chosenDistractors];
 
 // Shuffle combined
 setChoicesPool([...combined].sort(() => Math.random() - 0.5));
 setSelectedSyllableIndices([]);
 setHasChecked(false);
 setIsCorrect(null);
 setShakeTrigger(false);
 setShowHint(false);
 }, [exercise]);

 const handleSyllableClick = (poolIndex: number) => {
 if (hasChecked) return;
 playPop();

 // If already chosen, remove it. Otherwise add it.
 setSelectedSyllableIndices(prev => {
 if (prev.includes(poolIndex)) {
 return prev.filter(idx => idx !== poolIndex);
 } else {
 return [...prev, poolIndex];
 }
 });
 };

 const clearAnswer = () => {
 if (hasChecked) return;
 playPop();
 setSelectedSyllableIndices([]);
 };

 const handleCheck = () => {
 if (hasChecked) return;
 
 const correctSyllables = exercise.correctAnswer as string[];
 const constructedSyllables = selectedSyllableIndices.map(idx => choicesPool[idx]);
 
 const isMatched = 
 constructedSyllables.length === correctSyllables.length &&
 constructedSyllables.every((val, index) => val === correctSyllables[index]);

 setIsCorrect(isMatched);
 setHasChecked(true);

 if (isMatched) {
 playSuccess();
 onCorrectAnswer(15);
 } else {
 playFailure();
 setShakeTrigger(true);
 onIncorrectAnswer();
 setTimeout(() => {
 setShakeTrigger(false);
 }, 800);
 }
 };

 const handleRetry = () => {
 setHasChecked(false);
 setIsCorrect(null);
 setSelectedSyllableIndices([]);
 };

 const selectedSyllables = selectedSyllableIndices.map(idx => choicesPool[idx]);

 return (
 <div className={`bg-white rounded-3xl p-6 shadow-high-tactile border border-slate-100 max-w-xl mx-auto ${shakeTrigger ? 'animate-shake' : ''}`}>
 {/* Title */}
 <div className="text-center mb-4">
 <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-[#00639a] flex items-center justify-center gap-2">
 <span>{exercise.question}</span>
 </h3>
 <p className="text-base text-[#725c00] font-sans font-bold mt-1">
 🗣️ Klatsche den Rhythmus mit!
 </p>
 </div>

 {/* Syllable Hopping Bridge (Water stream scenery!) */}
 <div className="relative h-44 bg-gradient-to-b from-cyan-100 to-sky-200 rounded-2xl border-2 border-cyan-300 overflow-hidden shadow-inner flex items-center justify-center mb-6">
 {/* Animated stream waves */}
 <div className="absolute inset-x-0 bottom-0 top-0 opacity-15">
 <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
 <path fill="#0288d1" d="M0,160 C320,240 640,80 960,200 C1280,320 1440,120 1440,160 L1440,320 L0,320 Z"></path>
 </svg>
 </div>

 {/* Floating object emoji illustration */}
 <div className="absolute top-3 left-4 bg-white/90 backdrop-blur-xs border border-cyan-200/50 rounded-2xl px-3 py-1.5 flex items-center gap-2 shadow-xs text-lg font-extrabold text-cyan-900 select-none animate-wiggle-soft">
 <span className="text-2xl filter drop-shadow-sm leading-none">
 {EMOJI_MAP[exercise.imagePlaceholder] || '❓'}
 </span>
 <span className="hidden sm:inline font-sans text-base font-black text-cyan-700">{exercise.word}</span>
 <SpeakButton text={exercise.word} syllables={exercise.correctAnswer as string[]} label="Wort in Silben vorlesen" size={20} autoSpeak />
 </div>

 {/* Floating lilypads or river stones container */}
 <div className="relative z-10 flex flex-wrap justify-center items-center gap-4 sm:gap-6 px-4">
 {Array.from({ length: (exercise.correctAnswer as string[]).length }).map((_, index) => {
 const hasSelected = selectedSyllableIndices.length > index;
 const piece = hasSelected ? choicesPool[selectedSyllableIndices[index]] : null;

 return (
 <div key={index} className="flex flex-col items-center">
 {/* Visual Lilypad */}
 <div className={`relative w-22 h-20 sm:w-24 sm:h-22 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
 isCorrect === true
 ? 'bg-emerald-100 border-emerald-400 text-emerald-800 scale-102 font-bold shadow-md'
 : isCorrect === false
 ? 'bg-red-50 border-red-300 text-red-800 font-bold shadow-md'
 : piece
 ? 'bg-amber-100 border-amber-300 text-amber-900 scale-105 shadow-md animate-bounce'
 : 'bg-emerald-200/50 border-emerald-300/40 text-emerald-100 border-dashed'
 }`}>
 {/* Water splash ornament below */}
 <div className="absolute -bottom-1 w-14 h-2 bg-black/5 rounded-full blur-xs"></div>
 
 {piece ? (
 <span className="text-lg sm:text-xl font-black font-body select-none ">{piece}</span>
 ) : (
 <span className="text-base font-sans text-emerald-600/60 font-bold select-none">Silbe {index + 1}</span>
 )}

 {/* HOP NUMBER */}
 <div className="absolute -top-2 -right-1 bg-sky-500 text-white w-5 h-5 rounded-full text-base font-black flex items-center justify-center border border-white">
 {index + 1}
 </div>
 </div>
 </div>
 );
 })}
 </div>
 </div>

 {/* Built up full word showcase */}
 {selectedSyllables.length > 0 && (
 <div className="text-center mb-6">
 <div className="text-base text-slate-500 font-bold mb-1.5 font-sans">
 Wortverbindung:
 </div>
 <div className="inline-block bg-sky-50/80 px-4 py-2 rounded-2xl border border-sky-100 text-lg sm:text-xl font-extrabold text-[#00639a] font-sans shadow-sm">
 {selectedSyllables.join(' • ')}
 </div>
 </div>
 )}

 {/* Available Syllable Floating Blocks */}
 <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 mb-6">
 <div className="text-center text-base text-slate-400 font-sans mb-3 font-bold">
 Tippe auf die schwimmenden Holzblöcke:
 </div>

 <div className="flex flex-wrap justify-center gap-3">
 {choicesPool.map((syllable, idx) => {
 const isChosen = selectedSyllableIndices.includes(idx);
 
 return (
 <button
 key={idx}
 disabled={hasChecked}
 onClick={() => handleSyllableClick(idx)}
 className={`px-5 py-3.5 rounded-2xl text-base sm:text-lg font-black transition-all duration-150 letter-block transform cursor-pointer ${
 isChosen
 ? 'bg-slate-100 text-slate-300 opacity-40 scale-95 border-dashed pointer-events-none'
 : 'bg-white hover:bg-yellow-50 text-slate-700 border-brand-surface-highest hover:rotate-2 focus:ring-4 focus:ring-emerald-300/40'
 }`}
 >
 {syllable}
 </button>
 );
 })}
 </div>
 </div>

 {/* Actions and Feedback */}
 <div className="space-y-4">
 {hasChecked && isCorrect === true && (
 <div className="bg-emerald-100 text-emerald-800 p-3 rounded-2xl border-2 border-emerald-300 text-center font-bold text-lg sm:text-base flex items-center justify-center gap-2">
 <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" /> Großartig! Die Silben sind genau am richtigen Platz!
 </div>
 )}

 {hasChecked && isCorrect === false && (
 <div className="bg-yellow-100 text-yellow-800 p-3 rounded-2xl border-2 border-yellow-300 text-center font-bold text-lg sm:text-base">
 Das stimmt leider noch nicht ganz. Tippe auf „Zurücksetzen“, um es noch einmal zu versuchen! 🤔
 </div>
 )}

 <div className="flex justify-between items-center gap-3">
 <button
 onClick={() => setShowHint(!showHint)}
 className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-300 text-slate-500 hover:text-[#00639a] hover:bg-sky-50 hover:border-sky-300 transition-colors cursor-pointer text-base sm:text-lg font-bold font-body"
 >
 <HelpCircle className="w-4 h-4" /> Klatschtipp
 </button>

 <div className="flex gap-2">
 {!hasChecked ? (
 <>
 <button
 onClick={clearAnswer}
 className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer text-base sm:text-lg font-bold font-body"
 >
 Zurücksetzen
 </button>
 <button
 disabled={selectedSyllableIndices.length === 0}
 onClick={handleCheck}
 className={`px-6 py-2.5 rounded-xl text-base sm:text-lg font-extrabold shadow-md flex items-center gap-1 cursor-pointer transition-all ${
 selectedSyllableIndices.length > 0
 ? 'btn-tactile-secondary text-cyan-950 border-b-4 border-yellow-500'
 : 'bg-slate-200 text-slate-400 border-b-4 border-slate-300 cursor-not-allowed'
 }`}
 >
 Fertig! 🐸
 </button>
 </>
 ) : isCorrect === true ? (
 <button
 onClick={onNext}
 className="btn-tactile-primary text-white px-7 py-3 rounded-xl text-lg sm:text-base font-black flex items-center gap-2 cursor-pointer shadow-lg hover:brightness-105"
 >
 {isLastExercise ? "Station beenden!" : "Nächste Aufgabe!"} <ArrowRight className="w-5 h-5 animate-pulse" />
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

 {showHint && (
 <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-base sm:text-lg text-orange-900 leading-relaxed font-semibold">
 💡 <strong>Tipp:</strong> {exercise.hint}
 </div>
 )}
 </div>
 </div>
 );
}
