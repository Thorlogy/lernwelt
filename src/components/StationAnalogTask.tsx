import React, { useState } from 'react';
import { UserProgress } from '../types';
import { CheckCircle } from 'lucide-react';
import { playSuccess } from '../utils/audio';
import { SpeakButton } from './SpeakButton';

interface StationAnalogTaskProps {
  exercise: any;
  onCorrectAnswer: (stars: number) => void;
  onNext: () => void;
  progress: UserProgress;
  isLastExercise: boolean;
}

export default function StationAnalogTask({ exercise, onCorrectAnswer, onNext, isLastExercise }: StationAnalogTaskProps) {
  const [done, setDone] = useState(false);

  const handleDone = () => {
    playSuccess();
    setDone(true);
    setTimeout(() => {
      onCorrectAnswer(3); // Analog tasks always give full stars (trust based)
      onNext();
    }, 1500);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 sm:p-6 bg-white/80 backdrop-blur-md rounded-3xl border-4 border-white shadow-soft-tactile mt-6 sm:mt-10 mb-8 sm:mb-12">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2 flex-wrap">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00639a] leading-tight font-sans drop-shadow-sm">
            {exercise.question}
          </h2>
          <SpeakButton text={exercise.question} size={24} autoSpeak={true} />
        </div>
        {exercise.hint && (
          <p className="text-base sm:text-lg text-slate-500 font-bold font-body bg-slate-100 p-3 rounded-2xl inline-block mt-2">
            💡 Tipp: {exercise.hint}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-6 py-6">
        <div className="text-8xl sm:text-9xl mb-4 animate-bounce">
          {exercise.imagePlaceholder || "🏃"}
        </div>
        
        {!done ? (
          <button
            type="button"
            onClick={handleDone}
            className="w-full sm:w-auto px-8 py-5 text-2xl font-black text-white bg-emerald-500 hover:bg-emerald-400 border-b-4 sm:border-b-8 border-emerald-700 rounded-[2rem] active:border-b-0 active:mt-1 sm:active:mt-2 transition-all cursor-pointer shadow-sm active:shadow-none flex items-center justify-center gap-3 select-none"
          >
            <CheckCircle className="w-8 h-8" />
            Ich hab's gemacht!
          </button>
        ) : (
          <div className="px-8 py-5 text-2xl font-black text-emerald-700 bg-emerald-100 border-4 border-emerald-300 rounded-[2rem] flex items-center justify-center gap-3 animate-wiggle">
            <CheckCircle className="w-8 h-8" />
            Super gemacht!
          </div>
        )}
      </div>
      
      {isLastExercise && done && (
        <div className="mt-4 text-center text-sm font-bold text-slate-400 uppercase tracking-widest bg-slate-100 py-1.5 px-3 rounded-full inline-block mx-auto">
          Station fast geschafft!
        </div>
      )}
    </div>
  );
}
