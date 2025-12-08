import type { WordItem } from "../api/api";
import type { ResultI } from "../context/AppContext";
import type { ShuffledWord } from "../hooks/useQuizWords";
import { shuffle } from "./shuffle";

export function prepareQuizWords(words: WordItem[]) {
	return words.map((w) => ({
		...w,
		shuffledOptions: shuffle([w.to, ...w.wrongWords]),
	}));
}

export function createQuizResults(word: ShuffledWord, selectedOption: string): ResultI {
	return {
		id: word.id,
		question: word.from,
		selected: selectedOption,
		correct: word.to,
		isCorrect: selectedOption === word.to,
	};
}
