import React, { useEffect } from "react";
import { useSpeech } from "../lib/useSpeech";

interface SpeakButtonProps {
  text: string;            // Was vorgelesen wird
  syllables?: string[];    // optional: silbenweise (z. B. ["Tul", "pe"])
  label?: string;          // aria-label (Default sinnvoll gesetzt)
  autoSpeak?: boolean;     // beim Erscheinen automatisch vorlesen (iOS: unlock nötig)
  size?: number;           // Icon-Größe in px
  className?: string;
}

export function SpeakButton({
  text,
  syllables,
  label,
  autoSpeak = false,
  size = 28,
  className = "",
}: SpeakButtonProps) {
  const { supported, speaking, speak, speakSyllables } = useSpeech();

  // Auto-Vorlesen, wenn sich der Text ändert (neue Aufgabe).
  useEffect(() => {
    if (autoSpeak && supported && text) speak(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, autoSpeak]);

  if (!supported) return null; // sauberer Fallback

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Verhindere, dass z.B. eine Option ausgewählt wird, wenn man nur das Audio hören will
    syllables?.length ? speakSyllables(syllables) : speak(text);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label ?? `„${text}“ vorlesen`}
      className={`inline-flex items-center justify-center rounded-full p-2
        bg-[#00639a] text-white shadow active:scale-95 transition
        ${speaking ? "animate-pulse" : ""} ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M11 5 6 9H2v6h4l5 4V5z" />
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
        {speaking && <path d="M18.5 5.5a9 9 0 0 1 0 13" />}
      </svg>
    </button>
  );
}
