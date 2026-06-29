import React from 'react';
import { UserProgress } from '../types';
import { playPop } from '../utils/audio';
import { ArrowLeft, BarChart2, Award, Zap, AlertCircle, RotateCcw } from 'lucide-react';

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
  // Default metrics if not present
  const metrics = progress.experimentMetrics || {
    methodA: { correctFirstTry: 0, totalAttempts: 0, totalTimeSeconds: 0, questionsAnswered: 0 },
    methodB: { correctFirstTry: 0, totalAttempts: 0, totalTimeSeconds: 0, questionsAnswered: 0 },
  };

  const getStats = (m: typeof metrics.methodA) => {
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

  const statsA = getStats(metrics.methodA);
  const statsB = getStats(metrics.methodB);

  // Simple heuristic of which method performed better
  const getRecommendation = () => {
    if (statsA.answered === 0 && statsB.answered === 0) {
      return "Es liegen noch keine Daten vor. Lass das Kind ein paar Aufgaben in Mathematik lösen und wechsle dabei die Methoden!";
    }

    if (statsA.answered === 0) return "Bisher wurden nur Aufgaben mit Methode B (Singapur) gelöst. Löse Aufgaben mit Methode A, um einen Vergleich zu sehen!";
    if (statsB.answered === 0) return "Bisher wurden nur Aufgaben mit Methode A (Deutschland) gelöst. Löse Aufgaben mit Methode B, um einen Vergleich zu sehen!";

    const rateDiff = statsB.firstTryRate - statsA.firstTryRate;
    const timeDiff = parseFloat(statsA.avgTime) - parseFloat(statsB.avgTime);

    if (rateDiff > 0 && timeDiff > 0) {
      return `Methode B (Singapur) schneidet besser ab! Das Kind hat eine um ${rateDiff}% höhere Erstversuchs-Erfolgsquote und löst Aufgaben im Schnitt um ${timeDiff.toFixed(1)}s schneller. Das bestätigt die Wirksamkeit des CPA-Ansatzes!`;
    } else if (rateDiff > 0) {
      return `Methode B (Singapur) führt zu weniger Fehlern (+${rateDiff}% Erstversuche), obwohl Methode A etwas schneller gelöst wurde. Die Visualisierung durch Balkenmodelle verringert die Fehlerrate.`;
    } else if (timeDiff > 0) {
      return `Methode A (Deutschland) hat eine ähnliche Erfolgsquote, aber Methode B (Singapur) wurde im Schnitt um ${timeDiff.toFixed(1)}s schneller gelöst. Die strukturierten Visualisierungen senken die kognitive Belastung.`;
    } else if (rateDiff < 0) {
      return `Methode A (Deutschland: Punkte/Pizza) schneidet in diesem Test besser ab! Das Kind erzielt hier eine um ${Math.abs(rateDiff)}% höhere Erfolgsquote. Das Kind ist möglicherweise bereits besser an das Punktefeld gewöhnt.`;
    } else {
      return "Beide Methoden erzielen vergleichbare Ergebnisse. Setze das A/B-Testing fort, um verlässlichere Daten zu sammeln.";
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-high-tactile border border-slate-100 max-w-2xl mx-auto space-y-8 animate-wiggle-soft">
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
        
        <span className="bg-[#fdd758] text-[#725c00] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
          A/B Test
        </span>
      </div>

      {/* Intro Description */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60 text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
        <p className="font-semibold text-slate-700 mb-1">Was wird hier gemessen?</p>
        Dieses Dashboard vergleicht die didaktischen Ansätze **Methode A** (Klassisch Deutschland: Punkte/Pizza) und **Methode B** (Singapur-Math: Bar-Models/Zahlbeziehungen) bezüglich Lerneffizienz, Lösungsgeschwindigkeit und Fehlermuster.
      </div>

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
              <span className="text-lg font-black text-slate-800 mt-1 block">{statsA.answered}</span>
            </div>
            <div className="bg-white p-2 rounded-xl shadow-xs">
              <span className="text-slate-400 text-[9px] font-bold block leading-none">1. VERSUCH</span>
              <span className="text-lg font-black text-blue-700 mt-1 block">{statsA.firstTryRate}%</span>
            </div>
            <div className="bg-white p-2 rounded-xl shadow-xs">
              <span className="text-slate-400 text-[9px] font-bold block leading-none">ZEIT/AUFG.</span>
              <span className="text-lg font-black text-slate-800 mt-1 block">{statsA.avgTime}s</span>
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
              <span className="text-lg font-black text-slate-800 mt-1 block">{statsB.answered}</span>
            </div>
            <div className="bg-white p-2 rounded-xl shadow-xs">
              <span className="text-slate-400 text-[9px] font-bold block leading-none">1. VERSUCH</span>
              <span className="text-lg font-black text-emerald-700 mt-1 block">{statsB.firstTryRate}%</span>
            </div>
            <div className="bg-white p-2 rounded-xl shadow-xs">
              <span className="text-slate-400 text-[9px] font-bold block leading-none">ZEIT/AUFG.</span>
              <span className="text-lg font-black text-slate-800 mt-1 block">{statsB.avgTime}s</span>
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
            if (confirm("Möchtest du die Messdaten der didaktischen Untersuchung wirklich zurücksetzen?")) {
              playPop();
              onResetMetrics();
            }
          }}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 text-[10px] font-black px-2.5 py-1.5 rounded-xl border border-dashed border-red-200 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Forschungsdaten löschen
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
