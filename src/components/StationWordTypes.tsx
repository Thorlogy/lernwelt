import React, { useState, useEffect } from 'react';
import { WordTypeExercise, WordType, UserProgress } from '../types';
import { playPop, playSuccess, playFailure } from '../utils/audio';
import { Star, HelpCircle, ArrowRight, CheckCircle, Award, Sparkles } from 'lucide-react';

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
      <div className="text-center mb-6">
        <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-[#00639a] flex items-center justify-center gap-2">
          <span>Sortiere dieses Wort richtig ein!</span>
        </h3>
        <p className="text-xs text-brand-secondary font-bold uppercase mt-1">
          💼 Nomen, Verben oder Adjektive?
        </p>
      </div>

      {/* The Mystery Word Display Card (Framed like a gold scroll) */}
      <div className="bg-gradient-to-r from-amber-50 via-yellow-100 to-amber-50 p-6 rounded-2xl border-2 border-yellow-300 shadow-md text-center mb-8 relative">
        <div className="absolute top-1 left-1 text-slate-300 scale-110">👑</div>
        <div className="absolute bottom-1 right-1 text-slate-300 scale-110">👑</div>
        
        <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1 font-sans">
          Gesuchtes Wort
        </span>
        
        {/* Dynamic size depends on length */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-amber-950 font-sans tracking-wide uppercase select-none drop-shadow-sm">
          {exercise.word}
        </h2>

        {/* Small floating hint reminder */}
        <p className="text-xs text-amber-800/70 font-semibold mt-1 font-body">
          {exercise.word[0] === exercise.word[0].toUpperCase() 
            ? "Mensch, Tier, Ding oder Gefühl?" 
            : "Was tust du, oder wie ist etwas?"}
        </p>
      </div>

      {/* The Three sorting treasure chests options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        
        {/* NOMEN (Nouns) Chest */}
        <button
          disabled={hasChecked}
          onClick={() => handleCategorySelect('NOMEN')}
          className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            selectedCategory === 'NOMEN'
              ? 'bg-amber-100 border-amber-500 scale-102 ring-4 ring-amber-200 shadow-md'
              : 'bg-white border-brand-surface-highest hover:bg-amber-50/30'
          }`}
        >
          <span className="text-4xl mb-2 filter drop-shadow">🧳</span>
          <h4 className="text-base font-extrabold text-amber-800 font-sans">Nomen</h4>
          <span className="text-[10px] text-amber-700 font-bold uppercase mt-0.5 bg-amber-200/50 px-1.5 py-0.5 rounded-sm">
            Namenwort
          </span>
          <span className="text-[10px] text-slate-500 mt-1 font-body leading-tight text-center">
            Hund, Baum, Haus (Groß!)
          </span>
        </button>

        {/* VERBEN (Verbs) Chest */}
        <button
          disabled={hasChecked}
          onClick={() => handleCategorySelect('VERB')}
          className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            selectedCategory === 'VERB'
              ? 'bg-emerald-100 border-emerald-500 scale-102 ring-4 ring-emerald-200 shadow-md'
              : 'bg-white border-brand-surface-highest hover:bg-emerald-50/30'
          }`}
        >
          <span className="text-4xl mb-2 filter drop-shadow">🏃</span>
          <h4 className="text-base font-extrabold text-[#286c2d] stroke-black font-sans">Verb</h4>
          <span className="text-[10px] text-emerald-700 font-bold uppercase mt-0.5 bg-emerald-200/50 px-1.5 py-0.5 rounded-sm">
            Tuwort
          </span>
          <span className="text-[10px] text-slate-500 mt-1 font-body leading-tight text-center">
            rennen, singen, essen (klein)
          </span>
        </button>

        {/* ADJEKTIVE (Adjectives) Chest */}
        <button
          disabled={hasChecked}
          onClick={() => handleCategorySelect('ADJEKTIV')}
          className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            selectedCategory === 'ADJEKTIV'
              ? 'bg-sky-100 border-sky-500 scale-102 ring-4 ring-sky-200 shadow-md'
              : 'bg-white border-brand-surface-highest hover:bg-sky-50/30'
          }`}
        >
          <span className="text-4xl mb-2 filter drop-shadow">✨</span>
          <h4 className="text-base font-extrabold text-sky-800 font-sans">Adjektiv</h4>
          <span className="text-[10px] text-sky-700 font-bold uppercase mt-0.5 bg-sky-200/50 px-1.5 py-0.5 rounded-sm">
            Wiewort
          </span>
          <span className="text-[10px] text-slate-500 mt-1 font-body leading-tight text-center">
            schnell, bunt, klug (klein)
          </span>
        </button>

      </div>

      {/* Action panel & feedback */}
      <div className="space-y-4">
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
                className={`px-6 py-2.5 rounded-xl text-sm sm:text-base font-extrabold shadow-md flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory
                    ? 'btn-tactile-secondary text-[#725c00]'
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
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs sm:text-sm text-amber-900 leading-relaxed font-semibold">
             💡 <strong>Grammatik-Tipp:</strong> {exercise.hint}
          </div>
        )}
      </div>
    </div>
  );
}
