import { Station, UserProgress } from './types';
import { KLASSE_1 } from './content/klasse1';
import { KLASSE_2 } from './content/klasse2';
import { KLASSE_3 } from './content/klasse3';
import { KLASSE_4 } from './content/klasse4';

export const INITIAL_PROGRESS: UserProgress = {
  anonymousId: '',
  childName: '',
  avatarId: '',
  avatarColor: '',
  completedStations: [],
  starsCount: 0,
  stationTrophies: {},
  score: 0
};

export const STATIONEN: Station[] = [
  ...KLASSE_1,
  ...KLASSE_2,
  ...KLASSE_3,
  ...KLASSE_4
];

export const CHARACTER_AVATARS = [
  { id: 'dragon', name: 'Lumi (Drache)', emoji: '🐉', color: 'bg-emerald-100 border-emerald-300 text-emerald-700' },
  { id: 'unicorn', name: 'Sternchen (Einhorn)', emoji: '🦄', color: 'bg-pink-100 border-pink-300 text-pink-700' },
  { id: 'owl', name: 'Olli (Eule)', emoji: '🦉', color: 'bg-amber-100 border-amber-300 text-amber-700' },
  { id: 'rocket', name: 'Kosmo (Rakete)', emoji: '🚀', color: 'bg-blue-100 border-blue-300 text-blue-700' },
  { id: 'fox', name: 'Foxy (Fuchs)', emoji: '🦊', color: 'bg-orange-100 border-orange-300 text-orange-700' },
  { id: 'frog', name: 'Quaki (Frosch)', emoji: '🐸', color: 'bg-green-100 border-green-300 text-green-700' },
];
