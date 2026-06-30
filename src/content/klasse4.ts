import { Station } from '../types';

export const KLASSE_4: Station[] = [
  {
    id: 401,
    subject: "deutsch",
    title: "Die 4 Fälle (Kasus)",
    subtitle: "Nominativ bis Akkusativ",
    grade: 4,
    difficulty: "leicht",
    description: "Bestimme den richtigen Fall des Nomens!",
    icon: "FolderGit",
    color: "primary",
    exercises: [
      { id: "401_1", question: "Nach welchem Fall fragt man mit 'Wer oder Was?'", options: ["Nominativ (1. Fall)", "Genitiv (2. Fall)", "Dativ (3. Fall)", "Akkusativ (4. Fall)"], correctAnswer: "Nominativ (1. Fall)", hint: "Es ist der Grundfall." },
      { id: "401_2", question: "Nach welchem Fall fragt man mit 'Wen oder Was?'", options: ["Nominativ", "Genitiv", "Dativ", "Akkusativ"], correctAnswer: "Akkusativ", hint: "Den wen sehe ich? Den Hund (Akkusativ)." },
      { id: "401_3", question: "Nach welchem Fall fragt man mit 'Wem?'", options: ["Nominativ", "Genitiv", "Dativ", "Akkusativ"], correctAnswer: "Dativ", hint: "Wem gebe ich das? Dem Kind (Dativ)." }
    ]
  },
  {
    id: 402,
    subject: "deutsch",
    title: "Satzglieder umstellen",
    subtitle: "Umstellprobe",
    grade: 4,
    difficulty: "mittel",
    description: "Bilde sinnvolle Sätze durch Umstellen der Satzglieder.",
    icon: "Award",
    color: "secondary",
    exercises: [
      { id: "402_1", question: "Stelle um: 'Ich spiele heute im Garten Fußball.'", options: ["Garten heute spiele ich im Fußball.", "Heute spiele ich im Garten Fußball.", "Fußball spiele im Garten heute ich."], correctAnswer: "Heute spiele ich im Garten Fußball.", hint: "Das Verb ('spiele') steht an zweiter Stelle." },
      { id: "402_2", question: "Stelle um: 'Der Hund bellt laut am Zaun.'", options: ["Laut bellt der Hund am Zaun.", "Zaun am bellt der Hund laut.", "Bellt der Hund Zaun am laut."], correctAnswer: "Laut bellt der Hund am Zaun.", hint: "Das Verb ('bellt') bleibt an zweiter Stelle." }
    ]
  },
  {
    id: 403,
    subject: "deutsch",
    title: "Komplexe Grammatik",
    subtitle: "Zeitformen vertiefen",
    grade: 4,
    difficulty: "schwer",
    description: "Erkenne die verschiedenen Zeitformen (Präsens, Präteritum, Perfekt, Futur).",
    icon: "Search",
    color: "tertiary",
    exercises: [
      { id: "403_1", question: "In welcher Zeit steht: 'Ich werde morgen spielen.'?", options: ["Präsens (Gegenwart)", "Präteritum (Vergangenheit)", "Perfekt (Vergangenheit)", "Futur (Zukunft)"], correctAnswer: "Futur (Zukunft)", hint: "Es passiert erst noch ('werden')." },
      { id: "403_2", question: "In welcher Zeit steht: 'Sie hat gelacht.'?", options: ["Präsens", "Präteritum", "Perfekt", "Futur"], correctAnswer: "Perfekt", hint: "Gebildet mit 'hat' oder 'ist'." },
      { id: "403_3", question: "In welcher Zeit steht: 'Er lief schnell.'?", options: ["Präsens", "Präteritum", "Perfekt", "Futur"], correctAnswer: "Präteritum", hint: "Die einfache Vergangenheit (Erzählzeit)." }
    ]
  },
  {
    id: 404,
    subject: "mathe",
    title: "Schriftliche Addition",
    subtitle: "Große Zahlen",
    grade: 4,
    difficulty: "leicht",
    description: "Rechne schriftlich Plus und Minus.",
    icon: "Calculator",
    color: "primary",
    exercises: [
      { id: "404_1", question: "Rechne: 350 + 240 =", options: ["590", "500", "690", "580"], correctAnswer: "590", hint: "Hunderter plus Hunderter, Zehner plus Zehner." },
      { id: "404_2", question: "Rechne: 680 - 150 =", options: ["530", "550", "430", "630"], correctAnswer: "530", hint: "600-100 und 80-50." },
      { id: "404_3", question: "Rechne: 125 + 125 =", options: ["250", "300", "200", "225"], correctAnswer: "250", hint: "25 + 25 ist 50." }
    ]
  },
  {
    id: 405,
    subject: "mathe",
    title: "Brüche erkennen",
    subtitle: "Pizza-Teile",
    grade: 4,
    difficulty: "mittel",
    description: "Stelle verschiedene Bruchteile mit Pizza, Schokolade und Co. dar!",
    icon: "Percent",
    color: "secondary",
    exercises: [
      { id: "405_1", question: "Stelle 3/8 der Pizza dar!", mathFractionSegments: 8, mathFractionColored: 3, options: ["3/8", "5/8", "1/2"], correctAnswer: "3/8", hint: "3 von 8 Stücken." },
      { id: "405_2", question: "Stelle 1/4 der Waffel dar!", mathFractionSegments: 4, mathFractionColored: 1, options: ["1/4", "3/4", "1/2"], correctAnswer: "1/4", hint: "1 von 4 Stücken." },
      { id: "405_3", question: "Stelle 4/6 der Schokolade dar!", mathFractionSegments: 6, mathFractionColored: 4, options: ["4/6", "2/6", "2/3"], correctAnswer: "4/6", hint: "4 von 6 Stücken." }
    ]
  },
  {
    id: 406,
    subject: "mathe",
    title: "Römische Zahlen",
    subtitle: "Zahlen der Antike",
    grade: 4,
    difficulty: "schwer",
    description: "Kannst du römische Zahlen lesen?",
    icon: "Sparkles",
    color: "tertiary",
    exercises: [
      { id: "406_1", question: "Was bedeutet die römische Zahl X?", options: ["5", "10", "50", "100"], correctAnswer: "10", hint: "V=5, X=10." },
      { id: "406_2", question: "Übersetze die Zahl: VII", options: ["6", "7", "8", "12"], correctAnswer: "7", hint: "V (5) + I (1) + I (1)." },
      { id: "406_3", question: "Was bedeutet die römische Zahl XX?", options: ["20", "10", "30", "40"], correctAnswer: "20", hint: "10 + 10." },
      { id: "406_4", question: "Übersetze die Zahl: IV", options: ["4", "5", "6", "9"], correctAnswer: "4", hint: "I steht VOR V, also wird es abgezogen: 5 - 1." }
    ]
  }
];
