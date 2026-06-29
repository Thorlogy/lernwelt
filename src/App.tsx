import React, { useState, useEffect } from 'react';
import { UserProgress, Station, Exercise } from './types';
import { STATIONEN, CHARACTER_AVATARS } from './data';
import Mascot from './components/Mascot';
import LessonMap from './components/LessonMap';
import StationLetterSpelling from './components/StationLetterSpelling';
import StationSyllables from './components/StationSyllables';
import StationWordTypes from './components/StationWordTypes';
import StationSpellingDetective from './components/StationSpellingDetective';
import StationSingularPlural from './components/StationSingularPlural';
import StationVerbTenses from './components/StationVerbTenses';
import StationMathQuiz from './components/StationMathQuiz';
import StationMathFractions from './components/StationMathFractions';
import ResearchDashboard from './components/ResearchDashboard';
import Certificate from './components/Certificate';
import { playPop, playSuccess, playTrophy } from './utils/audio';
import { Star, Trophy, Sparkles, User, ArrowLeft, RotateCcw, Home, Award } from 'lucide-react';
import { db } from './utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

const LOCAL_STORAGE_KEY = 'lernwelt_progress_v2';

const INITIAL_PROGRESS: UserProgress = {
  childName: '',
  avatarId: 'dragon',
  avatarColor: 'bg-emerald-100 border-emerald-300 text-emerald-700',
  completedStations: [],
  starsCount: 0,
  stationTrophies: {},
  score: 0,
};

