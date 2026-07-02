import { Station } from '../types';

export const KLASSE_2: Station[] = [
  {
    id: 201,
    subject: "deutsch",
    title: "Nomen erkennen",
    subtitle: "Großschreibung",
    grade: 2,
    difficulty: "leicht",
    description: "Nomen sind Namenwörter. Sie bezeichnen Menschen, Tiere, Pflanzen und Dinge. Man schreibt sie immer groß!",
    icon: "FolderGit",
    color: "primary",
    renderer: "generic",
    exercises: [
      { id: "201_1", question: "Welches Wort ist ein Nomen?", options: ["schnell", "Hund", "laufen", "schön"], correctAnswer: "Hund", hint: "Ein Tier, das man anfassen kann." },
      { id: "201_2", question: "Welches Wort ist ein Nomen?", options: ["Haus", "gehen", "klein", "laut"], correctAnswer: "Haus", hint: "Ein Ding, das man bauen kann." },
      { id: "201_3", question: "Welches Wort ist ein Nomen?", options: ["spielen", "Baum", "grün", "singen"], correctAnswer: "Baum", hint: "Eine Pflanze, die wächst." }
    ]
  },
  {
    id: 202,
    subject: "deutsch",
    title: "Verben & Adjektive",
    subtitle: "Sortieren",
    grade: 2,
    difficulty: "mittel",
    description: "Sortiere die Wörter: Tuwörter (Verben) oder Wiewörter (Adjektive)?",
    icon: "Award",
    color: "secondary",
    renderer: "generic",
    exercises: [
      { id: "202_1", question: "Ist 'rennen' ein Verb oder Adjektiv?", options: ["Verb", "Adjektiv"], correctAnswer: "Verb", hint: "Es ist etwas, das du tust." },
      { id: "202_2", question: "Ist 'süß' ein Verb oder Adjektiv?", options: ["Verb", "Adjektiv"], correctAnswer: "Adjektiv", hint: "Es beschreibt, wie etwas ist." },
      { id: "202_3", question: "Ist 'schlafen' ein Verb oder Adjektiv?", options: ["Verb", "Adjektiv"], correctAnswer: "Verb", hint: "Es ist eine Tätigkeit." },
      { id: "202_4", question: "Ist 'groß' ein Verb oder Adjektiv?", options: ["Verb", "Adjektiv"], correctAnswer: "Adjektiv", hint: "Es beschreibt die Größe von etwas." }
    ]
  },
  {
    id: 203,
    subject: "deutsch",
    title: "Rechtschreib-Fallen",
    subtitle: "sp/st & eu/äu",
    grade: 2,
    difficulty: "schwer",
    description: "Finde das falsch geschriebene Wort!",
    icon: "Search",
    color: "tertiary",
    renderer: "generic",
    exercises: [
      { id: "203_1", question: "Welches Wort ist FALSCH geschrieben?", options: ["spielen", "schpielen", "Stein", "Stern"], correctAnswer: "schpielen", hint: "Man spricht 'schp', aber schreibt 'sp'." },
      { id: "203_2", question: "Welches Wort ist RICHTIG geschrieben?", options: ["Meuse", "Mäuse", "Moise", "Möise"], correctAnswer: "Mäuse", hint: "Kommt von Maus, also mit äu." },
      { id: "203_3", question: "Welches Wort ist FALSCH geschrieben?", options: ["Stuhl", "stehen", "Schtand", "Straße"], correctAnswer: "Schtand", hint: "Man schreibt 'St', nicht 'Scht'." }
    ]
  },
  {
    id: 207,
    subject: "deutsch",
    title: "Leseverständnis",
    subtitle: "Quatsch-Sätze finden",
    grade: 2,
    difficulty: "mittel",
    description: "Lies dir die Sätze genau durch. Einer davon ist völliger Quatsch!",
    icon: "HelpCircle",
    color: "orange",
    renderer: "generic",
    exercises: [
      { id: "207_1", question: "Welcher Satz ist völliger Quatsch?", options: ["Der Hund bellt laut im Garten.", "Der Baum fliegt hoch in den Himmel.", "Die Katze schläft auf dem Sofa."], correctAnswer: "Der Baum fliegt hoch in den Himmel.", hint: "Können Pflanzen fliegen?" },
      { id: "207_2", question: "Welcher Satz ergibt keinen Sinn?", options: ["Das Auto fährt auf der Straße.", "Ich trinke ein Glas kaltes Wasser.", "Der Stuhl isst einen Apfel."], correctAnswer: "Der Stuhl isst einen Apfel.", hint: "Können Möbelstücke etwas essen?" },
      { id: "207_3", question: "Finde den Quatsch-Satz:", options: ["Die Fische schwimmen im trockenen Sand.", "Der Vogel baut ein Nest im Baum.", "Das Baby weint leise."], correctAnswer: "Die Fische schwimmen im trockenen Sand.", hint: "Wo leben Fische eigentlich?" }
    ]
  },
  {
    id: 204,
    subject: "mathe",
    title: "Plus/Minus bis 50",
    subtitle: "Rechnen ohne Hunderter",
    grade: 2,
    difficulty: "leicht",
    description: "Löse die Aufgaben bis zur Zahl 50.",
    icon: "Calculator",
    color: "primary",
    renderer: "math",
    exercises: [
      { id: "204_1", question: "Rechne aus: 20 + 15 = __", options: ["35", "45", "25", "30"], correctAnswer: "35", hint: "Rechne erst die Zehner: 20 + 10 = 30." },
      { id: "204_2", question: "Rechne aus: 45 - 10 = __", options: ["25", "30", "35", "40"], correctAnswer: "35", hint: "Nimm einfach einen Zehner weg." },
      { id: "204_3", question: "Rechne aus: 32 + 8 = __", options: ["38", "39", "40", "41"], correctAnswer: "40", hint: "2 Einer plus 8 Einer gibt den nächsten vollen Zehner." }
    ]
  },
  {
    id: 205,
    subject: "mathe",
    title: "Das kleine Einmaleins",
    subtitle: "2er, 5er, 10er",
    grade: 2,
    difficulty: "mittel",
    description: "Werde zum Einmaleins-Meister!",
    icon: "Sparkles",
    color: "secondary",
    renderer: "math",
    exercises: [
      { id: "205_1", question: "Rechne aus: 4 • 2 = __", mathNum1: 4, mathNum2: 2, mathOp: "*", options: ["6", "8", "10", "12"], correctAnswer: "8", hint: "Vier mal die Zwei: 2 + 2 + 2 + 2." },
      { id: "205_2", question: "Rechne aus: 3 • 5 = __", mathNum1: 3, mathNum2: 5, mathOp: "*", options: ["10", "15", "20", "25"], correctAnswer: "15", hint: "Drei mal die Fünf: 5, 10, 15." },
      { id: "205_3", question: "Rechne aus: 7 • 10 = __", mathNum1: 7, mathNum2: 10, mathOp: "*", options: ["70", "60", "80", "17"], correctAnswer: "70", hint: "Einfach eine Null an die 7 hängen!" }
    ]
  },
  {
    id: 206,
    subject: "mathe",
    title: "Einmaleins gemischt",
    subtitle: "Bis 100",
    grade: 2,
    difficulty: "schwer",
    description: "Kannst du auch die schwierigen Einmaleins-Reihen?",
    icon: "Award",
    color: "tertiary",
    renderer: "math",
    exercises: [
      { id: "206_1", question: "Rechne aus: 4 • 8 = __", mathNum1: 4, mathNum2: 8, mathOp: "*", options: ["32", "24", "36", "28"], correctAnswer: "32", hint: "Tipp: 2 mal 8 = 16. Und das Doppelte ist?" },
      { id: "206_2", question: "Rechne aus: 6 • 7 = __", mathNum1: 6, mathNum2: 7, mathOp: "*", options: ["42", "48", "36", "49"], correctAnswer: "42", hint: "5 mal 7 ist 35. Und dann noch eine 7 dazu." },
      { id: "206_3", question: "Rechne aus: 9 • 9 = __", mathNum1: 9, mathNum2: 9, mathOp: "*", options: ["81", "90", "72", "88"], correctAnswer: "81", hint: "10 mal 9 ist 90. Davon einmal 9 abziehen." }
    ]
  },
  {
    id: 208,
    subject: "mathe",
    title: "Formen & Körper",
    subtitle: "Geometrie in 3D",
    grade: 2,
    difficulty: "mittel",
    description: "Kennst du die geometrischen Körper?",
    icon: "Layers",
    color: "orange",
    renderer: "math",
    exercises: [
      {
        id: "208_1",
        question: "Welcher Körper sieht aus wie ein Spielwürfel?",
        options: ["Kugel", "Würfel", "Zylinder", "Pyramide"],
        correctAnswer: "Würfel",
        hint: "Er hat überall die gleichen Ecken und Kanten."
      },
      {
        id: "208_2",
        question: "Welcher Körper ist ganz rund und kann in alle Richtungen rollen?",
        options: ["Kugel", "Quader", "Würfel", "Pyramide"],
        correctAnswer: "Kugel",
        hint: "Ein Fußball ist eine..."
      },
      {
        id: "208_3",
        question: "Geh in die Küche und suche etwas, das die Form eines Zylinders hat (z.B. eine Konservendose)!",
        correctAnswer: "done",
        hint: "Ein Zylinder ist rund wie ein Rohr, aber oben und unten flach.",
        imagePlaceholder: "🥫",
        isAnalog: true
      }
    ]
  },
  {
    id: 209,
    subject: "mathe",
    title: "Die Uhrzeit-Meister",
    subtitle: "Uhrzeit ablesen",
    grade: 2,
    difficulty: "mittel",
    description: "Wie spät ist es auf der Uhr?",
    icon: "Clock",
    color: "primary",
    renderer: "math",
    exercises: [
      {
        id: "209_1",
        question: "Wie viel Uhr ist es, wenn der kleine Zeiger auf der 3 steht und der große Zeiger auf der 12?",
        options: ["3:00 Uhr", "12:03 Uhr", "6:00 Uhr", "9:00 Uhr"],
        correctAnswer: "3:00 Uhr",
        hint: "Der kleine Zeiger zeigt die Stunden, der große die Minuten (12 bedeutet voll)."
      },
      {
        id: "209_2",
        question: "Suche eine echte Uhr im Haus. Wie spät ist es jetzt gerade? Stelle dich hin und stelle die Uhrzeit mit deinen Armen nach!",
        correctAnswer: "done",
        hint: "Dein einer Arm ist der Stundenzeiger, der andere der Minutenzeiger.",
        imagePlaceholder: "⏰",
        isAnalog: true
      }
    ]
  }
];
