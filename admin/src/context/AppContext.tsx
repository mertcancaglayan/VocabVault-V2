import React, { createContext, useMemo, useState } from 'react'
import type { Word } from '../models/models';

interface AppContextType {
    isEditModalOpen: boolean;
    setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalWord: Word | undefined;
    setModalWord: React.Dispatch<React.SetStateAction<Word | undefined>>
}

const AppContext = createContext<AppContextType | undefined>(undefined)


export function AppProvider({ children }: { children: React.ReactNode }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [modalWord, setModalWord] = useState<Word>()

    const contextValue = useMemo(() => {
        return ({
            isEditModalOpen, setIsEditModalOpen, modalWord, setModalWord
        })
    })

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext
