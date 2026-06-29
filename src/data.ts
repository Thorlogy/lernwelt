import { Station } from './types';

export const STATIONEN: Station[] = [
  {
    id: 1,
    subject: "deutsch",
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
    subject: "deutsch",
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
    subject: "deutsch",
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
    subject: "deutsch",
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
        correctAnswerText: "fogel"
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
    subject: "deutsch",
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
    subject: "deutsch",
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
  },
  {
    id: 7,
    subject: "mathe",
    title: "Station 1: Rechen-König",
    subtitle: "Rechnen bis 20 & Zehnerübergang",
    grade: 1,
    description: "Rechne die Plus- und Minusaufgaben! Nutze das Zwanzigerfeld als Rechenhilfe.",
    icon: "Calculator",
    color: "primary",
    exercises: [
      {
        id: "7_1",
        question: "Rechne aus: 8 + 5 = ____",
        mathNum1: 8,
        mathNum2: 5,
        mathOp: "+",
        options: ["13", "12", "14", "15"],
        correctAnswer: "13",
        hint: "8 rote Punkte + 5 blaue Punkte. 2 blaue Punkte machen die obere Zehnerreihe voll, 3 liegen in der unteren Reihe."
      },
      {
        id: "7_2",
        question: "Rechne aus: 7 - 3 = ____",
        mathNum1: 7,
        mathNum2: 3,
        mathOp: "-",
        options: ["4", "3", "5", "2"],
        correctAnswer: "4",
        hint: "Es liegen 7 rote Punkte im Feld. Nimm 3 Punkte weg. Wie viele bleiben übrig?"
      },
      {
        id: "7_3",
        question: "Rechne aus: 9 + 6 = ____",
        mathNum1: 9,
        mathNum2: 6,
        mathOp: "+",
        options: ["15", "14", "16", "13"],
        correctAnswer: "15",
        hint: "9 rote Punkte + 6 blaue Punkte. 1 blauer Punkt füllt die obere Reihe auf 10 auf, die anderen 5 liegen unten."
      },
      {
        id: "7_4",
        question: "Rechne aus: 14 - 6 = ____",
        mathNum1: 14,
        mathNum2: 6,
        mathOp: "-",
        options: ["8", "7", "9", "6"],
        correctAnswer: "8",
        hint: "14 Punkte. Nimm erst die 4 aus der unteren Reihe weg (dann hast du 10) und ziehe dann noch 2 ab."
      },
      {
        id: "7_5",
        question: "Rechne aus: 12 + 7 = ____",
        mathNum1: 12,
        mathNum2: 7,
        mathOp: "+",
        options: ["19", "18", "20", "17"],
        correctAnswer: "19",
        hint: "Ein voller Zehnerpack (10) plus 2 rote und 7 blaue Punkte. 2 + 7 = 9 Einerpunkte. Also 19."
      }
    ]
  },
  {
    id: 8,
    subject: "mathe",
    title: "Station 2: Einmaleins-Meister",
    subtitle: "Das kleine Einmaleins (1x1)",
    grade: 2,
    description: "Löse die Malaufgaben und werde zum 1x1-Profi! Das Punktefeld hilft dir.",
    icon: "Calculator",
    color: "secondary",
    exercises: [
      {
        id: "8_1",
        question: "Rechne aus: 3 • 4 = ____",
        mathNum1: 3,
        mathNum2: 4,
        mathOp: "*",
        options: ["12", "14", "16", "10"],
        correctAnswer: "12",
        hint: "3 Zeilen mit je 4 Punkten. Das ist dasselbe wie: 4 + 4 + 4 = 12."
      },
      {
        id: "8_2",
        question: "Rechne aus: 5 • 5 = ____",
        mathNum1: 5,
        mathNum2: 5,
        mathOp: "*",
        options: ["25", "20", "30", "15"],
        correctAnswer: "25",
        hint: "5 Zeilen mit je 5 Punkten. Zähle in Fünferschritten: 5, 10, 15, 20, 25."
      },
      {
        id: "8_3",
        question: "Rechne aus: 6 • 2 = ____",
        mathNum1: 6,
        mathNum2: 2,
        mathOp: "*",
        options: ["12", "10", "14", "8"],
        correctAnswer: "12",
        hint: "6 Zeilen mit je 2 Punkten. Das ist dasselbe wie: 2 + 2 + 2 + 2 + 2 + 2."
      },
      {
        id: "8_4",
        question: "Rechne aus: 4 • 8 = ____",
        mathNum1: 4,
        mathNum2: 8,
        mathOp: "*",
        options: ["32", "30", "28", "36"],
        correctAnswer: "32",
        hint: "4 Zeilen mit je 8 Punkten. Tipp: 2 • 8 = 16. Und das Doppelte von 16 ist 32."
      },
      {
        id: "8_5",
        question: "Rechne aus: 7 • 3 = ____",
        mathNum1: 7,
        mathNum2: 3,
        mathOp: "*",
        options: ["21", "24", "18", "27"],
        correctAnswer: "21",
        hint: "7 Zeilen mit je 3 Punkten. Das ist dasselbe wie: 3 + 3 + 3 + 3 + 3 + 3 + 3."
      }
    ]
  },
  {
    id: 9,
    subject: "mathe",
    title: "Station 3: Größen-Detektiv",
    subtitle: "Geld, Längen & Uhrzeiten",
    grade: 3,
    description: "Löse die spannenden Sachaufgaben aus dem Alltag mit verschiedenen Maßeinheiten!",
    icon: "Coins",
    color: "tertiary",
    exercises: [
      {
        id: "9_1",
        question: "Lumi kauft ein Buch für 3 € und einen Stift für 1,50 €. Wie viel muss Lumi bezahlen?",
        options: ["4,50 €", "4,00 €", "5,00 €", "3,50 €"],
        correctAnswer: "4,50 €",
        hint: "Addiere erst die Euro-Werte: 3 € + 1 € = 4 €. Dazu kommen noch die 50 Cent."
      },
      {
        id: "9_2",
        question: "Mia geht um 14:15 Uhr spazieren. Sie läuft genau 45 Minuten. Wann ist sie wieder zu Hause?",
        options: ["15:00 Uhr", "14:45 Uhr", "15:15 Uhr", "14:50 Uhr"],
        correctAnswer: "15:00 Uhr",
        hint: "Nach 15 Minuten ist es 14:30 Uhr. Nach weiteren 30 Minuten ist es genau 15:00 Uhr (eine volle Stunde hat 60 Minuten)."
      },
      {
        id: "9_3",
        question: "Ein Lineal ist 30 cm lang. Ein Heft ist 20 cm lang. Wie lang sind beide zusammen?",
        options: ["50 cm", "60 cm", "40 cm", "10 cm"],
        correctAnswer: "50 cm",
        hint: "Addiere einfach die beiden Längenangaben: 30 cm + 20 cm."
      },
      {
        id: "9_4",
        question: "Lumi hat 10 €. Er kauft ein Eis für 2 € und eine Brezel für 1,50 €. Wie viel Wechselgeld bekommt er?",
        options: ["6,50 €", "7,50 €", "8,50 €", "5,50 €"],
        correctAnswer: "6,50 €",
        hint: "Die Einkäufe kosten zusammen 2 € + 1,50 € = 3,50 €. Ziehe 3,50 € von 10 € ab."
      },
      {
        id: "9_5",
        question: "Ein Päckchen Mehl wiegt 500 g. Ein Becher Zucker wiegt 250 g. Wie viel wiegen beide Backzutaten zusammen?",
        options: ["750 g", "800 g", "650 g", "1.000 g / 1 kg"],
        correctAnswer: "750 g",
        hint: "Rechne: 500 Gramm + 250 Gramm."
      }
    ]
  },
  {
    id: 10,
    subject: "mathe",
    title: "Station 4: Bruchteile-Forscher",
    subtitle: "Einführung in Bruchteile",
    grade: 4,
    description: "Stelle verschiedene Bruchteile mit Pizza, Schokolade, Messbechern und Sternen dar!",
    icon: "Percent",
    color: "orange",
    exercises: [
      {
        id: "10_1",
        question: "Stelle 3/8 der leckeren Salami-Pizza fertig!",
        mathFractionSegments: 8,
        mathFractionColored: 3,
        options: ["3/8", "5/8", "1/2", "1/4"],
        correctAnswer: "3/8",
        imagePlaceholder: "pizza",
        hint: "Zerschneide die Pizza in 8 gleiche Stücke (Nenner). Tippe dann 3 Teile an, um sie rot mit Salami zu belegen."
      },
      {
        id: "10_2",
        question: "Stelle 1/4 der runden Honig-Waffel dar!",
        mathFractionSegments: 4,
        mathFractionColored: 1,
        options: ["1/4", "3/4", "1/2", "2/4"],
        correctAnswer: "1/4",
        imagePlaceholder: "waffle",
        hint: "Zerschneide die Waffel in 4 Stücke. Färbe genau 1 Stück gelb ein!"
      },
      {
        id: "10_3",
        question: "Teile die Schokolade und gib Lumi 4/6 ab!",
        mathFractionSegments: 6,
        mathFractionColored: 4,
        options: ["4/6", "2/6", "2/3", "5/6"],
        correctAnswer: "4/6",
        imagePlaceholder: "chocolate",
        hint: "Teile den Schokoriegel in 6 Stücke und färbe 4 Stücke braun ein."
      },
      {
        id: "10_4",
        question: "Fülle den Messbecher zu genau 4/8 mit grünem Zaubertrank!",
        mathFractionSegments: 8,
        mathFractionColored: 4,
        options: ["4/8", "2/8", "3/8", "5/8"],
        correctAnswer: "4/8",
        imagePlaceholder: "cup",
        hint: "Teile den Becher in 8 Stufen auf. Fülle den Becher von unten bis zur 4. Stufe mit grünem Trank (das entspricht genau der Hälfte)."
      },
      {
        id: "10_5",
        question: "Lass genau 2/5 der Sterne am Abendhimmel leuchten!",
        mathFractionSegments: 5,
        mathFractionColored: 2,
        options: ["2/5", "3/5", "1/5", "4/5"],
        correctAnswer: "2/5",
        imagePlaceholder: "stars",
        hint: "Wir haben 5 Sterne am Himmel. Tippe genau 2 Sterne an, damit sie gelb leuchten."
      }
    ]
  },
  {
    id: 11,
    subject: "mathe",
    title: "Station 11: Mathe-Fuchs",
    subtitle: "Muster, Formen & Zerlegen",
    grade: 1,
    description: "Trainiere dein logisches Denken mit Mustern, erkenne Formen und zerlege die Zahl 10 in der Schüttelbox!",
    icon: "Sparkles",
    color: "tertiary",
    exercises: [
      {
        id: "11_1",
        question: "Muster-Detektiv: Wie geht die Reihe weiter? 🔴 🔵 🔴 🔵 🔴 __",
        options: ["🔴", "🔵", "🟡", "🟢"],
        correctAnswer: "🔵",
        hint: "Schau dir an, welche Farbe immer abwechselnd kommt."
      },
      {
        id: "11_2",
        question: "Muster-Detektiv: Welche Zahl fehlt? 2, 4, 6, 8, __",
        options: ["9", "10", "11", "12"],
        correctAnswer: "10",
        hint: "Es kommen immer 2 dazu (+2). Was ist 8 + 2?"
      },
      {
        id: "11_3",
        question: "Formen-Zauber: Welche Form hat ein Rad (Reifen)?",
        options: ["Kreis", "Dreieck", "Quadrat", "Rechteck"],
        correctAnswer: "Kreis",
        hint: "Ein Rad ist komplett rund, es hat keine Ecken."
      },
      {
        id: "11_4",
        question: "Schüttelbox: Die 10 zerlegen! 10 = 6 + __",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4",
        hint: "Nimm deine Finger zur Hilfe. 10 Finger, 6 klappst du ein. Wie viele stehen noch?"
      },
      {
        id: "11_5",
        question: "Schüttelbox: Die 10 zerlegen! 10 = 2 + __",
        options: ["7", "8", "9", "10"],
        correctAnswer: "8",
        hint: "Wenn 2 Kugeln links in der Box sind, wie viele von den 10 Kugeln sind rechts?"
      }
    ]
  },
  {
    id: 12,
    subject: "deutsch",
    title: "Station 12: Sprach-Fuchs",
    subtitle: "Anlaute & Reime",
    grade: 1,
    description: "Höre genau hin! Finde Wörter, die mit dem gleichen Buchstaben anfangen oder sich reimen.",
    icon: "Music",
    color: "orange",
    exercises: [
      {
        id: "12_1",
        question: "Anlaut-Lauscher: Welches Wort fängt wie APFEL an?",
        options: ["Affe", "Hund", "Maus", "Sonne"],
        correctAnswer: "Affe",
        hint: "Das gesuchte Wort muss mit einem 'A' beginnen."
      },
      {
        id: "12_2",
        question: "Anlaut-Lauscher: Welches Wort fängt wie TISCH an?",
        options: ["Bär", "Tasse", "Auto", "Katze"],
        correctAnswer: "Tasse",
        hint: "Das Wort muss mit einem 'T' beginnen."
      },
      {
        id: "12_3",
        question: "Reim-Paare: Was reimt sich auf HAUS?",
        options: ["Garten", "Maus", "Baum", "Katze"],
        correctAnswer: "Maus",
        hint: "Haus - ... Die Endung muss sich gleich anhören (-aus)."
      },
      {
        id: "12_4",
        question: "Reim-Paare: Was reimt sich auf HUND?",
        options: ["Mund", "Katze", "Bär", "Knochen"],
        correctAnswer: "Mund",
        hint: "Hund - ... (Endung -und)."
      },
      {
        id: "12_5",
        question: "Reim-Paare: Was reimt sich auf SONNE?",
        options: ["Wonne", "Mond", "Regen", "Stern"],
        correctAnswer: "Wonne",
        hint: "Sonne - Wonne. Das klingt am Ende genau gleich!"
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
