export const wordToEmoji: Record<string, string> = {
  // Klasse 1
  "Affe": "🐒",
  "Hund": "🐶",
  "Maus": "🐭",
  "Sonne": "☀️",
  "Bär": "🐻",
  "Tasse": "☕",
  "Auto": "🚗",
  "Katze": "🐱",
  "Sand": "🏖️",
  "Mond": "🌙",
  "Baum": "🌳",
  "Haus": "🏠",
  "Oma": "👵",
  "Tür": "🚪",
  "Käse": "🧀",
  "Loch": "🕳️",
  "Kreis": "⭕",
  "Dreieck": "🔺",
  "Quadrat": " квадрат", // wait
  "Rechteck": "▭",
  
  // Klasse 2
  "schnell": "🏃",
  "laufen": "👟",
  "schön": "✨",
  "gehen": "🚶",
  "klein": "🐜",
  "laut": "🔊",
  "spielen": "🎮",
  "grün": "🟩",
  "singen": "🎤",
  "Stein": "🪨",
  "Stern": "⭐",
  "Mäuse": "🐭",
  "Stuhl": "🪑",
  "stehen": "🧍",
  "Straße": "🛣️",
};

// Fix shapes
wordToEmoji["Quadrat"] = "🟥";
wordToEmoji["Rechteck"] = "🟦";

export function getEmojiForWord(word: string): string | null {
  // Exact match
  if (wordToEmoji[word]) return wordToEmoji[word];
  
  // Try case insensitive
  const foundKey = Object.keys(wordToEmoji).find(k => k.toLowerCase() === word.toLowerCase());
  if (foundKey) return wordToEmoji[foundKey];
  
  return null;
}
