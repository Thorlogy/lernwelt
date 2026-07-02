import React, { useState, useEffect } from 'react';
import { Exercise, UserProgress } from '../types';
import { playPop, playSuccess, playFailure } from '../utils/audio';
import { SpeakButton } from './SpeakButton';
import { useSpeech } from '../lib/useSpeech';
import { Star, HelpCircle, ArrowRight, CheckCircle, Volume2 } from 'lucide-react';

interface StationWordSearchProps {
  exercise: Exercise;
  onCorrectAnswer: (starsGained: number) => void;
  onNext: () => void;
  progress: UserProgress;
  isLastExercise: boolean;
}

interface CellCoord {
  r: number;
  c: number;
}

const EMOJI_MAP: Record<string, string> = {
  QUALLE: '🦑',
  QUATSCH: '🤪',
  QUELLE: '💧',
  QUARK: '🧀',
  HEXE: '🧙‍♀️',
  TAXI: '🚕',
  NIXE: '🧜‍♀️',
  BOXEN: '🥊',
};

export default function StationWordSearch({
  exercise,
  onCorrectAnswer,
  onNext,
  progress,
  isLastExercise,
}: StationWordSearchProps) {
  const [startCell, setStartCell] = useState<CellCoord | null>(null);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundCells, setFoundCells] = useState<string[]>([]); // Array of "r-c" strings
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const { speak } = useSpeech();

  const grid = exercise.grid2D || [];
  const targetWords = exercise.targetWords || [];

  // Reset states on exercise change
  useEffect(() => {
    setStartCell(null);
    setFoundWords([]);
    setFoundCells([]);
    setShakeTrigger(false);
    setShowHint(false);
    setIsAnswered(false);
  }, [exercise]);

  const handleCellClick = (r: number, c: number) => {
    if (isAnswered) return;
    playPop();

    // 1. If no start cell is selected, set this as start
    if (!startCell) {
      setStartCell({ r, c });
      return;
    }

    // 2. If same cell clicked, deselect
    if (startCell.r === r && startCell.c === c) {
      setStartCell(null);
      return;
    }

    // 3. Check if second click is in same row or col
    const isSameRow = startCell.r === r;
    const isSameCol = startCell.c === c;

    if (!isSameRow && !isSameCol) {
      // Not a straight line, just change start cell
      setStartCell({ r, c });
      return;
    }

    // Generate path coordinates
    const pathCoords: CellCoord[] = [];
    if (isSameRow) {
      const minCol = Math.min(startCell.c, c);
      const maxCol = Math.max(startCell.c, c);
      for (let col = minCol; col <= maxCol; col++) {
        pathCoords.push({ r, c: col });
      }
    } else {
      const minRow = Math.min(startCell.r, r);
      const maxRow = Math.max(startCell.r, r);
      for (let row = minRow; row <= maxRow; row++) {
        pathCoords.push({ r: row, c });
      }
    }

    // Extract letters from path
    const selectedLetters = pathCoords.map(coord => grid[coord.r][coord.c]);
    const wordForward = selectedLetters.join('');
    const wordBackward = selectedLetters.reverse().join('');

    // Check if it matches any target word
    const matchedWord = targetWords.find(
      word => (word === wordForward || word === wordBackward) && !foundWords.includes(word)
    );

    if (matchedWord) {
      // Word found!
      playSuccess();
      speak(matchedWord);
      
      const newFoundWords = [...foundWords, matchedWord];
      setFoundWords(newFoundWords);

      // Add to permanently found cells
      const newFoundCells = [...foundCells];
      pathCoords.forEach(coord => {
        const cellId = `${coord.r}-${coord.c}`;
        if (!newFoundCells.includes(cellId)) {
          newFoundCells.push(cellId);
        }
      });
      setFoundCells(newFoundCells);
      setStartCell(null);

      // Check if all words are found
      if (newFoundWords.length === targetWords.length) {
        setIsAnswered(true);
        onCorrectAnswer(25); // Award 25 stars for finding all words
      }
    } else {
      // No match
      playFailure();
      setShakeTrigger(true);
      setStartCell(null);
      setTimeout(() => {
        setShakeTrigger(false);
      }, 500);
    }
  };

  const getCellClassName = (r: number, c: number) => {
    const cellId = `${r}-${c}`;
    const isFound = foundCells.includes(cellId);
    const isStart = startCell && startCell.r === r && startCell.c === c;

    if (isFound) {
      return 'bg-emerald-500 text-white border-emerald-600 scale-102 font-black shadow-md';
    }
    if (isStart) {
      return 'bg-yellow-100 border-yellow-500 text-yellow-950 font-black ring-4 ring-yellow-200 animate-pulse';
    }
    return 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800 font-bold active:scale-95';
  };

  return (
    <div className={`bg-white rounded-3xl p-6 shadow-high-tactile border border-slate-100 max-w-xl mx-auto ${shakeTrigger ? 'animate-shake' : ''}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-[#00639a] flex items-center justify-center gap-2">
          <span>🔍 Wortsuch-Detektiv</span>
        </h3>
        <p className="text-base text-brand-secondary font-bold mt-0.5">
          Finde alle versteckten Wörter im Gitter!
        </p>
      </div>

      {/* Promoted question */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 p-5 rounded-2xl border-2 border-blue-200 shadow-sm text-center mb-6 relative flex flex-col items-center gap-2">
        <span className="text-base font-bold text-cyan-700 block font-sans">
          Detektiv-Auftrag
        </span>
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-800 font-body leading-relaxed">
            {exercise.question}
          </h2>
          <SpeakButton text={exercise.question} size={22} />
        </div>
      </div>

      {/* Grid rendering */}
      <div className="bg-slate-100/60 p-4 rounded-3xl border-2 border-slate-200/50 shadow-inner flex justify-center mb-6">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${grid[0]?.length || 6}, minmax(0, 1fr))` }}>
          {grid.map((row, rIdx) =>
            row.map((letter, cIdx) => (
              <button
                key={`${rIdx}-${cIdx}`}
                type="button"
                onClick={() => handleCellClick(rIdx, cIdx)}
                className={`w-10 h-10 sm:w-12 sm:h-12 border-2 rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-sm transition-all cursor-pointer select-none font-sans ${getCellClassName(rIdx, cIdx)}`}
              >
                {letter}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Target Word Checklist */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6">
        <h4 className="font-sans font-extrabold text-slate-700 mb-3 text-center text-sm">
          🔍 Suchliste ({foundWords.length} von {targetWords.length} gefunden):
        </h4>
        <div className="grid grid-cols-2 gap-2.5">
          {targetWords.map(word => {
            const isFound = foundWords.includes(word);
            return (
              <div
                key={word}
                className={`p-2.5 rounded-xl border flex items-center justify-between font-sans font-black text-base sm:text-lg transition-all ${
                  isFound
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-xl select-none">{EMOJI_MAP[word] || '📝'}</span>
                  <span className={isFound ? 'line-through opacity-60' : ''}>{word}</span>
                </span>
                {isFound ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <button
                    type="button"
                    onClick={() => speak(word)}
                    className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                    title="Wort vorlesen"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions & Feedback */}
      <div className="space-y-4">
        {isAnswered && (
          <div className="bg-emerald-100 text-emerald-800 p-3.5 rounded-2xl border-2 border-emerald-300 text-center font-black text-lg sm:text-base flex items-center justify-center gap-2 shadow-sm">
            <CheckCircle className="w-5 h-5 text-emerald-600 animate-bounce" /> Meisterhaft gelöst! Du hast alle Wörter gefunden! 🌟
          </div>
        )}

        <div className="flex justify-between items-center gap-3">
          <button
            onClick={() => { playPop(); setShowHint(!showHint); }}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-300 text-slate-500 hover:text-[#00639a] hover:bg-sky-50 hover:border-sky-300 transition-colors cursor-pointer text-base sm:text-lg font-bold font-body"
          >
            <HelpCircle className="w-4 h-4" /> Tipp
          </button>

          {isAnswered && (
            <button
              onClick={onNext}
              className="btn-tactile-primary text-white px-7 py-3 rounded-xl text-lg sm:text-base font-black flex items-center gap-2 cursor-pointer shadow-lg hover:brightness-105"
            >
              Nächste Aufgabe! <ArrowRight className="w-5 h-5 animate-pulse" />
            </button>
          )}
        </div>

        {showHint && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-base sm:text-lg text-blue-900 leading-relaxed font-semibold">
            💡 <strong>Tipp:</strong> {exercise.hint}
          </div>
        )}
      </div>
    </div>
  );
}
