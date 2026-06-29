import React, { useState, useEffect } from 'react';
import { DetectiveExercise, UserProgress } from '../types';
import { playPop, playSuccess, playFailure } from '../utils/audio';
import { Star, HelpCircle, ArrowRight, CheckCircle, Search } from 'lucide-react';

interface StationSpellingDetectiveProps {
  exercise: DetectiveExercise;
  onCorrectAnswer: (xpGained: number) => void;
  onIncorrectAnswer: () => void;
  onNext: () => void;
  progress: UserProgress;
  isLastExercise: boolean;
}

export default function StationSpellingDetective({
  exercise,
  onCorrectAnswer,
  onIncorrectAnswer,
  onNext,
  progress,
  isLastExercise,
}: StationSpellingDetectiveProps) {
  // Split the sentence into individual words while preserving punctuations or endings
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);
  const [wordsList, setWordsList] = useState<{ word: string; cleanWord: string }[]>([]);
  const [correctionInput, setCorrectionInput] = useState('');
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hasFoundMistake, setHasFoundMistake] = useState(false);

  // Initialize
  useEffect(() => {
    // We split sentence by spaces.
    // E.g. "Der kleine fogel singt..." -> ["Der", "kleine", "fogel", "singt", ...]
    const words = (exercise.word || '').split(' ');
    const mapped = words.map(w => {
      // Clean word from trailing punctuations for comparison
      const clean = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
      return {
        word: w,
        cleanWord: clean,
      };
    });

    setWordsList(mapped);
    setSelectedWordIndex(null);
    setCorrectionInput('');
    setHasChecked(false);
    setIsCorrect(null);
    setShakeTrigger(false);
    setShowHint(false);
    setHasFoundMistake(false);
  }, [exercise]);

  const handleWordSelect = (index: number) => {
    if (hasChecked || hasFoundMistake) return;
    playPop();
    setSelectedWordIndex(index);
  };

  // Step 1: Child points at the word that is spelled wrong
  const handleVerifyMistakeWord = () => {
    if (selectedWordIndex === null) return;
    
    const selectedObj = wordsList[selectedWordIndex];
    // We fetch the target word which is misspelled in the sentence
    const targetWrongWord = (exercise as any).correctAnswerText.toLowerCase();

    if (selectedObj.cleanWord === targetWrongWord) {
      playSuccess();
      setHasFoundMistake(true);
    } else {
      playFailure();
      setShakeTrigger(true);
      onIncorrectAnswer();
      setTimeout(() => {
        setShakeTrigger(false);
      }, 800);
    }
  };

  // Step 2: Child inputs the corrected spelling and we check it
  const handleCheckCorrection = () => {
    if (!correctionInput.trim()) return;

    // Remove whitespace and check case-sensitive German grammar correction (e.g. Vogel with V)
    const normalizedInput = correctionInput.trim();
    const correctTarget = (exercise.correctAnswer as string).trim();

    const isMatched = normalizedInput.toLowerCase() === correctTarget.toLowerCase();
    
    setIsCorrect(isMatched);
    setHasChecked(true);

    if (isMatched) {
      playSuccess();
      onCorrectAnswer(20); // 20 stars for detective level
    } else {
      playFailure();
      setShakeTrigger(true);
      onIncorrectAnswer();
      setTimeout(() => {
        setShakeTrigger(false);
      }, 800);
    }
  };

  const handleReset = () => {
    setHasChecked(false);
    setIsCorrect(null);
    setSelectedWordIndex(null);
    setHasFoundMistake(false);
    setCorrectionInput('');
  };

  return (
    <div className={`bg-white rounded-3xl p-6 shadow-high-tactile border border-slate-100 max-w-xl mx-auto ${shakeTrigger ? 'animate-shake' : ''}`}>
      {/* Exercise Goal Header */}
      <div className="text-center mb-4">
        <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-[#00639a] flex items-center justify-center gap-2">
          <Search className="w-6 h-6 text-orange-500 animate-pulse" />
          <span>Finde den Rechtschreibfehler!</span>
        </h3>
        <p className="text-xs text-orange-600 font-bold uppercase mt-1">
          🕵️‍♂️ Werde zum Rechtschreib-Detektiv!
        </p>
      </div>

      {/* Lined Notebook Page Backdrop containing sentence */}
      <div className="relative bg-[#faf7f2] p-5 sm:p-7 rounded-2xl border-l-[12px] border-l-red-400 border-2 border-slate-300 shadow-md mb-6 overflow-hidden">
        {/* Horizontal blue school writing lines */}
        <div className="absolute inset-0 bg-notebook-lines pointer-events-none opacity-40">
          <div className="w-full h-full" style={{
            backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 33px, #90caf9 34px)',
            backgroundSize: '100% 34px',
            lineHeight: '34px'
          }}></div>
        </div>

        <div className="relative z-10 text-center font-sans">
          <div className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold mb-4 font-sans block">
            Detektiv-Blick: Tippe auf das FALSCHE Wort:
          </div>

          <div className="flex flex-wrap justify-center gap-y-5 gap-x-2.5 max-w-md mx-auto text-lg sm:text-xl font-bold leading-relaxed">
            {wordsList.map((item, idx) => {
              const isSelected = selectedWordIndex === idx;
              const isTargetWrong = item.cleanWord === (exercise as any).correctAnswerText.toLowerCase();

              return (
                <button
                  key={idx}
                  disabled={hasFoundMistake || hasChecked}
                  onClick={() => handleWordSelect(idx)}
                  className={`px-2 py-1 rounded-lg transition-all duration-150 relative cursor-pointer ${
                    hasFoundMistake && isTargetWrong
                      ? 'bg-emerald-100 border-b-2 border-emerald-500 text-emerald-800 scale-102 line-through'
                      : isSelected
                        ? 'bg-orange-100 border-2 border-orange-400 text-orange-950 scale-105 ring-2 ring-orange-200'
                        : 'hover:bg-slate-200/50 text-[#191c1e]'
                  }`}
                >
                  {item.word}

                  {/* Red underline highlight on selection */}
                  {!hasFoundMistake && isSelected && (
                    <div className="absolute left-0 right-0 -bottom-1 h-1 bg-red-400 rounded-sm"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DETECTIVE SEARCH CONTROLS */}
      <div className="mt-6 mb-8">
        
        {/* Step 1: Verifying selected word contains mistake */}
        {!hasFoundMistake && (
          <div className="text-center">
            {selectedWordIndex !== null ? (
              <div className="space-y-3">
                <p className="text-sm text-slate-500 font-semibold font-body">
                  Hast du das falsche Wort gefunden? Klicke auf "Prüfen".
                </p>
                <button
                  onClick={handleVerifyMistakeWord}
                  className="btn-tactile-secondary text-[#725c00] text-sm font-extrabold px-6 py-2.5 rounded-xl shadow-md cursor-pointer"
                >
                  Das hier ist falsch! 🔎
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-3 font-semibold font-body">
                Klicke oben auf das Wort im Satz, welches falsch geschriebenen ist!
              </p>
            )}
          </div>
        )}

        {/* Step 2: Input the corrected spelling once the error is spotted */}
        {hasFoundMistake && (
          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200 shadow-sm space-y-4">
            <div className="text-center">
              <span className="text-2xl">🎉</span>
              <p className="text-sm font-extrabold text-slate-700 font-sans mt-1">
                Klasse! Du hast das falsche Wort <strong className="text-red-500 line-through">"{(exercise as any).correctAnswerText}"</strong> enttarnt!
              </p>
              <p className="text-xs text-slate-500 font-medium font-body mt-1">
                Schreibe jetzt die richtige Schreibweise auf:
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-center max-w-sm mx-auto">
              <input
                disabled={hasChecked}
                type="text"
                value={correctionInput}
                onChange={(e) => setCorrectionInput(e.target.value)}
                placeholder="Richtiges Wort schreiben..."
                className="bg-white px-4 py-2.5 rounded-xl border-2 border-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-200/50 text-center text-lg font-bold font-body placeholder:text-slate-300 text-slate-800"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCheckCorrection();
                }}
              />
              {!hasChecked && (
                <button
                  disabled={!correctionInput.trim()}
                  onClick={handleCheckCorrection}
                  className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold cursor-pointer border-b-4 transition-all duration-100 ${
                    correctionInput.trim()
                      ? 'btn-tactile-primary text-white hover:brightness-105'
                      : 'bg-slate-200 text-slate-400 border-b-4 border-slate-300 cursor-not-allowed'
                  }`}
                >
                  Prüfen! 🎯
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action panel & feedback */}
      <div className="space-y-4">
        {hasChecked && isCorrect === true && (
          <div className="bg-emerald-100 text-emerald-800 p-3 rounded-2xl border-2 border-emerald-300 text-center font-bold text-sm sm:text-base flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" /> Meisterhaft! Du hast das Wort perfekt korrigiert! (<strong>{exercise.correctAnswer as string}</strong>)
          </div>
        )}

        {hasChecked && isCorrect === false && (
          <div className="bg-yellow-50 text-yellow-800 p-3 rounded-2xl border-2 border-yellow-200 text-center font-bold text-sm sm:text-base">
            Das ist noch nicht ganz die richtige Schreibweise von <strong>{exercise.correctAnswer as string}</strong>. Achte auf die Groß-/Kleinschreibung! 🧐
          </div>
        )}

        <div className="flex justify-between items-center gap-3">
          {/* Hint button */}
          <button
            onClick={() => { playPop(); setShowHint(!showHint); }}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-300 text-slate-500 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-300 transition-colors cursor-pointer text-xs sm:text-sm font-bold font-body"
          >
            <HelpCircle className="w-4 h-4" /> Detektiv-Tipp
          </button>

          <div className="flex gap-2">
            {/* Actions */}
            {hasChecked && isCorrect === false && (
              <button
                onClick={handleReset}
                className="btn-tactile-outline px-6 py-2.5 rounded-xl text-slate-700 text-sm font-bold cursor-pointer border border-slate-300"
              >
                Erneut suchen 🔄
              </button>
            )}

            {hasChecked && isCorrect === true && (
              <button
                onClick={onNext}
                className="btn-tactile-primary text-white px-7 py-3 rounded-xl text-sm sm:text-base font-black flex items-center gap-2 cursor-pointer shadow-lg hover:brightness-105"
              >
                Nächster Fall! <ArrowRight className="w-5 h-5 animate-pulse" />
              </button>
            )}
          </div>
        </div>

        {showHint && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs sm:text-sm text-amber-900 leading-relaxed font-semibold">
             🔑 <strong>Detektiv-Tipp von Lumi:</strong> {exercise.hint}
          </div>
        )}
      </div>
    </div>
  );
}
