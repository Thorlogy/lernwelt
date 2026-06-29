export interface Exercise {
  id: string;
  question: string;
  word?: string; // e.g. "KATZE" for spelling or syllable tasks
  imagePlaceholder?: string; // a child-friendly SVG illustration description
  options?: string[]; // Multiple choice options if needed
  correctAnswer: any; // could be array of syllable parts, correct letters, corrected word, or category
  hint: string;
  correctAnswerText?: string; // e.g. target wrong word in detective exercise
  mathNum1?: number; // first operand (e.g. 8)
  mathNum2?: number; // second operand (e.g. 5)
  mathOp?: '+' | '-' | '*' | '/'; // operator
  mathFractionSegments?: number; // visual segments for fractions (denominator)
  mathFractionColored?: number; // colored segments for fractions (numerator)
}

export type WordType = 'NOMEN' | 'VERB' | 'ADJEKTIV';

export interface WordTypeExercise extends Exercise {
  word: string;
  category: WordType;
}

export interface SpellingExercise extends Exercise {
  word: string; // e.g. "APFEL"
  scrambledLetters: string[]; // e.g. ["P", "A", "E", "F", "L"]
}

export interface SyllableExercise extends Exercise {
  word: string; // e.g. "WASSER"
  syllables: string[]; // e.g. ["WAS", "SER"]
  choices: string[]; // e.g. ["WAS", "SER", "SEN", "TER", "WAL"]
}

export interface DetectiveExercise extends Exercise {
  sentenceWithMistakes: string; // e.g. "Der kleine fogel singt ein Lied."
  correctedSentence: string; // e.g. "Der kleine Vogel singt ein Lied."
  mistakes: { original: string; corrected: string }[];
}

export interface Station {
  id: number;
  subject: 'deutsch' | 'mathe';
  title: string;
  subtitle: string;
  grade: number; // Klasse 1-4
  description: string;
  icon: string; // Lucide icon identifier
  color: 'primary' | 'secondary' | 'tertiary' | 'orange';
  exercises: Exercise[];
}

export interface UserProgress {
  childName: string;
  avatarId: string; // e.g. "unicorn", "dragon", "rocket", "star"
  avatarColor: string;
  completedStations: number[]; // ids of completed stations
  starsCount: number; // collected stars
  stationTrophies: Record<number, boolean>; // stationId -> completed
  score: number;
}
