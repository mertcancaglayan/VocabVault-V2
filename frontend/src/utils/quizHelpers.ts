import type { ResultI, WordItem } from "../models/models";
import { shuffle } from "./shuffle";

export function prepareQuizWords(words: WordItem[]) {
	return words.map((w) => ({
		...w,
		shuffledOptions: shuffle([w.to, ...w.wrongWords]),
	}));
}

export function createQuizResults(word: WordItem, selectedOption: string): ResultI {
	return {
		id: word.id,
		question: word.from,
		selected: selectedOption,
		correct: word.to,
		isCorrect: selectedOption === word.to,
	};
}
