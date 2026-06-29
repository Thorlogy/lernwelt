// Web Audio API Synthesizer for kid-friendly playful sound effects.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  // Resume context if suspended (browser security blocks audio until first click)
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playPop() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.08);
}

export function playSuccess() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Major Arpeggio)

  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + index * 0.08);

    gain.gain.setValueAtTime(0.0, now + index * 0.08);
    gain.gain.linearRampToValueAtTime(0.12, now + index * 0.08 + 0.02);
    gain.gain.linearRampToValueAtTime(0.0, now + index * 0.08 + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + index * 0.08);
    osc.stop(now + index * 0.08 + 0.2);
  });
}

export function playFailure() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.linearRampToValueAtTime(120, now + 0.25);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.linearRampToValueAtTime(0.01, now + 0.28);

  // Simple bandpass filter to make it softer and less harsh
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(400, now);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(now + 0.3);
}

export function playTrophy() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Festive fanfare
  const arpeggio = [261.63, 329.63, 392.00, 523.25, 392.00, 523.25, 659.25, 783.99, 1046.50];
  const durations = [0.1, 0.1, 0.1, 0.15, 0.1, 0.1, 0.1, 0.1, 0.4];
  let timeAccumulator = 0;

  arpeggio.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = index === arpeggio.length - 1 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now + timeAccumulator);

    gain.gain.setValueAtTime(0.0, now + timeAccumulator);
    gain.gain.linearRampToValueAtTime(0.15, now + timeAccumulator + 0.02);
    gain.gain.linearRampToValueAtTime(0.0, now + timeAccumulator + durations[index]);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + timeAccumulator);
    osc.stop(now + timeAccumulator + durations[index] + 0.05);

    timeAccumulator += durations[index] * 0.8;
  });
}
