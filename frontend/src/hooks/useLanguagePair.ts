import { DEFAULT_FROM_LANG, DEFAULT_TO_LANG } from "../constants/storage";
import type { allowedLangs } from "../models/models";
import { useAppContext } from "./useAppContext";

export const useLanguagePair = () => {
	const { languagePair } = useAppContext();

	const from = (languagePair?.from || DEFAULT_FROM_LANG) as allowedLangs;
	const to = (languagePair?.to || DEFAULT_TO_LANG) as allowedLangs;

	return { from, to, languagePair };
};