export default function App() {
  // Application state
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);

  const isDeutschDone = [1, 2, 3, 4, 5, 6].every(id => progress.completedStations.includes(id));
  const isMatheDone = [7, 8, 9, 10].every(id => progress.completedStations.includes(id));
  const hasWonSubject = isDeutschDone || isMatheDone;

  const [activeStationId, setActiveStationId] = useState<number | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [mascotText, setMascotText] = useState<string>('');
  const [mascotExpression, setMascotExpression] = useState<'idle' | 'correct' | 'incorrect' | 'cheering'>('idle');
  const [showCertificate, setShowCertificate] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const [tempName, setTempName] = useState('');
  const [selectedAvatarId, setSelectedAvatarId] = useState('dragon');
  const [showCompletionCelebration, setShowCompletionCelebration] = useState(false);
  const [showResearch, setShowResearch] = useState(false);

  // Load progress from localStorage on boot
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.childName) {
          setProgress(parsed);
          setIsNewUser(false);
        }
      } catch (e) {
        console.error("Could not parse saved progress:", e);
      }
    }
  }, []);

  // Sync progress to localStorage
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProgress));
  };

  // Dynamic Mascot guidance text controller
  useEffect(() => {
    if (isNewUser) {
      setMascotText("Hallo! Ich bin Lumi, dein kleiner Drache! Trage links deinen Namen ein und wähle dein Lieblings-Wappentier aus, um unser Abenteuer zu beginnen!");
      setMascotExpression('idle');
    } else if (showCertificate) {
      setMascotText(`Phänomenal, ${progress.childName}! Du hast alle Stationen geschafft und bist ein echter Lernkönig! Hier ist deine glänzende Urkunde.`);
      setMascotExpression('cheering');
    } else if (activeStationId === null) {
      const allDone = hasWonSubject;
      if (allDone) {
        setMascotText(`Wahnsinn, ${progress.childName}! Du hast ein Fach vollständig gemeistert! Klicke auf die Trophäe, um dir deine goldene Urkunde anzusehen!`);
        setMascotExpression('cheering');
      } else {
        setMascotText(`Willkommen zurück in der Lernwelt, ${progress.childName}! Such dir eine Station auf der Landkarte aus und lass uns spielend lernen!`);
        setMascotExpression('idle');
      }
    } else {
      // In a station exercise
      const currentStation = STATIONEN.find(s => s.id === activeStationId);
      if (currentStation) {
        setMascotText(`Klasse ${currentStation.grade} • ${currentStation.title.split(': ')[1] || currentStation.title}: Frage ${currentExerciseIndex + 1} von ${currentStation.exercises.length}. Schau dir die Aufgabe an!`);
        setMascotExpression('idle');
      }
    }
  }, [activeStationId, currentExerciseIndex, isNewUser, showCertificate, progress.childName, progress.completedStations]);

  // Handle new profile registration
  const handleStartAdventure = () => {
    if (!tempName.trim()) return;
    playPop();
    
    const chosenAvatar = CHARACTER_AVATARS.find(a => a.id === selectedAvatarId) || CHARACTER_AVATARS[0];
    const newProgress: UserProgress = {
      ...INITIAL_PROGRESS,
      childName: tempName.trim(),
      avatarId: chosenAvatar.id,
      avatarColor: chosenAvatar.color,
    };

    saveProgress(newProgress);
    setIsNewUser(false);
  };

  // Reset overall children data
  const handleResetProgress = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setProgress(INITIAL_PROGRESS);
    setTempName('');
    setIsNewUser(true);
    setActiveStationId(null);
    setShowCertificate(false);
    setShowResearch(false);
    setShowCompletionCelebration(false);
  };

  // Performance A/B metrics save handler
  const handleSaveMetrics = (method: 'A' | 'B', timeSeconds: number, attemptsCount: number, isFirstTryCorrect: boolean) => {
    const currentMetrics = progress.experimentMetrics || {
      methodA: { correctFirstTry: 0, totalAttempts: 0, totalTimeSeconds: 0, questionsAnswered: 0 },
      methodB: { correctFirstTry: 0, totalAttempts: 0, totalTimeSeconds: 0, questionsAnswered: 0 },
    };

    const targetKey = method === 'A' ? 'methodA' : 'methodB';
    const target = currentMetrics[targetKey];

    const updatedMetrics = {
      ...currentMetrics,
      [targetKey]: {
        correctFirstTry: target.correctFirstTry + (isFirstTryCorrect ? 1 : 0),
        totalAttempts: target.totalAttempts + attemptsCount,
        totalTimeSeconds: target.totalTimeSeconds + timeSeconds,
        questionsAnswered: target.questionsAnswered + 1,
      }
    };

    const updatedProgress = {
      ...progress,
      experimentMetrics: updatedMetrics,
    };
    saveProgress(updatedProgress);

    // Asynchronously write to Cloud Firestore database
    try {
      addDoc(collection(db, 'metrics'), {
        childName: progress.childName || 'Anonym',
        method,
        timeSeconds,
        attempts: attemptsCount,
        isFirstTryCorrect,
        stationId: activeStationId || 0,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.warn("Failed to upload metric to Firestore:", err);
    }
  };

  // Reset performance metrics
  const handleResetMetrics = () => {
    const resetProgress = {
      ...progress,
      experimentMetrics: {
        methodA: { correctFirstTry: 0, totalAttempts: 0, totalTimeSeconds: 0, questionsAnswered: 0 },
        methodB: { correctFirstTry: 0, totalAttempts: 0, totalTimeSeconds: 0, questionsAnswered: 0 },
      }
    };
    saveProgress(resetProgress);
  };

  // Station exercise interactions
  const activeStation = STATIONEN.find(s => s.id === activeStationId);
  const currentExercise = activeStation ? activeStation.exercises[currentExerciseIndex] : null;

  const handleCorrectAnswer = (starsGained: number) => {
    setMascotExpression('correct');
    
    // Choose funny happy motivation comments
    const quotes = [
      "Absolut richtig! Du bist spitze! ⭐",
      "Hervorragend gelöst! Lumi klatscht in die Hände! 👏",
      "Fantastisch! Weiter so! 🚀",
      "Das war kinderleicht für dich, oder? Sauber! 👑",
    ];
    setMascotText(quotes[Math.floor(Math.random() * quotes.length)]);

    const updatedProgress = {
      ...progress,
      starsCount: progress.starsCount + starsGained,
    };
    saveProgress(updatedProgress);
  };

  const handleIncorrectAnswer = () => {
    setMascotExpression('incorrect');
    const supportiveComments = [
      "Hoppla! Das war fast richtig. Überleg' kurz in Ruhe und versuch es noch einmal!",
      "Kein Problem! Fehler machen uns schlau. Drück auf nochmal versuchen!",
      "Das macht nichts! Lass es uns gemeinsam noch einmal betrachten.",
    ];
    setMascotText(supportiveComments[Math.floor(Math.random() * supportiveComments.length)]);
  };

  const handleNextExercise = () => {
    if (!activeStation) return;
    playPop();

    if (currentExerciseIndex < activeStation.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      // Loop finished! Let's award completion trophy
      playTrophy();
      
      const isAlreadyCompleted = progress.completedStations.includes(activeStation.id);
      const newCompleted = isAlreadyCompleted 
        ? progress.completedStations 
        : [...progress.completedStations, activeStation.id];

      // Give 50 bonus stars on first station completion!
      const bonus = isAlreadyCompleted ? 10 : 50;

      const updatedProgress = {
        ...progress,
        completedStations: newCompleted,
        starsCount: progress.starsCount + bonus,
      };

      saveProgress(updatedProgress);
      setShowCompletionCelebration(true);
    }
  };

  const finishStationCelebration = () => {
    playPop();
    setShowCompletionCelebration(false);
    setActiveStationId(null);
    setCurrentExerciseIndex(0);
  };

  const handleCloseStation = () => {
    playPop();
    setActiveStationId(null);
    setCurrentExerciseIndex(0);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-[#191c1e] selection:bg-yellow-200">
      
      {/* 🚀 STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b-2 border-slate-200/50 p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Logo Brand Title */}
          <div className="bg-[#00639a] text-white p-2 rounded-xl scale-95 shadow-inner flex items-center justify-center">
            <span className="text-xl">🎒</span>
          </div>
          <div>
            <h1 className="font-sans font-black text-lg sm:text-xl text-[#00639a] leading-none">
              Lernwelt
            </h1>
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 font-body">
              Klassen 1-4 Abenteuer
            </span>
          </div>
        </div>

        {/* User stats indicator bar */}
        {!isNewUser && (
          <div className="flex items-center gap-3">
            {/* Stars Count Badge */}
            <div className="bg-amber-100 border-2 border-amber-300 text-amber-900 rounded-full py-1.5 px-3 flex items-center gap-1.5 shadow-sm text-xs sm:text-sm font-black">
              <Star className="w-4 h-4 fill-amber-400 text-amber-600 animate-pulse" />
              <span>{progress.starsCount}</span>
            </div>

            {/* Achievements Trophy Button */}
            <button
              onClick={() => { playPop(); setShowCertificate(true); setActiveStationId(null); }}
              className="bg-yellow-100 border-2 border-yellow-400 hover:border-yellow-500 text-yellow-900 rounded-full p-2 flex items-center justify-center shadow-sm relative transition-transform hover:scale-105 cursor-pointer"
              title="Urkunde ansehen"
            >
              <Trophy className="w-4 h-4 text-yellow-600" />
              {hasWonSubject && (
                <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 text-[8px] text-white font-black items-center justify-center">✓</span>
                </span>
              )}
            </button>

            {/* Microavatar display */}
            <div 
              onClick={() => { playPop(); setIsNewUser(true); setTempName(progress.childName); }}
              className={`w-9 h-9 rounded-full border-2 flex items-center justify-center cursor-pointer shadow-sm text-lg active:scale-95 ${progress.avatarColor}`}
              title="Profileinstellungen"
            >
              {CHARACTER_AVATARS.find(a => a.id === progress.avatarId)?.emoji || '🧠'}
            </div>
          </div>
        )}
      </header>

      {/* Main Container Workspace */}
      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        
        {/* WELCOME INSTRUCTION MASCOT */}
        <Mascot expression={mascotExpression} text={mascotText} />

        {/* 1. NEW USER REGISTRATION SCREEN */}
        {isNewUser ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-high-tactile border border-slate-100 max-w-xl mx-auto space-y-8 animate-wiggle-double">
            <div className="text-center">
              <span className="bg-[#fdd758] text-[#725c00] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider block w-max mx-auto mb-2">
                Willkommen
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00639a] leading-tight font-sans">
                Tritt ein in die Lernwelt!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-body mt-1">
                Lerne spielerisch Lesen, Silbenschreiben und Grammatik für die Grundschule.
              </p>
            </div>

            {/* Input fields */}
            <div className="space-y-4 max-w-sm mx-auto">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold uppercase text-[#404750] tracking-wider font-sans block">
                  👦👧 Wie heißt du?
                </label>
                <input
                  type="text"
                  maxLength={18}
                  placeholder="Dein Vorname..."
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full bg-[#fcfdfe] px-4 py-3 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-[#00639a] text-center text-lg font-bold font-body placeholder:text-slate-300 text-[#191c1e]"
                />
              </div>

              {/* Character Avatar Picker */}
              <div className="space-y-3.5">
                <label className="text-xs font-extrabold uppercase text-[#404750] tracking-wider font-sans block text-center sm:text-left">
                  🦄 Wähle dein schlaues Wappentier:
                </label>
                
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {CHARACTER_AVATARS.map((avatar) => {
                    const isSelected = selectedAvatarId === avatar.id;
                    return (
                      <button
                        key={avatar.id}
                        type="button"
                        onClick={() => { playPop(); setSelectedAvatarId(avatar.id); }}
                        className={`p-3 rounded-2xl border-2 text-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-amber-100 border-amber-400 scale-105 ring-4 ring-amber-100' 
                            : 'bg-white border-slate-200/80 hover:bg-slate-50'
                        }`}
                      >
                        <span className="filter drop-shadow-sm select-none">{avatar.emoji}</span>
                        <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap overflow-ellipsis overflow-hidden w-full text-center mt-1">
                          {avatar.name.split(' (')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Save trigger buttons */}
            <div className="text-center pt-2">
              <button
                disabled={!tempName.trim()}
                onClick={handleStartAdventure}
                className={`w-full max-w-xs py-3 rounded-xl text-base font-black shadow-md uppercase tracking-wider cursor-pointer ${
                  tempName.trim()
                    ? 'btn-tactile-primary text-white hover:brightness-105'
                    : 'bg-slate-200 text-slate-400 border-b-4 border-slate-300 cursor-not-allowed'
                }`}
              >
                Abenteuer starten! 🧭
              </button>

              {!isNewUser && (
                <button
                  onClick={() => setIsNewUser(false)}
                  className="block mx-auto text-xs font-semibold text-slate-400 hover:text-slate-600 mt-4 underline cursor-pointer"
                >
                  Zurück zum Spiel
                </button>
              )}
            </div>
          </div>
        ) : showResearch ? (
          /* 2b. RESEARCH DASHBOARD ROUTE */
          <div className="space-y-6">
            <ResearchDashboard
              progress={progress}
              onClose={() => { playPop(); setShowResearch(false); }}
              onResetMetrics={handleResetMetrics}
            />
          </div>
        ) : showCertificate ? (
          /* 2. CERTIFICATE PAGE ROUTE */
          <div className="space-y-6">
            <Certificate 
              progress={progress} 
              onResetProgress={handleResetProgress}
              onClose={() => { playPop(); setShowCertificate(false); }}
            />
          </div>
        ) : activeStationId === null ? (
          /* 3. PROGRESS MAP LANDING PAGE */
          <div className="space-y-8">
            <LessonMap
              progress={progress}
              activeStationId={activeStationId}
              onSelectStation={(id) => {
                setActiveStationId(id);
                setCurrentExerciseIndex(0);
                setMascotExpression('idle');
              }}
              onOpenResearch={() => {
                setActiveStationId(null);
                setShowResearch(true);
                setShowCertificate(false);
              }}
            />

            {/* Quicklink Ribbons Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {/* Certificate Quicklink Ribbon */}
              <div className="bg-white p-5 rounded-2xl border-2 border-dashed border-amber-300 shadow-soft-tactile flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">📜</div>
                  <div className="min-w-0">
                    <h4 className="font-sans font-extrabold text-sm text-slate-800 truncate">Lernkönig Urkunde</h4>
                    <p className="text-xs text-slate-500 font-body">Schalte deine Urkunde frei!</p>
                  </div>
                </div>
                <button
                  onClick={() => { playPop(); setShowCertificate(true); }}
                  className="btn-tactile-secondary text-xs font-extrabold text-[#735d00] px-4 py-2 rounded-xl cursor-pointer shrink-0"
                >
                  Ansehen ⭐
                </button>
              </div>

              {/* Research Dashboard Quicklink Ribbon */}
              <div className="bg-white p-5 rounded-2xl border-2 border-dashed border-cyan-300 shadow-soft-tactile flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">📊</div>
                  <div className="min-w-0">
                    <h4 className="font-sans font-extrabold text-sm text-slate-800 truncate">Forschungs-Daten</h4>
                    <p className="text-xs text-slate-500 font-body">A/B Didaktik auswerten</p>
                  </div>
                </div>
                <button
                  onClick={() => { playPop(); setShowResearch(true); }}
                  className="btn-tactile-secondary text-xs font-extrabold text-cyan-900 bg-cyan-50 border-cyan-300 hover:bg-cyan-100 px-4 py-2 rounded-xl cursor-pointer shrink-0"
                >
                  Ansehen 📊
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* 4. ACTIVE EXERCISE GAME ZONE */
          <div className="space-y-6">
            {/* Exercise Station Header Navigation */}
            <div className="flex items-center justify-between bg-white/70 p-3 rounded-2xl border border-slate-200/55 shadow-sm">
              <button
                onClick={handleCloseStation}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-500 transition-colors text-xs sm:text-sm font-bold font-body cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Karte
              </button>

              <div className="text-center font-sans">
                <span className="text-[10px] font-bold text-[#00639a] uppercase tracking-widest block leading-none">
                  Klasse {activeStation?.grade} Abenteuer
                </span>
                <span className="text-sm font-extrabold text-slate-800 truncate block mt-0.5 max-w-[180px] sm:max-w-none">
                  {activeStation?.title}
                </span>
              </div>

              {/* Round Mini Level Tracker Progress Circle */}
              <div className="text-xs font-bold text-slate-400 bg-slate-100/80 px-2.5 py-1 rounded-full">
                {currentExerciseIndex + 1} / {activeStation?.exercises.length}
              </div>
            </div>

            {/* Load correct game station depending on station ID */}
            {activeStationId === 1 && currentExercise && (
              <StationLetterSpelling
                exercise={currentExercise as any}
                onCorrectAnswer={handleCorrectAnswer}
                onIncorrectAnswer={handleIncorrectAnswer}
                onNext={handleNextExercise}
                progress={progress}
                isLastExercise={currentExerciseIndex === activeStation.exercises.length - 1}
              />
            )}

            {activeStationId === 2 && currentExercise && (
              <StationSyllables
                exercise={currentExercise as any}
                onCorrectAnswer={handleCorrectAnswer}
                onIncorrectAnswer={handleIncorrectAnswer}
                onNext={handleNextExercise}
                progress={progress}
                isLastExercise={currentExerciseIndex === activeStation.exercises.length - 1}
              />
            )}

            {activeStationId === 3 && currentExercise && (
              <StationWordTypes
                exercise={currentExercise as any}
                onCorrectAnswer={handleCorrectAnswer}
                onIncorrectAnswer={handleIncorrectAnswer}
                onNext={handleNextExercise}
                progress={progress}
                isLastExercise={currentExerciseIndex === activeStation.exercises.length - 1}
              />
            )}

            {activeStationId === 4 && currentExercise && (
              <StationSpellingDetective
                exercise={currentExercise as any}
                onCorrectAnswer={handleCorrectAnswer}
                onIncorrectAnswer={handleIncorrectAnswer}
                onNext={handleNextExercise}
                progress={progress}
                isLastExercise={currentExerciseIndex === activeStation.exercises.length - 1}
              />
            )}

            {activeStationId === 5 && currentExercise && (
              <StationSingularPlural
                exercise={currentExercise as any}
                onCorrectAnswer={handleCorrectAnswer}
                onIncorrectAnswer={handleIncorrectAnswer}
                onNext={handleNextExercise}
                progress={progress}
                isLastExercise={currentExerciseIndex === activeStation.exercises.length - 1}
              />
            )}

            {activeStationId === 6 && currentExercise && (
              <StationVerbTenses
                exercise={currentExercise as any}
                onCorrectAnswer={handleCorrectAnswer}
                onIncorrectAnswer={handleIncorrectAnswer}
                onNext={handleNextExercise}
                progress={progress}
                isLastExercise={currentExerciseIndex === activeStation.exercises.length - 1}
              />
            )}

            {(activeStationId === 7 || activeStationId === 8 || activeStationId === 9) && currentExercise && (
              <StationMathQuiz
                exercise={currentExercise as any}
                onCorrectAnswer={handleCorrectAnswer}
                onIncorrectAnswer={handleIncorrectAnswer}
                onNext={handleNextExercise}
                progress={progress}
                isLastExercise={currentExerciseIndex === activeStation.exercises.length - 1}
                stationId={activeStationId}
                onSaveMetrics={handleSaveMetrics}
              />
            )}

            {activeStationId === 10 && currentExercise && (
              <StationMathFractions
                exercise={currentExercise as any}
                onCorrectAnswer={handleCorrectAnswer}
                onIncorrectAnswer={handleIncorrectAnswer}
                onNext={handleNextExercise}
                progress={progress}
                isLastExercise={currentExerciseIndex === activeStation.exercises.length - 1}
                onSaveMetrics={handleSaveMetrics}
              />
            )}
          </div>
        )}
      </main>

      {/* 5. LEVEL COMPLETED CONGRATULATIONS MODAL POPUP */}
      {showCompletionCelebration && activeStation && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border-4 border-yellow-400 text-center shadow-high-tactile space-y-5 animate-wiggle-double">
            <div className="text-5xl select-none filter drop-shadow">🏆</div>
            
            <div className="space-y-1.5">
              <span className="text-xs font-black text-amber-600 uppercase tracking-widest block font-sans">
                Station gemeistert!
              </span>
              <h2 className="text-2xl font-black text-slate-800 leading-tight font-sans">
                Großartige Leistung, {progress.childName}!
              </h2>
            </div>

            <p className="text-sm font-semibold text-slate-500 font-body leading-relaxed">
              Du hast alle Fragen der <strong>{activeStation.title}</strong> fehlerfrei gelöst und erhältst einen riesigen Sack voller Sterne!
            </p>

            <div className="bg-amber-100/60 p-3 rounded-2xl inline-flex items-center gap-2 border border-amber-300">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
              <span className="font-extrabold text-amber-950 text-sm">
                +50 Abschluss-Bonus Sterne!
              </span>
            </div>

            <button
              onClick={finishStationCelebration}
              className="w-full btn-tactile-secondary text-amber-950 font-black py-3 rounded-xl cursor-pointer"
            >
              Weiter reisen! 🧭
            </button>
          </div>
        </div>
      )}

      {/* Bottom Footer Credits block */}
      <footer className="text-center py-10 px-4 text-xs text-slate-400 font-bold font-body">
        <p>© 2026 Lernwelt • Das spielerische Deutschabenteuer.</p>
        <p className="mt-1 text-[10px] text-slate-300">Mit Liebe für kleine Lerner und kluge Köpfe gebaut.</p>
      </footer>
    </div>
  );
}
