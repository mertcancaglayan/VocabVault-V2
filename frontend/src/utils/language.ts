import type { allowedLangs } from "../models/models";

export const getStoredLanguage = (key: string): allowedLangs | null => {
	return localStorage.getItem(key) as allowedLangs | null;
};

export const getBrowserLanguage = (): allowedLangs => {
	return navigator.language.split("-")[0] as allowedLangs;
};
