import React, { useState } from 'react';
import { STATIONEN } from '../data';
import { Station, UserProgress } from '../types';
import { BookOpen, Music, Layers, Search, Lock, CheckCircle, Star, Sparkles, HelpCircle, Award, Calculator, Percent, Coins, ChevronDown, ChevronUp } from 'lucide-react';
import { playPop } from '../utils/audio';

interface LessonMapProps {
 progress: UserProgress;
 onSelectStation: (stationId: number) => void;
 activeStationId: number | null;
 onOpenResearch: () => void;
}

const ICON_MAP: Record<string, any> = {
 Keyboard: BookOpen,
 Music: Music,
 FolderGit: Layers,
 Search: Search,
 Award: Award,
 Calculator: Calculator,
 Percent: Percent,
 Coins: Coins,
};

 export default function LessonMap({ progress, onSelectStation, activeStationId, onOpenResearch }: LessonMapProps) {
  const [activeSubject, setActiveSubject] = useState<'deutsch' | 'mathe'>('deutsch');
  const [expandedGrades, setExpandedGrades] = useState<number[]>([1]);

  const toggleGrade = (grade: number) => {
    playPop();
    setExpandedGrades(prev => 
      prev.includes(grade) ? prev.filter(g => g !== grade) : [...prev, grade]
    );
  };

 const handlePrintWorksheet = (stationId: number) => {
 const station = STATIONEN.find(s => s.id === stationId);
 if (!station) return;

 const printWindow = window.open('', '_blank');
 if (!printWindow) {
 alert("Bitte erlaube Popups in deinem Browser, um das Arbeitsblatt zu drucken!");
 return;
 }

 let exercisesHtml = '';
 station.exercises.forEach((ex, idx) => {
 let visualAid = '';

 if (stationId === 7) {
 visualAid = `
 <div style="display: grid; grid-template-columns: repeat(10, 1fr); gap: 6px; max-width: 250px; margin: 12px 0; border: 1.5px solid #000; padding: 6px; border-radius: 6px;">
 ${Array(20).fill(null).map(() => '<div style="width: 18px; height: 18px; border: 1.5px solid #000; border-radius: 50%;"></div>').join('')}
 </div>
 `;
 } else if (stationId === 8) {
 if (ex.question.includes('aufteilen')) {
 visualAid = `
 <div style="margin: 10px 0; font-weight: bold; font-size: 13px;">
 Verteile die 12 Kekse gerecht auf die Körbe:<br>
 🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪 🍪
 <div style="display: flex; gap: 15px; margin-top: 8px;">
 <div style="flex: 1; border: 1.5px dashed #000; border-radius: 8px; height: 60px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #555;">Bruder</div>
 <div style="flex: 1; border: 1.5px dashed #000; border-radius: 8px; height: 60px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #555;">Eltern (Teil 1)</div>
 <div style="flex: 1; border: 1.5px dashed #000; border-radius: 8px; height: 60px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #555;">Eltern (Teil 2)</div>
 </div>
 </div>
 `;
 } else {
 const rows = ex.mathNum1 || 3;
 const cols = ex.mathNum2 || 4;
 let dots = '';
 for (let r = 0; r < rows; r++) {
 dots += '<div style="display: flex; gap: 6px; margin-bottom: 6px;">';
 for (let c = 0; c < cols; c++) {
 dots += '<div style="width: 14px; height: 14px; border: 1.5px solid #000; border-radius: 50%;"></div>';
 }
 dots += '</div>';
 }
 visualAid = `<div style="margin: 12px 0;">${dots}</div>`;
 }
 } else if (stationId === 10) {
 const segments = ex.mathFractionSegments || 8;
 let slices = '';
 const center = 50;
 const r = 40;
 for (let i = 0; i < segments; i++) {
 const startAngle = (2 * Math.PI * i) / segments - Math.PI / 2;
 const endAngle = (2 * Math.PI * (i + 1)) / segments - Math.PI / 2;
 const x1 = center + r * Math.cos(startAngle);
 const y1 = center + r * Math.sin(startAngle);
 const x2 = center + r * Math.cos(endAngle);
 const y2 = center + r * Math.sin(endAngle);
 slices += `<path d="M ${center} ${center} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z" fill="none" stroke="black" stroke-width="1" />`;
 }
 
 let barBlocks = '';
 for (let i = 0; i < segments; i++) {
 barBlocks += `<div style="flex: 1; border-right: 1px solid black; height: 25px;"></div>`;
 }

 visualAid = `
 <div style="display: flex; gap: 40px; align-items: center; margin: 15px 0;">
 <svg width="80" height="80" viewBox="0 0 100 100" style="overflow: visible;">
 <circle cx="50" cy="50" r="41" fill="none" stroke="black" stroke-width="1.5" />
 ${slices}
 </svg>
 <div style="display: flex; border: 1.5px solid black; width: 180px; overflow: hidden; border-radius: 4px;">
 ${barBlocks}
 </div>
 </div>
 `;
 }

 let answerArea = '<div style="margin-top: 10px; font-weight: bold;">Antwort: ____________________________________</div>';

 exercisesHtml += `
 <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px dashed #ccc; page-break-inside: avoid;">
 <div style="font-weight: bold; font-size: 14px; margin-bottom: 5px;">Aufgabe ${idx + 1}:</div>
 <div style="font-size: 13px; line-height: 1.4;">${ex.question}</div>
 ${ex.word ? `<div style="font-size: 14px; font-style: italic; margin: 8px 0; padding: 4px; border-left: 3px solid #000; background: #fafafa;">"${ex.word}"</div>` : ''}
 ${visualAid}
 ${answerArea}
 </div>
 `;
 });

 const docHtml = `
 <!DOCTYPE html>
 <html>
 <head>
 <title>Arbeitsblatt - ${station.title}</title>
 <meta charset="utf-8">
 <style>
 body {
 font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
 color: #000;
 margin: 30px;
 line-height: 1.3;
 }
 .header {
 border-bottom: 3px double #000;
 padding-bottom: 12px;
 margin-bottom: 25px;
 }
 .metadata {
 display: flex;
 justify-content: space-between;
 font-weight: bold;
 font-size: 12px;
 margin-top: 15px;
 }
 .guide {
 display: flex;
 align-items: center;
 gap: 12px;
 background: #f7f9fa;
 border: 1px solid #ccc;
 border-radius: 8px;
 padding: 10px;
 margin-bottom: 25px;
 font-size: 11px;
 }
 @media print {
 body { margin: 0; }
 .no-print { display: none; }
 }
 </style>
 </head>
 <body>
 <div class="header">
 <div style="display: flex; justify-content: space-between; align-items: center;">
 <span style="font-size: 20px; font-weight: 900; text-transform: ;">🏫 Lernwelt Arbeitsblatt</span>
 <span style="font-size: 12px; font-weight: bold; background: #eee; padding: 3px 8px; border-radius: 4px;">Klasse ${station.grade}</span>
 </div>
 <div style="font-size: 16px; font-weight: bold; margin-top: 5px;">${station.title}</div>
 <div style="font-size: 11px; color: #555; margin-top: 3px;">${station.subtitle}</div>
 
 <div class="metadata">
 <span>Name: _______________________________</span>
 <span>Datum: __________________</span>
 </div>
 </div>

 <div class="guide">
 <svg width="50" height="50" viewBox="0 0 100 100" style="flex-shrink:0;">
 <rect x="45" y="10" width="10" height="70" rx="1.5" fill="none" stroke="black" stroke-width="2" />
 <path d="M 45 80 L 50 95 L 55 80 Z" fill="none" stroke="black" stroke-width="2" />
 <circle cx="50" cy="50" r="25" fill="none" stroke="black" stroke-width="1.5" stroke-dasharray="3 3" />
 <path d="M 68 35 Q 52 35 48 45" stroke="black" stroke-width="4" stroke-linecap="round" fill="none" />
 <path d="M 28 55 Q 40 50 44 48" stroke="black" stroke-width="5" stroke-linecap="round" fill="none" />
 <path d="M 52 56 Q 52 64 56 64" stroke="black" stroke-width="3" stroke-linecap="round" fill="none" />
 </svg>
 <div>
 <strong style="font-size: 12px;">Lumi's Schreibmotorik-Tipp (Dreipunktgriff):</strong><br>
 Halte den Stift locker mit Daumen und Zeigefinger. Der Mittelfinger stützt den Stift von unten wie ein Kissen. 
 Sitze aufrecht, halte deine Schreibhand entspannt und lege das Blatt leicht schräg.
 </div>
 </div>

 <div class="content">
 ${exercisesHtml}
 </div>

 <div style="text-align: center; font-size: 10px; color: #777; margin-top: 30px;" class="no-print">
 <button onclick="window.print()" style="padding: 10px 20px; font-weight: bold; font-size: 14px; cursor: pointer; border-radius: 6px; border: 2px solid #000; background: #fff;">
 🖨️ Arbeitsblatt jetzt drucken
 </button>
 </div>
 </body>
 </html>
 `;

 printWindow.document.open();
 printWindow.document.write(docHtml);
 printWindow.document.close();
 };
 
 const handleStationClick = (station: Station, isLocked: boolean) => {
 playPop();
 if (isLocked) {
 // Allow overriding or playing anyway to ensure smooth tester experience, but with a warning or visual unlock
 onSelectStation(station.id);
 } else {
 onSelectStation(station.id);
 }
 };

 return (
 <div className="relative py-10 px-4 max-w-lg mx-auto bg-gradient-to-b from-[#f2f6fa] to-[#e4eaf0] rounded-3xl border-4 border-white shadow-high-tactile overflow-hidden">
 {/* Background Graphic Landmarks */}
 <div className="absolute top-4 left-6 text-4xl opacity-25 select-none animate-wiggle-soft">☁️</div>
 <div className="absolute top-24 right-8 text-3xl opacity-20 select-none animate-wiggle-soft" style={{ animationDelay: '1s' }}>☁️</div>
 <div className="absolute bottom-20 left-10 text-4xl opacity-20 select-none animate-wiggle-soft" style={{ animationDelay: '2s' }}>🌲</div>
 <div className="absolute bottom-6 right-16 text-3xl opacity-25 select-none animate-wiggle-soft" style={{ animationDelay: '1.5s' }}>🌳</div>
 <div className="absolute top-1/2 left-4 text-2xl opacity-15 select-none text-brand-secondary">🌈</div>

 {/* Map Header */}
 <div className="text-center mb-6 relative z-10">
 <span className="inline-block bg-[#fdd758] text-[#725c00] text-base font-bold px-3 py-1 rounded-full mb-2 border border-yellow-400">
 Dein Abenteuer-Pfad
 </span>
 <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00639a] leading-tight font-sans">
 Lern-Landkarte
 </h2>
 <p className="text-base text-slate-500 font-body mt-1">
 Wähle ein Fach und starte dein Lernspiel!
 </p>
 </div>

 {/* Subject Switcher Tabs */}
 <div className="flex gap-2 p-1 bg-slate-200/80 rounded-2xl border border-slate-300/40 mb-8 relative z-10 max-w-[280px] mx-auto">
 <button
 type="button"
 onClick={() => { playPop(); setActiveSubject('deutsch'); }}
 className={`flex-1 py-2 px-3 rounded-xl font-sans font-black text-base sm:text-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
 activeSubject === 'deutsch'
 ? 'bg-white text-[#00639a] shadow-sm scale-102 border-b-2 border-slate-200'
 : 'text-slate-500 hover:bg-slate-100/50'
 }`}
 >
 <span>Deutsch 🎒</span>
 </button>
 <button
 type="button"
 onClick={() => { playPop(); setActiveSubject('mathe'); }}
 className={`flex-1 py-2 px-3 rounded-xl font-sans font-black text-base sm:text-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
 activeSubject === 'mathe'
 ? 'bg-white text-emerald-700 shadow-sm scale-102 border-b-2 border-slate-200'
 : 'text-slate-500 hover:bg-slate-100/50'
 }`}
 >
 <span>Mathe 🧮</span>
 </button>
 </div>

 {/* Stations Stack Grouped by Grade */}
 <div className="flex flex-col gap-6 relative z-10">
   {[1, 2, 3, 4].map((gradeLevel) => {
     const subjectStations = STATIONEN.filter(s => s.subject === activeSubject);
     const gradeStations = subjectStations.filter(s => s.grade === gradeLevel);
     
     if (gradeStations.length === 0) return null;

     const isExpanded = expandedGrades.includes(gradeLevel);
     // Determine if all stations in this grade are completed
     const isGradeCompleted = gradeStations.every(s => progress.completedStations.includes(s.id));
     // Determine if this grade is completely locked (first station in grade is locked)
     const firstStationInGradeIndex = subjectStations.findIndex(s => s.id === gradeStations[0].id);
     const isGradeLocked = firstStationInGradeIndex > 0 && !progress.completedStations.includes(subjectStations[firstStationInGradeIndex - 1].id);

     return (
       <div key={`grade-${gradeLevel}`} className="bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-white shadow-soft-tactile overflow-hidden transition-all duration-300">
         {/* Accordion Header */}
         <button 
           onClick={() => toggleGrade(gradeLevel)}
           className={`w-full flex items-center justify-between p-4 sm:p-5 transition-colors cursor-pointer ${
             isGradeCompleted ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900' :
             isGradeLocked ? 'bg-slate-200/50 text-slate-500 hover:bg-slate-200' :
             'bg-sky-100 hover:bg-sky-200 text-[#00639a]'
           }`}
         >
           <div className="flex items-center gap-3">
             <div className="text-2xl sm:text-3xl">
               {isGradeCompleted ? '🏆' : isGradeLocked ? '🔒' : activeSubject === 'deutsch' ? '🎒' : '🧮'}
             </div>
             <div className="text-left">
               <h3 className="font-sans font-black text-lg sm:text-xl leading-tight">
                 Klasse {gradeLevel}
               </h3>
               <p className={`text-sm sm:text-base font-bold font-body ${isGradeCompleted ? 'text-emerald-700' : isGradeLocked ? 'text-slate-400' : 'text-[#004e76]'}`}>
                 {gradeStations.length} Stationen
               </p>
             </div>
           </div>
           
           <div className="flex items-center gap-2">
             {isGradeCompleted && (
               <span className="hidden sm:flex items-center gap-1 text-sm font-bold text-emerald-700 bg-white/50 px-2 py-1 rounded-full">
                 <CheckCircle className="w-4 h-4" /> Geschafft
               </span>
             )}
             <div className={`p-1.5 rounded-full bg-white/50 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
               <ChevronDown className="w-5 h-5" />
             </div>
           </div>
         </button>

         {/* Accordion Body */}
         <div 
           className={`transition-all duration-300 ease-in-out overflow-hidden relative ${isExpanded ? 'max-h-[3000px] opacity-100 py-10' : 'max-h-0 opacity-0 py-0'}`}
         >
           {/* SVG S-Curve for this specific grade section */}
           <div className="absolute inset-x-0 top-10 bottom-10 pointer-events-none z-0">
             <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path
                 d="M 50 0 Q 75 25, 75 50 T 25 75 T 50 100"
                 fill="none"
                 stroke="#a5c4d9"
                 strokeWidth="4"
                 strokeDasharray="6 6"
                 className="stroke-cyan-300"
               />
             </svg>
           </div>

           <div className="flex flex-col gap-10 relative z-10">
             {gradeStations.map((station, index) => {
               const absoluteIndex = subjectStations.findIndex(s => s.id === station.id);
               const isCompleted = progress.completedStations.includes(station.id);
               const isLocked = absoluteIndex > 0 && !progress.completedStations.includes(subjectStations[absoluteIndex - 1].id);
               const isActive = activeStationId === station.id;

               const StationIcon = ICON_MAP[station.icon] || HelpCircle;

               const alignClass = 
                 index % 2 === 0
                   ? 'self-start ml-4 sm:ml-8'
                   : 'self-end mr-4 sm:mr-8';

               const getCardColorTheme = () => {
                 if (isCompleted) return 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-emerald-500/10';
                 if (isActive) return 'bg-sky-50 border-sky-400 ring-4 ring-sky-200 text-sky-900 animate-wiggle-double';
                 if (isLocked) return 'bg-slate-100 border-slate-300 text-slate-500 opacity-80';
                 return 'bg-white border-blue-200 text-slate-800 hover:border-blue-400';
               };

               return (
                 <div 
                   key={station.id} 
                   className={`w-[85%] sm:w-[80%] ${alignClass} transition-transform duration-200`}
                 >
                   <div
                     className={`w-full p-4 rounded-2xl border-2 shadow-soft-tactile transition-all duration-200 ${getCardColorTheme()} relative overflow-hidden flex flex-col gap-3`}
                     style={{ transform: isActive ? 'scale(1.02)' : 'none' }}
                   >
                     <div 
                       onClick={() => handleStationClick(station, isLocked)}
                       className="flex items-start gap-3.5 cursor-pointer flex-1 min-w-0"
                     >
                       {!isLocked && !isCompleted && !isActive && (
                         <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-200"></div>
                       )}

                       <div className={`p-3 rounded-xl flex-shrink-0 ${
                         isCompleted ? 'bg-emerald-500 text-white' : 
                         isActive ? 'bg-sky-500 text-white animate-pulse' : 
                         isLocked ? 'bg-slate-300 text-slate-500' : 'bg-[#00639a] text-white'
                       }`}>
                         {isLocked ? <Lock className="w-5 h-5" /> : <StationIcon className="w-5 h-5" />}
                       </div>

                       <div className="flex-1 min-w-0">
                         <div className="flex items-center justify-between gap-1">
                           <span className={`text-[11px] font-bold ${
                             isCompleted ? 'text-emerald-600' : isLocked ? 'text-slate-400' : 'text-[#00639a]'
                           }`}>
                             Station {index + 1} • {station.difficulty === 'leicht' ? '🟢 Leicht' : station.difficulty === 'mittel' ? '🟡 Mittel' : '🔴 Schwer'}
                           </span>
                           {isCompleted && (
                             <span className="flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                               <CheckCircle className="w-3.5 h-3.5" /> Fertig!
                             </span>
                           )}
                           {isLocked && (
                             <span className="text-base font-bold text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded-sm">
                               Sperre
                             </span>
                           )}
                         </div>

                         <h3 className="text-base sm:text-lg font-bold truncate leading-tight font-sans mt-0.5">
                           {station.title.split(': ')[1] || station.title}
                         </h3>
                         <p className="text-base text-slate-500 line-clamp-1 font-body mt-0.5">
                           {station.subtitle}
                         </p>
                       </div>
                     </div>

                     {!isLocked && (
                       <div className="flex justify-end border-t pt-2 border-slate-200/50 mt-1">
                         <button
                           type="button"
                           onClick={(e) => { e.stopPropagation(); playPop(); handlePrintWorksheet(station.id); }}
                           className="text-base font-extrabold text-[#00639a] hover:bg-[#00639a]/5 hover:text-[#004e76] px-2.5 py-1.5 rounded-xl border border-dashed border-[#a5c4d9] flex items-center gap-1 transition-all cursor-pointer select-none"
                         >
                           <span>🖨️ Arbeitsblatt drucken</span>
                         </button>
                       </div>
                     )}

                     {isCompleted && (
                       <div className="absolute right-2 top-2 flex gap-0.5 text-amber-500">
                         <Star className="w-3.5 h-3.5 fill-amber-400" />
                         <Star className="w-3.5 h-3.5 fill-amber-400" />
                         <Star className="w-3.5 h-3.5 fill-amber-400" />
                       </div>
                     )}
                     
                     {isActive && (
                       <div className="absolute -top-1 -right-1 flex h-3 w-3">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                       </div>
                     )}
                   </div>
                 </div>
               );
             })}
           </div>
         </div>
       </div>
     );
   })}
 </div>

 {/* Decorative Finish Banner */}
 <div className="mt-12 text-center p-4 bg-yellow-50 rounded-2xl border-2 border-dashed border-yellow-300">
 <span className="text-3xl">🏆</span>
 <h4 className="text-lg font-bold text-yellow-800 font-sans mt-1">Lernkönig Urkunde</h4>
 <p className="text-base text-slate-500 font-body">Schließe alle 12 Deutsch-Stationen oder alle 12 Mathe-Stationen ab, um deine goldene Urkunde freizuschalten!</p>
 </div>

 {/* A/B Test Dashboard shortcut */}
 <div className="mt-6 text-center">
 <button
 type="button"
 onClick={() => { playPop(); onOpenResearch(); }}
 className="text-base font-extrabold text-cyan-600 hover:text-cyan-800 underline hover:no-underline cursor-pointer flex items-center gap-1 justify-center mx-auto transition-colors"
 >
 <span>📊 Didaktik A/B-Test auswerten</span>
 </button>
 </div>
 </div>
 );
}
