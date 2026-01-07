import { useContext, useMemo } from "react";
import { useParams } from "./useParams";
import { useWords } from "./useWords";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const FLASCARDS_GAME_LIMIT = 10;

export function useFlashCards() {
	const contextValue = useContext(AppContext);
	if (!contextValue) throw new Error("QuizSlider must be used within AppProvider");

	const { currentSlideIndex, setCurrentSlideIndex } = contextValue;

	const { category, from, to, difficulty } = useParams();
	const { words: allWords, isLoading, error } = useWords(category, from, to, difficulty);

	const gameWords = useMemo(() => {
		if (!allWords.length) return [];

		const sliced = allWords.slice(0, FLASCARDS_GAME_LIMIT);
		return sliced;
	}, [allWords]);

	function handlePrev() {
		if (currentSlideIndex > 0) {
			setCurrentSlideIndex(currentSlideIndex - 1);
		}
	}

	const navigateTo = useNavigate();

	function handleNext() {
		if (currentSlideIndex < gameWords.length - 1) {
			setCurrentSlideIndex(currentSlideIndex + 1);
		} else {
			navigateTo("/");
		}
	}

	return {
		gameWords,
		isLoading,
		error,
		handlePrev,
		handleNext,
		currentSlideIndex,
	};
}
