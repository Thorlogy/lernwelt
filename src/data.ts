import { Station } from './types';

export const STATIONEN: Station[] = [
  {
    id: 1,
    title: "Station 1: Buchstabensalat",
    subtitle: "Erstleser & Wortbau",
    grade: 1,
    description: "Bringe die durcheinandergewürfelten Buchstaben in die richtige Reihenfolge, um das gesuchte Wort zu schreiben!",
    icon: "Keyboard",
    color: "primary",
    exercises: [
      {
        id: "1_1",
        question: "Bilde das Wort für dieses süße Haustier:",
        word: "KATZE",
        hint: "Es macht 'Miau' und fängt gerne Mäuse.",
        correctAnswer: "KATZE",
        imagePlaceholder: "cat"
      },
      {
        id: "1_2",
        question: "Schreibe dieses rote, knackige Obst:",
        word: "APFEL",
        hint: "Es wächst auf Bäumen und ist sehr gesund.",
        correctAnswer: "APFEL",
        imagePlaceholder: "apple"
      },
      {
        id: "1_3",
        question: "Wie heißt dieses kleine Tier, das Käse liebt?",
        word: "MAUS",
        hint: "Es macht 'Piep' und läuft vor der Katze weg.",
        correctAnswer: "MAUS",
        imagePlaceholder: "mouse"
      },
      {
        id: "1_4",
        question: "Bilde das Wort für das, was hell am Himmel scheint:",
        word: "SONNE",
        hint: "Sie wärmt uns im Sommer und leuchtet tagsüber.",
        correctAnswer: "SONNE",
        imagePlaceholder: "sun"
      },
      {
        id: "1_5",
        question: "Wie nennt man diesen großen Baum im Wald?",
        word: "TANNE",
        hint: "Sie bleibt auch im Winter grün und wird als Weihnachtsbaum geschmückt.",
        correctAnswer: "TANNE",
        imagePlaceholder: "fir"
      }
    ]
  },
  {
    id: 2,
    title: "Station 2: Silben-Hüpfen",
    subtitle: "Silbentrennung & Rhythmus",
    grade: 2,
    description: "Klicke die Silben in der richtigen Reihenfolge an, um das ganze Wort fließend zusammenzusetzen!",
    icon: "Music",
    color: "secondary",
    exercises: [
      {
        id: "2_1",
        question: "Zerteile das Wort 'Wasser' in seine Silben:",
        word: "WASSER",
        hint: "Was-ser: Klatschen hilft dir!",
        correctAnswer: ["WAS", "SER"],
        imagePlaceholder: "water"
      },
      {
        id: "2_2",
        question: "Klatsche das Wort 'Schule':",
        word: "SCHULE",
        hint: "Schu-le. Zwei Silben!",
        correctAnswer: ["SCHU", "LE"],
        imagePlaceholder: "school"
      },
      {
        id: "2_3",
        question: "Finde die Silben für diese schöne Frühlingsblume:",
        word: "TULPE",
        hint: "Tul-pe. Sie blüht im Garten.",
        correctAnswer: ["TUL", "PE"],
        imagePlaceholder: "tulip"
      },
      {
        id: "2_4",
        question: "Baue das Wort für das bunte Wunder am Himmel nach dem Regen:",
        word: "REGENBOGEN",
        hint: "Re-gen-bo-gen. Vier Silben!",
        correctAnswer: ["RE", "GEN", "BO", "GEN"],
        imagePlaceholder: "rainbow"
      },
      {
        id: "2_5",
        question: "Zerteile dieses saftige rote Sommer-Gemüse:",
        word: "TOMATE",
        hint: "To-ma-te. Drei Klatscher!",
        correctAnswer: ["TO", "MA", "TE"],
        imagePlaceholder: "tomato"
      }
    ]
  },
  {
    id: 3,
    title: "Station 3: Wortarten-Sortierer",
    subtitle: "Grammatik & Ordnung",
    grade: 3,
    description: "Sortiere die Wörter in die richtigen Schatztruhen: Nomen (Namenwörter), Verben (Tuwörter) oder Adjektive (Wiewörter)!",
    icon: "FolderGit",
    color: "tertiary",
    exercises: [
      {
        id: "3_1",
        question: "Wohin gehört das Wort: HUND",
        word: "Hund",
        hint: "Ein Tier, das man anfassen kann. Nomen schreibt man groß!",
        correctAnswer: "NOMEN"
      },
      {
        id: "3_2",
        question: "Wohin gehört das Wort: RENNEN",
        word: "rennen",
        hint: "Etwas, das man tut (eine Bewegung).",
        correctAnswer: "VERB"
      },
      {
        id: "3_3",
        question: "Wohin gehört das Wort: SÜSS",
        word: "süss",
        hint: "Wie schmeckt der Apfel? Er beschreibt eine Eigenschaft.",
        correctAnswer: "ADJEKTIV"
      },
      {
        id: "3_4",
        question: "Wohin gehört das Wort: SCHREIBEN",
        word: "schreiben",
        hint: "Was tust du mit deinem Stift?",
        correctAnswer: "VERB"
      },
      {
        id: "3_5",
        question: "Wohin gehört das Wort: KLUG",
        word: "klug",
        hint: "Wie ist Lumi der Drache?",
        correctAnswer: "ADJEKTIV"
      },
      {
        id: "3_6",
        question: "Wohin gehört das Wort: HAUS",
        word: "Haus",
        hint: "Ein Gebäude, in dem man wohnt. Ein Gegenstand oder Ding.",
        correctAnswer: "NOMEN"
      }
    ]
  },
  {
    id: 4,
    title: "Station 4: Rechtschreib-Detektiv",
    subtitle: "Satzbau & Groß-/Kleinschreibung",
    grade: 4,
    description: "Finde die Rechtschreibfehler in den Sätzen und tippe auf die falschen Wörter, um sie richtig zu korrigieren!",
    icon: "Search",
    color: "orange",
    exercises: [
      {
        id: "4_1",
        question: "In diesem Satz hat sich ein kleiner Buchstabendreher eingeschlichen:",
        hint: "Achte auf das Wort für das Tier, das fliegt! Es wird mit V geschrieben.",
        correctAnswer: "Vogel",
        word: "Der kleine fogel singt ein schönes Lied im Baum.",
        correctAnswerText: "fogel" // Target word that is wrong
      },
      {
        id: "4_2",
        question: "Wo ist das vergessene große 'S'?",
        hint: "Wochentage sind Nomen und werden immer großgeschrieben!",
        correctAnswer: "Samstag",
        word: "Am samstag spielen wir im Park alle zusammen.",
        correctAnswerText: "samstag"
      },
      {
        id: "4_3",
        question: "Ein Aussprachefehler! 'schp' schreibt man im Deutschen anders:",
        hint: "Wir sprechen 'schpielen' aus, aber schreiben es nur mit 'sp'.",
        correctAnswer: "spielen",
        word: "Viele Kinder schbielen gerne Verstecken.",
        correctAnswerText: "schbielen"
      },
      {
        id: "4_4",
        question: "Wie schreibt man dieses Fortbewegungsmittel richtig?",
        hint: "Auto wird mit 'Au' geschrieben und ist ein Nomen (groß!).",
        correctAnswer: "Auto",
        word: "Das rote ohto fährt um die geheimnisvolle Kurve.",
        correctAnswerText: "ohto"
      }
    ]
  },
  {
    id: 5,
    title: "Station 5: Einzahl & Mehrzahl",
    subtitle: "Wortformen & Pluralbildung",
    grade: 2,
    description: "Finde die richtige Mehrzahlform des Nomen! Achte besonders auf Umlaute.",
    icon: "Award",
    color: "primary",
    exercises: [
      {
        id: "5_1",
        question: "Wie lautet die Mehrzahl von: DER BAUM?",
        word: "der Baum",
        options: ["die Bäume", "die Baumer", "die Bäumen", "die Bäumes"],
        correctAnswer: "die Bäume",
        hint: "Aus 'au' wird in der Mehrzahl oft ein Umlaut 'äu'.",
        imagePlaceholder: "trees"
      },
      {
        id: "5_2",
        question: "Wie lautet die Mehrzahl von: DIE MAUS?",
        word: "die Maus",
        options: ["die Mäuse", "die Mauser", "die Mause", "die Mäusen"],
        correctAnswer: "die Mäuse",
        hint: "Ein kleines Tier, das piept. Aus 'au' wird 'äu'.",
        imagePlaceholder: "mice"
      },
      {
        id: "5_3",
        question: "Wie lautet die Mehrzahl von: DAS BUCH?",
        word: "das Buch",
        options: ["die Bücher", "die Buche", "die Büchen", "die Buchs"],
        correctAnswer: "die Bücher",
        hint: "Aus 'u' wird in der Mehrzahl ein Umlaut 'ü' mit der Endung '-er'.",
        imagePlaceholder: "books"
      },
      {
        id: "5_4",
        question: "Wie lautet die Mehrzahl von: DIE HAND?",
        word: "die Hand",
        options: ["die Hände", "die Hande", "die Händen", "die Händer"],
        correctAnswer: "die Hände",
        hint: "Das 'a' wird zum Umlaut 'ä' mit der Endung '-e'.",
        imagePlaceholder: "hands"
      },
      {
        id: "5_5",
        question: "Wie lautet die Mehrzahl von: DER HUND?",
        word: "der Hund",
        options: ["die Hunde", "die Hunden", "die Hunder", "die Hundes"],
        correctAnswer: "die Hunde",
        hint: "Hier hängen wir einfach ein '-e' hinten an und das Wort bleibt sonst gleich.",
        imagePlaceholder: "dogs"
      }
    ]
  },
  {
    id: 6,
    title: "Station 6: Zeiten-Trainer",
    subtitle: "Gegenwart & Vergangenheit",
    grade: 3,
    description: "Setze das angegebene Verb in die richtige Vergangenheitsform (Präteritum) ein!",
    icon: "Award",
    color: "secondary",
    exercises: [
      {
        id: "6_1",
        question: "Lumi ______ gestern sehr schnell nach Hause.",
        word: "rennen",
        options: ["rannte", "rennte", "gerannt", "rann"],
        correctAnswer: "rannte",
        hint: "Präteritum (Vergangenheit) von 'rennen'. Achte auf den Vokalwechsel.",
        imagePlaceholder: "running"
      },
      {
        id: "6_2",
        question: "Wir ______ gestern gemeinsam in die Schule.",
        word: "gehen",
        options: ["gingen", "gehten", "gegangen", "gongt"],
        correctAnswer: "gingen",
        hint: "Präteritum (Vergangenheit) von 'gehen' in der 'wir'-Form.",
        imagePlaceholder: "walking"
      },
      {
        id: "6_3",
        question: "Ich ______ gestern einen leckeren Apfel.",
        word: "essen",
        options: ["aß", "essete", "gegessen", "ässt"],
        correctAnswer: "aß",
        hint: "Präteritum (Vergangenheit) von 'essen' in der 'ich'-Form.",
        imagePlaceholder: "eating"
      },
      {
        id: "6_4",
        question: "Du ______ gestern einen tollen Brief.",
        word: "schreiben",
        options: ["schriebst", "schreibtest", "geschrieben", "schriebest"],
        correctAnswer: "schriebst",
        hint: "Präteritum (Vergangenheit) von 'schreiben' in der 'du'-Form.",
        imagePlaceholder: "writing"
      },
      {
        id: "6_5",
        question: "Sie ______ gestern das spannende Buch.",
        word: "lesen",
        options: ["las", "lesete", "gelesen", "leste"],
        correctAnswer: "las",
        hint: "Präteritum (Vergangenheit) von 'lesen' in der 'sie' (Einzahl)-Form.",
        imagePlaceholder: "reading"
      }
    ]
  }
];

export const CHARACTER_AVATARS = [
  { id: 'dragon', name: 'Lumi (Drache)', emoji: '🐉', color: 'bg-emerald-100 border-emerald-300 text-emerald-700' },
  { id: 'unicorn', name: 'Sternchen (Einhorn)', emoji: '🦄', color: 'bg-pink-100 border-pink-300 text-pink-700' },
  { id: 'owl', name: 'Olli (Eule)', emoji: '🦉', color: 'bg-amber-100 border-amber-300 text-amber-700' },
  { id: 'rocket', name: 'Kosmo (Rakete)', emoji: '🚀', color: 'bg-blue-100 border-blue-300 text-blue-700' },
  { id: 'fox', name: 'Foxy (Fuchs)', emoji: '🦊', color: 'bg-orange-100 border-orange-300 text-orange-700' },
  { id: 'frog', name: 'Quaki (Frosch)', emoji: '🐸', color: 'bg-green-100 border-green-300 text-green-700' },
];
