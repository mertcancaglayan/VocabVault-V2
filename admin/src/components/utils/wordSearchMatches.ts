import type { Word } from "../../models/models";

export const wordSearchMatches = (word: Word, searchInValue: string): boolean => {
	const query = searchInValue.toLowerCase();

	const search = (value: unknown): boolean => {
		if (typeof value === "string") {
			return value.toLowerCase().includes(query);
		}

		if (typeof value === "object" && value !== null) {
			return Object.values(value).some(search);
		}

		return false;
	};

	return search(word);
};
