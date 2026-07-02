import { Station } from '../types';

export const KOSMOS: Station[] = [
  {
    id: 1001,
    subject: "kosmos",
    title: "Die Planeten-Reise",
    subtitle: "Astronomie & Maßstäbe",
    grade: 3,
    difficulty: "mittel",
    description: "Reise mit Astronaut Lumi durch die riesigen Weiten des Weltalls.",
    icon: "Rocket",
    color: "primary",
    exercises: [
      {
        id: "1001_1",
        question: "Wenn unsere Erde so winzig klein wäre wie eine Erbse (🟢), wie groß wäre dann die Sonne?",
        options: ["So groß wie ein Fußball ⚽", "So groß wie eine Melone 🍉", "So groß wie eine Stecknadel 📍", "So groß wie ein LKW 🚚"],
        correctAnswer: "So groß wie ein Fußball ⚽",
        hint: "Die Sonne ist riesig! Es passen mehr als eine Million Erden in sie hinein."
      },
      {
        id: "1001_2",
        question: "Lumi fliegt mit seiner Raumkapsel im Kreis um die Erde. Nach einer halben Umrundung (1/2) steht er genau auf der anderen Seite. Welchen Winkel hat er abgeflogen?",
        grid2D: [
          ["🛰️", "➡️", "🌏"]
        ],
        options: ["Einen halben Kreis (180 Grad)", "Einen Viertelkreis (90 Grad)", "Einen ganzen Kreis (360 Grad)"],
        correctAnswer: "Einen halben Kreis (180 Grad)",
        hint: "Ein ganzer Kreis hat 360 Grad. Wie viel Grad hat dann die Hälfte?"
      },
      {
        id: "1001_3",
        question: "Astronauten-Training: Stelle dich auf ein Bein, schließe deine Augen und versuche für 15 Sekunden das Gleichgewicht zu halten (wie in der Schwerelosigkeit)!",
        correctAnswer: "done",
        hint: "Konzentriere dich auf deinen Körper und stehe ganz still!",
        imagePlaceholder: "🧑‍🚀",
        isAnalog: true
      }
    ]
  },
  {
    id: 1002,
    subject: "kosmos",
    title: "Das Licht & Geometrie",
    subtitle: "Physik & Optik",
    grade: 4,
    difficulty: "schwer",
    description: "Erforsche die Geheimnisse der Lichtstrahlen und der Spiegelung.",
    icon: "Rocket",
    color: "secondary",
    isExcellence: true,
    exercises: [
      {
        id: "1002_1",
        question: "Ein Laserstrahl kommt von links unten (↗️) und trifft schräg auf einen Spiegel ( | ). Wie wird er nach rechts reflektiert?",
        grid2D: [
          [" ", " | ", "↗️"],
          ["➡️", " | ", " "],
          ["↗️", " | ", " "]
        ],
        options: ["Nach rechts oben ↗️", "Nach links oben ↖️", "Nach rechts unten ↘️"],
        correctAnswer: "Nach rechts oben ↗️",
        hint: "Einfallswinkel gleich Ausfallswinkel! Der Strahl wird spiegelbildlich fortgesetzt."
      },
      {
        id: "1002_2",
        question: "Licht ist das Schnellste im Universum. Es braucht von der Sonne bis zur Erde nur 8 Minuten. Wie oft könnte ein Lichtstrahl in nur einer Sekunde um die Erde reisen?",
        options: ["Etwa 7-mal", "Genau 1-mal", "Gar nicht", "Über 1000-mal"],
        correctAnswer: "Etwa 7-mal",
        hint: "Die Lichtgeschwindigkeit liegt bei fast 300.000 Kilometern in einer einzigen Sekunde!"
      },
      {
        id: "1002_3",
        question: "Nimm eine Taschenlampe in einem dunklen Raum. Leuchte eine Wand an und verändere den Abstand: Was passiert mit dem Lichtkreis, wenn du weiter weggehst? Wird er größer oder kleiner?",
        correctAnswer: "done",
        hint: "Gehe nah an die Wand und entferne dich dann langsam wieder!",
        imagePlaceholder: "🔦",
        isAnalog: true
      }
    ]
  }
];
