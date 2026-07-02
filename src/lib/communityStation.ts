import { Station, CreatedTask } from '../types';

/**
 * Creates the dynamic Community station (id: 999) from user-created tasks.
 * Centralized here to avoid duplication between App.tsx and LessonMap.tsx.
 */
export function createCommunityStation(createdTasks: CreatedTask[]): Station {
  return {
    id: 999,
    subject: 'deutsch',
    grade: 1,
    title: 'Community-Rätsel',
    subtitle: 'Von Kindern für Kinder',
    difficulty: 'leicht',
    description: 'Rätsel aus der Aufgaben-Werkstatt.',
    icon: 'Sparkles',
    color: 'orange',
    renderer: 'spelling',
    exercises: createdTasks.map(t => ({
      id: t.id,
      question: `${t.question} (Tipp von ${t.creatorName}: ${t.hint || 'Viel Erfolg!'})`,
      word: t.word,
      imagePlaceholder: t.emoji,
      correctAnswer: t.word.split(''),
      hint: t.hint,
      scrambledLetters: t.word.split('').sort(() => Math.random() - 0.5)
    }))
  };
}
