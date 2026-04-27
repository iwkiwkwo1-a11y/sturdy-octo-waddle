"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import { CompetitorRelease, HISTORICAL_RELEASES } from '@/data/competitors';
import { CustomCPU } from '@/data/technologies';

export type TaskType = "research_part" | "develop_cpu" | "develop_console" | "production";

export interface ActiveTask {
  id: string;
  type: TaskType;
  name: string;
  startDate: number;
  endDate: number;
  payload: any; // Context-dependent payload
}

export interface ReleasedConsole {
  id: string;
  name: string;
  releaseDate: number;
  unitsProduced: number;
  starRating: number;
}

export interface GameState {
  playerName: string;
  companyName: string;
  ability: string;
  money: number;
  gameDate: number; // Storing timestamp
  hasStarted: boolean;
  unlockedParts: string[]; // IDs of unlocked parts
  customCPUs: CustomCPU[]; // Developed CPUs
  draftConsole: any | null; // Work in progress console
  releasedConsoles: ReleasedConsole[];
  competitorReleases: CompetitorRelease[];
  activeTask: ActiveTask | null;
}

interface GameContextType {
  gameState: GameState;
  startGame: (playerName: string, companyName: string, ability: string) => void;
  updateGameState: (updates: Partial<GameState>) => void;
  startTask: (task: ActiveTask, cost: number) => void;
  resetGame: () => void;
}

const defaultGameState: GameState = {
  playerName: '',
  companyName: '',
  ability: '',
  money: 50000, // Initial money
  gameDate: new Date('1972-01-01T00:00:00').getTime(), // Start in 1972
  hasStarted: false,
  unlockedParts: ["ff_box", "col_bw", "ram_discrete", "stor_builtin"], // Some basic parts start unlocked
  customCPUs: [],
  draftConsole: null,
  releasedConsoles: [],
  competitorReleases: [],
  activeTask: null,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('consoleTycoonState');
    if (savedState) {
      try {
        setGameState(JSON.parse(savedState));
      } catch (e) {
        console.error('Failed to parse saved game state');
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('consoleTycoonState', JSON.stringify(gameState));
    }
  }, [gameState, isLoaded]);

  // Handle Real-time clock (1 real second = 1 game day)
  useEffect(() => {
    if (!gameState.hasStarted || !isLoaded) return;

    const ONE_DAY_MS = 24 * 60 * 60 * 1000;

    const interval = setInterval(() => {
      setGameState((prev) => {
        let nextState = {
          ...prev,
          gameDate: prev.gameDate + ONE_DAY_MS,
        };

        // Handle Competitor Releases
        const newCompReleases = HISTORICAL_RELEASES.filter(
          (cr) => cr.releaseDate <= nextState.gameDate && !nextState.competitorReleases.find(existing => existing.id === cr.id)
        );

        if (newCompReleases.length > 0) {
          nextState = {
            ...nextState,
            competitorReleases: [...nextState.competitorReleases, ...newCompReleases]
          };
        }

        // Check if active task is completed
        if (nextState.activeTask && nextState.gameDate >= nextState.activeTask.endDate) {
          const task = nextState.activeTask;

          if (task.type === "research_part") {
            nextState = {
              ...nextState,
              unlockedParts: [...nextState.unlockedParts, task.payload.partId],
              activeTask: null,
            };
          } else if (task.type === "develop_cpu") {
            nextState = {
              ...nextState,
              customCPUs: [...nextState.customCPUs, task.payload.cpu],
              activeTask: null,
            };
          } else if (task.type === "develop_console") {
             nextState = {
               ...nextState,
               draftConsole: task.payload.consoleDraft,
               activeTask: null,
             }
          } else if (task.type === "production") {
             nextState = {
               ...nextState,
               releasedConsoles: [...nextState.releasedConsoles, task.payload.release],
               draftConsole: null,
               activeTask: null,
             }
          }
        }

        return nextState;
      });
    }, 1000); // every 1 second

    return () => clearInterval(interval);
  }, [gameState.hasStarted, isLoaded]);

  const startGame = (playerName: string, companyName: string, ability: string) => {
    let startingMoney = defaultGameState.money;
    if (ability === 'capital') {
      startingMoney += 25000;
    }

    setGameState({
      ...defaultGameState,
      playerName,
      companyName,
      ability,
      money: startingMoney,
      hasStarted: true,
    });
  };

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...updates }));
  };

  const startTask = (task: ActiveTask, cost: number) => {
    setGameState((prev) => {
      if (prev.money >= cost && !prev.activeTask) {
        return {
          ...prev,
          money: prev.money - cost,
          activeTask: task,
        };
      }
      return prev;
    });
  };

  const resetGame = () => {
    setGameState(defaultGameState);
  };

  // Prevent rendering children until localStorage is loaded to avoid hydration mismatch
  if (!isLoaded) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-blue-600">Loading...</div>;
  }

  return (
    <GameContext.Provider value={{ gameState, startGame, updateGameState, startTask, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
