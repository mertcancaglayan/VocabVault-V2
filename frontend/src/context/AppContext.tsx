import { createContext, useEffect, useState } from "react";
import type { GameMode } from "../data/gameModes";
import type { Subcategory } from "../api/api";


interface LanguagePair {
    from: string;
    to: string;
}

interface AppContextType {
    languagePair: LanguagePair | null;
    setLanguagePair: React.Dispatch<React.SetStateAction<LanguagePair | null>>;
    category: Subcategory | null;
    setCategory: React.Dispatch<React.SetStateAction<Subcategory | null>>;
    gameMode: GameMode | null;
    setGameMode: React.Dispatch<React.SetStateAction<GameMode | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [languagePair, setLanguagePair] = useState<LanguagePair | null>(null);
    const [category, setCategory] = useState<Subcategory | null>(null)
    const [gameMode, setGameMode] = useState<GameMode | null>(null)

    useEffect(() => {
        let fromLang: string | null = localStorage.getItem("wordvault_fromLang");
        let toLang: string | null = localStorage.getItem("wordvault_toLang");

        if (!fromLang) {
            fromLang = navigator.language
            console.log(fromLang);

        }
        if (!toLang) {
            toLang = "en"
        }

        setLanguagePair({ from: fromLang, to: toLang })

        localStorage.setItem("wordvault_fromLang", fromLang);
        localStorage.setItem("wordvault_toLang", toLang);


    }, [])

    return (
        <AppContext.Provider value={{ languagePair, setLanguagePair, category, setCategory, gameMode, setGameMode }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;
