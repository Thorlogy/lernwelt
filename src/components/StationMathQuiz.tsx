import React, { useState, useEffect } from 'react';
import { Exercise, UserProgress } from '../types';
import { playPop, playSuccess, playFailure } from '../utils/audio';
import { Star, HelpCircle, ArrowRight, CheckCircle, Calculator, Coins } from 'lucide-react';

interface StationMathQuizProps {
  exercise: Exercise;
  onCorrectAnswer: (starsGained: number) => void;
  onIncorrectAnswer: () => void;
  onNext: () => void;
  progress: UserProgress;
  isLastExercise: boolean;
  stationId: number; // 7 = Grade 1, 8 = Grade 2, 9 = Grade 3
  onSaveMetrics: (method: 'A' | 'B', timeSeconds: number, attemptsCount: number, isFirstTryCorrect: boolean) => void;
}

export default function StationMathQuiz({
  exercise,
  onCorrectAnswer,
  onIncorrectAnswer,
  onNext,
  progress,
  isLastExercise,
  stationId,
  onSaveMetrics,
}: StationMathQuizProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // A/B Didactic Method selection ('A' = Germany, 'B' = Singapore)
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
      onCorrectAnswer(15); // Award 15 stars

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

  // 1. Didaktisches Hilfsmittel für Klasse 1: Zwanzigerfeld (Methode A)
  const renderZwanzigerfeld = () => {
    if (stationId !== 7 || exercise.mathNum1 === undefined) return null;

    const num1 = exercise.mathNum1 || 0;
    const num2 = exercise.mathNum2 || 0;
    const op = exercise.mathOp;

    const cells: ('empty' | 'red' | 'blue')[] = Array(20).fill('empty');

    if (op === '+') {
      for (let i = 0; i < Math.min(num1, 20); i++) {
        cells[i] = 'red';
      }
      for (let i = 0; i < Math.min(num2, 20 - num1); i++) {
        cells[num1 + i] = 'blue';
      }
    } else if (op === '-') {
      for (let i = 0; i < Math.min(num1, 20); i++) {
        cells[i] = i < num1 - num2 ? 'red' : 'empty';
      }
    }

    return (
      <div className="mt-4 p-4 bg-slate-50 rounded-2xl border-2 border-slate-200/80 max-w-sm mx-auto">
        <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-2 font-sans text-center">
          🏫 Methode A: Zwanzigerfeld (Punktebild)
        </span>
        
        <div className="grid grid-cols-10 gap-1.5 bg-white p-2 rounded-xl border border-slate-300 shadow-inner">
          {cells.map((cell, idx) => {
            let cellStyle = 'bg-slate-100 border-slate-200';
            if (cell === 'red') {
              cellStyle = 'bg-red-500 border-red-600 scale-102';
            } else if (cell === 'blue') {
              cellStyle = 'bg-blue-500 border-blue-600 scale-102';
            }

            return (
              <div
                key={idx}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all ${cellStyle}`}
              >
                {op === '-' && idx >= num1 - num2 && idx < num1 && (
                  <span className="text-red-500 font-black text-xs select-none">❌</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-4 mt-2.5 text-[10px] font-bold text-slate-500 font-body">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span> Rote Punkte ({num1})
          </span>
          {op === '+' && (
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> Blaue Punkte ({num2})
            </span>
          )}
          {op === '-' && (
            <span className="flex items-center gap-1.5">
              <span className="text-red-500">❌</span> Weggenommen ({num2})
            </span>
          )}
        </div>
      </div>
    );
  };

  // 1b. Didaktisches Hilfsmittel für Klasse 1: Number Bonds (Methode B - Singapur)
  const renderNumberBonds = () => {
    if (stationId !== 7 || exercise.mathNum1 === undefined || exercise.mathNum2 === undefined) return null;

    const num1 = exercise.mathNum1;
    const num2 = exercise.mathNum2;
    const op = exercise.mathOp;

    let wholeLabel = '?';
    let part1Label = num1.toString();
    let part2Label = num2.toString();

    if (op === '+') {
      wholeLabel = hasChecked && isCorrect ? exercise.correctAnswer.toString() : '?';
    } else if (op === '-') {
      wholeLabel = num1.toString();
      part1Label = num2.toString();
      part2Label = hasChecked && isCorrect ? exercise.correctAnswer.toString() : '?';
    }

    return (
      <div className="mt-4 p-4 bg-slate-50 rounded-2xl border-2 border-slate-200/80 max-w-sm mx-auto">
        <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-2 font-sans text-center">
          🏫 Methode B: Number Bonds (Zahlbeziehungen)
        </span>
        
        {/* Render simple SVG of Number Bonds (Whole & Parts) */}
        <div className="flex justify-center py-2">
          <svg className="w-40 h-32" viewBox="0 0 100 80">
            {/* Lines */}
            <line x1="50" y1="20" x2="25" y2="60" stroke="#64748b" strokeWidth="2.5" />
            <line x1="50" y1="20" x2="75" y2="60" stroke="#64748b" strokeWidth="2.5" />

            {/* Whole Circle */}
            <circle cx="50" cy="20" r="13" className="fill-indigo-100 stroke-indigo-500 stroke-2" />
            <text x="50" y="24" textAnchor="middle" className="text-[9px] font-black fill-indigo-900 font-sans">{wholeLabel}</text>
            <text x="50" y="5" textAnchor="middle" className="text-[5px] font-bold fill-slate-400 uppercase font-sans">Ganzes</text>

            {/* Part 1 Circle */}
            <circle cx="25" cy="60" r="11" className="fill-amber-50 stroke-amber-500 stroke-2" />
            <text x="25" y="63.5" textAnchor="middle" className="text-[8px] font-bold fill-amber-900 font-sans">{part1Label}</text>
            <text x="25" y="78" textAnchor="middle" className="text-[5px] font-bold fill-slate-400 uppercase font-sans">Teil 1</text>

            {/* Part 2 Circle */}
            <circle cx="75" cy="60" r="11" className="fill-blue-50 stroke-blue-500 stroke-2" />
            <text x="75" y="63.5" textAnchor="middle" className="text-[8px] font-bold fill-blue-900 font-sans">{part2Label}</text>
            <text x="75" y="78" textAnchor="middle" className="text-[5px] font-bold fill-slate-400 uppercase font-sans">Teil 2</text>
          </svg>
        </div>
      </div>
    );
  };

  // 2. Didaktisches Hilfsmittel für Klasse 2: Punktefeld (Methode A)
  const renderPunktefeld = () => {
    if (stationId !== 8 || exercise.mathNum1 === undefined || exercise.mathNum2 === undefined) return null;

    const rows = exercise.mathNum1;
    const cols = exercise.mathNum2;

    const dotRows = Array(rows).fill(null);
    const dotCols = Array(cols).fill(null);

    return (
      <div className="mt-4 p-4 bg-slate-50 rounded-2xl border-2 border-slate-200/80 max-w-sm mx-auto">
        <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-3 font-sans text-center">
          🏫 Methode A: Punktefeld (Multiplikationsraster)
        </span>

        <div className="flex flex-col items-center gap-2 bg-white p-3 rounded-xl border border-slate-300 shadow-inner">
          {dotRows.map((_, rIdx) => (
            <div key={rIdx} className="flex gap-2">
              {dotCols.map((_, cIdx) => (
                <div
                  key={cIdx}
                  className="w-5 h-5 rounded-full bg-amber-400 border border-amber-500 shadow-inner"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 2b. Didaktisches Hilfsmittel für Klasse 2: Bar Model (Methode B - Singapur)
  const renderBarModel = () => {
    if (stationId !== 8 || exercise.mathNum1 === undefined || exercise.mathNum2 === undefined) return null;

    const blocksCount = exercise.mathNum1;
    const blockSize = exercise.mathNum2;

    const blocks = Array(blocksCount).fill(blockSize);

    return (
      <div className="mt-4 p-4 bg-slate-50 rounded-2xl border-2 border-slate-200/80 max-w-sm mx-auto text-center">
        <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-3 font-sans text-center">
          🏫 Methode B: Bar Model (Balkenmodell)
        </span>

        {/* Render a single bar divided into blocks */}
        <div className="relative pt-2 pb-6 px-4">
          <div className="flex border-2 border-emerald-700 rounded-lg overflow-hidden shadow-sm h-10">
            {blocks.map((val, idx) => (
              <div
                key={idx}
                className="flex-1 bg-emerald-100/50 border-r last:border-r-0 border-emerald-700 flex items-center justify-center font-black text-emerald-800 text-sm font-sans"
              >
                {val}
              </div>
            ))}
          </div>

          {/* Under brace connector */}
          <div className="absolute inset-x-4 bottom-0 flex flex-col items-center">
            {/* Draw a brackets bracket */}
            <div className="w-[96%] h-1.5 border-x border-b border-slate-500 rounded-b-md"></div>
            <span className="text-xs font-black text-slate-700 mt-1 font-sans">
              Gesamt: {hasChecked && isCorrect ? exercise.correctAnswer : '?'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // 3. Didaktisches Hilfsmittel für Klasse 3: Größen-Detektiv (Euro/Münzen & Gegenstände)
  const renderGroessenHilfe = () => {
    if (stationId !== 9) return null;

    const isMoneyTask = exercise.question.includes('€') || exercise.question.includes('Geld');
    const isWeightTask = exercise.question.includes('g') || exercise.question.includes('kg');
    const isTimeTask = exercise.question.includes('Uhr') || exercise.question.includes('Minuten');

    let illustrationText = "💼 Alltagsgröße";
    let illustration = <Coins className="w-10 h-10 text-emerald-500 animate-bounce" />;

    if (isMoneyTask) {
      illustrationText = "🪙 Geld-Rechnen";
      illustration = (
        <div className="flex gap-2 justify-center items-center">
          <span className="w-10 h-10 rounded-full bg-yellow-400 border-2 border-yellow-500 text-yellow-950 font-black text-sm flex items-center justify-center shadow-md select-none">2€</span>
          <span className="w-8 h-8 rounded-full bg-slate-300 border-2 border-slate-400 text-slate-800 font-black text-xs flex items-center justify-center shadow-md select-none">50c</span>
          <span className="w-7 h-7 rounded-full bg-yellow-600 border-2 border-yellow-700 text-yellow-100 font-black text-[9px] flex items-center justify-center shadow-md select-none">10c</span>
        </div>
      );
    } else if (isWeightTask) {
      illustrationText = "⚖️ Gewichte (g / kg)";
      illustration = <span className="text-4xl">⚖️ Packung Mehl & Zucker</span>;
    } else if (isTimeTask) {
      illustrationText = "⏰ Uhrzeit & Dauer";
      illustration = <span className="text-4xl">🕒 🕓 🕗</span>;
    }

    return (
      <div className="mt-4 p-4 bg-slate-50 rounded-2xl border-2 border-slate-200/80 max-w-sm mx-auto text-center">
        <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-2 font-sans">
          {illustrationText}
        </span>
        <div className="py-2 flex justify-center">{illustration}</div>
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-3xl p-6 shadow-high-tactile border border-slate-100 max-w-xl mx-auto ${shakeTrigger ? 'animate-shake' : ''}`}>
      
      {/* A/B Method Switcher (only for classes 1 and 2 where we compare A and B) */}
      {(stationId === 7 || stationId === 8) && (
        <div className="flex justify-end mb-4">
          <div className="flex p-0.5 bg-slate-100 rounded-xl border border-slate-200 text-[10px] font-bold">
            <button
              type="button"
              onClick={() => { playPop(); setDidacticMethod('A'); }}
              className={`px-2.5 py-1 rounded-lg cursor-pointer ${
                didacticMethod === 'A' ? 'bg-white text-cyan-950 shadow-xs border-b border-slate-200' : 'text-slate-400'
              }`}
            >
              Methode A (Punkte)
            </button>
            <button
              type="button"
              onClick={() => { playPop(); setDidacticMethod('B'); }}
              className={`px-2.5 py-1 rounded-lg cursor-pointer ${
                didacticMethod === 'B' ? 'bg-white text-indigo-950 shadow-xs border-b border-slate-200' : 'text-slate-400'
              }`}
            >
              Methode B (Singapur)
            </button>
          </div>
        </div>
      )}

      {/* Title */}
      <div className="text-center mb-4">
        <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-[#00639a] flex items-center justify-center gap-2">
          <Calculator className="w-6 h-6 text-[#00639a]" />
          <span>Mathe-Rätsel lösen!</span>
        </h3>
        <p className="text-xs text-brand-secondary font-bold uppercase mt-0.5">
          Klasse {stationId === 7 ? '1' : stationId === 8 ? '2' : '3'} • {stationId === 7 ? 'Rechen-König' : stationId === 8 ? 'Einmaleins' : 'Größen'}
        </p>
      </div>

      {/* Question Card */}
      <div className="bg-gradient-to-r from-cyan-50 via-teal-50 to-cyan-50 p-6 rounded-2xl border-2 border-cyan-200 shadow-sm text-center mb-6 relative">
        <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest block mb-2 font-sans">
          Rechne im Kopf
        </span>
        <h2 className="text-lg sm:text-xl font-bold text-slate-800 font-body leading-relaxed">
          {exercise.question}
        </h2>
      </div>

      {/* Dynamic Didactical Visual Aid */}
      {stationId === 7 && didacticMethod === 'A' && renderZwanzigerfeld()}
      {stationId === 7 && didacticMethod === 'B' && renderNumberBonds()}
      {stationId === 8 && didacticMethod === 'A' && renderPunktefeld()}
      {stationId === 8 && didacticMethod === 'B' && renderBarModel()}
      {stationId === 9 && renderGroessenHilfe()}

      {/* Options grid */}
      <div className="grid grid-cols-2 gap-4 mt-6 mb-8">
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
              btnClass = "bg-cyan-100 border-cyan-500 text-cyan-800 ring-4 ring-cyan-200 shadow-md";
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
          <div className="bg-emerald-100 text-emerald-800 p-3 rounded-2xl border-2 border-emerald-300 text-center font-bold text-sm sm:text-base flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" /> Blitzschnell gerechnet! Das Ergebnis stimmt! ⭐
          </div>
        )}

        {hasChecked && isCorrect === false && (
          <div className="bg-yellow-50 text-yellow-800 p-3 rounded-2xl border-2 border-yellow-200 text-center font-bold text-sm sm:text-base">
            Das stimmt leider noch nicht. Überprüfe die Punkte oder Sachhilfe noch einmal! 🤔
          </div>
        )}

        <div className="flex justify-between items-center gap-3">
          <button
            onClick={() => { playPop(); setShowHint(!showHint); }}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-300 text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 hover:border-cyan-300 transition-colors cursor-pointer text-xs sm:text-sm font-bold font-body"
          >
            <HelpCircle className="w-4 h-4" /> Rechenhilfe
          </button>

          <div className="flex gap-2">
            {!hasChecked ? (
              <button
                disabled={!selectedOption}
                onClick={handleCheck}
                className={`px-6 py-2.5 rounded-xl text-sm sm:text-base font-extrabold shadow-md flex items-center gap-1.5 cursor-pointer ${
                  selectedOption
                    ? 'btn-tactile-secondary text-cyan-950 border-b-4 border-yellow-500'
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
                Nächste Aufgabe! <ArrowRight className="w-5 h-5 animate-pulse" />
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
          <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-3 text-xs sm:text-sm text-cyan-950 leading-relaxed font-semibold">
            💡 <strong>Tipp:</strong> {exercise.hint}
          </div>
        )}
      </div>
    </div>
  );
}
