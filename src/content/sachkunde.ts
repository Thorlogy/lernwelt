import { Station } from '../types';

export const SACHKUNDE: Station[] = [
  {
    id: 501,
    subject: "sachkunde",
    title: "Die Hol-es-Mission",
    subtitle: "Materialien finden",
    grade: 1,
    difficulty: "leicht",
    description: "Erkunde dein Zimmer! Hol echte Dinge, die zu den Aufgaben passen.",
    icon: "Search",
    color: "orange",
    exercises: [
      {
        id: "501_1",
        question: "Finde etwas in deinem Zimmer, das aus Holz ist!",
        correctAnswer: "done",
        hint: "Das kann ein Tisch, ein Stuhl oder ein Bauklotz sein.",
        imagePlaceholder: "🪵",
        isAnalog: true
      },
      {
        id: "501_2",
        question: "Finde einen Gegenstand, der rot ist!",
        correctAnswer: "done",
        hint: "Vielleicht ein Stift, ein Ball oder ein T-Shirt?",
        imagePlaceholder: "🔴",
        isAnalog: true
      },
      {
        id: "501_3",
        question: "Hole dir ein Glas Wasser aus der Küche und trinke einen Schluck!",
        correctAnswer: "done",
        hint: "Trinken ist wichtig! Mhhh... erfrischend.",
        imagePlaceholder: "💧",
        isAnalog: true
      }
    ]
  },
  {
    id: 502,
    subject: "sachkunde",
    title: "Tiere im Wald",
    subtitle: "Waldtiere erkennen",
    grade: 2,
    difficulty: "mittel",
    description: "Welche Tiere leben bei uns im Wald?",
    icon: "Search",
    color: "primary",
    exercises: [
      {
        id: "502_1",
        question: "Welches Tier hat Stacheln und rollt sich bei Gefahr ein?",
        options: ["Der Fuchs", "Der Igel", "Das Eichhörnchen", "Der Bär"],
        correctAnswer: "Der Igel",
        hint: "Er schläft gerne im Laubhaufen."
      },
      {
        id: "502_2",
        question: "Welches Tier baut einen Kobel oben in den Bäumen?",
        options: ["Das Eichhörnchen", "Das Wildschwein", "Die Ameise", "Der Dachs"],
        correctAnswer: "Das Eichhörnchen",
        hint: "Es isst sehr gerne Nüsse."
      },
      {
        id: "502_3",
        question: "Bewege dich jetzt für 20 Sekunden wie ein Eichhörnchen durchs Zimmer!",
        correctAnswer: "done",
        hint: "Hüpfe schnell von Versteck zu Versteck!",
        imagePlaceholder: "🐿️",
        isAnalog: true
      }
    ]
  },
  {
    id: 503,
    subject: "sachkunde",
    title: "Das liebe Wetter",
    subtitle: "Wetter & Kleidung",
    grade: 1,
    difficulty: "leicht",
    description: "Was ziehen wir an, wenn es kalt ist?",
    icon: "HelpCircle",
    color: "primary",
    exercises: [
      {
        id: "503_1",
        question: "Es schneit und ist bitterkalt! Was ziehst du an?",
        options: ["Badehose", "Winterjacke", "Sonnenbrille", "Kurze Hose"],
        correctAnswer: "Winterjacke",
        hint: "Es soll schön warm halten!"
      },
      {
        id: "503_2",
        question: "Geh zum Fenster, schau nach draußen und sag laut, wie das Wetter heute ist!",
        correctAnswer: "done",
        hint: "Scheint die Sonne? Regnet es?",
        imagePlaceholder: "🌤️",
        isAnalog: true
      }
    ]
  },
  {
    id: 504,
    subject: "sachkunde",
    title: "Verkehrsdetektive",
    subtitle: "Verkehrserziehung",
    grade: 2,
    difficulty: "mittel",
    description: "Sicher über die Straße kommen.",
    icon: "Search",
    color: "orange",
    exercises: [
      {
        id: "504_1",
        question: "Was bedeutet ein rotes Schild mit weißem Balken in der Mitte?",
        options: ["Vorfahrt gewähren", "Einfahrt verboten", "Stopp", "Fußgängerzone"],
        correctAnswer: "Einfahrt verboten",
        hint: "Hier darf man nicht reinfahren."
      },
      {
        id: "504_2",
        question: "Geh zur nächsten Tür, stell dich hin und übe: Nach links schauen, nach rechts schauen, nochmal nach links schauen!",
        correctAnswer: "done",
        hint: "Das machst du auch am Zebrastreifen so.",
        imagePlaceholder: "👀",
        isAnalog: true
      }
    ]
  },
  {
    id: 505,
    subject: "sachkunde",
    title: "Der fitte Körper",
    subtitle: "Ernährung & Gesundheit",
    grade: 3,
    difficulty: "mittel",
    description: "Was tut unserem Körper gut?",
    icon: "HelpCircle",
    color: "tertiary",
    exercises: [
      {
        id: "505_1",
        question: "Welches Lebensmittel liefert dir gesunde Energie und viele Vitamine?",
        options: ["Gummibärchen", "Apfel", "Schokolade", "Chips"],
        correctAnswer: "Apfel",
        hint: "Es wächst am Baum."
      },
      {
        id: "505_2",
        question: "Geh in die Küche, hol dir ein gesundes Stück Obst oder Gemüse und zeige es stolz vor!",
        correctAnswer: "done",
        hint: "Vielleicht gibt es später noch was davon als Snack?",
        imagePlaceholder: "🍎",
        isAnalog: true
      }
    ]
  },
  {
    id: 506,
    subject: "sachkunde",
    title: "Magnet-Detektive",
    subtitle: "Technik & Magnetismus",
    grade: 2,
    difficulty: "mittel",
    description: "Was zieht ein Magnet eigentlich an?",
    icon: "Search",
    color: "orange",
    exercises: [
      {
        id: "506_1",
        question: "Welchen dieser Gegenstände kann ein Magnet anziehen?",
        options: ["Holzstift", "Eisennagel", "Plastikbecher", "Papierschnipsel"],
        correctAnswer: "Eisennagel",
        hint: "Er muss aus Metall (Eisen, Nickel oder Kobalt) bestehen."
      },
      {
        id: "506_2",
        question: "Hol dir einen echten Kühlschrankmagneten. Gehe durch dein Zimmer und teste 3 Dinge: Was bleibt haften?",
        correctAnswer: "done",
        hint: "Metallische Oberflächen wie Kühlschränke oder Magnettafeln klappen super!",
        imagePlaceholder: "🧲",
        isAnalog: true
      }
    ]
  }
];
