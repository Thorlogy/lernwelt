import { Station } from '../types';

export const LOGIK: Station[] = [
  {
    id: 801,
    subject: "logik",
    title: "Roboter-Steuerung",
    subtitle: "Algorithmen",
    grade: 1,
    difficulty: "leicht",
    description: "Wie steuert man eine Maschine?",
    icon: "Cpu",
    color: "primary",
    exercises: [
      {
        id: "801_1",
        question: "Du möchtest Lumibot 3 Schritte nach vorne bewegen. Welchen Befehl nutzt du?",
        options: ["1 Schritt vorwärts", "3 Schritte vorwärts", "Geh zurück", "Drehe dich im Kreis"],
        correctAnswer: "3 Schritte vorwärts",
        hint: "Es sollen genau 3 Schritte sein."
      },
      {
        id: "801_2",
        question: "Lumibot soll nach rechts abbiegen. Welcher Pfeil zeigt nach rechts?",
        options: ["⬅️ Links", "➡️ Rechts", "⬆️ Oben", "⬇️ Unten"],
        correctAnswer: "➡️ Rechts",
        hint: "Der Pfeil muss in Schreibrichtung zeigen."
      },
      {
        id: "801_3",
        question: "Roboter-Spiel: Lass dich von deinen Eltern oder Geschwistern wie einen Roboter programmieren! Mache genau die Befehle, die sie dir sagen (z.B. '2 Schritte vor, einmal umdrehen')!",
        correctAnswer: "done",
        hint: "Bewege dich steif und mechanisch wie ein echter Roboter!",
        imagePlaceholder: "🤖",
        isAnalog: true
      }
    ]
  },
  {
    id: 802,
    subject: "logik",
    title: "Wenn-Dann-Maschine",
    subtitle: "Bedingungen",
    grade: 3,
    difficulty: "mittel",
    description: "Löse die logischen Programmier-Rätsel.",
    icon: "Cpu",
    color: "secondary",
    exercises: [
      {
        id: "802_1",
        question: "Wenn die Ampel ROT ist, musst du warten. Wenn sie GRÜN ist, darfst du gehen. Die Ampel wird ROT. Was tust du?",
        options: ["Warten", "Gehen", "Schnell rennen", "Singen"],
        correctAnswer: "Warten",
        hint: "Halte dich genau an die Wenn-Dann-Regel!"
      },
      {
        id: "802_2",
        question: "WENN die Sonne scheint, setze eine Mütze auf. Ansonsten lass sie weg. Die Sonne scheint HEUTE NICHT. Was tust du?",
        options: ["Mütze aufsetzen", "Mütze weglassen", "Eis essen", "Im Regen spielen"],
        correctAnswer: "Mütze weglassen",
        hint: "'Ansonsten' bedeutet, dass die Bedingung nicht erfüllt ist."
      },
      {
        id: "802_3",
        question: "Überlege dir eine eigene Wenn-Dann-Regel für dein Zimmer (z.B. 'Wenn ich den Stuhl berühre, klatsche ich in die Hände') und führe sie 3-mal aus!",
        correctAnswer: "done",
        hint: "Mach eine Regel, die Spaß macht!",
        imagePlaceholder: "💡",
        isAnalog: true
      }
    ]
  }
];
