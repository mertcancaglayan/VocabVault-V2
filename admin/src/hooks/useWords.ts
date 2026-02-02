import { useEffect, useState } from "react";
import type { WordsI } from "../models/models";
import { getWords } from "../api/api";

export function useWords(page: number) {
	const [isLoading, setIsLoading] = useState(false);
	const [words, setWords] = useState<WordsI>();
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		let isMounted = true;

		async function fetch() {
			try {
				setIsLoading(true);
				setError(null);
				const data = await getWords(page);
				if (isMounted) setWords(data);
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
	}, [page]);

	return { isLoading, words, error };
}
