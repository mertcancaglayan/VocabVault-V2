import { useLocation } from "react-router-dom";

export function useParams() {
	const location = useLocation();
	const state = location.state || {};

	const category = state.category || "colors";
	const from = state.from || localStorage.getItem("wordvault2_fromLang");
	const to = state.to || localStorage.getItem("wordvault2_toLang");
	const difficulty = state.difficulty; 

	return {
		category,
		from,
		to,
		difficulty,
	};
}
