import React, { useState, useEffect } from 'react';
import { Exercise, UserProgress } from '../types';
import { playPop, playSuccess, playFailure } from '../utils/audio';
import { SpeakButton } from './SpeakButton';
import { useSpeech } from '../lib/useSpeech';
import { Star, HelpCircle, ArrowRight, CheckCircle, Volume2 } from 'lucide-react';
import { getEmojiForWord } from '../utils/emojis';

interface StationRhymesProps {
  exercise: Exercise;
  onCorrectAnswer: (starsGained: number) => void;
  onIncorrectAnswer: () => void;
  onNext: () => void;
  progress: UserProgress;
  isLastExercise: boolean;
}

export default function StationRhymes({
  exercise,
  onCorrectAnswer,
  onIncorrectAnswer,
  onNext,
  progress,
  isLastExercise,
}: StationRhymesProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const { speak } = useSpeech();

  const options = exercise.options || [];
  const correctAnswer = (exercise.correctAnswer as string[]) || [];

  // Reset state on exercise change
  useEffect(() => {
    setSelectedOptions([]);
    setHasChecked(false);
    setIsCorrect(null);
    setShakeTrigger(false);
    setShowHint(false);
  }, [exercise]);

  const handleOptionSelect = (option: string) => {
    if (hasChecked) return;
    playPop();
    speak(option);

    setSelectedOptions(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const handleCheck = () => {
    if (selectedOptions.length === 0 || hasChecked) return;

    // Check if selected matches correctAnswer (regardless of order)
    const isCorrectSelection =
      selectedOptions.length === correctAnswer.length &&
      selectedOptions.every(val => correctAnswer.includes(val)) &&
      correctAnswer.every(val => selectedOptions.includes(val));

    setIsCorrect(isCorrectSelection);
    setHasChecked(true);

    if (isCorrectSelection) {
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
    setSelectedOptions([]);
  };

  return (
    <div className={`bg-white rounded-3xl p-6 shadow-high-tactile border border-slate-100 max-w-xl mx-auto ${shakeTrigger ? 'animate-shake' : ''}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-[#00639a] flex items-center justify-center gap-2">
          <span>🎵 Reimwörter-Detektiv</span>
        </h3>
        <p className="text-base text-brand-secondary font-bold mt-0.5">
          Finde alle Wörter, die sich reimen!
        </p>
      </div>

      {/* Target Word display card */}
      <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 shadow-sm text-center mb-6 relative flex flex-col items-center gap-2.5">
        <span className="text-base font-bold text-purple-700 block font-sans">
          Reimt sich auf:
        </span>
        <div className="flex items-center justify-center gap-3">
          {getEmojiForWord(exercise.word || '') && (
            <span className="text-4xl filter drop-shadow-sm select-none">
              {getEmojiForWord(exercise.word || '')}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 font-sans tracking-wide uppercase">
            {exercise.word}
          </h2>
          <button
            type="button"
            onClick={() => speak(exercise.word || '')}
            className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-2.5 rounded-full transition-transform hover:scale-110 shadow-sm cursor-pointer"
            title="Wort vorlesen"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Question Instruction */}
      <p className="text-center font-bold text-slate-700 text-lg sm:text-xl font-body mb-6">
        {exercise.question}
      </p>

      {/* Options grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {options.map((option, idx) => {
          const isSelected = selectedOptions.includes(option);
          const isOptionCorrect = correctAnswer.includes(option);

          let btnClass = "bg-white border-slate-200 hover:bg-slate-50 text-slate-800";
          if (isSelected) {
            if (hasChecked) {
              btnClass = isCorrect
                ? "bg-emerald-100 border-emerald-500 text-emerald-800 ring-4 ring-emerald-200 shadow-md"
                : isOptionCorrect
                  ? "bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm"
                  : "bg-red-100 border-red-500 text-red-800 ring-4 ring-red-200 shadow-md";
            } else {
              btnClass = "bg-purple-100 border-purple-400 text-purple-950 ring-4 ring-purple-200 shadow-md";
            }
          } else if (hasChecked && isOptionCorrect && !isCorrect) {
            // Highlight missed correct answers
            btnClass = "bg-emerald-50 border-emerald-300 text-emerald-800";
          }

          return (
            <button
              key={idx}
              disabled={hasChecked}
              onClick={() => handleOptionSelect(option)}
              className={`relative min-h-[90px] py-4 px-6 rounded-2xl border-4 font-bold text-xl sm:text-2xl transition-all cursor-pointer text-center font-sans flex flex-col items-center justify-center gap-1.5 ${btnClass}`}
            >
              <div
                className="absolute top-2 right-2 p-1 rounded-full bg-black/5 hover:bg-black/10 text-slate-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  speak(option);
                }}
                title="Vorlesen"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </div>
              {getEmojiForWord(option) && (
                <span className="text-3xl filter drop-shadow-sm select-none">{getEmojiForWord(option)}</span>
              )}
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {/* Actions & Feedback */}
      <div className="space-y-4">
        {hasChecked && isCorrect === true && (
          <div className="bg-emerald-100 text-emerald-800 p-3.5 rounded-2xl border-2 border-emerald-300 text-center font-black text-lg sm:text-base flex items-center justify-center gap-2 shadow-sm animate-pulse">
            <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" /> Wundervoll! Alle Reimpaare gefunden! 🌟
          </div>
        )}

        {hasChecked && isCorrect === false && (
          <div className="bg-yellow-50 text-yellow-800 p-3 rounded-2xl border-2 border-yellow-200 text-center font-bold text-lg sm:text-base">
            Das war leider nicht ganz richtig. Sprich sie noch einmal laut aus! 🗣️
          </div>
        )}

        <div className="flex justify-between items-center gap-3">
          <button
            onClick={() => { playPop(); setShowHint(!showHint); }}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-300 text-slate-500 hover:text-purple-600 hover:bg-purple-50 hover:border-purple-300 transition-colors cursor-pointer text-base sm:text-lg font-bold font-body"
          >
            <HelpCircle className="w-4 h-4" /> Reimhilfe
          </button>

          <div className="flex gap-2">
            {!hasChecked ? (
              <button
                disabled={selectedOptions.length === 0}
                onClick={handleCheck}
                className={`px-6 py-2.5 rounded-xl text-lg sm:text-base font-extrabold shadow-md flex items-center gap-1.5 cursor-pointer ${
                  selectedOptions.length > 0
                    ? 'btn-tactile-secondary text-purple-950 border-b-4 border-yellow-500'
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
                Nächste Aufgabe! <ArrowRight className="w-5 h-5 animate-pulse" />
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
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-base sm:text-lg text-purple-950 leading-relaxed font-semibold">
            💡 <strong>Tipp:</strong> {exercise.hint}
          </div>
        )}
      </div>
    </div>
  );
}
