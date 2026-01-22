export interface ResultPageText {
    correct: string,
    incorrect: string,
    question: string,
    yourAnswer: string,
    correctAnswer: string,
}

export interface ResultPageTexts { [key: string]: ResultPageText }

export const resultPageText: ResultPageTexts = {
    en: {
        correct: "Correct",
        incorrect: "Incorrect",
        question: "Question",
        yourAnswer: "Your Answer",
        correctAnswer: "Correct Answer",

    },
    tr: {
        correct: "Doğru",
        incorrect: "Yanlış",
        question: "Soru",
        yourAnswer: "Yanıtın",
        correctAnswer: "Doğru Yanıt",
    },
    pl: {
        correct: "Prawidłowy",
        incorrect: "Błędny",
        question: "Pytanie",
        yourAnswer: "Twoja odpowiedź",
        correctAnswer: "Poprawna odpowiedź",
    },
}