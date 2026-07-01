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
        question: "Lumi (🦖) möchte zum Stern (🌟). Er steht direkt darunter:\n\n[🌳]  [🌟]  [🌳]\n[🌳]  [🦖]  [🌳]\n\nWelchen Befehl muss Lumi ausführen?",
        options: ["Gehe 1 Schritt nach oben", "Gehe 1 Schritt nach rechts", "Gehe 1 Schritt nach unten"],
        correctAnswer: "Gehe 1 Schritt nach oben",
        hint: "Schau dir an, wo der Stern im Vergleich zu Lumi liegt!"
      },
      {
        id: "801_2",
        question: "Lumi startet bei [🦖]. Er läuft erst nach links (⬅️) und dann nach oben (⬆️). Wo kommt er an?\n\n[💎]  [🌳]\n[🌻]  [🦖]",
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
  }
];
