import { useEffect, useState } from "react";
import type { CategoryDocument } from "../models/models";
import { getCategoriesV2 } from "../api/api";

export function useCategories() {
	const [categories, setCategories] = useState<CategoryDocument[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		let isMounted = true;

		async function fetch() {
			try {
				setIsLoading(true);
				const data = await getCategoriesV2();
				if (isMounted) setCategories(data);
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
	}, []);

	return { categories, isLoading, error };
}
