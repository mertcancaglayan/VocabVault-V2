export interface Labels {
	en: string;
	tr: string;
	pl: string;
}

export interface Subcategory {
	key: string;
	labels: Labels;
	emoji: string;
	description: string;
}

export interface CategoryDocument {
	key: string;
	labels: Labels;
	subcategories: Subcategory[];
}

export interface WordsDocument {
	words: WordItem[];
}

export interface WordItem {
	id: string;
	from: string;
	to: string;
	wrongWords: string[];
}

export type languages = language[];

export interface language {
	lang: string;
	text: string;
}

export type allowedLangs = "en" | "tr" | "pl";

export interface LanguagePair {
	from: allowedLangs;
	to: allowedLangs;
}

export interface ResultI {
	id: string;
	question: string;
	selected: string;
	correct: string;
	isCorrect: boolean;
}

export type SlideDirection = "next" | "prev";
