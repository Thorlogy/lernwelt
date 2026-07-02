import { Station } from '../types';

export const LOGIK: Station[] = [
  {
    id: 801,
    subject: "logik",
    title: "Lumi im Zauberwald",
    subtitle: "Wege & Algorithmen",
    grade: 1,
    difficulty: "leicht",
    description: "Hilf Lumi, den richtigen Weg zu finden!",
    icon: "Cpu",
    color: "primary",
    exercises: [
      {
        id: "801_1",
        question: "Lumi (🦖) möchte zum Stern (🌟). Welchen Befehl muss Lumi ausführen?",
        grid2D: [
          ["🌳", "🌟", "🌳"],
          ["🌳", "🦖", "🌳"]
        ],
        options: ["Gehe 1 Schritt nach oben", "Gehe 1 Schritt nach rechts", "Gehe 1 Schritt nach unten"],
        correctAnswer: "Gehe 1 Schritt nach oben",
        hint: "Schau dir an, wo der Stern im Vergleich zu Lumi liegt!"
      },
      {
        id: "801_2",
        question: "Lumi (🦖) läuft erst nach links (⬅️) und dann nach oben (⬆️). Wo kommt er an?",
        grid2D: [
          ["💎", "🌳"],
          ["🌻", "🦖"]
        ],
        options: ["Beim Diamant 💎", "Bei der Sonnenblume 🌻", "Beim Baum 🌳"],
        correctAnswer: "Beim Diamant 💎",
        hint: "Gehe gedanklich erst einen Schritt nach links zur Blume, und von dort einen Schritt nach oben."
      },
      {
        id: "801_3",
        question: "Roboter-Spiel: Programmiere jemanden in deiner Wohnung! Gib ihm genaue Befehle (z. B. 'Gehe 3 Schritte vorwärts, drehe dich nach links, mache einen Hüpfer'), um ein Ziel zu erreichen.",
        correctAnswer: "done",
        hint: "Bewege dich steif und mechanisch wie ein echter Roboter!",
        imagePlaceholder: "🤖",
        isAnalog: true
      }
    ]
  },
  {
    id: 803,
    subject: "logik",
    title: "Lumis Schleifen-Reise",
    subtitle: "Muster & Wiederholungen",
    grade: 2,
    difficulty: "mittel",
    description: "Finde Perlenmuster und benutze Programmier-Schleifen.",
    icon: "Cpu",
    color: "primary",
    exercises: [
      {
        id: "803_1",
        question: "Lumi fädelt Perlen auf: 🔴, 🔵, 🟢, 🔴, 🔵, 🟢, 🔴... Welche Perlenfolge wiederholt sich immer wieder (Schleife)?",
        options: ["🔴, 🔵, 🟢", "🔴, 🔵", "🔵, 🟢", "🔴, 🟢"],
        correctAnswer: "🔴, 🔵, 🟢",
        hint: "Schau, wo das Muster wieder von vorne mit Rot anfängt!"
      },
      {
        id: "803_2",
        question: "Lumi (🦖) soll 3-mal hintereinander diesen Code laufen: [Erst ➡️, dann ⬆️]. Wo kommt er an, wenn er bei 🦖 startet?",
        grid2D: [
          ["🌳", "🌳", "🌳", "💎"],
          ["🌳", "🌳", "🌸", "🌳"],
          ["🌳", "🍄", "🌳", "🌳"],
          ["🦖", "🌳", "🌳", "🌳"]
        ],
        options: ["Beim Diamant 💎", "Beim Pilz 🍄", "Bei der Blume 🌸", "Im Wald 🌳"],
        correctAnswer: "Beim Diamant 💎",
        hint: "Führe die Schritte [Rechts, Hoch] dreimal nacheinander aus und ziehe mit dem Finger mit!"
      },
      {
        id: "803_3",
        question: "Finde in deiner Wohnung 3 Dinge mit einem wiederkehrenden Muster (z. B. Streifen auf Socken, Kacheln im Bad, Muster auf einer Decke). Zeige sie jemandem!",
        correctAnswer: "done",
        hint: "Muster wiederholen sich immer wieder, genau wie Schleifen im Computer!",
        imagePlaceholder: "🌀",
        isAnalog: true
      }
    ]
  },
  {
    id: 802,
    subject: "logik",
    title: "Die Sortier-Rutsche",
    subtitle: "Daten & Algorithmen",
    grade: 3,
    difficulty: "mittel",
    description: "Murmeln sortieren und Geheimsprachen entschlüsseln.",
    icon: "Cpu",
    color: "secondary",
    exercises: [
      {
        id: "802_1",
        question: "Drei Murmeln mit den Zahlen 8, 3 und 5 rollen in eine Sortier-Rutsche. Die Rutsche lässt die kleinste Zahl zuerst durch, dann die mittlere, dann die größte. In welcher Reihenfolge kommen sie unten an?",
        options: ["3, 5, 8", "8, 5, 3", "3, 8, 5", "5, 3, 8"],
        correctAnswer: "3, 5, 8",
        hint: "Sortiere die Zahlen von klein nach groß."
      },
      {
        id: "802_2",
        question: "Computer zeichnen Bilder mit Nullen und Einsen. Eine 0 steht für weiß (⚪), eine 1 für schwarz (⚫). Was zeichnet der Computer bei dem Code '0 - 1 - 0 - 1'?",
        options: ["⚪ ⚫ ⚪ ⚫", "⚫ ⚪ ⚫ ⚪", "⚪ ⚪ ⚫ ⚫", "⚫ ⚫ ⚪ ⚪"],
        correctAnswer: "⚪ ⚫ ⚪ ⚫",
        hint: "Ersetze jede 0 durch ein weißes Feld und jede 1 durch ein schwarzes Feld."
      },
      {
        id: "802_3",
        question: "Male dein eigenes 3x3 Gitter-Bild auf ein Blatt Papier (mit ausgemalten und leeren Kästchen). Schreibe den Code dafür als Zahlenreihe auf (0 für leer, 1 für ausgemalt)!",
        correctAnswer: "done",
        hint: "Zeige dein Bild und den Code stolz vor!",
        imagePlaceholder: "💡",
        isAnalog: true
      }
    ]
  },
  {
    id: 804,
    subject: "logik",
    title: "Codes & Netzwerke",
    subtitle: "Kryptographie & Graphen",
    grade: 4,
    difficulty: "schwer",
    description: "Verschlüssele Geheimsprachen und zähle Wege in Netzwerken.",
    icon: "Cpu",
    color: "secondary",
    isExcellence: true,
    exercises: [
      {
        id: "804_1",
        question: "Biber verschlüsseln Wörter, indem sie jeden Buchstaben im Alphabet um 1 Stelle nach hinten verschieben (A ➡️ B, B ➡️ C, ..., Z ➡️ A). Wie heißt das Wort 'HUND'?",
        options: ["IVOE", "GPMC", "JWPFE", "HUND"],
        correctAnswer: "IVOE",
        hint: "Verschiebe jeden Buchstaben im Alphabet um einen Schritt weiter: H wird zu I, U wird zu V, und so weiter!"
      },
      {
        id: "804_2",
        question: "Lumi möchte vom braunen Blatt (🍂) zum Pilz (🍄) springen. Er darf nur den Pfeilen (➡️ und ⬇️) folgen. Wie viele verschiedene Wege gibt es?",
        grid2D: [
          ["🍂", "➡️", "🍃"],
          ["⬇️", " ", "⬇️"],
          ["🍁", "➡️", "🍄"]
        ],
        options: ["2 Wege", "1 Weg", "3 Wege", "Kein Weg"],
        correctAnswer: "2 Wege",
        hint: "Finde alle Pfade! Pfad 1 geht über das obere grüne Blatt (🍃). Pfad 2 geht über das untere rote Blatt (🍁)."
      },
      {
        id: "804_3",
        question: "Schreibe eine geheime Biber-Nachricht (jeder Buchstabe um 1 Stelle nach hinten verschoben) auf einen Zettel und lass jemanden in deiner Familie das Wort entschlüsseln!",
        correctAnswer: "done",
        hint: "Gib der Person einen Tipp, dass das Alphabet verschoben ist!",
        imagePlaceholder: "🔑",
        isAnalog: true
      }
    ]
  }
];
