interface LanguageLabels {
    targetLanguage: string;
    difficulty: string;
    easy: string;
    normal: string;
    expert: string;
    random: string;
}

interface SettingsText {
    [key: string]: LanguageLabels;
}

export const settingsText: SettingsText = {
    en: {
        targetLanguage: "Target Language",
        difficulty: "Difficulty",
        easy: "🐣 Easy",
        normal: "👤 Normal",
        expert: "🔥 Expert",
        random: "😂 Random"
    },
    tr: {
        targetLanguage: "Hedef Dil",
        difficulty: "Zorluk",
        easy: "🐣 Kolay",
        normal: "👤 Normal",
        expert: "🔥 Uzman",
        random: "😂 Rastgele"
    },
    pl: {
        targetLanguage: "Język docelowy",
        difficulty: "Trudność",
        easy: "🐣 Łatwy",
        normal: "👤 Normalny",
        expert: "🔥 Ekspert",
        random: "😂 Losowy"
    }
};