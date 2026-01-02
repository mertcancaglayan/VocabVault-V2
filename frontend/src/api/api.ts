const API_URL = import.meta.env.VITE_API_URL;

export interface Subcategory {
	key: string;
	label: string;
	emoji: string;
	description: string;
}

export interface CategoryDocument {
	key: string;
	label: string;
	subcategories: Subcategory[];
}

export interface WordsDocument {
	words: WordItem[];
}

export interface WordItem {
	id: string;
	from: string;
	to: string;
	wrongWords: string[];
}

export const getCategoriesV2 = async (): Promise<CategoryDocument[]> => {
	try {
		const response = await fetch(`${API_URL}/api/v1/categories`);

		if (!response.ok) throw new Error(`Response status: ${response.status}`);

		return await response.json();
	} catch (error) {
		console.error("Error fetching categories:", error);
		throw error;
	}
};

export const getWords = async (
	category: Subcategory | null,
	fromLang: string,
	toLang: string,
): Promise<WordsDocument> => {
	if (!category) {
		throw new Error("Category is required");
	}

	const url: string = `${API_URL}/api/v1/words/category/${category.key}/lang/${fromLang}-${toLang}`;

	try {
		const response = await fetch(url);

		if (!response.ok) throw new Error(`Response status: ${response.status}`);

		return await response.json();
	} catch (error) {
		console.error("Error fetching words:", error);
		throw error;
	}
};
