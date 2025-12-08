import { getWords, type WordItem, type Subcategory } from "../api/api";
import { useEffect, useState } from "react";
import { prepareQuizWords } from "../utils/quizHelpers";

export interface ShuffledWord extends WordItem {
	shuffledOptions: string[];
}

const QUIZ_WORD_LIMIT = 6;

export function useQuizWords(category: Subcategory, fromLangSafe: string, toLangSafe: string) {
	const [words, setWords] = useState<ShuffledWord[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!category || !fromLangSafe || !toLangSafe) return;

		async function fetchWords() {
			try {
				setIsLoading(true);
				setError(null);
				const data = await getWords(category, fromLangSafe, toLangSafe);
				const limited = data.words?.slice(0, QUIZ_WORD_LIMIT) || [];

				const prepared = prepareQuizWords(limited);

				setWords(prepared);
			} catch (error) {
				setError(error as Error);
				console.error("Error fetching words:", error);
			} finally {
				setIsLoading(false);
			}
		}
		fetchWords();
	}, [category, fromLangSafe, toLangSafe]);

	return { words, isLoading, error };
}
