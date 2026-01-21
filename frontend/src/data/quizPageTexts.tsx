interface QuizPageText {
    question: string;
}

interface QuizPageTexts {
    [key: string]: QuizPageText;
}

export const quizPageText: QuizPageTexts = {
    en: {
        question: "Which word means",
    },
    tr: {
        question: "Hangi kelime şu anlama gelir",
    },
    pl: {
        question: "Które słowo oznacza",
    },
};
