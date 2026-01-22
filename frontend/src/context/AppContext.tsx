import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { GameMode } from "../data/gameModes";
import type { allowedLangs, LanguagePair, ResultI, Subcategory, WordItem } from "../models/models";

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
    setTotalQuestions: React.Dispatch<React.SetStateAction<number>>;
    updateLanguage: (params: { fromLang: allowedLangs; toLang: allowedLangs }) => void;
    difficulty: string;
    setDifficulty: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [languagePair, setLanguagePair] = useState<LanguagePair | null>(null);
    const [difficulty, setDifficulty] = useState<string>("random");
    const [category, setCategory] = useState<Subcategory | null>(null)
    const [gameMode, setGameMode] = useState<GameMode | null>(null)
    const [selectedWords, setSelectedWords] = useState<WordItem[]>([]);
    const [results, setResults] = useState<ResultI[]>([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);


    const updateLanguage = useCallback(({ fromLang, toLang }: { fromLang: allowedLangs; toLang: allowedLangs }) => {
        setLanguagePair({ from: fromLang, to: toLang });
        localStorage.setItem("wordvault2_fromLang", fromLang);
        localStorage.setItem("wordvault2_toLang", toLang);
    }, []);

    useEffect(() => {
        const storedFrom = localStorage.getItem("wordvault2_fromLang") as allowedLangs | null;
        const storedTo = localStorage.getItem("wordvault2_toLang") as allowedLangs | null;

        const fromLang = storedFrom || (navigator.language.split("-")[0] as allowedLangs);
        const toLang = storedTo || "en";

        updateLanguage({ fromLang, toLang });
    }, [updateLanguage]);

    const contextValue = useMemo(() => ({
        languagePair,
        setLanguagePair,
        category,
        setCategory,
        gameMode,
        setGameMode,
        selectedWords,
        setSelectedWords,
        results,
        setResults,
        totalQuestions,
        setTotalQuestions,
        currentSlideIndex,
        setCurrentSlideIndex,
        updateLanguage,
        difficulty,
        setDifficulty,
    }), [languagePair, category, gameMode, selectedWords, results, totalQuestions, currentSlideIndex, updateLanguage, difficulty]);


    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;
