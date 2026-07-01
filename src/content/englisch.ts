import { Station } from '../types';

export const ENGLISCH: Station[] = [
  {
    id: 701,
    subject: "englisch",
    title: "English is fun!",
    subtitle: "Farben lernen",
    grade: 3,
    difficulty: "leicht",
    description: "Lerne die Farben auf Englisch kennen.",
    icon: "Sparkles",
    color: "primary",
    exercises: [
      {
        id: "701_1",
        question: "What color is a banana?",
        options: ["Blue", "Yellow", "Red", "Green"],
        correctAnswer: "Yellow",
        hint: "Die Banane ist gelb!"
      },
      {
        id: "701_2",
        question: "What color is a strawberry?",
        options: ["Green", "Yellow", "Red", "Black"],
        correctAnswer: "Red",
        hint: "Erdbeeren sind lecker und rot."
      },
      {
        id: "701_3",
        question: "Schau dich im Raum um. Finde etwas, das 'Green' (grün) ist, berühre es und rufe laut 'GREEN!'",
        correctAnswer: "done",
        hint: "Vielleicht eine Pflanze, ein Buch oder ein Kissen?",
        imagePlaceholder: "🟢",
        isAnalog: true
      }
    ]
  },
  {
    id: 702,
    subject: "englisch",
    title: "Animal Kingdom",
    subtitle: "Tier-Vokabeln",
    grade: 4,
    difficulty: "mittel",
    description: "Wie heißen die Tiere auf Englisch?",
    icon: "Search",
    color: "tertiary",
    exercises: [
      {
        id: "702_1",
        question: "Which animal bark (bellen)?",
        options: ["Cat", "Bird", "Dog", "Mouse"],
        correctAnswer: "Dog",
        hint: "Ein Hund macht 'woof woof'."
      },
      {
        id: "702_2",
        question: "Which animal is very big and has a trunk (Rüssel)?",
        options: ["Monkey", "Elephant", "Lion", "Rabbit"],
        correctAnswer: "Elephant",
        hint: "Er ist grau und riesig."
      },
      {
        id: "702_3",
        question: "Bewege dich für 15 Sekunden wie ein 'Monkey' (Affe) durch das Zimmer und mache Affen-Geräusche!",
        correctAnswer: "done",
        hint: "Kratze dich am Kopf und mache 'Ugh ugh, ah ah!'",
        imagePlaceholder: "🐒",
        isAnalog: true
      }
    ]
  }
];
