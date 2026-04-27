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
  // --- Form Factor (Bentuk) ---
  { id: "ff_box", category: "formFactor", name: "Kotak Kayu Kaku", cost: 1000, time: 10, techScore: 1, yearAvailable: 1970 },
  { id: "ff_plastic", category: "formFactor", name: "Cangkang Plastik Dasar", cost: 3000, time: 20, techScore: 3, yearAvailable: 1974 },
  { id: "ff_sleek", category: "formFactor", name: "Desain Ergonomis", cost: 10000, time: 40, techScore: 6, yearAvailable: 1978 },
  { id: "ff_compact", category: "formFactor", name: "Desain Kompak Mikro", cost: 25000, time: 55, techScore: 8, yearAvailable: 1982 },
  { id: "ff_tower", category: "formFactor", name: "Tower Multimedia Modern", cost: 60000, time: 70, techScore: 12, yearAvailable: 1993 },
  { id: "ff_slim", category: "formFactor", name: "Desain Super Ramping (Slimline)", cost: 120000, time: 90, techScore: 16, yearAvailable: 2000 },
  { id: "ff_hybrid", category: "formFactor", name: "Hibrida (Bisa Dibawa/Docking)", cost: 300000, time: 120, techScore: 22, yearAvailable: 2015 },

  // --- Color (Warna / Grafis) ---
  { id: "col_bw", category: "color", name: "Hitam Putih (Pong-style)", cost: 2000, time: 15, techScore: 2, yearAvailable: 1970 },
  { id: "col_4", category: "color", name: "Grafis 4 Warna", cost: 8000, time: 30, techScore: 5, yearAvailable: 1975 },
  { id: "col_16", category: "color", name: "Grafis 16 Warna", cost: 25000, time: 60, techScore: 8, yearAvailable: 1977 },
  { id: "col_64", category: "color", name: "Grafis 64 Warna (Sprite Engine)", cost: 65000, time: 90, techScore: 12, yearAvailable: 1981 },
  { id: "col_16bit", category: "color", name: "Ribuan Warna (16-bit Era)", cost: 150000, time: 120, techScore: 18, yearAvailable: 1988 },
  { id: "col_3d_basic", category: "color", name: "Akselerator 3D Dasar (Poligon)", cost: 350000, time: 150, techScore: 25, yearAvailable: 1994 },
  { id: "col_3d_hd", category: "color", name: "Grafis HD (High Definition)", cost: 800000, time: 200, techScore: 35, yearAvailable: 2005 },
  { id: "col_4k_rt", category: "color", name: "Grafis 4K & Ray Tracing", cost: 2500000, time: 300, techScore: 50, yearAvailable: 2018 },

  // --- RAM ---
  { id: "ram_discrete", category: "ram", name: "Logika Diskrit (Tanpa RAM)", cost: 500, time: 10, techScore: 1, yearAvailable: 1970 },
  { id: "ram_128b", category: "ram", name: "128 Bytes RAM", cost: 5000, time: 25, techScore: 4, yearAvailable: 1974 },
  { id: "ram_1kb", category: "ram", name: "1 KB RAM", cost: 15000, time: 45, techScore: 7, yearAvailable: 1977 },
  { id: "ram_8kb", category: "ram", name: "8 KB RAM", cost: 40000, time: 70, techScore: 10, yearAvailable: 1980 },
  { id: "ram_1mb", category: "ram", name: "1 Megabyte RAM", cost: 100000, time: 100, techScore: 15, yearAvailable: 1989 },
  { id: "ram_32mb", category: "ram", name: "32 Megabytes RAM (SDRAM)", cost: 250000, time: 130, techScore: 20, yearAvailable: 1995 },
  { id: "ram_512mb", category: "ram", name: "512 MB GDDR3 Unified RAM", cost: 600000, time: 180, techScore: 28, yearAvailable: 2005 },
  { id: "ram_16gb", category: "ram", name: "16 GB GDDR6 RAM", cost: 1800000, time: 250, techScore: 40, yearAvailable: 2019 },

  // --- Storage / Media Penyimpanan ---
  { id: "stor_builtin", category: "storage", name: "Game Terpadu (Built-in)", cost: 1000, time: 10, techScore: 2, yearAvailable: 1970 },
  { id: "stor_cart", category: "storage", name: "Sistem Kartrid ROM (2KB)", cost: 12000, time: 40, techScore: 6, yearAvailable: 1976 },
  { id: "stor_cart_adv", category: "storage", name: "Kartrid Memori Besar (16KB+)", cost: 35000, time: 70, techScore: 10, yearAvailable: 1980 },
  { id: "stor_cd", category: "storage", name: "Sistem CD-ROM (650MB)", cost: 180000, time: 130, techScore: 18, yearAvailable: 1991 },
  { id: "stor_dvd", category: "storage", name: "Sistem DVD-ROM (4.7GB)", cost: 400000, time: 160, techScore: 25, yearAvailable: 1999 },
  { id: "stor_bluray", category: "storage", name: "Sistem Blu-ray (50GB)", cost: 900000, time: 210, techScore: 32, yearAvailable: 2006 },
  { id: "stor_nvme", category: "storage", name: "Penyimpanan SSD NVMe (M.2)", cost: 2000000, time: 280, techScore: 45, yearAvailable: 2020 },

  // --- Audio (Suara) ---
  { id: "aud_none", category: "audio", name: "Tanpa Suara", cost: 0, time: 0, techScore: 0, yearAvailable: 1970 },
  { id: "aud_beep", category: "audio", name: "Speaker Bip Tunggal", cost: 2500, time: 15, techScore: 2, yearAvailable: 1972 },
  { id: "aud_psg3", category: "audio", name: "PSG 3-Saluran (Chiptune)", cost: 15000, time: 45, techScore: 7, yearAvailable: 1978 },
  { id: "aud_fm", category: "audio", name: "Sintesis FM Dasar", cost: 45000, time: 80, techScore: 11, yearAvailable: 1982 },
  { id: "aud_pcm", category: "audio", name: "Audio Sampling PCM (16-bit)", cost: 120000, time: 110, techScore: 16, yearAvailable: 1989 },
  { id: "aud_surround", category: "audio", name: "Sistem Suara Surround (5.1)", cost: 300000, time: 150, techScore: 23, yearAvailable: 1998 },
  { id: "aud_3d", category: "audio", name: "Audio 3D Spasial Presisi Tinggi", cost: 800000, time: 220, techScore: 32, yearAvailable: 2018 },

  // --- Controller (Input) ---
  { id: "ctrl_dial", category: "controller", name: "Knob Putar (Paddle)", cost: 1500, time: 10, techScore: 2, yearAvailable: 1970 },
  { id: "ctrl_joy1", category: "controller", name: "Joystick 1 Tombol", cost: 6000, time: 25, techScore: 5, yearAvailable: 1976 },
  { id: "ctrl_dpad", category: "controller", name: "D-Pad Geometri (Paten)", cost: 25000, time: 50, techScore: 9, yearAvailable: 1981 },
  { id: "ctrl_shoulder", category: "controller", name: "Kontroler Multi-Tombol & Bumper", cost: 75000, time: 90, techScore: 14, yearAvailable: 1989 },
  { id: "ctrl_analog", category: "controller", name: "Stik Analog & Getar (Rumble)", cost: 180000, time: 130, techScore: 20, yearAvailable: 1996 },
  { id: "ctrl_wireless", category: "controller", name: "Kontroler Nirkabel Standar (Bluetooth)", cost: 400000, time: 180, techScore: 26, yearAvailable: 2005 },
  { id: "ctrl_haptic", category: "controller", name: "Umpan Balik Haptic Dinamis", cost: 1200000, time: 260, techScore: 38, yearAvailable: 2020 },

  // --- Media Ekstra (Bonus Paket) ---
  { id: "med_none", category: "media", name: "Hanya Konsol", cost: 0, time: 0, techScore: 0, yearAvailable: 1970 },
  { id: "med_manual", category: "media", name: "Buku Panduan Berwarna", cost: 4000, time: 15, techScore: 2, yearAvailable: 1975 },
  { id: "med_packin", category: "media", name: "Game 'Pack-In' Terbaik", cost: 15000, time: 30, techScore: 5, yearAvailable: 1977 },
  { id: "med_demo", category: "media", name: "Cakram Demo Kumpulan Game", cost: 35000, time: 50, techScore: 8, yearAvailable: 1994 },
  { id: "med_online", category: "media", name: "Voucher Layanan Online 3 Bulan", cost: 90000, time: 80, techScore: 12, yearAvailable: 2005 },
  { id: "med_digital", category: "media", name: "Bundel Game Digital Edisi Lengkap", cost: 200000, time: 120, techScore: 16, yearAvailable: 2013 },

  // --- Fabrication Size for CPU (Ukuran Fabrikasi) ---
  { id: "fab_10um", category: "fabrication", name: "Litografi 10 µm", cost: 5000, time: 20, techScore: 2, yearAvailable: 1970 },
  { id: "fab_6um", category: "fabrication", name: "Litografi 6 µm", cost: 18000, time: 40, techScore: 5, yearAvailable: 1974 },
  { id: "fab_3um", category: "fabrication", name: "Litografi 3 µm (NMOS)", cost: 45000, time: 70, techScore: 9, yearAvailable: 1979 },
  { id: "fab_1.5um", category: "fabrication", name: "Litografi 1.5 µm (CMOS)", cost: 120000, time: 110, techScore: 14, yearAvailable: 1985 },
  { id: "fab_800nm", category: "fabrication", name: "Litografi 800 nm", cost: 280000, time: 150, techScore: 20, yearAvailable: 1990 },
  { id: "fab_350nm", category: "fabrication", name: "Litografi 350 nm", cost: 650000, time: 200, techScore: 28, yearAvailable: 1995 },
  { id: "fab_130nm", category: "fabrication", name: "Litografi 130 nm", cost: 1500000, time: 260, techScore: 38, yearAvailable: 2001 },
  { id: "fab_65nm", category: "fabrication", name: "Litografi 65 nm", cost: 3500000, time: 320, techScore: 50, yearAvailable: 2005 },
  { id: "fab_28nm", category: "fabrication", name: "Litografi 28 nm", cost: 8000000, time: 400, techScore: 65, yearAvailable: 2012 },
  { id: "fab_7nm", category: "fabrication", name: "Litografi 7 nm (EUV)", cost: 20000000, time: 550, techScore: 85, yearAvailable: 2018 },
  { id: "fab_3nm", category: "fabrication", name: "Litografi 3 nm (Angstrom Era)", cost: 50000000, time: 750, techScore: 110, yearAvailable: 2024 },
];

export interface CustomCPU {
  id: string;
  name: string;
  architecture: "TTL" | "8-bit" | "16-bit" | "32-bit" | "64-bit" | "Multi-core";
  instructionSet: "Efisien" | "Seimbang" | "Performa";
  fabricationId: string; // references TECHNOLOGIES item
  clockSpeed: number; // in MHz
  costToDevelop: number;
  timeToDevelop: number;
  techScore: number;
  isBuggy: boolean; // if true, needs revision
}
