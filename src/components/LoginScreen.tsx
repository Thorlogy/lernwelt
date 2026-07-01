import React, { useState } from 'react';
import { Play, Sparkles, AlertCircle, X, Volume2 } from 'lucide-react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { playPop, playSuccess, playFailure } from '../utils/audio';
import { useSpeech } from '../lib/useSpeech';
import welcomeHero from '../assets/welcome-hero.jpg';

const EMOJIS = ['🐶', '🐱', '🐭', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯'];

interface LoginScreenProps {
  onLoginSuccess: (uid: string, name: string) => void;
  onCancel: () => void;
}

export default function LoginScreen({ onLoginSuccess, onCancel }: LoginScreenProps) {
  const [name, setName] = useState('');
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { speak } = useSpeech();

  const handleEmojiClick = (emoji: string) => {
    playPop();
    setError('');
    if (selectedEmojis.length < 3) {
      setSelectedEmojis([...selectedEmojis, emoji]);
    }
  };

  const handleRemoveEmoji = (index: number) => {
    playPop();
    const newEmojis = [...selectedEmojis];
    newEmojis.splice(index, 1);
    setSelectedEmojis(newEmojis);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Bitte gib deinen Namen ein!');
      playFailure();
      return;
    }
    if (selectedEmojis.length !== 3) {
      setError('Bitte wähle genau 3 geheime Bilder aus!');
      playFailure();
      return;
    }

    setLoading(true);
    setError('');

    // Sanitize name for email formatting (lowercase, no spaces, strict alphanumeric)
    const safeName = name.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (safeName.length < 2) {
      setError('Dein Name muss mindestens 2 Buchstaben haben.');
      setLoading(false);
      playFailure();
      return;
    }

    const email = `${safeName}@lernwelt.local`;
    const password = `${selectedEmojis.join('')}-geheim123`; // Requires 6+ chars

    try {
      // 1. Try to login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      playSuccess();
      onLoginSuccess(userCredential.user.uid, name.trim());
    } catch (err: any) {
      // 2. If user doesn't exist, create account
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        try {
          const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
          playSuccess();
          onLoginSuccess(newUserCredential.user.uid, name.trim());
        } catch (createErr: any) {
          console.error('Registration error:', createErr);
          setError('Ups, das Passwort war leider falsch. Versuche es nochmal!');
          playFailure();
          setSelectedEmojis([]);
        }
      } else {
        console.error('Login error:', err);
        setError('Ein Fehler ist aufgetreten. Bitte versuche es später.');
        playFailure();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
      <button 
        onClick={onCancel}
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10 bg-white/80 rounded-full p-1"
      >
        <X size={28} />
      </button>

      <div className="mb-6 -mt-2 sm:-mt-4">
        <img 
          src={welcomeHero} 
          alt="Lernwelt Kinder" 
          className="w-full h-48 sm:h-56 object-cover rounded-2xl shadow-inner border-4 border-sky-100"
        />
      </div>

      <div className="text-center mb-8 relative">
        <h2 className="text-3xl font-black text-[#00639a] mb-2 font-sans tracking-tight">Anmelden</h2>
        <div className="flex items-center justify-center gap-3">
          <p className="text-slate-500 font-bold cursor-pointer hover:text-slate-700" onClick={() => speak("Gib deinen Namen ein und wähle deinen 3-Bilder-Code!")}>
            Gib deinen Namen ein und wähle deinen 3-Bilder-Code!
          </p>
          <button 
            type="button"
            onClick={() => speak("Gib deinen Namen ein und wähle deinen 3-Bilder-Code!")}
            className="bg-sky-100 hover:bg-sky-200 text-[#00639a] p-2 rounded-full transition-transform hover:scale-110 shadow-sm shrink-0"
            title="Vorlesen lassen"
          >
            <Volume2 size={20} />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-[#00639a] font-bold text-lg">Wie heißt du?</label>
            <button type="button" onClick={() => speak("Wie heißt du?")} className="text-[#00639a] hover:scale-110 transition-transform bg-sky-50 hover:bg-sky-100 p-2 rounded-full shrink-0">
              <Volume2 size={20} />
            </button>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            className="w-full text-2xl font-black px-4 py-3 rounded-2xl border-4 border-sky-100 focus:border-[#00639a] focus:ring-0 transition-colors bg-sky-50 outline-none text-slate-800"
            placeholder="Dein Vorname"
            maxLength={15}
            disabled={loading}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-[#00639a] font-bold text-lg">Dein geheimer Bilder-Code:</label>
            <button type="button" onClick={() => speak("Dein geheimer Bilder-Code:")} className="text-[#00639a] hover:scale-110 transition-transform bg-sky-50 hover:bg-sky-100 p-2 rounded-full shrink-0">
              <Volume2 size={20} />
            </button>
          </div>
          
          {/* Selected Emojis Display */}
          <div className="flex justify-center gap-4 mb-4">
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                onClick={() => selectedEmojis[i] && handleRemoveEmoji(i)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-4 flex items-center justify-center text-3xl sm:text-4xl transition-all ${
                  selectedEmojis[i] 
                    ? 'border-[#00639a] bg-sky-50 cursor-pointer hover:bg-sky-100 shadow-md transform hover:scale-105' 
                    : 'border-dashed border-slate-200 bg-slate-50'
                }`}
              >
                {selectedEmojis[i] || ''}
              </div>
            ))}
          </div>

          {/* Emoji Picker Grid */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border-2 border-slate-100">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                disabled={loading || selectedEmojis.length >= 3}
                onClick={() => handleEmojiClick(emoji)}
                className="aspect-square bg-white rounded-xl text-4xl shadow-sm border-2 border-slate-200 hover:border-[#00639a] hover:bg-sky-50 hover:-translate-y-1 transition-all flex items-center justify-center disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:border-slate-200 disabled:cursor-not-allowed"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-rose-500 bg-rose-50 p-3 rounded-xl font-bold animate-shake">
            <AlertCircle className="shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#00639a] hover:bg-sky-700 text-white font-black text-2xl py-4 px-6 rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-[0_6px_0_#004770] hover:shadow-[0_4px_0_#004770] hover:translate-y-[2px] active:shadow-none active:translate-y-[6px] flex items-center justify-center gap-3 disabled:opacity-70 disabled:pointer-events-none"
        >
          {loading ? (
            <span className="animate-pulse">Lädt...</span>
          ) : (
            <>
              <Sparkles className="fill-white" />
              <span>Los geht's!</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
