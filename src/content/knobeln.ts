import { Station } from '../types';

export const KNOBELN: Station[] = [
  {
    id: 1101,
    subject: "knobeln",
    title: "Die Brücken von Königsberg",
    subtitle: "Graphentheorie & Pfade",
    grade: 3,
    difficulty: "schwer",
    description: "Versuche einen Weg über alle Brücken zu finden, ohne eine doppelt zu gehen.",
    icon: "Award",
    color: "primary",
    isExcellence: true,
    renderer: "generic",
    exercises: [
      {
        id: "1101_1",
        question: "Lumi steht in einer Stadt mit 4 Inseln (A, B, C, D) und 7 Brücken. Kann er einen Weg finden, bei dem er jede Brücke genau einmal überquert und am Ende wieder am Start ankommt?",
        grid2D: [
          ["A", " =", " B"],
          ["|", " \\", " |"],
          ["C", " =", " D"]
        ],
        options: ["Nein, das ist mathematisch unmöglich!", "Ja, das geht immer!", "Ja, aber nur wenn man sehr schnell rennt! 🏃‍♂️"],
        correctAnswer: "Nein, das ist mathematisch unmöglich!",
        hint: "Der Mathematiker Leonhard Euler fand heraus: Da die Inseln eine ungerade Anzahl an Brücken (3 bzw. 5) haben, klappt es niemals!"
      },
      {
        id: "1101_2",
        question: "Das Haus vom Nikolaus: Welche dieser Figuren kann man zeichnen, ohne den Stift abzusetzen und ohne eine Linie doppelt zu malen?",
        options: ["Das Haus vom Nikolaus 🏠", "Ein Kreis mit einem Punkt in der Mitte 🎯", "Ein Schachbrettmuster mit 16 Feldern 🏁"],
        correctAnswer: "Das Haus vom Nikolaus 🏠",
        hint: "Das Haus vom Nikolaus hat nur zwei Ecken mit einer ungeraden Anzahl an Linien (unten links und unten rechts). Deshalb kann man es in einem Zug malen!"
      },
      {
        id: "1101_3",
        question: "Nimm ein Blatt Papier und versuche, das 'Haus vom Nikolaus' zu zeichnen, ohne den Stift abzusetzen. Tipp: Finde heraus, bei welchen Ecken du starten musst, damit es klappt!",
        correctAnswer: "done",
        hint: "Versuche mal, an einer der beiden unteren Ecken zu starten und an der anderen zu enden!",
        imagePlaceholder: "🏠",
        isAnalog: true
      }
    ]
  },
  {
    id: 1102,
    subject: "knobeln",
    title: "Die geheime Verschlüsselung",
    subtitle: "Kryptographie & Codes",
    grade: 4,
    difficulty: "schwer",
    description: "Entschlüssele geheime Botschaften wie echte Detektive.",
    icon: "Award",
    color: "secondary",
    isExcellence: true,
    renderer: "generic",
    exercises: [
      {
        id: "1102_1",
        question: "Beim Cäsar-Code verschieben wir jeden Buchstaben um 3 Stellen nach rechts (A wird zu D, B wird zu E, C wird zu F...). Welches Wort versteckt sich hinter dem Code 'K X P G'?",
        options: ["HUND", "KATZE", "MAUS", "VOGEL"],
        correctAnswer: "HUND",
        hint: "Gehe für jeden Buchstaben im Alphabet 3 Schritte zurück (K -> J -> I -> H)."
      },
      {
        id: "1102_2",
        question: "Computer rechnen nur mit Nullen und Einsen. Jede Zahl hat einen Binärcode (1=1, 2=10, 3=11, 4=100, 5=101, 6=110...). Welche Zahl versteckt sich hinter dem Binärcode '111'?",
        options: ["7", "3", "5", "8"],
        correctAnswer: "7",
        hint: "Die rechte Stelle zählt als 1, die mittlere als 2 und die linke als 4. Rechne: 4 + 2 + 1."
      },
      {
        id: "1102_3",
        question: "Erstelle deinen eigenen Geheimcode! Schreibe eine Nachricht an jemanden, indem du jeden Buchstaben durch seinen Nachfolger im Alphabet ersetzt (A -> B, B -> C...). Können sie es entziffern?",
        correctAnswer: "done",
        hint: "Aus dem Wort 'LUMI' wird in diesem Code zum Beispiel 'MVNJ'!",
        imagePlaceholder: "✉️",
        isAnalog: true
      }
    ]
  }
];
