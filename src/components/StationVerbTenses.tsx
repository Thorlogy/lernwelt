import React, { useState, useEffect } from 'react';
import { Exercise, UserProgress } from '../types';
import { playPop, playSuccess, playFailure } from '../utils/audio';
import { Star, HelpCircle, ArrowRight, CheckCircle, Award } from 'lucide-react';

/**
 * @file StationVerbTenses.tsx
 * @description Station 6 component of Lernwelt. Focuses on Verb Tenses (Präteritum).
 *
 * Curriculum Alignment:
 * Aligns with the "Lehrplan Deutsch Grundschule NRW" (Competency area: "Sprache und Sprachgebrauch untersuchen").
 * Specifically targets identifying and applying grammatical tenses (Present vs Simple Past/Präteritum)
 * and verb conjugation rules commonly taught in Grade 3.
 */

interface StationVerbTensesProps {
 /** The current exercise containing options, hint, word, and correctAnswer */
 exercise: Exercise;
 /** Callback fired when the child selects the correct answer */
 onCorrectAnswer: (starsGained: number) => void;
 /** Callback fired when the child selects an incorrect answer */
 onIncorrectAnswer: () => void;
 /** Callback fired to proceed to the next exercise */
 onNext: () => void;
 /** The current user progression state */
 progress: UserProgress;
 /** Whether this is the final exercise of the current station */
 isLastExercise: boolean;
}

export default function StationVerbTenses({
 exercise,
 onCorrectAnswer,
 onIncorrectAnswer,
 onNext,
 progress,
 isLastExercise,
}: StationVerbTensesProps) {
 const [selectedOption, setSelectedOption] = useState<string | null>(null);
 const [hasChecked, setHasChecked] = useState(false);
 const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
 const [shakeTrigger, setShakeTrigger] = useState(false);
 const [showHint, setShowHint] = useState(false);

 useEffect(() => {
 setSelectedOption(null);
 setHasChecked(false);
 setIsCorrect(null);
 setShakeTrigger(false);
 setShowHint(false);
 }, [exercise]);

 const handleOptionSelect = (option: string) => {
 if (hasChecked) return;
 playPop();
 setSelectedOption(option);
 };

 const handleCheck = () => {
 if (!selectedOption || hasChecked) return;

 const correct = selectedOption === exercise.correctAnswer;
 setIsCorrect(correct);
 setHasChecked(true);

 if (correct) {
 playSuccess();
 onCorrectAnswer(15); // Award 15 stars
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
 setSelectedOption(null);
 };

 // Helper to render the sentence with the selected answer or a blank gap
 const renderSentenceWithGap = () => {
 const questionText = exercise.question; // e.g. "Lumi ______ gestern sehr schnell nach Hause."
 if (!questionText.includes('______')) {
 return <h2 className="text-xl sm:text-2xl font-bold text-slate-800 font-body">{questionText}</h2>;
 }

 const parts = questionText.split('______');
 const displayReplacement = selectedOption 
 ? <span className={`px-2 py-0.5 rounded-lg font-black underline decoration-4 ${
 hasChecked 
 ? isCorrect 
 ? 'text-emerald-700 bg-emerald-100 decoration-emerald-500' 
 : 'text-red-700 bg-red-100 decoration-red-500 line-through'
 : 'text-blue-700 bg-blue-100 decoration-blue-500'
 }`}>{selectedOption}</span>
 : <span className="inline-block w-24 border-b-4 border-dashed border-slate-400 h-6 align-bottom mx-1"></span>;

 return (
 <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 font-body leading-relaxed">
 {parts[0]}
 {displayReplacement}
 {parts[1]}
 </h2>
 );
 };

 return (
 <div className={`bg-white rounded-3xl p-6 shadow-high-tactile border border-slate-100 max-w-xl mx-auto ${shakeTrigger ? 'animate-shake' : ''}`}>
 {/* Header */}
 <div className="text-center mb-6">
 <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-[#00639a] flex items-center justify-center gap-2">
 <span>Zeiten-Trainer!</span>
 </h3>
 <p className="text-base text-brand-secondary font-bold mt-1">
 ⏳ Vergangenheit (Präteritum)
 </p>
 </div>

 {/* Promoted sentence with gap */}
 <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-6 rounded-2xl border-2 border-emerald-200 shadow-sm text-center mb-8 relative">
 <span className="text-base font-bold text-emerald-700 block mb-3 font-sans">
 Satz ergänzen
 </span>
 
 {renderSentenceWithGap()}

 <span className="inline-block mt-4 bg-emerald-100/60 text-emerald-800 text-base font-bold px-3 py-1 rounded-full border border-emerald-200 font-sans">
 Grundform: {exercise.word}
 </span>
 </div>

 {/* Options grid */}
 <div className="grid grid-cols-2 gap-4 mb-8">
 {exercise.options?.map((option, idx) => {
 const isSelected = selectedOption === option;
 const isOptionCorrect = option === exercise.correctAnswer;
 
 let btnClass = "bg-white border-slate-200 hover:bg-slate-50 text-slate-800";
 if (isSelected) {
 if (hasChecked) {
 btnClass = isCorrect
 ? "bg-emerald-100 border-emerald-500 text-emerald-800 ring-4 ring-emerald-200 shadow-md"
 : "bg-red-100 border-red-500 text-red-800 ring-4 ring-red-200 shadow-md";
 } else {
 btnClass = "bg-emerald-100 border-emerald-500 text-emerald-800 ring-4 ring-emerald-200 shadow-md";
 }
 } else if (hasChecked && isOptionCorrect && !isCorrect) {
 btnClass = "bg-emerald-50 border-emerald-300 text-emerald-800";
 }

 return (
 <button
 key={idx}
 disabled={hasChecked}
 onClick={() => handleOptionSelect(option)}
 className={`py-3.5 px-4 rounded-2xl border-2 font-bold text-base sm:text-lg transition-all cursor-pointer text-center font-sans ${btnClass}`}
 >
 {option}
 </button>
 );
 })}
 </div>

 {/* Actions & Feedback */}
 <div className="space-y-4">
 {hasChecked && isCorrect === true && (
 <div className="bg-emerald-100 text-emerald-800 p-3 rounded-2xl border-2 border-emerald-300 text-center font-bold text-lg sm:text-base flex items-center justify-center gap-2">
 <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" /> Super! Der Satz klingt jetzt grammatikalisch perfekt! 🌟
 </div>
 )}

 {hasChecked && isCorrect === false && (
 <div className="bg-yellow-50 text-yellow-800 p-3 rounded-2xl border-2 border-yellow-200 text-center font-bold text-lg sm:text-base">
 Das war leider nicht die gesuchte Vergangenheitsform. Probier es noch einmal! 🤔
 </div>
 )}

 <div className="flex justify-between items-center gap-3">
 <button
 onClick={() => { playPop(); setShowHint(!showHint); }}
 className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-300 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 transition-colors cursor-pointer text-base sm:text-lg font-bold font-body"
 >
 <HelpCircle className="w-4 h-4" /> Worthilfe
 </button>

 <div className="flex gap-2">
 {!hasChecked ? (
 <button
 disabled={!selectedOption}
 onClick={handleCheck}
 className={`px-6 py-2.5 rounded-xl text-lg sm:text-base font-extrabold shadow-md flex items-center gap-1.5 cursor-pointer ${
 selectedOption
 ? 'btn-tactile-secondary text-emerald-950 border-b-4 border-yellow-500'
 : 'bg-slate-200 text-slate-400 border-b-4 border-slate-300 cursor-not-allowed'
 }`}
 >
 Überprüfen! 🎯
 </button>
 ) : isCorrect === true ? (
 <button
 onClick={onNext}
 className="btn-tactile-primary text-white px-7 py-3 rounded-xl text-lg sm:text-base font-black flex items-center gap-2 cursor-pointer shadow-lg hover:brightness-105"
 >
 Nächster Satz! <ArrowRight className="w-5 h-5 animate-pulse" />
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
 <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-base sm:text-lg text-emerald-900 leading-relaxed font-semibold">
 💡 <strong>Tipp:</strong> {exercise.hint}
 </div>
 )}
 </div>
 </div>
 );
}
