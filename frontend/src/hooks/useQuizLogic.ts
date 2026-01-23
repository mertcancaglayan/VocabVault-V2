import { useNavigate } from "react-router-dom";
import { useParams } from "./useParams";
import { useWords } from "./useWords";
import { useEffect, useMemo, useState } from "react";
import { createQuizResults, prepareQuizWords } from "../utils/quizHelpers";
import { useAppContext } from "./useAppContext";

const SLIDER_GAME_LIMIT = 10;

export function useQuizLogic() {
	const contextValue = useAppContext();

	const { setResults, currentSlideIndex, setCurrentSlideIndex, setTotalQuestions, results } = contextValue;
	const [selectedOption, setSelectedOption] = useState<string>("");

	const { category, from, to, difficulty } = useParams();
	const { words: allWords, isLoading, error } = useWords(category, from, to, difficulty);

	const navigateTo = useNavigate();

	const gameWords = useMemo(() => {
		if (!allWords.length) return [];

		const sliced = allWords.slice(0, SLIDER_GAME_LIMIT);
		return prepareQuizWords(sliced);
	}, [allWords]);

	useEffect(() => {
		if (gameWords.length > 0) {
			setTotalQuestions(gameWords.length);
		}
	}, [gameWords, setTotalQuestions]);

	const currentSlide = gameWords[currentSlideIndex];

	function handleAnswer(selected: string) {
		setSelectedOption(selected);
	}

	function handleNext() {
		if (!selectedOption) {
			alert("Please select an option!");
			return;
		}

		if (!currentSlide) return;

		const newResult = createQuizResults(currentSlide, selectedOption);

		setResults((prev) => {
			const filtered = prev.filter((result) => result.id !== currentSlide.id);
			return [...filtered, newResult];
		});

		setSelectedOption("");

		if (currentSlideIndex < gameWords.length - 1) {
			setCurrentSlideIndex((prev) => prev + 1);
		} else {
			navigateTo(`/results`, {
				state: { category, from, to, difficulty },
			});
		}
	}

	function handlePrev() {
		if (currentSlideIndex <= 0) return;

		const prevIndex = currentSlideIndex - 1;
		setCurrentSlideIndex(prevIndex);

		const prevQuestionId = gameWords[prevIndex].id;
		const previousSavedResult = results.find((r) => r.id === prevQuestionId);

		setSelectedOption(previousSavedResult ? previousSavedResult.selected : "");
	}

	useEffect(() => {
		if (currentSlide) {
			const existingResult = results.find((r) => r.id === currentSlide.id);
			setSelectedOption(existingResult ? existingResult.selected : "");
		}
	}, [currentSlideIndex, currentSlide, results]);

	return {
		isLoading,
		error,
		gameWords,
		currentSlide,
		selectedOption,
		handleAnswer,
		handleNext,
		handlePrev,
		results,
		category,
		from,
		to,
		difficulty,
	};
}
