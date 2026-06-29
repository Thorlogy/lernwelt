import React, { useState, useEffect } from 'react';
import { Exercise, UserProgress } from '../types';
import { playPop, playSuccess, playFailure } from '../utils/audio';
import { Star, HelpCircle, ArrowRight, CheckCircle, Percent, Sliders, Award } from 'lucide-react';

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
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // A/B Didactic Method selection ('A' = Germany: Pizza, 'B' = Singapore: Fraction Bar)
  const [didacticMethod, setDidacticMethod] = useState<'A' | 'B'>('A');

  // Performance tracking states
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [attempts, setAttempts] = useState<number>(0);

  // Interactive slider and coloring states
  // We parse target values from correct answer (e.g. "3/8" -> targetNum = 3, targetDen = 8)
  const [targetNum, targetDen] = exercise.correctAnswer.includes('/') 
    ? exercise.correctAnswer.split('/').map(Number)
    : [1, 2];

  const [customSegments, setCustomSegments] = useState<number>(targetDen);
  const [coloredSlices, setColoredSlices] = useState<boolean[]>(Array(targetDen).fill(false));

  // Socratic reflection states (triggered at the end of the station)
  const [showSocratic, setShowSocratic] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null);
  const [socraticChecked, setSocraticChecked] = useState(false);

  useEffect(() => {
    setHasChecked(false);
    setIsCorrect(null);
    setShakeTrigger(false);
    setShowHint(false);
    setStartTime(Date.now());
    setAttempts(0);
    
    // Set custom segments default directly to the target denominator
    setCustomSegments(targetDen);
    setColoredSlices(Array(targetDen).fill(false));
  }, [exercise, targetDen]);

  // Adjust segment count dynamically
  const handleSegmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    playPop();
    setCustomSegments(val);
    setColoredSlices(Array(val).fill(false)); // Reset coloring when slicing changes
  };

  // Toggle color of a slice/segment
  const toggleSliceColor = (idx: number) => {
    if (hasChecked) return;
    playPop();
    const newColored = [...coloredSlices];
    newColored[idx] = !newColored[idx];
    setColoredSlices(newColored);
  };

  const handleCheck = () => {
    const currentAttempts = attempts + 1;
    setAttempts(currentAttempts);

    // Count colored segments
    const activeCount = coloredSlices.filter(Boolean).length;
    
    // Evaluate if the fraction matches the target fraction (value-wise)
    const matchesExact = customSegments === targetDen && activeCount === targetNum;
    
    setIsCorrect(matchesExact);
    setHasChecked(true);

    if (matchesExact) {
      playSuccess();
      onCorrectAnswer(15);
      onSaveMetrics(didacticMethod, Math.max(1, Math.round((Date.now() - startTime) / 1000)), currentAttempts, currentAttempts === 1);
    } else {
      playFailure();
      setShakeTrigger(true);
      onIncorrectAnswer();
      setTimeout(() => setShakeTrigger(false), 800);
    }
  };

  const handleRetry = () => {
    setHasChecked(false);
    setIsCorrect(null);
    setColoredSlices(Array(customSegments).fill(false));
  };

  // Proceed or show Socratic reflection
  const handleProceed = () => {
    if (isLastExercise && !showSocratic) {
      playPop();
      setShowSocratic(true);
    } else {
      onNext();
    }
  };

  const handleSocraticCheck = () => {
    if (selectedStrategy === null) return;
    playPop();
    setSocraticChecked(true);
  };

  // Socratic strategies for Fractions
  const socraticQuestion = "Klasse gearbeitet! Bevor es den Pokal gibt, möchte Lumi etwas von dir lernen: Warum eignen sich Strecken-Balkenmodelle manchmal besser zum Vergleichen von Brüchen als runde Pizzamodelle?";
  const socraticStrategies = [
    {
      text: "Weil runde Pizzen leckerer aussehen, und man beim Lernen nicht an Essen denken sollte.",
      feedback: "Das lenkt in der Tat ab! Aber mathematisch gibt es noch einen viel wichtigeren Grund. 👍",
      isBest: false
    },
    {
      text: "Weil man beim Balken die Längen direkt nebeneinander vergleichen kann, während man bei runden Stücken die Winkel und Flächen im Kopf schwer schätzen kann.",
      feedback: "Hervorragend! Das Balkenmodell reduziert die visuelle Komplexität (kognitive Belastung) im Gehirn, was Vergleiche viel einfacher macht! 🏆",
      isBest: true
    },
    {
      text: "Weil eckige Balken einfacher zu zeichnen sind als Kreise.",
      feedback: "Das stimmt zwar beim Zeichnen, aber der Hauptgrund ist der leichtere visuelle Vergleich von Längen! 👍",
      isBest: false
    }
  ];

  // 1. Kreismodell: Pizza
  const renderPizza = () => {
    const center = 50;
    const r = 40;
    const slices = [];

    for (let i = 0; i < customSegments; i++) {
      const startAngle = (2 * Math.PI * i) / customSegments - Math.PI / 2;
      const endAngle = (2 * Math.PI * (i + 1)) / customSegments - Math.PI / 2;

      const x1 = center + r * Math.cos(startAngle);
      const y1 = center + r * Math.sin(startAngle);
      const x2 = center + r * Math.cos(endAngle);
      const y2 = center + r * Math.sin(endAngle);

      const pathData = `
        M ${center} ${center}
        L ${x1} ${y1}
        A ${r} ${r} 0 0 1 ${x2} ${y2}
        Z
      `;

      const isColored = coloredSlices[i];

      slices.push(
        <path
          key={i}
          d={pathData}
          onClick={() => toggleSliceColor(i)}
          className={`transition-all duration-300 stroke-red-950 stroke-1.5 cursor-pointer ${
            isColored 
              ? 'fill-red-500 hover:fill-red-650 saturate-120' 
              : 'fill-amber-50 hover:fill-amber-100'
          }`}
        />
      );
    }

    return (
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 bg-amber-50 rounded-full border-4 border-amber-900/10 p-2 shadow-soft-tactile mb-4">
          <svg className="w-full h-full drop-shadow-md overflow-visible" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="41" className="fill-amber-700/10 stroke-amber-800/40 stroke-2" />
            {slices}
            <circle cx="50" cy="50" r="2.5" className="fill-amber-950" />
          </svg>
        </div>
        <p className="text-sm font-extrabold text-[#00639a] font-body tracking-wide text-center">
          🍕 Tippe auf die Pizzastücke, um sie zu belegen!
        </p>
      </div>
    );
  };

  // 1b. Kreismodell: Waffel
  const renderWaffle = () => {
    const center = 50;
    const r = 40;
    const slices = [];

    for (let i = 0; i < customSegments; i++) {
      const startAngle = (2 * Math.PI * i) / customSegments - Math.PI / 2;
      const endAngle = (2 * Math.PI * (i + 1)) / customSegments - Math.PI / 2;

      const x1 = center + r * Math.cos(startAngle);
      const y1 = center + r * Math.sin(startAngle);
      const x2 = center + r * Math.cos(endAngle);
      const y2 = center + r * Math.sin(endAngle);

      const pathData = `
        M ${center} ${center}
        L ${x1} ${y1}
        A ${r} ${r} 0 0 1 ${x2} ${y2}
        Z
      `;

      const isColored = coloredSlices[i];

      slices.push(
        <path
          key={i}
          d={pathData}
          onClick={() => toggleSliceColor(i)}
          className={`transition-all duration-300 stroke-amber-900 stroke-1 cursor-pointer ${
            isColored 
              ? 'fill-yellow-400 hover:fill-yellow-500 saturate-120' 
              : 'fill-amber-50/80 hover:fill-amber-100/80'
          }`}
        />
      );
    }

    return (
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 bg-amber-50/40 rounded-full border-4 border-amber-800/25 p-2 shadow-soft-tactile mb-4">
          <svg className="w-full h-full drop-shadow-md overflow-visible" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="41" className="fill-amber-600/10 stroke-amber-700/30 stroke-1.5" />
            {slices}
            <circle cx="50" cy="50" r="2" className="fill-amber-950" />
          </svg>
        </div>
        <p className="text-sm font-extrabold text-[#00639a] font-body tracking-wide text-center">
          🧇 Tippe auf die Waffelstücke, um sie zu belegen!
        </p>
      </div>
    );
  };

  // 2. Rechteckmodell: Schokolade
  const renderChocolate = () => {
    return (
      <div className="flex flex-col items-center mb-6">
        <div className="w-full max-w-xs p-4 bg-amber-950/5 rounded-2xl border border-amber-950/10 mb-4 flex justify-center">
          <div className="grid grid-cols-3 gap-1.5 bg-amber-900 p-2.5 rounded-xl shadow-md border-2 border-amber-950">
            {Array(customSegments).fill(null).map((_, idx) => {
              const isColored = coloredSlices[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleSliceColor(idx)}
                  className={`w-14 h-10 rounded-lg border-2 border-amber-950/60 transition-colors duration-200 cursor-pointer flex items-center justify-center shadow-inner ${
                    isColored
                      ? 'bg-amber-600 border-t-amber-400 border-l-amber-400'
                      : 'bg-amber-100 hover:bg-amber-50 border-t-amber-200 border-l-amber-200'
                  }`}
                >
                  <div className="w-10 h-7 rounded border border-black/5 bg-black/5"></div>
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-sm font-extrabold text-[#00639a] font-body tracking-wide text-center">
          🍫 Tippe auf die Schokostücke, um sie abzubrechen!
        </p>
      </div>
    );
  };

  // 3. Rechteckmodell: Messbecher
  const renderMeasuringCup = () => {
    return (
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-28 h-52 bg-slate-50 border-4 border-slate-400 rounded-b-2xl rounded-t-lg shadow-inner flex flex-col justify-end p-2 overflow-hidden mb-4">
          <div className="flex flex-col-reverse h-full w-full justify-between gap-1">
            {Array(customSegments).fill(null).map((_, idx) => {
              const isColored = coloredSlices[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleSliceColor(idx)}
                  className={`flex-1 rounded border border-slate-300/40 transition-colors duration-200 cursor-pointer flex items-center justify-end px-2 ${
                    isColored
                      ? 'bg-emerald-400 saturate-125 border-emerald-500 shadow-sm'
                      : 'bg-slate-200/50 hover:bg-slate-200'
                  }`}
                >
                  <div className="w-3 h-0.5 bg-slate-400"></div>
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-sm font-extrabold text-[#00639a] font-body tracking-wide text-center">
          🧪 Tippe auf die Stufen, um Zaubertrank einzufüllen!
        </p>
      </div>
    );
  };

  // 4. Mengenmodell: Sterne (diskrete Menge)
  const renderStarsSet = () => {
    return (
      <div className="flex flex-col items-center mb-6">
        <div className="flex flex-wrap justify-center gap-3.5 p-5 bg-slate-900 rounded-3xl border-2 border-slate-950 mb-4 max-w-sm w-full shadow-md">
          {Array(customSegments).fill(null).map((_, idx) => {
            const isColored = coloredSlices[idx];
            return (
              <button
                key={idx}
                disabled={hasChecked}
                onClick={() => toggleSliceColor(idx)}
                className={`text-4xl transition-all duration-205 transform cursor-pointer filter select-none ${
                  isColored 
                    ? 'scale-115 drop-shadow-[0_0_10px_rgba(253,215,88,0.9)] opacity-100' 
                    : 'opacity-20 hover:opacity-40 scale-100 hover:scale-105'
                }`}
              >
                ⭐
              </button>
            );
          })}
        </div>
        <p className="text-sm font-extrabold text-[#00639a] font-body tracking-wide text-center">
          ✨ Tippe auf die Sterne, damit sie leuchten!
        </p>
      </div>
    );
  };

  // Singapore Fraction Bar (Methode B fallback)
  const renderFractionBar = () => {
    return (
      <div className="flex flex-col items-center mb-6">
        <div className="w-full max-w-sm px-4 pt-4 pb-2 mb-4">
          <div className="flex border-3 border-orange-950 rounded-xl overflow-hidden shadow-sm h-12">
            {Array(customSegments).fill(null).map((_, idx) => {
              const isColored = coloredSlices[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleSliceColor(idx)}
                  className={`flex-1 border-r last:border-r-0 border-orange-950/70 transition-colors duration-300 cursor-pointer ${
                    isColored
                      ? 'bg-amber-300 saturate-110 border-b-4 border-b-amber-400'
                      : 'bg-slate-100 hover:bg-slate-200'
                  }`}
                />
              );
            })}
          </div>
        </div>
        <p className="text-sm font-extrabold text-[#00639a] font-body tracking-wide text-center">
          📊 Tippe auf die Blöcke, um sie bunt anzumalen!
        </p>
      </div>
    );
  };

  const renderActiveModel = () => {
    if (didacticMethod === 'B') {
      return renderFractionBar();
    }

    const placeholder = exercise.imagePlaceholder;
    if (placeholder === 'waffle') return renderWaffle();
    if (placeholder === 'chocolate') return renderChocolate();
    if (placeholder === 'cup') return renderMeasuringCup();
    if (placeholder === 'stars') return renderStarsSet();
    return renderPizza();
  };

  if (showSocratic) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-high-tactile border border-slate-100 max-w-xl mx-auto space-y-6">
        <div className="text-center font-body">
          <span className="text-4xl animate-bounce inline-block">🎓</span>
          <h3 className="font-black text-xl sm:text-2xl text-[#00639a] mt-2">
            Lumis Rechenweg-Erklärer
          </h3>
          <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mt-0.5">
            Bruchrechnen reflektieren
          </p>
        </div>

        <div className="bg-indigo-50 border-2 border-indigo-100 p-5 rounded-2xl text-sm sm:text-base text-indigo-950 font-black leading-relaxed font-body">
          {socraticQuestion}
        </div>

        <div className="space-y-3">
          {socraticStrategies.map((strat, idx) => {
            const isSelected = selectedStrategy === idx;
            let btnStyle = "bg-white border-slate-200 hover:bg-slate-50 text-slate-800";
            if (isSelected) {
              if (socraticChecked) {
                btnStyle = strat.isBest
                  ? "bg-emerald-100 border-emerald-500 text-emerald-950 ring-4 ring-emerald-200 shadow-md"
                  : "bg-amber-100 border-amber-500 text-amber-950 ring-4 ring-amber-200 shadow-md";
              } else {
                btnStyle = "bg-[#fdd758]/20 border-[#fdd758] text-slate-900 ring-4 ring-yellow-100 shadow-md";
              }
            }

            return (
              <button
                key={idx}
                disabled={socraticChecked}
                onClick={() => { playPop(); setSelectedStrategy(idx); }}
                className={`w-full text-left p-4 rounded-2xl border-2 text-sm sm:text-base font-extrabold transition-all cursor-pointer font-body leading-relaxed flex items-start gap-2.5 ${btnStyle}`}
              >
                <span className="text-lg">💬</span>
                <span>{strat.text}</span>
              </button>
            );
          })}
        </div>

        {socraticChecked && selectedStrategy !== null && (
          <div className="bg-slate-50 border p-4 rounded-2xl text-sm sm:text-base text-slate-800 leading-relaxed font-extrabold font-body">
            {socraticStrategies[selectedStrategy].isBest ? (
              <p className="text-emerald-900 flex items-center gap-1.5">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{socraticStrategies[selectedStrategy].feedback}</span>
              </p>
            ) : (
              <p className="text-slate-900 flex items-start gap-1.5">
                <Award className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <span>{socraticStrategies[selectedStrategy].feedback}</span>
              </p>
            )}
          </div>
        )}

        <div className="flex justify-end pt-2">
          {!socraticChecked ? (
            <button
              disabled={selectedStrategy === null}
              onClick={handleSocraticCheck}
              className={`px-7 py-3 rounded-xl text-sm sm:text-base font-extrabold shadow-md ${
                selectedStrategy !== null
                  ? 'btn-tactile-secondary text-cyan-950 border-b-4 border-yellow-500 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 border-b-4 border-slate-300 cursor-not-allowed'
              }`}
            >
              Lumi erklären! 🎓
            </button>
          ) : (
            <button
              onClick={onNext}
              className="btn-tactile-primary text-white px-8 py-3.5 rounded-xl text-sm sm:text-base font-black flex items-center gap-2 cursor-pointer shadow-lg hover:brightness-105"
            >
              Sterne & Urkunden abholen! <ArrowRight className="w-5 h-5 animate-pulse" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-3xl p-6 shadow-high-tactile border border-slate-100 max-w-xl mx-auto ${shakeTrigger ? 'animate-shake' : ''}`}>
      
      {/* A/B Method Switcher */}
      <div className="flex justify-end mb-4">
        <div className="flex p-0.5 bg-slate-100 rounded-xl border border-slate-200 text-[10px] font-bold font-body">
          <button
            type="button"
            onClick={() => { playPop(); setDidacticMethod('A'); }}
            className={`px-2.5 py-1 rounded-lg cursor-pointer ${
              didacticMethod === 'A' ? 'bg-white text-orange-950 shadow-xs border-b border-slate-200' : 'text-slate-400'
            }`}
          >
            Formen-Modell
          </button>
          <button
            type="button"
            onClick={() => { playPop(); setDidacticMethod('B'); }}
            className={`px-2.5 py-1 rounded-lg cursor-pointer ${
              didacticMethod === 'B' ? 'bg-white text-orange-950 shadow-xs border-b border-slate-200' : 'text-slate-400'
            }`}
          >
            Balken-Modell
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-4 font-body">
        <h3 className="font-extrabold text-xl sm:text-2xl text-[#00639a] flex items-center justify-center gap-2">
          <Percent className="w-6 h-6 text-[#00639a]" />
          <span>Bruchteile-Forscher!</span>
        </h3>
        <p className="text-xs text-brand-secondary font-bold uppercase mt-0.5">
          Klasse 4 • Bruchrechnen
        </p>
      </div>

      {/* Question Prompt */}
      <div className="bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-50 p-5 rounded-2xl border-2 border-orange-200 shadow-sm text-center mb-6 relative">
        <span className="text-xs font-bold text-orange-700 uppercase tracking-widest block mb-1 font-sans">
          Bruch-Bauaufgabe
        </span>
        <h2 className="text-base sm:text-lg font-bold text-slate-800 font-body">
          {exercise.question} <span className="text-xl font-black text-orange-850 font-sans block mt-1">{targetNum}/{targetDen}</span>
        </h2>
      </div>

      {/* Segment Slider Controls */}
      <div className="bg-slate-50 border-2 border-slate-200/80 p-4 rounded-2xl mb-6 space-y-3 max-w-sm mx-auto font-body">
        <div className="flex justify-between items-center text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">
          <span className="flex items-center gap-1"><Sliders className="w-3.5 h-3.5" /> Aufteilung anpassen</span>
          <span className="bg-slate-200 px-2 py-0.5 rounded-md font-sans text-slate-700 text-xs">
            {customSegments} Teile (Nenner)
          </span>
        </div>

        <input
          type="range"
          min="2"
          max="12"
          value={customSegments}
          disabled={hasChecked}
          onChange={handleSegmentChange}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />

        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
          <span>2 Teile</span>
          <span>12 Teile</span>
        </div>
      </div>

      {/* Visual representation */}
      {renderActiveModel()}

      {/* Status Bar */}
      <div className="text-center font-bold text-sm text-slate-600 mb-6 bg-slate-50 p-2 rounded-xl border max-w-xs mx-auto font-body">
        Dein eingestellter Bruch: <span className="text-base font-black text-slate-800 font-sans">{coloredSlices.filter(Boolean).length} / {customSegments}</span>
      </div>

      {/* Actions & Feedback */}
      <div className="space-y-4 font-body">
        {hasChecked && isCorrect === true && (
          <div className="bg-emerald-100 text-emerald-800 p-3 rounded-2xl border-2 border-emerald-300 text-center font-bold text-sm sm:text-base flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" /> Absolut richtig! Du hast die Stücke perfekt zerlegt! 🌟
          </div>
        )}

        {hasChecked && isCorrect === false && (
          <div className="bg-yellow-50 text-yellow-800 p-3 rounded-2xl border-2 border-yellow-200 text-center font-bold text-sm sm:text-base">
            Das stimmt leider noch nicht ganz. Kontrolliere Zähler und Nenner noch einmal! 🤔
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
                onClick={handleCheck}
                className="btn-tactile-secondary text-orange-950 border-b-4 border-yellow-500 px-6 py-2.5 rounded-xl text-sm sm:text-base font-extrabold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                Überprüfen! 🎯
              </button>
            ) : isCorrect === true ? (
              <button
                onClick={handleProceed}
                className="btn-tactile-primary text-white px-7 py-3 rounded-xl text-sm sm:text-base font-black flex items-center gap-2 cursor-pointer shadow-lg hover:brightness-105"
              >
                {isLastExercise ? "Station beenden!" : "Nächste Aufgabe!"} <ArrowRight className="w-5 h-5 animate-pulse" />
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
