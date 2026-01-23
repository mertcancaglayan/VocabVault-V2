import { useLocation } from "react-router-dom";
import { getStoredLanguage } from "../utils/language";
import { STORAGE_KEYS } from "../constants/storage";

export function useParams() {
	const location = useLocation();
	const state = location.state || {};

	const category = state.category || "colors";
	const from = state.from || getStoredLanguage(STORAGE_KEYS.FROM_LANG);
	const to = state.to || getStoredLanguage(STORAGE_KEYS.TO_LANG);
	const difficulty = state.difficulty;

	return {
		category,
		from,
		to,
		difficulty,
	};
}
