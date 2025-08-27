"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type GameContextType = {
    gamePrompt: string;
    setGamePrompt: (data: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function AppProvider({children} : {children : ReactNode}) {
    const [gamePrompt, setGamePrompt] = useState<string>("")

    return (
        <GameContext.Provider value = {{gamePrompt, setGamePrompt}}>
            {children}
        </GameContext.Provider>
    );
}

export function useAppContext() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useAppContext must be inside AppProvider");
  return context;
}