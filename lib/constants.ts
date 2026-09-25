export interface Chapter {
  id: string;
  number: string;
  kanji: string;
  title: string;
  subtitle: string;
  quote: string;
  startProgress: number;
  endProgress: number;
  targetFrame: number;
}

export const TOTAL_FRAMES = 300;
export const FRAME_ASPECT_RATIO = 16 / 9;

export const CHAPTERS: Chapter[] = [
  {
    id: "stance",
    number: "I",
    kanji: "鬼気",
    title: "THE SWORDSMAN",
    subtitle: "A solitary vow carved into steel",
    quote: "There is someone I must meet again. And until that day, not even Death himself will take my blade.",
    startProgress: 0.0,
    endProgress: 0.18,
    targetFrame: 1,
  },
  {
    id: "santoryu",
    number: "II",
    kanji: "三刀流",
    title: "THREE SWORDS. ONE PATH.",
    subtitle: "Wado Ichimonji · Sandai Kitetsu · Enma",
    quote: "When the world shoves you around, you just have to stand up and shove back.",
    startProgress: 0.18,
    endProgress: 0.42,
    targetFrame: 65,
  },
  {
    id: "discipline",
    number: "III",
    kanji: "閻魔",
    title: "BREATH OF ALL THINGS",
    subtitle: "Awakening the conqueror's spirit",
    quote: "A sword that cuts steel will spare a leaf of paper if the master wills it.",
    startProgress: 0.42,
    endProgress: 0.65,
    targetFrame: 145,
  },
  {
    id: "impact",
    number: "IV",
    kanji: "閻王三刀流",
    title: "KING OF HELL",
    subtitle: "En-Ō Santoryu · Dragon Damnation",
    quote: "I swore an oath to my captain and to Kuina. I will never lose again.",
    startProgress: 0.65,
    endProgress: 0.84,
    targetFrame: 220,
  },
  {
    id: "legacy",
    number: "V",
    kanji: "剣豪",
    title: "RORONOA ZORO",
    subtitle: "Master of Three Swords · King of Hell",
    quote: "I'm going to be the world's greatest swordsman! All I have left is my destiny.",
    startProgress: 0.84,
    endProgress: 1.0,
    targetFrame: 275,
  },
];

