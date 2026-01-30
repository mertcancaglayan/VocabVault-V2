import type { WordsI } from "../models/models";

const API_URL = import.meta.env.VITE_ADMIN_API_URL;

export const getWords = async (): Promise<WordsI> => {
	const response = await fetch(`${API_URL}/api/v1/admin/words`);

	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}

	return await response.json();
};
