import React, { useState, useEffect } from 'react';
import { Exercise, UserProgress } from '../types';
import { playPop, playSuccess, playFailure } from '../utils/audio';
import { Star, HelpCircle, ArrowRight, CheckCircle, Award } from 'lucide-react';

/**
 * @file StationSingularPlural.tsx
 * @description Station 5 component of Lernwelt. Focuses on Singular and Plural formations.
 *
 * Curriculum Alignment:
 * Aligns with the "Lehrplan Deutsch Grundschule NRW" (Competency area: "Sprache und Sprachgebrauch untersuchen").
 * Specifically targets Plural building, umlaut changes (Umlautung/Ableitung, e.g., Baum -> Bäume)
 * and inflection rules commonly taught in Grade 2.
 */

interface StationSingularPluralProps {
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

export default function StationSingularPlural({
  exercise,
  onCorrectAnswer,
  onIncorrectAnswer,
  onNext,
  progress,
  isLastExercise,
}: StationSingularPluralProps) {
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

  return (
    <div className={`bg-white rounded-3xl p-6 shadow-high-tactile border border-slate-100 max-w-xl mx-auto ${shakeTrigger ? 'animate-shake' : ''}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-[#00639a] flex items-center justify-center gap-2">
          <span>Finde die Mehrzahl!</span>
        </h3>
        <p className="text-xs text-brand-secondary font-bold uppercase mt-1">
          👥 Einzahl & Mehrzahl
        </p>
      </div>

      {/* Promoted word displaying singular */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 p-6 rounded-2xl border-2 border-blue-200 shadow-sm text-center mb-8 relative">
        <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1 font-sans">
          Einzahl (Singular)
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 font-sans tracking-wide uppercase select-none">
          {exercise.word}
        </h2>
      </div>

      {/* Options grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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
              btnClass = "bg-blue-100 border-blue-500 text-blue-800 ring-4 ring-blue-200 shadow-md";
            }
          } else if (hasChecked && isOptionCorrect && !isCorrect) {
            // Highlight the correct answer if the user got it wrong
            btnClass = "bg-emerald-50 border-emerald-300 text-emerald-800";
          }

          return (
            <button
              key={idx}
              disabled={hasChecked}
              onClick={() => handleOptionSelect(option)}
              className={`py-4 px-6 rounded-2xl border-2 font-bold text-lg transition-all cursor-pointer text-center font-sans ${btnClass}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Actions & Feedback */}
      <div className="space-y-4">
        {hasChecked && isCorrect === true && (
          <div className="bg-emerald-100 text-emerald-800 p-3 rounded-2xl border-2 border-emerald-300 text-center font-bold text-sm sm:text-base flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" /> Super gemacht! Das ist die richtige Mehrzahlform! 🌟
          </div>
        )}

        {hasChecked && isCorrect === false && (
          <div className="bg-yellow-50 text-yellow-800 p-3 rounded-2xl border-2 border-yellow-200 text-center font-bold text-sm sm:text-base">
            Das war leider nicht ganz richtig. Versuch es noch einmal! 🤔
          </div>
        )}

        <div className="flex justify-between items-center gap-3">
          <button
            onClick={() => { playPop(); setShowHint(!showHint); }}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-300 text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer text-xs sm:text-sm font-bold font-body"
          >
            <HelpCircle className="w-4 h-4" /> Worthilfe
          </button>

          <div className="flex gap-2">
            {!hasChecked ? (
              <button
                disabled={!selectedOption}
                onClick={handleCheck}
                className={`px-6 py-2.5 rounded-xl text-sm sm:text-base font-extrabold shadow-md flex items-center gap-1.5 cursor-pointer ${
                  selectedOption
                    ? 'btn-tactile-secondary text-blue-950 border-b-4 border-yellow-500'
                    : 'bg-slate-200 text-slate-400 border-b-4 border-slate-300 cursor-not-allowed'
                }`}
              >
                Überprüfen! 🎯
              </button>
            ) : isCorrect === true ? (
              <button
                onClick={onNext}
                className="btn-tactile-primary text-white px-7 py-3 rounded-xl text-sm sm:text-base font-black flex items-center gap-2 cursor-pointer shadow-lg hover:brightness-105"
              >
                Nächstes Wort! <ArrowRight className="w-5 h-5 animate-pulse" />
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="btn-tactile-outline px-6 py-2.5 rounded-xl text-slate-700 text-sm font-bold cursor-pointer border border-slate-300"
              >
                Nochmal versuchen 🔄
              </button>
            )}
          </div>
        </div>

        {showHint && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs sm:text-sm text-blue-900 leading-relaxed font-semibold">
            💡 <strong>Tipp:</strong> {exercise.hint}
          </div>
        )}
      </div>
    </div>
  );
}
