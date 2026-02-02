import { useEffect, useState } from "react";
import type { Word } from "../models/models";
import { getWords } from "../api/api";
import { useAppContext } from "./useAppContext";

export function useWords(page: number, searchQuery: string = "") {
	const [isLoading, setIsLoading] = useState(false);
	const [words, setWords] = useState<Word[]>();
	const [error, setError] = useState<Error | null>(null);

	const { setTotalFilteredWord, setPageCount } = useAppContext();

	useEffect(() => {
		let isMounted = true;

		async function fetch() {
			setIsLoading(true);

			try {
				setError(null);
				const data = await getWords(page, searchQuery);
				if (isMounted) {
					setWords(data.words);
					setTotalFilteredWord(data.totalCount);
					setPageCount(data.totalPages);
				}
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
	}, [page, searchQuery, setTotalFilteredWord, setPageCount]);

	return { isLoading, words, error };
}
