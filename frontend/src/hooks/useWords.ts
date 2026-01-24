import { useState, useEffect } from "react";
import { getWords} from "../api/api";
import type { allowedLangs, Subcategory, WordItem } from "../models/models";

export interface ShuffledWord extends WordItem {
	shuffledOptions: string[];
}

export function useWords(category: Subcategory, from: allowedLangs, to: allowedLangs, difficulty: string) {
	const [words, setWords] = useState<WordItem[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!category || !from || !to) return;

		let isMounted = true;

		async function fetch() {
			try {
				setIsLoading(true);
				const data = await getWords(category, from, to, difficulty);
				
				if (isMounted) setWords(data.words || []);
			} catch (err) {
				if (isMounted) setError(err as Error);
			} finally {
				if (isMounted) setIsLoading(false);
			}
		}
		fetch();

		return () => {
			isMounted = false;
		};
	}, [category, from, to, difficulty]);
	
	return { words, isLoading, error };
}
