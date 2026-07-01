import { Station } from '../types';

export const KLASSE_3: Station[] = [
  {
    id: 301,
    subject: "deutsch",
    title: "Satzzeichen setzen",
    subtitle: "Punkt, Komma, Fragezeichen",
    grade: 3,
    difficulty: "leicht",
    description: "Finde das richtige Satzzeichen am Ende des Satzes!",
    icon: "FolderGit",
    color: "primary",
    exercises: [
      { id: "301_1", question: "Wie geht es dir heute__", options: [".", "?", "!", ","], correctAnswer: "?", hint: "Es ist eine Frage." },
      { id: "301_2", question: "Hör sofort auf damit__", options: [".", "?", "!", ","], correctAnswer: "!", hint: "Es ist ein Ausruf oder Befehl." },
      { id: "301_3", question: "Der Baum ist grün__", options: [".", "?", "!", ","], correctAnswer: ".", hint: "Ein ganz normaler Aussagesatz." }
    ]
  },
  {
    id: 302,
    subject: "deutsch",
    title: "Wörtliche Rede",
    subtitle: "Sprechen in Texten",
    grade: 3,
    difficulty: "mittel",
    description: "Wie setzt man die Anführungszeichen richtig?",
    icon: "Award",
    color: "secondary",
    exercises: [
      { id: "302_1", question: "Welcher Satz ist richtig?", options: ["Lumi sagt: \"Hallo!\"", "Lumi sagt: Hallo!\"", "\"Lumi sagt: Hallo!"], correctAnswer: "Lumi sagt: \"Hallo!\"", hint: "Das, was gesprochen wird, steht in Anführungszeichen." },
      { id: "302_2", question: "Welcher Satz ist richtig?", options: ["\"Komm schnell!\" ruft Mama.", "Komm schnell!\" ruft Mama.", "\"Komm schnell! ruft Mama.\""], correctAnswer: "\"Komm schnell!\" ruft Mama.", hint: "Nur das Gesprochene steht in den Gänsefüßchen." }
    ]
  },
  {
    id: 303,
    subject: "deutsch",
    title: "Zeiten-Trainer",
    subtitle: "Gegenwart & Vergangenheit",
    grade: 3,
    difficulty: "schwer",
    description: "Setze das Wort in die richtige Zeitform!",
    icon: "Search",
    color: "tertiary",
    exercises: [
      { id: "303_1", question: "Lumi ______ gestern sehr schnell.", word: "rennen", options: ["rannte", "rennte", "gerannt", "rennt"], correctAnswer: "rannte", hint: "Präteritum von 'rennen'." },
      { id: "303_2", question: "Wir ______ gestern in die Schule.", word: "gehen", options: ["gingen", "gehten", "gegangen", "gehen"], correctAnswer: "gingen", hint: "Präteritum von 'gehen'." },
      { id: "303_3", question: "Ich ______ gestern einen Apfel.", word: "essen", options: ["aß", "essete", "gegessen", "esse"], correctAnswer: "aß", hint: "Präteritum von 'essen'." }
    ]
  },
  {
    id: 307,
    subject: "deutsch",
    title: "Satz-Baumeister",
    subtitle: "Satzglieder finden",
    grade: 3,
    difficulty: "mittel",
    description: "Finde das richtige Satzglied! Wer tut was, wann und wo?",
    icon: "Layers",
    color: "orange",
    exercises: [
      { id: "307_1", question: "Welches Wort ist das Prädikat (Tunwort)? 'Der Hund bellt laut.'", options: ["Der", "Hund", "bellt", "laut"], correctAnswer: "bellt", hint: "Was tut der Hund?" },
      { id: "307_2", question: "Welches Wort ist das Subjekt (Wer oder was)? 'Die Katze fängt eine Maus.'", options: ["Die", "Katze", "fängt", "Maus"], correctAnswer: "Katze", hint: "Wer fängt die Maus?" },
      { id: "307_3", question: "Finde die Ortsangabe (Wo?): 'Wir spielen auf dem Spielplatz Fußball.'", options: ["Wir", "spielen", "auf dem Spielplatz", "Fußball"], correctAnswer: "auf dem Spielplatz", hint: "Wo wird gespielt?" }
    ]
  },
  {
    id: 304,
    subject: "mathe",
    title: "Rechnen mit Geld",
    subtitle: "Euro und Cent",
    grade: 3,
    difficulty: "leicht",
    description: "Rechne aus, wie viel es kostet oder wie viel Wechselgeld es gibt.",
    icon: "Coins",
    color: "primary",
    exercises: [
      { id: "304_1", question: "Du kaufst ein Buch für 3€ und einen Stift für 1,50€. Wie viel zahlst du?", options: ["4,50€", "4,00€", "5,00€"], correctAnswer: "4,50€", hint: "3 Euro plus 1,50 Euro." },
      { id: "304_2", question: "Du hast 10€. Dein Eis kostet 3€. Wie viel Geld bekommst du zurück?", options: ["7€", "8€", "6€", "5€"], correctAnswer: "7€", hint: "10 minus 3." }
    ]
  },
  {
    id: 305,
    subject: "mathe",
    title: "Längen & Gewichte",
    subtitle: "Umrechnen",
    grade: 3,
    difficulty: "mittel",
    description: "Wie lang oder schwer ist das?",
    icon: "Sparkles",
    color: "secondary",
    exercises: [
      { id: "305_1", question: "Ein Lineal ist 30cm lang. Ein Heft ist 20cm lang. Zusammen?", options: ["50cm", "60cm", "40cm"], correctAnswer: "50cm", hint: "30 + 20." },
      { id: "305_2", question: "Ein Mehl wiegt 500g. Zucker wiegt 250g. Zusammen?", options: ["750g", "800g", "1000g"], correctAnswer: "750g", hint: "500 + 250." },
      { id: "305_3", question: "Wie viele Zentimeter sind 1 Meter?", options: ["100 cm", "10 cm", "1000 cm", "50 cm"], correctAnswer: "100 cm", hint: "Ein Meterstab hat 100 kleine Striche (cm)." }
    ]
  },
  {
    id: 306,
    subject: "mathe",
    title: "Detektiv-Aufgaben",
    subtitle: "Sachrechnen & Fälle lösen",
    grade: 3,
    difficulty: "schwer",
    description: "Lies genau und finde die richtige Rechnung, wie ein echter Detektiv!",
    icon: "Search",
    color: "tertiary",
    exercises: [
      { id: "306_1", question: "Mia läuft um 14:15 Uhr los. Sie läuft 45 Minuten. Wann ist sie da?", options: ["15:00 Uhr", "14:45 Uhr", "15:15 Uhr"], correctAnswer: "15:00 Uhr", hint: "15 Minuten + 45 Minuten = 60 Minuten (1 Stunde)." },
      { id: "306_2", question: "Ein Bauer hat 5 Kühe. Jede Kuh gibt 4 Liter Milch. Wie viel Milch ist das?", options: ["20 Liter", "9 Liter", "24 Liter"], correctAnswer: "20 Liter", hint: "5 mal 4." }
    ]
  }
];
