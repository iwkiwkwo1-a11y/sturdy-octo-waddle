"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface GameState {
  playerName: string;
  companyName: string;
  ability: string;
  money: number;
  gameDate: number; // Storing timestamp
  hasStarted: boolean;
}

interface GameContextType {
  gameState: GameState;
  startGame: (playerName: string, companyName: string, ability: string) => void;
  updateGameState: (updates: Partial<GameState>) => void;
  resetGame: () => void;
}

const defaultGameState: GameState = {
  playerName: '',
  companyName: '',
  ability: '',
  money: 50000, // Initial money
  gameDate: new Date('1972-01-01T00:00:00').getTime(), // Start in 1972
  hasStarted: false,
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
      setGameState((prev) => ({
        ...prev,
        gameDate: prev.gameDate + ONE_DAY_MS,
      }));
    }, 1000); // every 1 second

    return () => clearInterval(interval);
  }, [gameState.hasStarted, isLoaded]);

  const startGame = (playerName: string, companyName: string, ability: string) => {
    setGameState({
      ...defaultGameState,
      playerName,
      companyName,
      ability,
      hasStarted: true,
    });
  };

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...updates }));
  };

  const resetGame = () => {
    setGameState(defaultGameState);
  };

  // Prevent rendering children until localStorage is loaded to avoid hydration mismatch
  if (!isLoaded) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-blue-600">Loading...</div>;
  }

  return (
    <GameContext.Provider value={{ gameState, startGame, updateGameState, resetGame }}>
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
