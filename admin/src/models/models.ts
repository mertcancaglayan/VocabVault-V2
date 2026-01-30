export interface WordsI {
	words: Word[];
}

export interface Word {
	_id: string;
	category_key: string;
	sub_category_key: string;
	sub_category_label: string;
	level: string;
	translations: Translations;
	example: Example;
	phonetics: Phonetics;
}

export interface Translations {
	en: string;
	tr: string;
	pl: string;
}

export interface Example {
	en: string;
	tr: string;
	pl: string;
}

export interface Phonetics {
	en?: string;
	tr: string;
	pl: string;
}
