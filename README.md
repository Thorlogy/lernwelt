# 🎒 Lernwelt: Das spielerische Deutschabenteuer

Lernwelt ist eine interaktive, kindgerechte Webanwendung zur Förderung der Sprach-, Grammatik- und Rechtschreibkompetenz für Grundschulkinder der Klassen 1 bis 4. Das Projekt basiert auf modernen Frontend-Technologien und den didaktischen Leitlinien des **Lehrplans Deutsch für die Primarstufe in Nordrhein-Westfalen (NRW)**.

---

## 📖 Pädagogisches Konzept & Lehrplan-Ausrichtung (NRW)

Die Lerninhalte sind didaktisch strukturiert und dem Kompetenzbereich **„Sprache und Sprachgebrauch untersuchen“** des nordrhein-westfälischen Kernlehrplans zugeordnet. Jede der sechs Stationen fördert spezifische Kompetenzerwartungen:

### 1. Station 1: Buchstabensalat (Klasse 1)
* **Didaktisches Ziel:** Phonologische Bewusstheit & Graphem-Phonem-Korrespondenz.
* **Lehrplan NRW:** Zuordnung von Lauten und Buchstaben, Wortbau und erste Schritte der orthografischen Strukturierung einfacher Wörter.

### 2. Station 2: Silben-Hüpfen (Klasse 2)
* **Didaktisches Ziel:** Silbenstruktur und rhythmische Strukturierung.
* **Lehrplan NRW:** Gliederung von Wörtern in Sprechsilben als fundamentale Rechtschreibstrategie zur Vermeidung von Auslassungsfehlern.

### 3. Station 3: Wortarten-Sortierer (Klasse 3)
* **Didaktisches Ziel:** Wortarten klassifizieren.
* **Lehrplan NRW:** Erkennen und Unterscheiden von grundlegenden Wortarten (Nomen/Namenwörter, Verben/Tuwörter, Adjektive/Wiewörter) sowie das Beachten der Großschreibung von Nomen.

### 4. Station 4: Rechtschreib-Detektiv (Klasse 4)
* **Didaktisches Ziel:** Fehleranalyse und Rechtschreibstrategien (Korrekturkompetenz).
* **Lehrplan NRW:** Anwenden von Rechtschreibregeln und -strategien (z.B. Verlängern, Ableiten, Groß-/Kleinschreibung bei Satzanfängen und Wochentagen) sowie das Identifizieren typischer Fehlerquellen (wie `sp`/`st` Schreibweise).

### 5. Station 5: Einzahl & Mehrzahl (Klasse 2)
* **Didaktisches Ziel:** Flexionsformen & Umlautungsregeln (Morphemkonstanz).
* **Lehrplan NRW:** Systematisches Ableiten von Wortformen zur korrekten Schreibung. Kinder lernen, dass sich Umlautungen wie *Baum -> Bäume* oder *Maus -> Mäuse* durch Rückführung auf die Grundform erschließen lassen.

### 6. Station 6: Zeiten-Trainer (Klasse 3)
* **Didaktisches Ziel:** Tempusformen erfassen.
* **Lehrplan NRW:** Untersuchung von Verben in verschiedenen Zeitstufen (Präsens vs. Präteritum/1. Vergangenheit) zur Entwicklung von Textkohärenz und narrativem Verständnis.

---

## 🔒 Sicherheitsarchitektur & Technische Konsistenz

* **Keine Server-Side Schwachstellen:** Die Anwendung ist als reine statische Single-Page-Applikation (Vite + React) konzipiert. Daten werden ausschließlich lokal im Browser des Nutzers via `localStorage` gespeichert. Es gibt keine Datenbankanbindung, wodurch Datendiebstahl oder SQL-Injections systemisch ausgeschlossen sind.
* **XSS-Schutz:** Der vom Kind eingegebene Name wird über standardmäßige React JSX-Renderings ausgegeben. Dies verhindert automatisch Cross-Site Scripting (XSS), da React alle Werte vor dem Rendern im DOM explizit maskiert.
* **Eingabevalidierung:** Der Namens-Input ist clientseitig auf maximal 18 Zeichen begrenzt (`maxLength={18}`), um Buffer-Overflow-Szenarien oder Layout-Breaks zu vermeiden.
* **Typensicherheit:** Vollständige Abdeckung durch TypeScript (`tsconfig.json`). Es wurden keine `any`-Typen in den neuen Modulen verwendet. Die Integrität des Projekts wurde durch `tsc --noEmit` erfolgreich verifiziert.

---

## 🚀 Technologie-Stack

* **Framework:** React 19 + TypeScript
* **Build-Tool:** Vite 6
* **Styling:** Vanilla Tailwind CSS v4 (für flüssige, hardwarebeschleunigte Micro-Animationen und taktile UI-Effekte)
* **Icons:** Lucide React

---

## 💻 Lokale Installation & Ausführung

### Voraussetzungen
Stelle sicher, dass **Node.js** auf deinem System installiert ist.

1. **Abhängigkeiten installieren:**
   ```bash
   npm install
   ```

2. **Entwicklungsserver starten:**
   ```bash
   npm run dev
   ```
   Die App ist anschließend unter **[http://localhost:3000/](http://localhost:3000/)** erreichbar.

3. **Code-Qualität / Linter ausführen:**
   ```bash
   npm run lint
   ```