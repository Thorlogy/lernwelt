import { useCallback, useEffect, useRef, useState } from "react";

export interface SpeakOptions {
  rate?: number;   
  pitch?: number;  
  volume?: number; 
  voice?: any;
  onEnd?: () => void;
}

const DEFAULTS = { rate: 1, pitch: 1, volume: 1, lang: "de-DE" };

// Same slugify logic as the generate script
function generateFilename(text: string): string {
  let clean = text.toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_');
  
  if (clean.endsWith('_')) clean = clean.slice(0, -1);
  if (clean.startsWith('_')) clean = clean.slice(1);
  
  if (clean.length > 50) {
    // Basic base64 hash function for client side
    const hash = btoa(unescape(encodeURIComponent(text))).replace(/[^a-zA-Z0-9]/g, '').substring(0, 8);
    clean = clean.substring(0, 40) + '_' + hash;
  }
  
  return `${clean}.mp3`;
}

export function useSpeech() {
  const supported = true; // Audio is universally supported
  const [voices] = useState<any[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const unlock = useCallback(() => {
    // Play a tiny silent sound to unlock audio on iOS
    if (!audioRef.current) {
      audioRef.current = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA');
    }
    audioRef.current.play().catch(() => {});
  }, []);

  const cancel = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setSpeaking(false);
  }, []);

  const playAudio = useCallback((filename: string, onEnd?: () => void) => {
    cancel(); // stop current
    
    const audio = new Audio(`/audio/tts/${filename}`);
    audioRef.current = audio;
    
    audio.onplaying = () => setSpeaking(true);
    audio.onended = () => {
      setSpeaking(false);
      onEnd?.();
    };
    audio.onerror = () => {
      setSpeaking(false);
      onEnd?.();
    };

    audio.play().catch(e => {
      console.warn("Autoplay blocked or file not found:", e);
      setSpeaking(false);
      onEnd?.();
    });
  }, [cancel]);

  const speak = useCallback(
    (text: string, opts: SpeakOptions = {}) => {
      if (!text) return;
      const filename = generateFilename(text);
      playAudio(filename, opts.onEnd);
    },
    [playAudio]
  );

  const speakSyllables = useCallback(
    (syllables: string[]) => {
      if (!syllables.length) return;
      const syllableString = syllables.join(', ');
      const filename = generateFilename(syllableString);
      playAudio(filename);
    },
    [playAudio]
  );

  useEffect(() => {
    return () => cancel();
  }, [cancel]);

  return { supported, voices, speaking, speak, speakSyllables, cancel, unlock };
}
