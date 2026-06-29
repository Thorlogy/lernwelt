import React, { useState, useEffect } from 'react';
import { WordTypeExercise, WordType, UserProgress } from '../types';
import { playPop, playSuccess, playFailure } from '../utils/audio';
import { Star, HelpCircle, ArrowRight, CheckCircle } from 'lucide-react';

interface StationWordTypesProps {
  exercise: WordTypeExercise;
  onCorrectAnswer: (xpGained: number) => void;
  onIncorrectAnswer: () => void;
  onNext: () => void;
  progress: UserProgress;
  isLastExercise: boolean;
}

export default function StationWordTypes({
  exercise,
  onCorrectAnswer,
  onIncorrectAnswer,
  onNext,
  progress,
  isLastExercise,
}: StationWordTypesProps) {
  const [selectedCategory, setSelectedCategory] = useState<WordType | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setSelectedCategory(null);
    setHasChecked(false);
    setIsCorrect(null);
    setShakeTrigger(false);
    setShowHint(false);
  }, [exercise]);

  const handleCategorySelect = (category: WordType) => {
    if (hasChecked) return;
    playPop();
    setSelectedCategory(category);
  };

  const handleCheck = () => {
    if (!selectedCategory || hasChecked) return;

    const correct = selectedCategory === (exercise.correctAnswer as WordType);
    setIsCorrect(correct);
    setHasChecked(true);

    if (correct) {
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
    setSelectedCategory(null);
  };

  return (
    <div className={`bg-white rounded-3xl p-6 shadow-high-tactile border border-slate-100 max-w-xl mx-auto ${shakeTrigger ? 'animate-shake' : ''}`}>
      {/* Exercise Goal Header */}
      <div className="text-center mb-5 font-body">
        <h3 className="font-black text-xl sm:text-2xl text-[#00639a]">
          Sortiere dieses Wort richtig ein!
        </h3>
        <p className="text-xs sm:text-sm text-brand-secondary font-extrabold uppercase mt-1">
          💼 Nomen, Verben oder Adjektive?
        </p>
      </div>

      {/* The Mystery Word Display Card (Unified typography, large size) */}
      <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 p-6 rounded-2xl border-2 border-yellow-300/80 shadow-sm text-center mb-6 relative font-body">
        <span className="text-xs sm:text-sm font-extrabold text-amber-800 uppercase tracking-widest block mb-1">
          Gesuchtes Wort
        </span>
        
        <h2 className="text-4xl sm:text-5xl font-black text-amber-950 tracking-wide uppercase select-none drop-shadow-xs">
          {exercise.word}
        </h2>

        {/* Big, friendly clue for the child */}
        <p className="text-sm sm:text-base font-extrabold text-amber-900 mt-2">
          {exercise.word[0] === exercise.word[0].toUpperCase() 
            ? "💡 Ein Mensch, Tier, Ding oder Gefühl?" 
            : "💡 Was tut man, oder wie ist eine Sache?"}
        </p>
      </div>

      {/* The Three sorting categories columns (Clear, high-contrast, large text) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 font-body">
        
        {/* NOMEN (Nouns) Chest */}
        <button
          disabled={hasChecked}
          onClick={() => handleCategorySelect('NOMEN')}
          className={`flex flex-col items-center p-5 rounded-2xl border-2 transition-all cursor-pointer ${
            selectedCategory === 'NOMEN'
              ? 'bg-amber-100 border-amber-500 scale-102 ring-4 ring-amber-200 shadow-md'
              : 'bg-white border-brand-surface-highest hover:bg-amber-50/30'
          }`}
        >
          <span className="text-4xl mb-2 filter drop-shadow">🧳</span>
          <h4 className="text-base sm:text-lg font-black text-amber-950">Nomen</h4>
          <span className="text-xs text-amber-800 font-extrabold mt-1 bg-amber-200/50 px-2 py-0.5 rounded-lg">
            Namenwort
          </span>
          <span className="text-xs font-bold text-slate-700 mt-3 leading-relaxed text-center">
            Hund, Baum, Haus<br/>
            <span className="text-[10px] text-amber-800 font-extrabold bg-amber-200/30 px-1.5 py-0.5 rounded-md border border-amber-300/40 inline-block mt-1.5">
              Groß geschrieben!
            </span>
          </span>
        </button>

        {/* VERBEN (Verbs) Chest */}
        <button
          disabled={hasChecked}
          onClick={() => handleCategorySelect('VERB')}
          className={`flex flex-col items-center p-5 rounded-2xl border-2 transition-all cursor-pointer ${
            selectedCategory === 'VERB'
              ? 'bg-emerald-100 border-emerald-500 scale-102 ring-4 ring-emerald-200 shadow-md'
              : 'bg-white border-brand-surface-highest hover:bg-emerald-50/30'
          }`}
        >
          <span className="text-4xl mb-2 filter drop-shadow">🏃</span>
          <h4 className="text-base sm:text-lg font-black text-emerald-950">Verb</h4>
          <span className="text-xs text-emerald-800 font-extrabold mt-1 bg-emerald-200/50 px-2 py-0.5 rounded-lg">
            Tuwort
          </span>
          <span className="text-xs font-bold text-slate-700 mt-3 leading-relaxed text-center">
            rennen, essen, spielen<br/>
            <span className="text-[10px] text-emerald-800 font-extrabold bg-emerald-200/30 px-1.5 py-0.5 rounded-md border border-emerald-300/40 inline-block mt-1.5">
              Klein geschrieben
            </span>
          </span>
        </button>

        {/* ADJEKTIVE (Adjectives) Chest */}
        <button
          disabled={hasChecked}
          onClick={() => handleCategorySelect('ADJEKTIV')}
          className={`flex flex-col items-center p-5 rounded-2xl border-2 transition-all cursor-pointer ${
            selectedCategory === 'ADJEKTIV'
              ? 'bg-sky-100 border-sky-500 scale-102 ring-4 ring-sky-200 shadow-md'
              : 'bg-white border-brand-surface-highest hover:bg-sky-50/30'
          }`}
        >
          <span className="text-4xl mb-2 filter drop-shadow">✨</span>
          <h4 className="text-base sm:text-lg font-black text-sky-950">Adjektiv</h4>
          <span className="text-xs text-sky-800 font-extrabold mt-1 bg-sky-200/50 px-2 py-0.5 rounded-lg">
            Wiewort
          </span>
          <span className="text-xs font-bold text-slate-700 mt-3 leading-relaxed text-center">
            schnell, bunt, klug<br/>
            <span className="text-[10px] text-sky-800 font-extrabold bg-sky-200/30 px-1.5 py-0.5 rounded-md border border-sky-300/40 inline-block mt-1.5">
              Wie ist eine Sache?
            </span>
          </span>
        </button>

      </div>

      {/* Action panel & feedback */}
      <div className="space-y-4 font-body">
        {hasChecked && isCorrect === true && (
          <div className="bg-emerald-100 text-emerald-800 p-3 rounded-2xl border-2 border-emerald-300 text-center font-bold text-sm sm:text-base flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" /> Sensationell! Das Wort gehört genau in dieses Fach!
          </div>
        )}

        {hasChecked && isCorrect === false && (
          <div className="bg-yellow-50 text-yellow-800 p-3 rounded-2xl border-2 border-yellow-200 text-center font-bold text-sm sm:text-base">
            Das war leider die falsche Truhe. Schau dir die Grammatik-Tipps nochmal an! 🤔
          </div>
        )}

        <div className="flex justify-between items-center gap-3">
          {/* Hint button */}
          <button
            onClick={() => { playPop(); setShowHint(!showHint); }}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-300 text-slate-500 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-300 transition-colors cursor-pointer text-xs sm:text-sm font-bold font-body"
          >
            <HelpCircle className="w-4 h-4" /> Worthilfe
          </button>

          <div className="flex gap-2">
            {/* Actions */}
            {!hasChecked ? (
              <button
                disabled={!selectedCategory}
                onClick={handleCheck}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold shadow-md flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory
                    ? 'btn-tactile-secondary text-cyan-950 border-b-4 border-yellow-500'
                    : 'bg-slate-200 text-slate-400 border-b-4 border-slate-300 cursor-not-allowed'
                }`}
              >
                Einsortieren! 🎯
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
                Andere Truhe wählen 🔄
              </button>
            )}
          </div>
        </div>

        {showHint && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-xs sm:text-sm text-orange-900 leading-relaxed font-semibold">
             💡 <strong>Grammatik-Tipp:</strong> {exercise.hint}
          </div>
        )}
      </div>
    </div>
  );
}
