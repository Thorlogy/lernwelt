import React, { useState, useEffect } from 'react';
import { Exercise, UserProgress } from '../types';
import { playPop, playSuccess, playFailure } from '../utils/audio';
import { applyPrivacyFilter } from '../utils/imageFilter';
import { 
  Star, HelpCircle, ArrowRight, CheckCircle, Calculator, Coins, 
  Camera, Trash2, ShieldAlert, Award, Smile, Info 
} from 'lucide-react';

interface StationMathQuizProps {
  exercise: Exercise;
  onCorrectAnswer: (starsGained: number) => void;
  onIncorrectAnswer: () => void;
  onNext: () => void;
  progress: UserProgress;
  isLastExercise: boolean;
  stationId: number; // 7 = Grade 1, 8 = Grade 2, 9 = Grade 3
  onSaveMetrics: (method: 'A' | 'B', timeSeconds: number, attemptsCount: number, isFirstTryCorrect: boolean, photoProof?: string) => void;
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

  // Camera / Photo proof states (Grade 1)
  const [photoProof, setPhotoProof] = useState<string | null>(null);
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);

  // Interactive Family Partitioning states (Grade 2, Exercise 4/5 division)
  const [familyCount, setFamilyCount] = useState<2 | 3 | 4>(3);
  const [basketItems, setBasketItems] = useState<number[]>([0, 0, 0]);

  // Socratic Reflection states (triggered at the end of the station)
  const [showSocratic, setShowSocratic] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null);
  const [socraticChecked, setSocraticChecked] = useState(false);

  const isPartitioningTask = stationId === 8 && exercise.question.includes('aufteilen');

  useEffect(() => {
    setSelectedOption(null);
    setHasChecked(false);
    setIsCorrect(null);
    setShakeTrigger(false);
    setShowHint(false);
    setStartTime(Date.now());
    setAttempts(0);
    setPhotoProof(null);
    setIsProcessingPhoto(false);
    
    // Reset partitioning if this is a partitioning task
    if (isPartitioningTask) {
      setFamilyCount(3);
      setBasketItems([0, 0, 0]);
    }
  }, [exercise]);

  // Handle family count change in interactive division
  const handleFamilyChange = (count: 2 | 3 | 4) => {
    playPop();
    setFamilyCount(count);
    setBasketItems(Array(count).fill(0));
  };

  // Adjust item count in a basket
  const adjustBasketItem = (basketIdx: number, delta: number) => {
    playPop();
    const currentTotal = basketItems.reduce((a, b) => a + b, 0);
    if (delta > 0 && currentTotal >= 12) return; // limit to 12 total items
    if (delta < 0 && basketItems[basketIdx] <= 0) return;

    const newBaskets = [...basketItems];
    newBaskets[basketIdx] += delta;
    setBasketItems(newBaskets);
  };

  const handleOptionSelect = (option: string) => {
    if (hasChecked) return;
    playPop();
    setSelectedOption(option);
  };

  // Camera upload handler with local Privacy Filter
  const handlePhotoCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    playPop();
    setIsProcessingPhoto(true);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Src = event.target?.result as string;
      try {
        // Apply privacy Sobel edge detector to hide faces/surroundings
        const filteredBase64 = await applyPrivacyFilter(base64Src);
        setPhotoProof(filteredBase64);
      } catch (err) {
        console.error("Error applying image filter:", err);
        // Fallback to original image if filter fails
        setPhotoProof(base64Src);
      } finally {
        setIsProcessingPhoto(false);
      }
    };
    reader.onerror = () => setIsProcessingPhoto(false);
    reader.readAsDataURL(file);
  };

  const handleCheck = () => {
    let correct = false;

    if (isPartitioningTask) {
      // Check interactive partitioning:
      // 1. Total cookies must be exactly 12
      // 2. All baskets must have equal cookies
      // 3. The equal cookies count must equal correct answer (e.g. 12/3 = 4)
      const totalPlaced = basketItems.reduce((a, b) => a + b, 0);
      const firstVal = basketItems[0];
      const isEveryEqual = basketItems.every(v => v === firstVal && v > 0);
      
      correct = totalPlaced === 12 && isEveryEqual && firstVal === Number(exercise.correctAnswer);
      
      const currentAttempts = attempts + 1;
      setAttempts(currentAttempts);
      setIsCorrect(correct);
      setHasChecked(true);

      if (correct) {
        playSuccess();
        onCorrectAnswer(15);
        onSaveMetrics(didacticMethod, Math.max(1, Math.round((Date.now() - startTime) / 1000)), currentAttempts, currentAttempts === 1);
      } else {
        playFailure();
        setShakeTrigger(true);
        onIncorrectAnswer();
        setTimeout(() => setShakeTrigger(false), 800);
      }
      return;
    }

    if (!selectedOption || hasChecked) return;

    const currentAttempts = attempts + 1;
    setAttempts(currentAttempts);

    correct = selectedOption.trim() === exercise.correctAnswer.toString().trim();
    setIsCorrect(correct);
    setHasChecked(true);

    if (correct) {
      playSuccess();
      onCorrectAnswer(15);

      // Save metrics with photo proof thumbnail if available
      const timeTaken = Math.max(1, Math.round((Date.now() - startTime) / 1000));
      const firstTry = currentAttempts === 1;
      onSaveMetrics(didacticMethod, timeTaken, currentAttempts, firstTry, photoProof || undefined);
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
    if (isPartitioningTask) {
      setBasketItems(Array(familyCount).fill(0));
    }
  };

  // Move to next task or show Socratic reflection
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

  // Socratic tutoring options depending on the station type
  const getSocraticDetails = () => {
    if (stationId === 7) {
      return {
        question: "Halt! Bevor wir dir den Sternen-Pokal verleihen, möchte Lumi etwas lernen: Wie rechnest du eine schwere Plusaufgabe wie 8 + 5 am schlausten im Kopf?",
        strategies: [
          {
            text: "Ich starte bei 8 und zähle im Kopf einzeln weiter: 9, 10, 11, 12, 13.",
            feedback: "Das klappt, dauert aber lange und man kann sich leicht verzählen! Versuche nächstes Mal den Zehnerübergang. 👍",
            isBest: false
          },
          {
            text: "Ich mache erst den Zehnerstopp (8 + 2 = 10) und addiere dann die restlichen 3 dazu (10 + 3 = 13).",
            feedback: "Genau! Der Zehnerübergang (Zehnerstopp) ist die sicherste und schnellste Methode, um im Kopf große Summen zu bilden! 🏆",
            isBest: true
          },
          {
            text: "Ich schätze einfach, was nah dran sein könnte.",
            feedback: "Schätzen hilft zur Kontrolle, aber rechnen ist genauer! Probier beim nächsten Mal den Zehnerstopp. 👍",
            isBest: false
          }
        ]
      };
    } else if (stationId === 8) {
      return {
        question: "Super gelöst! Bevor es den Pokal gibt, erzähl Lumi: Wie rechnest du Malaufgaben wie 6 • 7 am besten aus, wenn du das Ergebnis mal vergisst?",
        strategies: [
          {
            text: "Ich nutze ein Punkte- oder Balkenmodell und zähle alle Kästchen einzeln ab.",
            feedback: "Das hilft als Bild, dauert aber viel zu lange! Es gibt schnellere Rechentricks. 👍",
            isBest: false
          },
          {
            text: "Ich nutze eine einfache Nachbaraufgabe (z.B. 5 • 7 = 35) und rechne einfach einmal 7 dazu (35 + 7 = 42).",
            feedback: "Klasse! Über Nachbaraufgaben (Kernaufgaben) kannst du dir jedes schwere Einmaleins-Rätsel blitzschnell herleiten! 🏆",
            isBest: true
          },
          {
            text: "Ich rate so lange herum, bis mir ein Ergebnis bekannt vorkommt.",
            feedback: "Raten ist fehleranfällig. Nutze lieber Kernaufgaben, um das Ergebnis sicher herzuleiten! 👍",
            isBest: false
          }
        ]
      };
    } else {
      return {
        question: "Klasse! Lumi möchte von dir wissen: Wie rechnest du mit Geldbeträgen wie 1,50€ + 2,30€ am einfachsten?",
        strategies: [
          {
            text: "Ich rechne erst die Euros zusammen (1€ + 2€ = 3€) und dann die Cent-Münzen (50c + 30c = 80c) und lege sie zusammen.",
            feedback: "Perfekt! Das Aufteilen in Euro und Cent (Stellenwerte) macht das Kopfrechnen mit Geld kinderleicht! 🏆",
            isBest: true
          },
          {
            text: "Ich tue so, als gäbe es keine Cents und schätze nur die großen Euro-Scheine.",
            feedback: "Dann fehlt dir aber das Wechselgeld! Euro und Cent getrennt zu rechnen ist sicherer. 👍",
            isBest: false
          },
          {
            text: "Ich zähle alle 10-Cent-Stücke einzeln durch, bis ich beim Betrag bin.",
            feedback: "Das dauert bei großen Beträgen viel zu lange. Teile es lieber in Euro und Cents auf! 👍",
            isBest: false
          }
        ]
      };
    }
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
              cellStyle = 'bg-red-500 border-red-600';
            } else if (cell === 'blue') {
              cellStyle = 'bg-blue-500 border-blue-600';
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
        
        <div className="flex justify-center py-2">
          <svg className="w-40 h-32" viewBox="0 0 100 80">
            <line x1="50" y1="20" x2="25" y2="60" stroke="#64748b" strokeWidth="2.5" />
            <line x1="50" y1="20" x2="75" y2="60" stroke="#64748b" strokeWidth="2.5" />

            <circle cx="50" cy="20" r="13" className="fill-indigo-100 stroke-indigo-500 stroke-2" />
            <text x="50" y="24" textAnchor="middle" className="text-[9px] font-black fill-indigo-900 font-sans">{wholeLabel}</text>
            <text x="50" y="5" textAnchor="middle" className="text-[5px] font-bold fill-slate-400 uppercase font-sans">Ganzes</text>

            <circle cx="25" cy="60" r="11" className="fill-amber-50 stroke-amber-500 stroke-2" />
            <text x="25" y="63.5" textAnchor="middle" className="text-[8px] font-bold fill-amber-900 font-sans">{part1Label}</text>
            <text x="25" y="78" textAnchor="middle" className="text-[5px] font-bold fill-slate-400 uppercase font-sans">Teil 1</text>

            <circle cx="75" cy="60" r="11" className="fill-blue-50 stroke-blue-500 stroke-2" />
            <text x="75" y="63.5" textAnchor="middle" className="text-[8px] font-bold fill-blue-900 font-sans">{part2Label}</text>
            <text x="75" y="78" textAnchor="middle" className="text-[5px] font-bold fill-slate-400 uppercase font-sans">Teil 2</text>
          </svg>
        </div>
      </div>
    );
  };

  // Photo Proof Subcomponent (Grade 1)
  const renderPhotoProofComponent = () => {
    if (stationId !== 7) return null;

    return (
      <div className="mt-4 p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 max-w-sm mx-auto text-center space-y-3">
        <div className="flex items-center justify-between text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
          <span>📸 Haptischer Foto-Beweis</span>
          <span className="text-emerald-600 flex items-center gap-0.5">
            <Info className="w-3 h-3" /> Zensur-Filter aktiv
          </span>
        </div>

        {photoProof ? (
          <div className="relative inline-block border-2 border-indigo-200 rounded-xl overflow-hidden shadow-sm bg-white p-1">
            <img 
              src={photoProof} 
              alt="Foto-Beweis stilisierte Outlines" 
              className="w-40 h-32 object-cover bg-slate-50 rounded-lg filter saturate-50"
            />
            <button
              onClick={() => { playPop(); setPhotoProof(null); }}
              className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-sm cursor-pointer border border-white"
              title="Foto löschen"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center py-2">
            <label className="btn-tactile-outline bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-3 rounded-2xl flex items-center gap-2 cursor-pointer text-xs font-black select-none">
              <Camera className="w-4 h-4 text-[#00639a]" />
              <span>{isProcessingPhoto ? "Verfremde Foto..." : "Foto-Beweis schießen"}</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoCapture}
                disabled={isProcessingPhoto}
                className="hidden"
              />
            </label>
            <p className="text-[9px] text-slate-400 font-semibold mt-2 max-w-[240px] leading-snug">
              Leg die Aufgabe mit echten Gegenständen (Nudeln, Steine) auf deinen Tisch! Lumi's Kamera zeichnet das Bild datenschutzsicher weich.
            </p>
          </div>
        )}
      </div>
    );
  };

  // 2. Didaktisches Hilfsmittel für Klasse 2: Punktefeld (Methode A)
  const renderPunktefeld = () => {
    if (stationId !== 8 || isPartitioningTask || exercise.mathNum1 === undefined) return null;

    const rows = exercise.mathNum1;
    const cols = exercise.mathNum2 || 0;

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
    if (stationId !== 8 || isPartitioningTask || exercise.mathNum1 === undefined || exercise.mathNum2 === undefined) return null;

    const blocksCount = exercise.mathNum1;
    const blockSize = exercise.mathNum2;

    const blocks = Array(blocksCount).fill(blockSize);

    return (
      <div className="mt-4 p-4 bg-slate-50 rounded-2xl border-2 border-slate-200/80 max-w-sm mx-auto text-center">
        <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-3 font-sans text-center">
          🏫 Methode B: Bar Model (Balkenmodell)
        </span>

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

          <div className="absolute inset-x-4 bottom-0 flex flex-col items-center">
            <div className="w-[96%] h-1.5 border-x border-b border-slate-500 rounded-b-md"></div>
            <span className="text-xs font-black text-slate-700 mt-1 font-sans">
              Gesamt: {hasChecked && isCorrect ? exercise.correctAnswer : '?'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // 2c. Interactive Family Partitioning (Grade 2 division)
  const renderInteractivePartitioning = () => {
    if (!isPartitioningTask) return null;

    const cookiesTotal = 12;
    const placedTotal = basketItems.reduce((a, b) => a + b, 0);
    const unplaced = Math.max(0, cookiesTotal - placedTotal);

    return (
      <div className="mt-4 p-4 bg-slate-50 rounded-2xl border-2 border-slate-200/80 max-w-md mx-auto text-center space-y-4">
        <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block font-sans">
          🥧 Interaktives Aufteilen in der Familie
        </span>

        {/* 1. People count selector */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">Ich möchte gerecht teilen:</p>
          <div className="flex justify-center gap-2">
            {[
              { label: 'Zu zweit (mit Bruder)', val: 2 },
              { label: 'Zu dritt (mit Eltern)', val: 3 },
              { label: 'Zu viert (Bruder & Eltern)', val: 4 },
            ].map((btn) => (
              <button
                key={btn.val}
                type="button"
                disabled={hasChecked}
                onClick={() => handleFamilyChange(btn.val as any)}
                className={`px-3 py-1.5 rounded-xl border text-[10px] sm:text-xs font-black cursor-pointer transition-all ${
                  familyCount === btn.val
                    ? 'bg-indigo-100 border-indigo-400 text-indigo-950 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Unplaced items pool */}
        <div className="bg-white p-3 rounded-xl border shadow-inner flex flex-wrap gap-2.5 justify-center items-center min-h-[50px]">
          {Array(unplaced).fill(null).map((_, idx) => (
            <span key={idx} className="text-2xl animate-pulse select-none" title="Keks">🍪</span>
          ))}
          {unplaced === 0 && (
            <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest">
              Alle Kekse verteilt! 🎉
            </span>
          )}
        </div>

        {/* 3. Baskets rendering */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {basketItems.map((cookiesCount, bIdx) => (
            <div 
              key={bIdx} 
              className={`p-3 rounded-2xl border-2 bg-white flex flex-col items-center justify-between shadow-xs transition-colors ${
                hasChecked && isCorrect === false
                  ? 'border-red-200 bg-red-50/20'
                  : 'border-slate-200'
              }`}
            >
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                Korb {bIdx + 1}
              </span>
              
              {/* Cookies in this basket */}
              <div className="flex flex-wrap gap-1 justify-center items-center min-h-[44px] py-1">
                {Array(cookiesCount).fill(null).map((_, idx) => (
                  <span key={idx} className="text-lg select-none">🍪</span>
                ))}
              </div>

              {/* Adjust buttons */}
              <div className="flex gap-1.5 mt-2">
                <button
                  type="button"
                  disabled={hasChecked || cookiesCount <= 0}
                  onClick={() => adjustBasketItem(bIdx, -1)}
                  className="w-7 h-7 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 font-bold text-slate-700 flex items-center justify-center cursor-pointer shadow-xs disabled:opacity-40"
                >
                  -
                </button>
                <button
                  type="button"
                  disabled={hasChecked || unplaced <= 0}
                  onClick={() => adjustBasketItem(bIdx, 1)}
                  className="w-7 h-7 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 font-bold text-slate-700 flex items-center justify-center cursor-pointer shadow-xs disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 3. Didaktisches Hilfsmittel für Klasse 3: Größen-Detektiv
  const renderGroessenHilfe = () => {
    if (stationId !== 9) return null;

    const isMoneyTask = exercise.question.includes('€') || exercise.question.includes('Geld') || exercise.question.includes('bezahlen');
    const isWeightTask = exercise.question.includes('wiegt') || exercise.question.includes(' g') || exercise.question.includes(' kg') || exercise.question.includes('Gramm') || exercise.question.includes('wiegen');
    const isTimeTask = exercise.question.includes('Uhr') || exercise.question.includes('Minuten') || exercise.question.includes('Stunde') || exercise.question.includes('zeit');

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

  // Render Socratic Metacognitive reflection view
  if (showSocratic) {
    const sDetails = getSocraticDetails();
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-high-tactile border border-slate-100 max-w-xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center font-body">
          <span className="text-4xl animate-bounce inline-block">🎓</span>
          <h3 className="font-black text-xl sm:text-2xl text-[#00639a] mt-2">
            Lumis Rechenweg-Erklärer
          </h3>
          <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mt-0.5">
            Metakognition & Reflexion
          </p>
        </div>

        {/* Question Prompt (increased font size) */}
        <div className="bg-indigo-50 border-2 border-indigo-100 p-5 rounded-2xl text-sm sm:text-base text-indigo-950 font-black leading-relaxed font-body">
          {sDetails.question}
        </div>

        {/* Strategy options (increased font size and font weight) */}
        <div className="space-y-3">
          {sDetails.strategies.map((strat, idx) => {
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

        {/* Feedback display (increased font size and weight) */}
        {socraticChecked && selectedStrategy !== null && (
          <div className="bg-slate-50 border p-4 rounded-2xl text-sm sm:text-base text-slate-800 leading-relaxed font-extrabold font-body">
            {sDetails.strategies[selectedStrategy].isBest ? (
              <p className="text-emerald-900 flex items-center gap-1.5">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{sDetails.strategies[selectedStrategy].feedback}</span>
              </p>
            ) : (
              <p className="text-slate-900 flex items-start gap-1.5">
                <Award className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <span>{sDetails.strategies[selectedStrategy].feedback}</span>
              </p>
            )}
          </div>
        )}

        {/* Actions */}
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
              onClick={onNext} // Trigger actual parent station completion
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
      
      {/* Photo Proof (Grade 1 only) */}
      {stationId === 7 && renderPhotoProofComponent()}
      
      {/* Interactive Partitioning (Grade 2 division) */}
      {isPartitioningTask ? renderInteractivePartitioning() : (
        <>
          {stationId === 8 && didacticMethod === 'A' && renderPunktefeld()}
          {stationId === 8 && didacticMethod === 'B' && renderBarModel()}
        </>
      )}
      
      {stationId === 9 && renderGroessenHilfe()}

      {/* Options grid (hidden for partitioning tasks since we evaluate the boxes directly) */}
      {!isPartitioningTask && (
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
      )}

      {/* Actions & Feedback */}
      <div className={`space-y-4 ${isPartitioningTask ? 'mt-6' : ''}`}>
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
                disabled={!isPartitioningTask ? !selectedOption : basketItems.reduce((a, b) => a + b, 0) !== 12}
                onClick={handleCheck}
                className={`px-6 py-2.5 rounded-xl text-sm sm:text-base font-extrabold shadow-md flex items-center gap-1.5 cursor-pointer ${
                  (!isPartitioningTask ? selectedOption : basketItems.reduce((a, b) => a + b, 0) === 12)
                    ? 'btn-tactile-secondary text-cyan-950 border-b-4 border-yellow-500'
                    : 'bg-slate-200 text-slate-400 border-b-4 border-slate-300 cursor-not-allowed'
                }`}
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
          <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-3 text-xs sm:text-sm text-cyan-950 leading-relaxed font-semibold">
            💡 <strong>Tipp:</strong> {exercise.hint}
          </div>
        )}
      </div>
    </div>
  );
}
