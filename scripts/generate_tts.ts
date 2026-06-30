import fs from 'fs';
import path from 'path';
import * as googleTTS from 'google-tts-api';
import { STATIONEN } from '../src/data';

const AUDIO_DIR = path.join(process.cwd(), 'public', 'audio', 'tts');

// Ensure directory exists
if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

export function generateFilename(text: string): string {
  // Same slugify logic to be used in the hook
  let clean = text.toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_');
  
  if (clean.endsWith('_')) clean = clean.slice(0, -1);
  if (clean.startsWith('_')) clean = clean.slice(1);
  
  // Truncate if too long and append hash to avoid collisions if truncated
  if (clean.length > 50) {
    const hash = Buffer.from(text).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 8);
    clean = clean.substring(0, 40) + '_' + hash;
  }
  
  return `${clean}.mp3`;
}

async function downloadTTS(text: string, filename: string) {
  const filepath = path.join(AUDIO_DIR, filename);
  if (fs.existsSync(filepath)) {
    console.log(`Skipping (already exists): ${filename}`);
    return;
  }

  try {
    const url = googleTTS.getAudioUrl(text, {
      lang: 'de',
      slow: false,
      host: 'https://translate.google.com',
    });

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
    console.log(`✅ Downloaded: ${filename} ("${text.substring(0,30)}...")`);
  } catch (error) {
    console.error(`❌ Error downloading "${text}":`, error);
  }
  
  // Small delay to avoid rate limits
  await new Promise(res => setTimeout(res, 300));
}

async function run() {
  const uniqueTexts = new Set<string>();

  // Extract all text
  for (const station of STATIONEN) {
    for (const ex of station.exercises) {
      // Add question
      if (ex.question) uniqueTexts.add(ex.question);
      
      // Add target word
      if ((ex as any).word) uniqueTexts.add((ex as any).word);

      // Add options (for Generic Quiz)
      if ((ex as any).options) {
        for (const opt of (ex as any).options) {
          uniqueTexts.add(opt.toString());
        }
      }

      // Syllables: if correctAnswer is an array, we need the "slow" comma-separated version
      if (Array.isArray(ex.correctAnswer)) {
        const syllableString = ex.correctAnswer.join(', ');
        uniqueTexts.add(syllableString);
      }
    }
  }

  console.log(`Found ${uniqueTexts.size} unique texts. Generating audio...`);

  for (const text of uniqueTexts) {
    if (!text.trim()) continue;
    const filename = generateFilename(text);
    await downloadTTS(text, filename);
  }

  console.log('Done!');
}

run();
