import React, { useState, useEffect } from 'react';
import { UserProgress } from '../types';
import { playPop } from '../utils/audio';
import { db } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ArrowLeft, BarChart2, Award, Zap, Loader2, RotateCcw, Users } from 'lucide-react';

interface ResearchDashboardProps {
  progress: UserProgress;
  onClose: () => void;
  onResetMetrics: () => void;
}

export default function ResearchDashboard({
  progress,
  onClose,
  onResetMetrics,
}: ResearchDashboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [cloudMetrics, setCloudMetrics] = useState({
    methodA: { correctFirstTry: 0, totalAttempts: 0, totalTimeSeconds: 0, questionsAnswered: 0 },
    methodB: { correctFirstTry: 0, totalAttempts: 0, totalTimeSeconds: 0, questionsAnswered: 0 },
  });

  // Fetch and aggregate all results from Firebase Firestore
  useEffect(() => {
    let active = true;
    
    async function loadCloudData() {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, 'metrics'));
        
        const aggregated = {
          methodA: { correctFirstTry: 0, totalAttempts: 0, totalTimeSeconds: 0, questionsAnswered: 0 },
          methodB: { correctFirstTry: 0, totalAttempts: 0, totalTimeSeconds: 0, questionsAnswered: 0 },
        };
        
        let count = 0;
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const method = data.method; // 'A' or 'B'
          const timeSeconds = Number(data.timeSeconds) || 0;
          const attempts = Number(data.attempts) || 0;
          const isFirstTryCorrect = Boolean(data.isFirstTryCorrect);
          
          if (method === 'A') {
            aggregated.methodA.questionsAnswered += 1;
            aggregated.methodA.totalTimeSeconds += timeSeconds;
            aggregated.methodA.totalAttempts += attempts;
            if (isFirstTryCorrect) aggregated.methodA.correctFirstTry += 1;
            count++;
          } else if (method === 'B') {
            aggregated.methodB.questionsAnswered += 1;
            aggregated.methodB.totalTimeSeconds += timeSeconds;
            aggregated.methodB.totalAttempts += attempts;
            if (isFirstTryCorrect) aggregated.methodB.correctFirstTry += 1;
            count++;
          }
        });
        
        if (active) {
          setCloudMetrics(aggregated);
          setTotalSubmissions(count);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error loading cloud metrics:", err);
        if (active) {
          setIsLoading(false);
        }
      }
    }
    
    loadCloudData();
    return () => { active = false; };
  }, []);

  const getStats = (m: typeof cloudMetrics.methodA) => {
    const answered = m.questionsAnswered || 0;
    const firstTry = m.correctFirstTry || 0;
    const attempts = m.totalAttempts || 0;
    const time = m.totalTimeSeconds || 0;

    const firstTryRate = answered > 0 ? Math.round((firstTry / answered) * 100) : 0;
    const avgAttempts = answered > 0 ? (attempts / answered).toFixed(1) : '0';
    const avgFailures = answered > 0 ? ((attempts - answered) / answered).toFixed(1) : '0';
    const avgTime = answered > 0 ? (time / answered).toFixed(1) : '0';

    return {
      answered,
      firstTryRate,
      avgAttempts,
      avgFailures,
      avgTime,
    };
  };

  const statsA = getStats(cloudMetrics.methodA);
  const statsB = getStats(cloudMetrics.methodB);

  // Heuristic evaluation comparing both approaches
  const getRecommendation = () => {
    if (statsA.answered === 0 && statsB.answered === 0) {
      return "Es liegen noch keine Cloud-Daten vor. Lass Kinder ein paar Mathe-Aufgaben lösen (und Methoden wechseln), damit Daten gesammelt werden!";
    }

    if (statsA.answered === 0) return "Bisher liegen nur Cloud-Daten für Methode B (Singapur) vor. Löse Aufgaben unter Methode A zum Vergleichen!";
    if (statsB.answered === 0) return "Bisher liegen nur Cloud-Daten für Methode A (Deutschland) vor. Löse Aufgaben unter Methode B zum Vergleichen!";

    const rateDiff = statsB.firstTryRate - statsA.firstTryRate;
    const timeDiff = parseFloat(statsA.avgTime) - parseFloat(statsB.avgTime);

    if (rateDiff > 0 && timeDiff > 0) {
      return `Zusammenfassend schneidet Methode B (Singapur) besser ab! Kinder haben im globalen Durchschnitt eine um ${rateDiff}% höhere Erstversuchs-Erfolgsquote und lösen Aufgaben im Schnitt um ${timeDiff.toFixed(1)}s schneller. Das bestätigt die didaktische Stärke des CPA-Modells!`;
    } else if (rateDiff > 0) {
      return `Methode B (Singapur) führt global zu weniger Fehlern (+${rateDiff}% Erstversuche), während Methode A eine leicht schnellere Antwortzeit aufweist. Das visuelle Balkenmodell senkt somit effektiv Fehlinterpretationen.`;
    } else if (timeDiff > 0) {
      return `Die Erfolgsquoten sind ähnlich, aber Methode B (Singapur) wurde im Schnitt um ${timeDiff.toFixed(1)}s schneller gelöst. Die Visualisierung senkt die kognitive Belastung.`;
    } else if (rateDiff < 0) {
      return `Methode A (Deutschland: Punkte/Pizza) schneidet im Cloud-Vergleich besser ab! Kinder erzielen hier eine um ${Math.abs(rateDiff)}% höhere Erfolgsquote. Dies kann an der Vertrautheit mit dem Punktefeld liegen.`;
    } else {
      return "Beide didaktischen Methoden erzielen im globalen Durchschnitt aktuell identische Ergebnisse. Sammele weiter Daten!";
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-high-tactile border border-slate-100 max-w-2xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4 border-slate-100">
        <button
          onClick={() => { playPop(); onClose(); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-500 transition-colors text-xs font-bold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Landkarte
        </button>
        
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2 font-sans">
          <BarChart2 className="w-6 h-6 text-[#00639a]" />
          <span>Forschungs-Dashboard</span>
        </h2>
        
        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> Cloud Live
        </span>
      </div>

      {/* Cloud Status Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200/60 gap-3 text-xs sm:text-sm text-slate-600 font-body">
        <div>
          <p className="font-semibold text-slate-700 mb-0.5">Globale Cloud-Anbindung aktiv ☁️</p>
          Dieses Dashboard aggregiert die Daten **aller** teilnehmenden Kinder und Experten live aus der Firestore-Datenbank.
        </div>
        
        <div className="bg-cyan-100 text-cyan-950 font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 self-stretch sm:self-auto justify-center shadow-xs">
          <Users className="w-4 h-4 text-cyan-800" />
          <span className="text-xs">{totalSubmissions} Aufgaben gesamt</span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-3">
          <Loader2 className="w-10 h-10 text-[#00639a] animate-spin" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans">
            Lade Cloud-Metriken...
          </p>
        </div>
      ) : (
        <>
          {/* Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Method A Card */}
            <div className="bg-blue-50/50 p-5 rounded-2xl border-2 border-blue-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-sans font-extrabold text-base text-blue-900">Methode A (Klassisch DE)</h3>
                <span className="text-2xl">🇩🇪</span>
              </div>
              <p className="text-[10px] text-blue-800 font-bold uppercase tracking-wider">Zwanzigerfeld & Pizza</p>
              
              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                <div className="bg-white p-2 rounded-xl shadow-xs">
                  <span className="text-slate-400 text-[9px] font-bold block leading-none">GELÖST</span>
                  <span className="text-base font-black text-slate-800 mt-1 block">{statsA.answered}</span>
                </div>
                <div className="bg-white p-2 rounded-xl shadow-xs">
                  <span className="text-slate-400 text-[9px] font-bold block leading-none">1. VERSUCH</span>
                  <span className="text-base font-black text-blue-700 mt-1 block">{statsA.firstTryRate}%</span>
                </div>
                <div className="bg-white p-2 rounded-xl shadow-xs">
                  <span className="text-slate-400 text-[9px] font-bold block leading-none">ZEIT/AUFG.</span>
                  <span className="text-base font-black text-slate-800 mt-1 block">{statsA.avgTime}s</span>
                </div>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-blue-100 text-xs font-semibold text-blue-950 font-body">
                <span className="font-bold block text-blue-800 mb-0.5">Fehlversuche im Schnitt:</span>
                {statsA.avgFailures} Fehler vor dem richtigen Ergebnis.
              </div>
            </div>

            {/* Method B Card */}
            <div className="bg-emerald-50/50 p-5 rounded-2xl border-2 border-emerald-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-sans font-extrabold text-base text-emerald-950">Methode B (Singapur CPA)</h3>
                <span className="text-2xl">🇸🇬</span>
              </div>
              <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">Balken & Zahlbeziehungen</p>
              
              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                <div className="bg-white p-2 rounded-xl shadow-xs">
                  <span className="text-slate-400 text-[9px] font-bold block leading-none">GELÖST</span>
                  <span className="text-base font-black text-slate-800 mt-1 block">{statsB.answered}</span>
                </div>
                <div className="bg-white p-2 rounded-xl shadow-xs">
                  <span className="text-slate-400 text-[9px] font-bold block leading-none">1. VERSUCH</span>
                  <span className="text-base font-black text-emerald-700 mt-1 block">{statsB.firstTryRate}%</span>
                </div>
                <div className="bg-white p-2 rounded-xl shadow-xs">
                  <span className="text-slate-400 text-[9px] font-bold block leading-none">ZEIT/AUFG.</span>
                  <span className="text-base font-black text-slate-800 mt-1 block">{statsB.avgTime}s</span>
                </div>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-emerald-100 text-xs font-semibold text-emerald-950 font-body">
                <span className="font-bold block text-emerald-800 mb-0.5">Fehlversuche im Schnitt:</span>
                {statsB.avgFailures} Fehler vor dem richtigen Ergebnis.
              </div>
            </div>
          </div>

          {/* Didactical Analysis Recommendation */}
          <div className="bg-yellow-50/60 p-5 rounded-2xl border-2 border-yellow-200 shadow-xs space-y-2">
            <h3 className="font-sans font-extrabold text-sm text-yellow-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-yellow-700" />
              <span>Didaktische Empfehlung & Auswertung</span>
            </h3>
            <p className="text-xs sm:text-sm text-yellow-950 leading-relaxed font-semibold font-body">
              {getRecommendation()}
            </p>
          </div>
        </>
      )}

      {/* Research Background Box */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
        <h4 className="font-sans font-extrabold text-xs text-slate-500 uppercase tracking-widest flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-[#00639a]" /> State-of-the-Art Forschung
        </h4>
        <div className="text-xs text-slate-600 leading-relaxed font-body space-y-2.5">
          <p>
            <strong>CPA (Concrete-Pictorial-Abstract):</strong> Singapurs Lehrplan führt Kinder gezielt über das Legen von Material (Concrete) hin zu standardisierten, universellen Balkengrafiken (Pictorial), bevor mit abstrakten Zahlen gerechnet wird.
          </p>
          <p>
            <strong>Balkenmodell vs. Kreismodell (Brüche):</strong> Die Forschung zeigt, dass Kreismodelle (wie Pizzen) eine höhere visuelle Komplexität besitzen. Kinder neigen dazu, die Kuchenstücke einzeln abzuzählen. Das Balkenmodell (Fraction Bar) erleichtert die relationale Zuordnung (z.B. 3 von 8 Teilen als Längenverhältnis) und reduziert die kognitive Belastung.
          </p>
          <p>
            <strong>Zahlbeziehungen (Number Bonds):</strong> Statt reiner Rechenbilder zeigen Number Bonds die relationale Struktur auf. Kinder begreifen Addition und Subtraktion nicht als separate Regeln, sondern als Zerlegungsprozess eines Ganzen in seine Teile.
          </p>
        </div>
      </div>

      {/* Dashboard Actions */}
      <div className="flex items-center justify-between border-t pt-4 border-slate-100">
        <button
          onClick={() => {
            if (confirm("Möchtest du deine lokalen Metriken wirklich zurücksetzen? (Die globalen Cloud-Ergebnisse bleiben erhalten)")) {
              playPop();
              onResetMetrics();
            }
          }}
          className="text-[#00639a] hover:text-[#004e76] hover:bg-slate-50 text-[10px] font-black px-2.5 py-1.5 rounded-xl border border-dashed border-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Lokale Sitzung zurücksetzen
        </button>

        <button
          onClick={() => { playPop(); onClose(); }}
          className="btn-tactile-primary text-white text-xs font-black px-5 py-2.5 rounded-xl cursor-pointer"
        >
          Zurück zum Spiel
        </button>
      </div>
    </div>
  );
}
