import type { WordItem } from "../api/api";
import type { ShuffledWord } from "../hooks/useQuizWords";
import { shuffle } from "./shuffle";

export function prepareQuizWords(words: WordItem[]) {
	return words.map((w) => ({
		...w,
		shuffledOptions: shuffle([w.to, ...w.wrongWords]),
	}));
}

export interface QuizResult {
	id: string;
	selected: string;
	correct: string;
	isCorrect: boolean;
}

export function createQuizResults(word: ShuffledWord, selectedOption: string): QuizResult {
	return {
		id: word.id,
		selected: selectedOption,
		correct: word.to,
		isCorrect: selectedOption === word.to,
	};
}
