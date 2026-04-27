export type TechCategory = "formFactor" | "color" | "ram" | "storage";

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

  // Color (Warna / Grafis)
  { id: "col_bw", category: "color", name: "Hitam Putih (Pong-style)", cost: 2000, time: 15, techScore: 2, yearAvailable: 1970 },
  { id: "col_4", category: "color", name: "Grafis 4 Warna", cost: 8000, time: 30, techScore: 5, yearAvailable: 1975 },
  { id: "col_16", category: "color", name: "Grafis 16 Warna", cost: 25000, time: 60, techScore: 8, yearAvailable: 1977 },

  // RAM
  { id: "ram_discrete", category: "ram", name: "Logika Diskrit (Tanpa RAM)", cost: 500, time: 10, techScore: 1, yearAvailable: 1970 },
  { id: "ram_128b", category: "ram", name: "128 Bytes RAM", cost: 5000, time: 25, techScore: 4, yearAvailable: 1975 },
  { id: "ram_1kb", category: "ram", name: "1 KB RAM", cost: 15000, time: 45, techScore: 7, yearAvailable: 1977 },

  // Storage / Media Penyimpanan
  { id: "stor_builtin", category: "storage", name: "Game Terpadu (Built-in)", cost: 1000, time: 10, techScore: 2, yearAvailable: 1970 },
  { id: "stor_cart", category: "storage", name: "Sistem Kartrid ROM", cost: 12000, time: 40, techScore: 7, yearAvailable: 1976 },
];

export interface CustomCPU {
  id: string;
  name: string;
  architecture: "TTL" | "8-bit";
  clockSpeed: number; // in MHz
  costToDevelop: number;
  timeToDevelop: number;
  techScore: number;
}
