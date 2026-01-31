import type { Word, WordsI } from "../models/models";

const API_URL = import.meta.env.VITE_ADMIN_API_URL;
const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY;

export const getWords = async (): Promise<WordsI> => {
	const response = await fetch(`${API_URL}/api/v1/admin/words`);

	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`);
	}

	return await response.json();
};

export const patchWord = async (word: Word): Promise<Word> => {
	try {
		const response = await fetch(
			`${API_URL}/api/v1/admin/words/${word._id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": ADMIN_API_KEY,
				},
				body: JSON.stringify(word),
			}
		);

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error patching word:", error);
		throw error;
	}
};

export const removeWord = async (word: Word): Promise<Word> => {
	try {
		const response = await fetch(
			`${API_URL}/api/v1/admin/words/${word._id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": ADMIN_API_KEY,
				},
			}
		);

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error deleting word:", error);
		throw error;
	}
};