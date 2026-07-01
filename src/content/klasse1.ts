import { Station } from '../types';

export const KLASSE_1: Station[] = [
  {
    id: 101,
    subject: "deutsch",
    title: "Anlaute erkennen",
    subtitle: "A wie Apfel",
    grade: 1,
    difficulty: "leicht",
    description: "Höre genau hin! Finde Wörter, die mit dem gleichen Buchstaben anfangen.",
    icon: "Music",
    color: "primary",
    exercises: [
      { id: "101_1", question: "Welches Wort fängt wie APFEL an?", options: ["Affe", "Hund", "Maus", "Sonne"], correctAnswer: "Affe", hint: "Das gesuchte Wort muss mit 'A' beginnen." },
      { id: "101_2", question: "Welches Wort fängt wie TISCH an?", options: ["Bär", "Tasse", "Auto", "Katze"], correctAnswer: "Tasse", hint: "Das Wort muss mit 'T' beginnen." },
      { id: "101_3", question: "Welches Wort fängt wie SONNE an?", options: ["Sand", "Mond", "Baum", "Haus"], correctAnswer: "Sand", hint: "Es fängt mit 'S' an." },
      { id: "101_4", question: "Welches Wort fängt wie MAUS an?", options: ["Katze", "Mond", "Käse", "Loch"], correctAnswer: "Mond", hint: "Es fängt mit 'M' an." }
    ]
  },
  {
    id: 102,
    subject: "deutsch",
    title: "Erste Silben hüpfen",
    subtitle: "Rhythmus",
    grade: 1,
    difficulty: "mittel",
    description: "Klicke die Silben in der richtigen Reihenfolge an, um das ganze Wort zusammenzusetzen!",
    icon: "Music",
    color: "secondary",
    exercises: [
      { id: "102_1", question: "Zerteile das Wort: HOSE", word: "HOSE", correctAnswer: ["HO", "SE"], hint: "Ho-se." },
      { id: "102_2", question: "Zerteile das Wort: DOSE", word: "DOSE", correctAnswer: ["DO", "SE"], hint: "Do-se." },
      { id: "102_3", question: "Zerteile das Wort: NASE", word: "NASE", correctAnswer: ["NA", "SE"], hint: "Na-se." },
      { id: "102_4", question: "Zerteile das Wort: HASE", word: "HASE", correctAnswer: ["HA", "SE"], hint: "Ha-se." }
    ]
  },
  {
    id: 103,
    subject: "deutsch",
    title: "Einfache Wörter lesen",
    subtitle: "Erstes Lesen",
    grade: 1,
    difficulty: "schwer",
    description: "Bringe die Buchstaben in die richtige Reihenfolge!",
    icon: "Keyboard",
    color: "tertiary",
    exercises: [
      { id: "103_1", question: "Bilde das gesuchte Wort:", word: "HUND", correctAnswer: "HUND", hint: "Macht Wau." },
      { id: "103_2", question: "Bilde das gesuchte Wort:", word: "OMA", correctAnswer: "OMA", hint: "Die Mama von Mama oder Papa." },
      { id: "103_3", question: "Bilde das gesuchte Wort:", word: "TÜR", correctAnswer: "TÜR", hint: "Damit geht man ins Zimmer." },
      { id: "103_4", question: "Bilde das gesuchte Wort:", word: "BAUM", correctAnswer: "BAUM", hint: "Wächst im Wald." }
    ]
  },
  {
    id: 104,
    subject: "mathe",
    title: "Zählen & Mengen",
    subtitle: "Bis 10 zählen",
    grade: 1,
    difficulty: "leicht",
    description: "Muster-Detektiv und Mengen erkennen.",
    icon: "Sparkles",
    color: "primary",
    exercises: [
      { id: "104_1", question: "Wie geht die Reihe weiter? 🔴 🔵 🔴 🔵 🔴 __", options: ["🔴", "🔵", "🟡", "🟢"], correctAnswer: "🔵", hint: "Abwechselnd Rot und Blau." },
      { id: "104_2", question: "Welche Form hat ein Rad (Reifen)?", options: ["Kreis", "Dreieck", "Quadrat", "Rechteck"], correctAnswer: "Kreis", hint: "Rund ohne Ecken." },
      { id: "104_3", question: "Wie viele Finger hat eine Hand?", options: ["4", "5", "6", "10"], correctAnswer: "5", hint: "Zähl mal nach!" }
    ]
  },
  {
    id: 105,
    subject: "mathe",
    title: "Plus & Minus bis 10",
    subtitle: "Die 10 zerlegen",
    grade: 1,
    difficulty: "mittel",
    description: "Rechne Plus und Minus im kleinen Rahmen.",
    icon: "Calculator",
    color: "secondary",
    exercises: [
      { id: "105_1", question: "Die 10 zerlegen! 10 = 6 + __", options: ["3", "4", "5", "6"], correctAnswer: "4", hint: "10 Finger, 6 klappst du ein. Wie viele stehen noch?" },
      { id: "105_2", question: "Rechne aus: 5 + 3 = __", options: ["7", "8", "9", "6"], correctAnswer: "8", hint: "5 Finger und 3 dazu." },
      { id: "105_3", question: "Rechne aus: 9 - 4 = __", options: ["4", "5", "6", "3"], correctAnswer: "5", hint: "9 Finger, 4 klappst du ein." },
      { id: "105_4", question: "Rechne aus: 7 - 2 = __", options: ["5", "6", "4", "3"], correctAnswer: "5", hint: "7 weniger 2." }
    ]
  },
  {
    id: 106,
    subject: "mathe",
    title: "Plus & Minus bis 20",
    subtitle: "Ohne Zehnerübergang",
    grade: 1,
    difficulty: "schwer",
    description: "Rechne bis 20!",
    icon: "Calculator",
    color: "tertiary",
    exercises: [
      { id: "106_1", question: "Rechne aus: 12 + 5 = __", options: ["16", "17", "18", "15"], correctAnswer: "17", hint: "Rechne erst 2 + 5 und hänge die 10 davor." },
      { id: "106_2", question: "Rechne aus: 18 - 4 = __", options: ["13", "14", "15", "12"], correctAnswer: "14", hint: "Rechne erst 8 - 4." },
      { id: "106_3", question: "Rechne aus: 11 + 8 = __", options: ["18", "19", "20", "17"], correctAnswer: "19", hint: "Rechne 1 + 8." },
      { id: "106_4", question: "Rechne aus: 19 - 7 = __", options: ["12", "13", "11", "10"], correctAnswer: "12", hint: "Rechne 9 - 7." }
    ]
  },
  {
    id: 107,
    subject: "mathe",
    title: "Lumi geht einkaufen",
    subtitle: "Uhrzeit & Geld",
    grade: 1,
    difficulty: "mittel",
    description: "Hilf Lumi beim Einkaufen und beim Ablesen der Uhr!",
    icon: "Coins",
    color: "orange",
    exercises: [
      { id: "107_1", question: "Ein Apfel kostet 2€. Du gibst 5€. Wie viel Rückgeld bekommst du?", options: ["2€", "3€", "4€", "1€"], correctAnswer: "3€", hint: "Rechne 5 - 2." },
      { id: "107_2", question: "Du hast eine 2€ Münze und drei 1€ Münzen. Wie viel Geld ist das?", options: ["4€", "5€", "6€", "3€"], correctAnswer: "5€", hint: "Rechne 2 + 1 + 1 + 1." },
      { id: "107_3", question: "Der kleine Zeiger steht auf 3. Der große auf 12. Wie spät ist es?", options: ["12 Uhr", "3 Uhr", "6 Uhr", "9 Uhr"], correctAnswer: "3 Uhr", hint: "Der kleine Zeiger zeigt die Stunden." }
    ]
  }
];
