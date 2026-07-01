import { Station } from '../types';

export const MUSIK: Station[] = [
  {
    id: 901,
    subject: "musik",
    title: "Klatsch-Konzert",
    subtitle: "Rhythmusgefühl",
    grade: 1,
    difficulty: "leicht",
    description: "Wie gut spürst du den Takt?",
    icon: "Music",
    color: "primary",
    exercises: [
      {
        id: "901_1",
        question: "Welches Geräusch klingt am schnellsten?",
        options: ["Das Klopfen eines Spechts", "Das Tropfen von Regenwasser", "Das Ticken einer großen Uhr"],
        correctAnswer: "Das Klopfen eines Spechts",
        hint: "Ein Specht klopft ganz schnell hintereinander am Baum."
      },
      {
        id: "901_2",
        question: "Wie nennt man das gleichmäßige Schlagen in der Musik, zu dem man tanzt?",
        options: ["Takt", "Pause", "Tonleiter", "Schall"],
        correctAnswer: "Takt",
        hint: "Es hilft allen Musikern, zusammenzuspielen."
      },
      {
        id: "901_3",
        question: "Suche dir einen Becher, einen Topf oder klopfe auf den Tisch: Trommele den Rhythmus deines Lieblingsliedes nach!",
        correctAnswer: "done",
        hint: "Klatsche oder trommele laut und deutlich!",
        imagePlaceholder: "🥁",
        isAnalog: true
      }
    ]
  },
  {
    id: 902,
    subject: "musik",
    title: "Klang-Detektive",
    subtitle: "Gehörbildung & Instrumente",
    grade: 3,
    difficulty: "mittel",
    description: "Kennst du dich mit Instrumenten aus?",
    icon: "Music",
    color: "tertiary",
    exercises: [
      {
        id: "902_1",
        question: "Welches dieser Instrumente gehört zu den Saiteninstrumenten?",
        options: ["Gitarre", "Trompete", "Blockflöte", "Trommel"],
        correctAnswer: "Gitarre",
        hint: "Es hat Saiten, die man zupft oder anschlägt."
      },
      {
        id: "902_2",
        question: "Was passiert, wenn man eine Saite an einer Gitarre fester spannt?",
        options: ["Der Ton wird höher", "Der Ton wird tiefer", "Der Ton bleibt gleich", "Die Gitarre wird leiser"],
        correctAnswer: "Der Ton wird höher",
        hint: "Je straffer eine Saite ist, desto schneller schwingt sie."
      },
      {
        id: "902_3",
        question: "Schließe deine Augen für 30 Sekunden. Welche 3 verschiedenen Geräusche hörst du in deiner Wohnung oder draußen? Zähle sie laut auf!",
        correctAnswer: "done",
        hint: "Vielleicht das Ticken einer Uhr, ein Auto oder Vögel?",
        imagePlaceholder: "👂",
        isAnalog: true
      }
    ]
  },
  {
    id: 903,
    subject: "musik",
    title: "Der Takt-Bäcker",
    subtitle: "Musik & Mathe",
    grade: 4,
    difficulty: "schwer",
    description: "Takte backen und Noten teilen.",
    icon: "Music",
    color: "secondary",
    exercises: [
      {
        id: "903_1",
        question: "Eine halbe Note (1/2) ist so lang wie zwei Viertelnoten (1/4 + 1/4). Wie viele Achtelnoten (1/8) brauchst du, um eine ganze Note (1) voll zu machen?",
        options: ["8 Achtelnoten", "4 Achtelnoten", "2 Achtelnoten", "16 Achtelnoten"],
        correctAnswer: "8 Achtelnoten",
        hint: "Teile das Ganze (1) durch ein Achtel (1/8) - genau wie beim Pizza schneiden!"
      },
      {
        id: "903_2",
        question: "Der Takt-Bäcker backt einen 4/4-Takt-Kuchen. Er hat schon eine halbe Note (2/4) und eine Viertelnote (1/4) hineingetan. Welches Stück fehlt noch?",
        options: ["Eine Viertelnote (1/4)", "Eine halbe Note (2/4)", "Eine Achtelnote (1/8)", "Ein ganzer Takt (4/4)"],
        correctAnswer: "Eine Viertelnote (1/4)",
        hint: "Addiere die Notenwerte: 2/4 + 1/4 = 3/4. Wie viel fehlt noch bis zum vollen 4/4-Kuchen?"
      },
      {
        id: "903_3",
        question: "Klatsche einen Takt vor: Klatsche 1-mal lang (halbe Note) und dann 2-mal kurz (zwei Viertelnoten). Wiederhole das 4-mal hintereinander!",
        correctAnswer: "done",
        hint: "Zähle laut mit: '1... 2... (Klatschen) | 3 (Klatsch) | 4 (Klatsch)'. Viel Spaß!",
        imagePlaceholder: "👏",
        isAnalog: true
      }
    ]
  }
];
