import React, { createContext, useState } from 'react'
import type { Word } from '../models/models';

interface AppContextType {
    isEditModalOpen: boolean;
    setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isViewModalOpen: boolean;
    setIsViewModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalWord: Word | undefined;
    setModalWord: React.Dispatch<React.SetStateAction<Word | undefined>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    totalFilteredWord: number;
    setTotalFilteredWord: React.Dispatch<React.SetStateAction<number>>;
    categories: Map<string, string>;
    setCategories: React.Dispatch<React.SetStateAction<Map<string, string>>>;
    totalCategories: number;
    setTotalCategories: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    pageCount: number;
    setPageCount: React.Dispatch<React.SetStateAction<number>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined)


export function AppProvider({ children }: { children: React.ReactNode }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [modalWord, setModalWord] = useState<Word>()
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [totalFilteredWord, setTotalFilteredWord] = useState<number>(0)
    const [categories, setCategories] = useState<Map<string, string>>(
        new Map()
    );
    const [totalCategories, setTotalCategories] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [pageCount, setPageCount] = useState<number>(0)


    const contextValue = {
        isEditModalOpen, setIsEditModalOpen, modalWord, setModalWord, searchQuery, setSearchQuery, totalFilteredWord, setTotalFilteredWord, categories, setCategories, totalCategories, setTotalCategories, isViewModalOpen, setIsViewModalOpen, page, setPage, pageCount, setPageCount
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
