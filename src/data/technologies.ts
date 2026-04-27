export type TechCategory = "formFactor" | "color" | "ram" | "storage" | "audio" | "controller" | "media" | "fabrication";

export interface Technology {
  id: string;
  category: TechCategory;
  name: string;
  cost: number;
  time: number; // days
  techScore: number; // 1-10 used to calculate star rating
  yearAvailable: number;
}

export const TECHNOLOGIES: Technology[] = [
  // Form Factor (Bentuk)
  { id: "ff_box", category: "formFactor", name: "Kotak Kayu Kaku", cost: 1000, time: 10, techScore: 1, yearAvailable: 1970 },
  { id: "ff_plastic", category: "formFactor", name: "Cangkang Plastik Dasar", cost: 3000, time: 20, techScore: 3, yearAvailable: 1974 },
  { id: "ff_sleek", category: "formFactor", name: "Desain Ergonomis", cost: 10000, time: 40, techScore: 6, yearAvailable: 1978 },
  { id: "ff_compact", category: "formFactor", name: "Desain Kompak Mikro", cost: 25000, time: 55, techScore: 8, yearAvailable: 1982 },

  // Color (Warna / Grafis)
  { id: "col_bw", category: "color", name: "Hitam Putih (Pong-style)", cost: 2000, time: 15, techScore: 2, yearAvailable: 1970 },
  { id: "col_4", category: "color", name: "Grafis 4 Warna", cost: 8000, time: 30, techScore: 5, yearAvailable: 1975 },
  { id: "col_16", category: "color", name: "Grafis 16 Warna", cost: 25000, time: 60, techScore: 8, yearAvailable: 1977 },
  { id: "col_64", category: "color", name: "Grafis 64 Warna (Sprite Engine)", cost: 65000, time: 90, techScore: 12, yearAvailable: 1981 },

  // RAM
  { id: "ram_discrete", category: "ram", name: "Logika Diskrit (Tanpa RAM)", cost: 500, time: 10, techScore: 1, yearAvailable: 1970 },
  { id: "ram_128b", category: "ram", name: "128 Bytes RAM", cost: 5000, time: 25, techScore: 4, yearAvailable: 1974 },
  { id: "ram_1kb", category: "ram", name: "1 KB RAM", cost: 15000, time: 45, techScore: 7, yearAvailable: 1977 },
  { id: "ram_8kb", category: "ram", name: "8 KB RAM", cost: 40000, time: 70, techScore: 10, yearAvailable: 1980 },

  // Storage / Media Penyimpanan
  { id: "stor_builtin", category: "storage", name: "Game Terpadu (Built-in)", cost: 1000, time: 10, techScore: 2, yearAvailable: 1970 },
  { id: "stor_cart", category: "storage", name: "Sistem Kartrid ROM (2KB)", cost: 12000, time: 40, techScore: 6, yearAvailable: 1976 },
  { id: "stor_cart_adv", category: "storage", name: "Kartrid Memori Besar (16KB+)", cost: 35000, time: 70, techScore: 10, yearAvailable: 1980 },

  // Audio (Suara)
  { id: "aud_none", category: "audio", name: "Tanpa Suara", cost: 0, time: 0, techScore: 0, yearAvailable: 1970 },
  { id: "aud_beep", category: "audio", name: "Speaker Bip Tunggal", cost: 2500, time: 15, techScore: 2, yearAvailable: 1972 },
  { id: "aud_psg3", category: "audio", name: "PSG 3-Saluran (Chiptune)", cost: 15000, time: 45, techScore: 7, yearAvailable: 1978 },
  { id: "aud_fm", category: "audio", name: "Sintesis FM Dasar", cost: 45000, time: 80, techScore: 11, yearAvailable: 1982 },

  // Controller (Input)
  { id: "ctrl_dial", category: "controller", name: "Knob Putar (Paddle)", cost: 1500, time: 10, techScore: 2, yearAvailable: 1970 },
  { id: "ctrl_joy1", category: "controller", name: "Joystick 1 Tombol", cost: 6000, time: 25, techScore: 5, yearAvailable: 1976 },
  { id: "ctrl_dpad", category: "controller", name: "D-Pad Geometri (Paten)", cost: 25000, time: 50, techScore: 9, yearAvailable: 1981 },

  // Media Ekstra (Bonus Paket)
  { id: "med_none", category: "media", name: "Hanya Konsol", cost: 0, time: 0, techScore: 0, yearAvailable: 1970 },
  { id: "med_manual", category: "media", name: "Buku Panduan Berwarna", cost: 4000, time: 15, techScore: 2, yearAvailable: 1975 },
  { id: "med_packin", category: "media", name: "Game 'Pack-In' Terbaik", cost: 15000, time: 30, techScore: 5, yearAvailable: 1977 },

  // Fabrication Size for CPU (Ukuran Fabrikasi)
  { id: "fab_10um", category: "fabrication", name: "Litografi 10 µm", cost: 5000, time: 20, techScore: 2, yearAvailable: 1970 },
  { id: "fab_6um", category: "fabrication", name: "Litografi 6 µm", cost: 18000, time: 40, techScore: 5, yearAvailable: 1974 },
  { id: "fab_3um", category: "fabrication", name: "Litografi 3 µm (NMOS)", cost: 45000, time: 70, techScore: 9, yearAvailable: 1979 },
];

export interface CustomCPU {
  id: string;
  name: string;
  architecture: "TTL" | "8-bit";
  instructionSet: "Efisien" | "Seimbang" | "Performa";
  fabricationId: string; // references TECHNOLOGIES item
  clockSpeed: number; // in MHz
  costToDevelop: number;
  timeToDevelop: number;
  techScore: number;
  isBuggy: boolean; // if true, needs revision
}
