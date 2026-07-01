import React, { useState } from 'react';
import { UserProgress, CreatedTask } from '../types';
import { ArrowLeft, Sparkles, Send, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { playPop, playSuccess } from '../utils/audio';

interface TaskBuilderProps {
  progress: UserProgress;
  onSaveProgress: (progress: UserProgress) => void;
  onClose: () => void;
}

export default function TaskBuilder({ progress, onSaveProgress, onClose }: TaskBuilderProps) {
  const [word, setWord] = useState('');
  const [emoji, setEmoji] = useState('');
  const [question, setQuestion] = useState('Bilde das Wort für:');
  const [hint, setHint] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || !emoji.trim()) return;

    playSuccess();

    const newTask: CreatedTask = {
      id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      creatorName: progress.childName,
      question: question,
      word: word.toUpperCase(),
      emoji: emoji,
      hint: hint,
      status: 'pending',
      timestamp: Date.now(),
    };

    const updatedProgress = {
      ...progress,
      createdTasks: [...(progress.createdTasks || []), newTask],
    };

    onSaveProgress(updatedProgress);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg mx-auto shadow-2xl text-center">
        <div className="text-5xl mb-4 animate-bounce">🎉</div>
        <h2 className="text-2xl font-black text-[#00639a] mb-2 font-sans">Klasse, {progress.childName}!</h2>
        <p className="text-lg text-slate-600 font-body mb-6">
          Deine Aufgabe für die Erstklässler wurde in die Werkstatt geschickt! Wir prüfen sie kurz und bald können alle Kinder dein Rätsel spielen!
        </p>
        <button
          onClick={onClose}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-6 py-3 rounded-xl transition-transform active:scale-95"
        >
          Zurück zur Landkarte
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg mx-auto shadow-2xl relative border-4 border-amber-200">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => { playPop(); onClose(); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-500 transition-colors font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Zurück
        </button>
        <div className="bg-amber-100 text-amber-800 font-black px-3 py-1 rounded-full text-sm flex items-center gap-1">
          <Sparkles className="w-4 h-4" /> Aufgaben-Werkstatt
        </div>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-slate-800 font-sans">
          Erstelle ein Rätsel!
        </h2>
        <p className="text-slate-500 font-body">
          Baue eine Aufgabe für die Klasse 1.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-slate-700 font-bold mb-1">Welches Wort sollen sie erraten?</label>
          <input
            type="text"
            required
            value={word}
            onChange={e => setWord(e.target.value)}
            placeholder="z.B. BAUM"
            className="w-full text-xl font-black px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-400 focus:ring-0 bg-slate-50 outline-none uppercase"
            maxLength={10}
          />
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">Passendes Emoji dazu (1 Zeichen):</label>
          <input
            type="text"
            required
            value={emoji}
            onChange={e => setEmoji(e.target.value)}
            placeholder="z.B. 🌳"
            className="w-full text-3xl font-black px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-400 focus:ring-0 bg-slate-50 outline-none"
            maxLength={2}
          />
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">Die Frage dazu:</label>
          <input
            type="text"
            required
            value={question}
            onChange={e => setQuestion(e.target.value)}
            className="w-full font-bold px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-400 focus:ring-0 bg-slate-50 outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-700 font-bold mb-1">Ein kleiner Tipp (optional):</label>
          <input
            type="text"
            value={hint}
            onChange={e => setHint(e.target.value)}
            placeholder="z.B. Er hat grüne Blätter."
            className="w-full font-bold px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-400 focus:ring-0 bg-slate-50 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-black text-xl py-4 px-6 rounded-2xl transition-all transform active:scale-95 shadow-[0_4px_0_#b45309] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none flex items-center justify-center gap-2 mt-4"
        >
          <Send className="w-5 h-5" /> Aufgabe einreichen!
        </button>
      </form>
    </div>
  );
}
