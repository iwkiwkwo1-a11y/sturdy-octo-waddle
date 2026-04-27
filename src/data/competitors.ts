export interface CompetitorRelease {
  id: string;
  company: string;
  consoleName: string;
  releaseDate: number; // timestamp
  techScore: number;
}

export const HISTORICAL_RELEASES: CompetitorRelease[] = [
  {
    id: "comp_1",
    company: "Magnavox",
    consoleName: "Odyssey",
    releaseDate: new Date('1972-09-01T00:00:00').getTime(),
    techScore: 5, // Relatif thd 1972
  },
  {
    id: "comp_2",
    company: "Atari",
    consoleName: "Pong (Home Version)",
    releaseDate: new Date('1975-12-01T00:00:00').getTime(),
    techScore: 12,
  },
  {
    id: "comp_3",
    company: "Fairchild",
    consoleName: "Channel F",
    releaseDate: new Date('1976-11-01T00:00:00').getTime(),
    techScore: 18,
  },
  {
    id: "comp_4",
    company: "Atari",
    consoleName: "Video Computer System (2600)",
    releaseDate: new Date('1977-09-11T00:00:00').getTime(),
    techScore: 25,
  }
];
