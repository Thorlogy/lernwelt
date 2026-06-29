import re

with open('/Users/tleimbach/antigravity/Lernwelt/src/data.ts', 'r') as f:
    content = f.read()

# Simplify some complex strings
replacements = {
    "Lerne spielerisch das Alphabet, finde den richtigen Anfangsbuchstaben und verbinde die Punkte!": "Finde den richtigen Anfangsbuchstaben!",
    "Schwinge die Wörter und finde heraus, wie viele Silben sie haben!": "Wie viele Silben hat das Wort?",
    "Sortiere Nomen, Verben und Adjektive richtig in die Wortarten-Kisten!": "Finde die richtige Wortart!",
    "Finde die Fehler in den Wörtern und werde zum Rechtschreib-Meister!": "Finde die Fehler in den Wörtern!",
    "Finde die richtige Mehrzahlform des Nomen! Achte besonders auf Umlaute.": "Wie heißt die Mehrzahl?",
    "Setze das angegebene Verb in die richtige Vergangenheitsform (Präteritum) ein!": "Schreibe das Wort in der Vergangenheit!",
    "Rechne die Plus- und Minusaufgaben! Nutze das Zwanzigerfeld als Rechenhilfe.": "Rechne Plus und Minus!",
    "Löse die Pizza-Aufgaben und zeige, dass du ein echter Bruch-Meister bist!": "Löse die Bruch-Aufgaben!",
    "Knacke kleine Textaufgaben und finde den Weg durch die Hundertertafel!": "Löse Textaufgaben!",
    "Verbinde Sätze richtig und setze Verben in die richtige Personalform!": "Setze die Wörter richtig ein!",
    "Lies Diagramme ab und rechne mit der Uhrzeit!": "Rechne mit der Uhrzeit!",
    "Stelle Sätze um und prüfe dein Textverständnis!": "Stelle Sätze um!",
    "Berechne den Umfang und übersetze alte römische Zahlen!": "Rechne mit Umfang und Römerzahlen!",
    "Wende die Wörtliche Rede richtig an und springe in die Vergangenheitsformen!": "Übe die wörtliche Rede!"
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open('/Users/tleimbach/antigravity/Lernwelt/src/data.ts', 'w') as f:
    f.write(content)

print("Simplified texts in data.ts!")
