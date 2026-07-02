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
    title: "Beethovens Ton-Maschine",
    subtitle: "Musik & Mathe",
    grade: 4,
    difficulty: "schwer",
    description: "Geheime Noten-Codes und gespiegelte Melodien.",
    icon: "Music",
    color: "secondary",
    isExcellence: true,
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
        question: "In einer Fuge (wie bei Beethoven) wird eine Melodie oft gespiegelt (Umkehrung). Geht das Original nach oben: [Ton hoch ⬆️, Ton hoch ⬆️]. Was macht die Spiegelung?",
        options: ["Ton runter ⬇️, Ton runter ⬇️", "Ton hoch ⬆️, Ton hoch ⬆️", "Ton bleibt gleich ➡️", "Ton runter ⬇️, Ton hoch ⬆️"],
        correctAnswer: "Ton runter ⬇️, Ton runter ⬇️",
        hint: "Ein Spiegel dreht Richtungen um. Aus Hoch (⬆️) wird Runter (⬇️)!"
      },
      {
        id: "903_3",
        question: "Beim 'Krebsgang' wird eine Melodie mathematisch rückwärts abgespielt. Die Noten lauten: C - D - E. Wie klingt der Krebsgang?",
        options: ["E - D - C", "C - D - E", "C - E - D", "D - E - C"],
        correctAnswer: "E - D - C",
        hint: "Lies das Notenmuster einfach von hinten nach vorne!"
      },
      {
        id: "903_4",
        question: "Singe oder summe eine einfache Melodie aus 3 Tönen vorwärts (z. B. C - D - E). Versuche sie nun rückwärts zu singen! Gelingt es dir beim ersten Mal?",
        correctAnswer: "done",
        hint: "Nimm dir Zeit. Singe erst 'Do - Re - Mi' und dann 'Mi - Re - Do'!",
        imagePlaceholder: "🎶",
        isAnalog: true
      }
    ]
  }
];
