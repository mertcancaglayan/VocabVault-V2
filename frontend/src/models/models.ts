export interface Subcategory {
	key: string;
	label: string;
	emoji: string;
	description: string;
}

export interface CategoryDocument {
	key: string;
	label: string;
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

export interface LanguagePair {
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

export type SlideDirection = "next" | "prev";
