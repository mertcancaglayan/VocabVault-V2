import { useEffect, useMemo } from "react";
import { useParams } from "./useParams";
import { useWords } from "./useWords";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./useAppContext";

const FLASCARDS_GAME_LIMIT = 10;

export function useFlashCards() {
	const contextValue = useAppContext();

	const { currentSlideIndex, setCurrentSlideIndex, setTotalQuestions } = contextValue;

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

	useEffect(() => {
		if (gameWords.length > 0) {
			setTotalQuestions(gameWords.length);
		}
	}, [gameWords, setTotalQuestions]);

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
		category,
		from,
		to,
		difficulty,
	};
}
