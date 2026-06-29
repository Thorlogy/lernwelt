import React, { useState, useEffect } from 'react';
import { Exercise, UserProgress } from '../types';
import { playPop, playSuccess, playFailure } from '../utils/audio';
import { Star, HelpCircle, ArrowRight, CheckCircle, Percent } from 'lucide-react';

interface StationMathFractionsProps {
  exercise: Exercise;
  onCorrectAnswer: (starsGained: number) => void;
  onIncorrectAnswer: () => void;
  onNext: () => void;
  progress: UserProgress;
  isLastExercise: boolean;
  onSaveMetrics: (method: 'A' | 'B', timeSeconds: number, attemptsCount: number, isFirstTryCorrect: boolean) => void;
}

export default function StationMathFractions({
  exercise,
  onCorrectAnswer,
  onIncorrectAnswer,
  onNext,
  progress,
  isLastExercise,
  onSaveMetrics,
}: StationMathFractionsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // A/B Didactic Method selection ('A' = Germany: Pizza, 'B' = Singapore: Fraction Bar)
  const [didacticMethod, setDidacticMethod] = useState<'A' | 'B'>('A');

  // Performance tracking states
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    setSelectedOption(null);
    setHasChecked(false);
    setIsCorrect(null);
    setShakeTrigger(false);
    setShowHint(false);
    setStartTime(Date.now());
    setAttempts(0);
  }, [exercise]);

  const handleOptionSelect = (option: string) => {
    if (hasChecked) return;
    playPop();
    setSelectedOption(option);
  };

  const handleCheck = () => {
    if (!selectedOption || hasChecked) return;

    const currentAttempts = attempts + 1;
    setAttempts(currentAttempts);

    const correct = selectedOption.trim() === exercise.correctAnswer.toString().trim();
    setIsCorrect(correct);
    setHasChecked(true);

    if (correct) {
      playSuccess();
      onCorrectAnswer(15);

      // Save A/B metrics
      const timeTaken = Math.max(1, Math.round((Date.now() - startTime) / 1000));
      const firstTry = currentAttempts === 1;
      onSaveMetrics(didacticMethod, timeTaken, currentAttempts, firstTry);
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

  // 1. Didaktisches Hilfsmittel Methode A: Pizza (Kreismodell)
  const renderPizza = () => {
    const totalSegments = exercise.mathFractionSegments || 8;
    const coloredSegments = exercise.mathFractionColored || 3;

    const center = 50;
    const r = 40;
    const slices = [];

    for (let i = 0; i < totalSegments; i++) {
      const startAngle = (2 * Math.PI * i) / totalSegments - Math.PI / 2;
      const endAngle = (2 * Math.PI * (i + 1)) / totalSegments - Math.PI / 2;

      const x1 = center + r * Math.cos(startAngle);
      const y1 = center + r * Math.sin(startAngle);
      const x2 = center + r * Math.cos(endAngle);
      const y2 = center + r * Math.sin(endAngle);

      const largeArcFlag = 0;
      const pathData = `
        M ${center} ${center}
        L ${x1} ${y1}
        A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}
        Z
      `;

      const isColored = i < coloredSegments;

      slices.push(
        <path
          key={i}
          d={pathData}
          className={`transition-all duration-300 stroke-amber-950 stroke-1.5 ${
            isColored 
              ? 'fill-amber-300 hover:fill-amber-400 saturate-120' 
              : 'fill-slate-100 hover:fill-slate-200'
          }`}
        />
      );
    }

    return (
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 bg-amber-50 rounded-full border-4 border-amber-900/10 p-2 shadow-soft-tactile">
          <svg className="w-full h-full drop-shadow-md overflow-visible" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="41" className="fill-amber-700/20 stroke-amber-800/40 stroke-2" />
            {slices}
            <circle cx="50" cy="50" r="2.5" className="fill-amber-950" />
          </svg>
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">
          🍕 Methode A: Kreismodell (Pizza)
        </p>
      </div>
    );
  };

  // 1b. Didaktisches Hilfsmittel Methode B: Fraction Bar (Balkenmodell - Singapur)
  const renderFractionBar = () => {
    const totalSegments = exercise.mathFractionSegments || 8;
    const coloredSegments = exercise.mathFractionColored || 3;

    const segments = Array(totalSegments).fill(null);

    return (
      <div className="flex flex-col items-center mb-6">
        <div className="w-full max-w-sm px-4 pt-4 pb-2">
          {/* Main Bar */}
          <div className="flex border-3 border-orange-950 rounded-xl overflow-hidden shadow-sm h-12">
            {segments.map((_, idx) => {
              const isColored = idx < coloredSegments;
              return (
                <div
                  key={idx}
                  className={`flex-1 border-r last:border-r-0 border-orange-950/70 transition-colors duration-300 ${
                    isColored
                      ? 'bg-amber-300 saturate-110 border-b-4 border-b-amber-400'
                      : 'bg-slate-100'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Legend descriptor */}
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans mt-2">
          📊 Methode B: Strecken-/Balkenmodell (Singapur Math)
        </p>
      </div>
    );
  };

  // Helper to parse option strings like "3/8" into a nicely formatted fractions view
  const renderFraction = (fractionStr: string) => {
    if (!fractionStr.includes('/')) return <span>{fractionStr}</span>;
    const parts = fractionStr.split('/');
    return (
      <span className="flex flex-col items-center leading-none justify-center">
        <span className="text-base font-extrabold text-slate-800">{parts[0]}</span>
        <span className="border-t-2 border-slate-700 w-6 my-0.5"></span>
        <span className="text-base font-extrabold text-slate-800">{parts[1]}</span>
      </span>
    );
  };

  return (
    <div className={`bg-white rounded-3xl p-6 shadow-high-tactile border border-slate-100 max-w-xl mx-auto ${shakeTrigger ? 'animate-shake' : ''}`}>
      
      {/* A/B Method Switcher */}
      <div className="flex justify-end mb-4">
        <div className="flex p-0.5 bg-slate-100 rounded-xl border border-slate-200 text-[10px] font-bold">
          <button
            type="button"
            onClick={() => { playPop(); setDidacticMethod('A'); }}
            className={`px-2.5 py-1 rounded-lg cursor-pointer ${
              didacticMethod === 'A' ? 'bg-white text-orange-950 shadow-xs border-b border-slate-200' : 'text-slate-400'
            }`}
          >
            Methode A (Pizza)
          </button>
          <button
            type="button"
            onClick={() => { playPop(); setDidacticMethod('B'); }}
            className={`px-2.5 py-1 rounded-lg cursor-pointer ${
              didacticMethod === 'B' ? 'bg-white text-orange-950 shadow-xs border-b border-slate-200' : 'text-slate-400'
            }`}
          >
            Methode B (Balken)
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-4">
        <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-[#00639a] flex items-center justify-center gap-2">
          <Percent className="w-6 h-6 text-[#00639a]" />
          <span>Bruchteile-Forscher!</span>
        </h3>
        <p className="text-xs text-brand-secondary font-bold uppercase mt-0.5">
          Klasse 4 • Bruchrechnen
        </p>
      </div>

      {/* Question Prompt */}
      <div className="bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-50 p-5 rounded-2xl border-2 border-orange-200 shadow-sm text-center mb-6 relative">
        <h2 className="text-base sm:text-lg font-bold text-slate-800 font-body">
          {exercise.question}
        </h2>
      </div>

      {/* Visual representation */}
      {didacticMethod === 'A' ? renderPizza() : renderFractionBar()}

      {/* Tactile fraction selection cards */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {exercise.options?.map((option, idx) => {
          const isSelected = selectedOption === option;
          const isOptionCorrect = option.trim() === exercise.correctAnswer.toString().trim();
          
          let btnClass = "bg-white border-slate-200 hover:bg-slate-50 text-slate-800";
          if (isSelected) {
            if (hasChecked) {
              btnClass = isCorrect
                ? "bg-emerald-100 border-emerald-500 text-emerald-800 ring-4 ring-emerald-200 shadow-md"
                : "bg-red-100 border-red-500 text-red-800 ring-4 ring-red-200 shadow-md";
            } else {
              btnClass = "bg-orange-100 border-orange-400 text-orange-800 ring-4 ring-orange-200 shadow-md";
            }
          } else if (hasChecked && isOptionCorrect && !isCorrect) {
            btnClass = "bg-emerald-50 border-emerald-300 text-emerald-800";
          }

          return (
            <button
              key={idx}
              disabled={hasChecked}
              onClick={() => handleOptionSelect(option)}
              className={`py-3 px-1 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-center ${btnClass}`}
            >
              {renderFraction(option)}
            </button>
          );
        })}
      </div>

      {/* Actions & Feedback */}
      <div className="space-y-4">
        {hasChecked && isCorrect === true && (
          <div className="bg-emerald-100 text-emerald-800 p-3 rounded-2xl border-2 border-emerald-300 text-center font-bold text-sm sm:text-base flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" /> Absolut richtig! Du hast die Stücke perfekt abgezählt! 🌟
          </div>
        )}

        {hasChecked && isCorrect === false && (
          <div className="bg-yellow-50 text-yellow-800 p-3 rounded-2xl border-2 border-yellow-200 text-center font-bold text-sm sm:text-base">
            Das war leider die falsche Teilung. Schau dir das Modell noch einmal genau an! 🤔
          </div>
        )}

        <div className="flex justify-between items-center gap-3">
          <button
            onClick={() => { playPop(); setShowHint(!showHint); }}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-300 text-slate-500 hover:text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-colors cursor-pointer text-xs sm:text-sm font-bold font-body"
          >
            <HelpCircle className="w-4 h-4" /> Bruchhilfe
          </button>

          <div className="flex gap-2">
            {!hasChecked ? (
              <button
                disabled={!selectedOption}
                onClick={handleCheck}
                className={`px-6 py-2.5 rounded-xl text-sm sm:text-base font-extrabold shadow-md flex items-center gap-1.5 cursor-pointer ${
                  selectedOption
                    ? 'btn-tactile-secondary text-orange-950 border-b-4 border-yellow-500'
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
                Nächste Pizza! <ArrowRight className="w-5 h-5 animate-pulse" />
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
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-xs sm:text-sm text-orange-900 leading-relaxed font-semibold">
            💡 <strong>Bruch-Tipp:</strong> {exercise.hint}
          </div>
        )}
      </div>
    </div>
  );
}
