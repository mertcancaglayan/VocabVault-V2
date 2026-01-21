import type { ResultI, WordItem } from "../models/models";
import { shuffle } from "./shuffle";

export function prepareQuizWords(words: WordItem[]) {
	return words.map((w) => ({
		...w,
		shuffledOptions: shuffle([w.toWord, ...w.wrongWords]),
	}));
}

export function createQuizResults(word: WordItem, selectedOption: string): ResultI {
	return {
		id: word.id,
		question: word.fromWord,
		selected: selectedOption,
		correct: word.toWord,
		isCorrect: selectedOption === word.toWord,
	};
}
