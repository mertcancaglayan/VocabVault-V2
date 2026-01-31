import React, { createContext, useState } from 'react'
import type { Word } from '../models/models';

interface AppContextType {
    isEditModalOpen: boolean;
    setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalWord: Word | undefined;
    setModalWord: React.Dispatch<React.SetStateAction<Word | undefined>>;
    shouldRefresh: boolean;
    setShouldRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    totalFilteredWord: number;
    setTotalFilteredWord: React.Dispatch<React.SetStateAction<number>>;
    categories: Map<string, string>;
    setCategories: React.Dispatch<React.SetStateAction<Map<string, string>>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined)


export function AppProvider({ children }: { children: React.ReactNode }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [modalWord, setModalWord] = useState<Word>()
    const [shouldRefresh, setShouldRefresh] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [totalFilteredWord, setTotalFilteredWord] = useState<number>(0)
    const [categories, setCategories] = useState<Map<string, string>>(
        new Map()
    );
    const contextValue = {
        isEditModalOpen, setIsEditModalOpen, modalWord, setModalWord
        , shouldRefresh, setShouldRefresh, searchQuery, setSearchQuery, totalFilteredWord, setTotalFilteredWord, categories, setCategories
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
