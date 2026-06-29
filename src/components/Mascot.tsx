import React from 'react';

interface MascotProps {
 expression: 'idle' | 'correct' | 'incorrect' | 'cheering';
 text: string;
 className?: string;
}

export default function Mascot({ expression, text, className = '' }: MascotProps) {
 return (
 <div className={`flex flex-col sm:flex-row items-center gap-4 bg-white/90 backdrop-blur-sm p-4 sm:p-5 rounded-2xl shadow-soft-tactile border border-blue-100/50 ${className}`}>
 {/* Dynamic Animated Mascot SVG */}
 <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 animate-wiggle-soft">
 <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
 {/* Dragon wings */}
 <g className={`transition-transform duration-500 origin-[30px_50px] ${expression === 'cheering' ? 'scale-y-[1.3] animate-bounce' : ''}`}>
 {/* Left wing */}
 <path d="M25,45 C5,35 10,15 28,30 C20,20 30,10 32,35 Z" fill="#ffd54f" />
 {/* Right wing offset */}
 <path d="M75,45 C95,35 90,15 72,30 C80,20 70,10 68,35 Z" fill="#ffca28" className="origin-[70px_50px] scale-x-[-1]" />
 </g>

 {/* Dragon Body */}
 <ellipse cx="50" cy="55" rx="25" ry="28" fill="#4caf50" />
 <ellipse cx="50" cy="58" rx="16" ry="20" fill="#a5d6a7" /> {/* Bauch */}

 {/* Little Spikes on tail/back */}
 <polygon points="50,22 45,15 55,15" fill="#2e7d32" />
 <polygon points="40,25 34,20 42,20" fill="#2e7d32" />
 <polygon points="60,25 66,20 58,20" fill="#2e7d32" />

 {/* Cheerful dragon head */}
 <circle cx="50" cy="38" r="18" fill="#4caf50" />
 
 {/* Cheeks */}
 <circle cx="38" cy="42" r="3" fill="#ff8a80" opacity="0.6" />
 <circle cx="62" cy="42" r="3" fill="#ff8a80" opacity="0.6" />

 {/* EYES based on expression state */}
 {expression === 'idle' && (
 <>
 {/* Soft friendly round eyes with starry glints */}
 <circle cx="42" cy="35" r="3.5" fill="#1b5e20" />
 <circle cx="41" cy="34" r="1.2" fill="#ffffff" />
 <circle cx="58" cy="35" r="3.5" fill="#1b5e20" />
 <circle cx="57" cy="34" r="1.2" fill="#ffffff" />
 </>
 )}

 {expression === 'correct' && (
 <>
 {/* closed happy squinting eyes (smiling arches ^ ^) */}
 <path d="M38,36 Q42,32 45,36" stroke="#1b5e20" strokeWidth="2.5" strokeLinecap="round" fill="none" />
 <path d="M55,36 Q58,32 62,36" stroke="#1b5e20" strokeWidth="2.5" strokeLinecap="round" fill="none" />
 </>
 )}

 {expression === 'cheering' && (
 <>
 {/* Starry eyes with glowing feel */}
 <path d="M42,30 L43.5,34 L47,34 L44.5,36 L45.5,40 L42,38 L38.5,40 L39.5,36 L37,34 L40.5,34 Z" fill="#ffd54f" />
 <path d="M58,30 L59.5,34 L63,34 L60.5,36 L61.5,40 L58,38 L54.5,40 L55.5,36 L53,34 L56.5,34 Z" fill="#ffd54f" />
 </>
 )}

 {expression === 'incorrect' && (
 <>
 {/* Worried / thinking eyes */}
 <path d="M37,32 Q42,30 45,33" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" fill="none" /> {/* Eyebrow left */}
 <path d="M63,32 Q58,30 55,33" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" fill="none" /> {/* Eyebrow right */}
 <circle cx="42" cy="36" r="3" fill="#1b5e20" />
 <circle cx="58" cy="36" r="3" fill="#1b5e20" />
 </>
 )}

 {/* MOUTH based on expression */}
 {expression === 'idle' && (
 /* Friendly small smile */
 <path d="M46,43 Q50,47 54,43" stroke="#1b5e20" strokeWidth="2" strokeLinecap="round" fill="none" />
 )}

 {expression === 'correct' && (
 /* Open laughing happy mouth */
 <g>
 <path d="M44,42 Q50,49 56,42 Z" fill="#c62828" />
 <path d="M47,42 Q50,44 53,42" fill="#ffffff" /> {/* Tooth */}
 </g>
 )}

 {expression === 'cheering' && (
 /* Dynamic happy laugh */
 <g>
 <ellipse cx="50" cy="44" rx="6" ry="4" fill="#880e4f" />
 <path d="M46,43 Q50,41 54,43" fill="#ffffff" stroke="#c62828" strokeWidth="0.5" />
 </g>
 )}

 {expression === 'incorrect' && (
 /* Soft sympathetic line smile / small 'o' */
 <circle cx="50" cy="44" r="3.2" fill="#1b5e20" />
 )}

 {/* Little green dinosaur horn/star crest */}
 <polygon points="50,16 48,8 52,8" fill="#ffd54f" />
 <circle cx="50" cy="7" r="1.5" fill="#fdd835" />
 </svg>

 {/* Small sparkling glow if cheering */}
 {expression === 'cheering' && (
 <span className="absolute -top-1 -right-1 text-2xl animate-ping">✨</span>
 )}
 </div>

 {/* Narrative Interactive Speech Bubble */}
 <div className="relative flex-1 bg-amber-50 rounded-2xl p-4 border-2 border-amber-200/60 shadow-sm">
 {/* Decorative Sprechblasendorn / Triangle indicator */}
 <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-0 h-0 border-t-8 border-t-transparent border-r-[14px] border-r-amber-200/60 border-b-8 border-b-transparent hidden sm:block"></div>
 <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-0 h-0 border-t-8 border-t-transparent border-r-[12px] border-r-amber-50 border-b-8 border-b-transparent hidden sm:block"></div>
 
 {/* On mobile, arrow points up */}
 <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-b-[12px] border-b-amber-200/60 border-r-8 border-r-transparent sm:hidden"></div>
 <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-b-[11px] border-b-amber-50 border-r-8 border-r-transparent sm:hidden"></div>

 <div>
 <span className="text-base font-bold text-amber-700 block mb-1 font-sans">
 Lumi sagt:
 </span>
 <p className="text-[#191c1e] text-base sm:text-lg font-bold leading-relaxed font-body">
 {text}
 </p>
 </div>
 </div>
 </div>
 );
}
