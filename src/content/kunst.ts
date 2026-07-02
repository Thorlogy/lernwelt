import { Station } from '../types';

export const KUNST: Station[] = [
  {
    id: 601,
    subject: "kunst",
    title: "Farben mischen",
    subtitle: "Grundfarben",
    grade: 1,
    difficulty: "leicht",
    description: "Hol deine Wasserfarben und mische mit!",
    icon: "Sparkles",
    color: "tertiary",
    renderer: "generic",
    exercises: [
      {
        id: "601_1",
        question: "Welche Farbe entsteht, wenn man GELD und BLAU mischt?",
        options: ["Grün", "Lila", "Orange", "Braun"],
        correctAnswer: "Grün",
        hint: "Versuche es mal auf einem echten Blatt Papier!"
      },
      {
        id: "601_2",
        question: "Hole deine Wasserfarben. Mische Rot und Gelb! Welche Farbe siehst du?",
        correctAnswer: "done",
        hint: "Es sieht aus wie eine Orange.",
        imagePlaceholder: "🎨",
        isAnalog: true
      },
      {
        id: "601_3",
        question: "Male jetzt einen großen, runden Kreis mit deiner Lieblingsfarbe auf das Papier!",
        correctAnswer: "done",
        hint: "Lass dir Zeit und mach ihn richtig schön rund.",
        imagePlaceholder: "🖌️",
        isAnalog: true
      }
    ]
  },
  {
    id: 602,
    subject: "kunst",
    title: "Geometrische Kunst",
    subtitle: "Formen zeichnen",
    grade: 3,
    difficulty: "mittel",
    description: "Wie Kandinsky und Mondrian: Wir zeichnen Kunst aus Formen.",
    icon: "Layers",
    color: "orange",
    renderer: "generic",
    exercises: [
      {
        id: "602_1",
        question: "Welche Form hat drei Ecken?",
        options: ["Dreieck", "Kreis", "Quadrat", "Rechteck"],
        correctAnswer: "Dreieck",
        hint: "Drei Ecken, drei Seiten."
      },
      {
        id: "602_2",
        question: "Nimm ein Blatt und ein Lineal. Zeichne 5 gerade Linien kreuz und quer!",
        correctAnswer: "done",
        hint: "Es darf ruhig wild aussehen.",
        imagePlaceholder: "📏",
        isAnalog: true
      },
      {
        id: "602_3",
        question: "Male die entstandenen Felder mit mindestens 3 verschiedenen Farben aus!",
        correctAnswer: "done",
        hint: "Achte darauf, dass nicht zwei gleiche Farben direkt nebeneinander sind.",
        imagePlaceholder: "🖍️",
        isAnalog: true
      }
    ]
  },
  {
    id: 603,
    subject: "kunst",
    title: "Münz-Zauber",
    subtitle: "Frottage-Technik",
    grade: 2,
    difficulty: "leicht",
    description: "Lerne die Frottage-Technik kennen.",
    icon: "Sparkles",
    color: "primary",
    renderer: "generic",
    exercises: [
      {
        id: "603_1",
        question: "Was passiert, wenn du ein Blatt Papier über eine Münze legst und mit Bleistift darüber reibst?",
        options: ["Das Papier zerreißt", "Man sieht das Münz-Muster", "Der Stift bricht ab", "Nichts passiert"],
        correctAnswer: "Man sieht das Münz-Muster",
        hint: "Das nennt man Frottage!"
      },
      {
        id: "603_2",
        question: "Nimm ein Blatt Papier und einen Stift. Such eine Münze (oder ein raues Blatt), leg es drunter und rubble darüber!",
        correctAnswer: "done",
        hint: "Tipp: Halte den Bleistift etwas schräg.",
        imagePlaceholder: "🪙",
        isAnalog: true
      }
    ]
  },
  {
    id: 604,
    subject: "kunst",
    title: "Die Symmetrie-Werkstatt",
    subtitle: "Kunst & Logik",
    grade: 3,
    difficulty: "mittel",
    description: "Formen spiegeln und Bilder falten.",
    icon: "Layers",
    color: "tertiary",
    renderer: "generic",
    exercises: [
      {
        id: "604_1",
        question: "Eine gemalte Blume ist spiegel-symmetrisch (beide Hälften sehen genau gleich aus). Wenn links 3 rote Blätter sind, wie viele Blätter müssen rechts sein?",
        options: ["3 rote Blätter", "6 rote Blätter", "2 rote Blätter", "Keine Blätter"],
        correctAnswer: "3 rote Blätter",
        hint: "Wenn etwas spiegelsymmetrisch ist, ist es auf beiden Seiten genau gleich!"
      },
      {
        id: "604_2",
        question: "Lumi spiegelt das Muster an der Spiegelwand ( | ). Welches Muster entsteht auf der rechten Seite?",
        grid2D: [
          ["🔴", "🔵", " | ", "❓", "❓"]
        ],
        options: ["🔵 🔴", "🔴 🔵", "🟡 🟢", "🔴 🔴"],
        correctAnswer: "🔵 🔴",
        hint: "Der Spiegel dreht die Reihenfolge um: Die blaue Perle (🔵) ist näher am Spiegel, also kommt sie auf der anderen Seite auch zuerst!"
      },
      {
        id: "604_3",
        question: "Falte ein Blatt Papier in der Mitte. Male auf die linke Seite mit dicken Farbklecksen ein halbes Bild (z.B. einen halben Schmetterling). Falte das Blatt zusammen und drücke es fest an. Was passiert?",
        correctAnswer: "done",
        hint: "Die Farbe spiegelt sich auf die andere Seite und das Bild wird symmetrisch!",
        imagePlaceholder: "🦋",
        isAnalog: true
      }
    ]
  }
];
