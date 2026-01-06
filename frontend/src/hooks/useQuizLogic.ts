import { useNavigate } from "react-router-dom";
import { useParams } from "./useParams";
import { useWords } from "./useWords";
import { useContext, useEffect, useMemo, useState } from "react";
import AppContext from "../context/AppContext";
import { createQuizResults, prepareQuizWords } from "../utils/quizHelpers"; 

const SLIDER_GAME_LIMIT = 10;

export function useQuizLogic() {
	const contextValue = useContext(AppContext);
	if (!contextValue) throw new Error("QuizSlider must be used within AppProvider");

	const { setResults, currentSlideIndex, setCurrentSlideIndex, setTotalQuestions } = contextValue;
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

		setResults((prev) => [...prev, newResult]);
		setSelectedOption("");

		if (currentSlideIndex < gameWords.length - 1) {
			setCurrentSlideIndex((prev) => prev + 1);
		} else {
			navigateTo("/results");
		}
	}

	return {
		isLoading,
		error,
		gameWords,
		currentSlide,
		selectedOption,
		handleAnswer,
		handleNext,
	};
}
