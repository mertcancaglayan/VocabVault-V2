import React, { createContext, useEffect, useState } from "react";
import type { GameMode } from "../data/gameModes";
import { type WordItem, type Subcategory } from "../api/api";


interface LanguagePair {
    from: string;
    to: string;
}

export interface ResultI {
    id: string;
    question: string;
    selected: string;
    correct: string;
    isCorrect: boolean;
}

interface AppContextType {
    languagePair: LanguagePair | null;
    setLanguagePair: React.Dispatch<React.SetStateAction<LanguagePair | null>>;
    category: Subcategory | null;
    setCategory: React.Dispatch<React.SetStateAction<Subcategory | null>>;
    gameMode: GameMode | null;
    setGameMode: React.Dispatch<React.SetStateAction<GameMode | null>>;
    selectedWords: WordItem[];
    setSelectedWords: React.Dispatch<React.SetStateAction<WordItem[]>>
    results: ResultI[];
    setResults: React.Dispatch<React.SetStateAction<ResultI[]>>
    currentSlideIndex: number;
    setCurrentSlideIndex: React.Dispatch<React.SetStateAction<number>>;
    totalQuestions: number;
    setTotalQuestions: React.Dispatch<React.SetStateAction<number>>
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [languagePair, setLanguagePair] = useState<LanguagePair | null>(null);
    const [category, setCategory] = useState<Subcategory | null>(null)
    const [gameMode, setGameMode] = useState<GameMode | null>(null)
    const [selectedWords, setSelectedWords] = useState<WordItem[]>([]);
    const [results, setResults] = useState<ResultI[]>([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);

    useEffect(() => {
        let fromLang: string | null = localStorage.getItem("wordvault2_fromLang");
        let toLang: string | null = localStorage.getItem("wordvault2_toLang");

        if (!fromLang) {
            fromLang = navigator.language
        }
        if (!toLang) {
            toLang = "en"
        }

        setLanguagePair({ from: fromLang, to: toLang })


        localStorage.setItem("wordvault2_fromLang", fromLang);
        localStorage.setItem("wordvault2_toLang", toLang);


    }, [])

    return (
        <AppContext.Provider value={{ languagePair, setLanguagePair, category, setCategory, gameMode, setGameMode, selectedWords, setSelectedWords, results, setResults, totalQuestions, setTotalQuestions, currentSlideIndex, setCurrentSlideIndex }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;
