import { useCallback, useEffect, useRef, useState } from "react";

export interface SpeakOptions {
  rate?: number;   // 0.5–1.5 · kindgerecht: langsam
  pitch?: number;  // 0–2
  volume?: number; // 0–1
  voice?: SpeechSynthesisVoice | null;
  onEnd?: () => void;
}

const DEFAULTS = { rate: 0.85, pitch: 1.05, volume: 1, lang: "de-DE" };

/** Beste deutsche Stimme wählen: de-DE und offline-fähige Stimmen bevorzugen. */
function pickGermanVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const de = voices.filter((v) => v.lang?.toLowerCase().startsWith("de"));
  if (!de.length) return null;
  const score = (v: SpeechSynthesisVoice) =>
    (v.lang.toLowerCase() === "de-de" ? 2 : 0) + (v.localService ? 1 : 0);
  return [...de].sort((a, b) => score(b) - score(a))[0];
}

export function useSpeech() {
  const supported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Stimmen laden – kommen in Chrome/Edge asynchron herein.
  useEffect(() => {
    if (!supported) return;
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      voiceRef.current = pickGermanVoice(v);
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [supported]);

  /**
   * iOS/Safari: Sprachausgabe muss EINMALIG aus einer echten Nutzer-Geste
   * heraus entsperrt werden. Aus einem globalen „Los geht's"-Button aufrufen.
   */
  const unlock = useCallback(() => {
    if (!supported) return;
    const u = new SpeechSynthesisUtterance(" ");
    u.volume = 0;
    window.speechSynthesis.speak(u);
  }, [supported]);

  const cancel = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  const speak = useCallback(
    (text: string, opts: SpeakOptions = {}) => {
      if (!supported || !text) return;
      window.speechSynthesis.cancel(); // laufende Ausgabe stoppen, kein Stau
      const u = new SpeechSynthesisUtterance(text);
      u.lang = DEFAULTS.lang;
      u.rate = opts.rate ?? DEFAULTS.rate;
      u.pitch = opts.pitch ?? DEFAULTS.pitch;
      u.volume = opts.volume ?? DEFAULTS.volume;
      const voice = opts.voice ?? voiceRef.current;
      if (voice) u.voice = voice;
      u.onstart = () => setSpeaking(true);
      u.onend = () => {
        setSpeaking(false);
        opts.onEnd?.();
      };
      u.onerror = () => setSpeaking(false);
      // Tick verhindert einen Chrome-Bug (cancel + speak im selben Frame).
      setTimeout(() => window.speechSynthesis.speak(u), 0);
    },
    [supported]
  );

  /** Silbenweise mit kleinen Pausen vorlesen – passt zu „Silben-Hüpfen". */
  const speakSyllables = useCallback(
    (syllables: string[]) => {
      if (!supported || !syllables.length) return;
      window.speechSynthesis.cancel();
      syllables.forEach((syl, i) => {
        const u = new SpeechSynthesisUtterance(syl + ","); // Komma = natürliche Pause
        u.lang = DEFAULTS.lang;
        u.rate = 0.7;
        u.pitch = DEFAULTS.pitch;
        if (voiceRef.current) u.voice = voiceRef.current;
        if (i === 0) u.onstart = () => setSpeaking(true);
        if (i === syllables.length - 1) u.onend = () => setSpeaking(false);
        setTimeout(() => window.speechSynthesis.speak(u), 0);
      });
    },
    [supported]
  );

  // Beim Unmount alles stoppen.
  useEffect(
    () => () => {
      if (supported) window.speechSynthesis.cancel();
    },
    [supported]
  );

  return { supported, voices, speaking, speak, speakSyllables, cancel, unlock };
}
