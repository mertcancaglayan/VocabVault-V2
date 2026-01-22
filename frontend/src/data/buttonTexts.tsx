export interface ButtonTexts {
    next: string;
    prev: string;
    retry: string;
    submit: string;
    cancel: string;
    confirm: string;
    start: string;
    finish: string;
    home: string;
    greeting: string;
}

export interface ButtonTextsI { [key: string]: ButtonTexts }

export const buttonTexts: ButtonTextsI = {
    en: {
        next: "Next",
        prev: "Back",
        retry: "Try Again",
        submit: "Submit",
        cancel: "Cancel",
        confirm: "Confirm",
        start: "Start",
        finish: "Finish",
        home: "Home Page",
        greeting: "Let's Start",
    },
    tr: {
        next: "İleri",
        prev: "Geri",
        retry: "Tekrar Dene",
        submit: "Gönder",
        cancel: "İptal",
        confirm: "Onayla",
        start: "Başla",
        finish: "Bitir",
        home: "Ana Sayfa",
        greeting: "Hadi Başlayalım",
    },
    pl: {
        next: "Dalej",
        prev: "Wstecz",
        retry: "Spróbuj ponownie",
        submit: "Wyślij",
        cancel: "Anuluj",
        confirm: "Potwierdź",
        start: "Start",
        finish: "Zakończ",
        home: "Strona Główna",
        greeting: "Zacznijmy",
    },
};
