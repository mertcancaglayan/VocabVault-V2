import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import QuizSliderItem from "./quizSliderItem/QuizSliderItem";
import AppContext from "../../context/AppContext";
import { useQuizWords } from "../../hooks/useQuizWords";
import { createQuizResults } from "../../utils/quizHelpers";


function QuizSlider() {
    const contextValue = useContext(AppContext);
    if (!contextValue) throw new Error("QuizSlider must be used within AppProvider");
    const { setResults, currentSlideIndex, setCurrentSlideIndex, setTotalQuestions } = contextValue;

    const [selectedOption, setSelectedOption] = useState<string>("");

    const location = useLocation();
    const { category, from, to } = location.state || {};

    const fromLangSafe = from || localStorage.getItem("wordvault_fromLang");
    const toLangSafe = to || localStorage.getItem("wordvault_toLang");

    const navigateTo = useNavigate();

    const { words, isLoading, error } = useQuizWords(
        category,
        fromLangSafe,
        toLangSafe
    );

    useEffect(() => {
        if (words.length > 0) {
            setTotalQuestions(words.length);
        }
    }, [words, setTotalQuestions]);


    const currentSlide = words[currentSlideIndex];

    function handleAnswer(selected: string) {
        setSelectedOption(selected);
    }

    function handleNext() {
        if (!selectedOption) {
            alert("Please select an option!");
            return;
        }

        if (!words[currentSlideIndex]) return;

        const current = words[currentSlideIndex];
        const newResult = createQuizResults(current, selectedOption)

        setResults(prev => [...prev, newResult]);
        setSelectedOption("");

        if (words && currentSlideIndex < words.length - 1) {
            setCurrentSlideIndex(prev => prev + 1);
        } else {
            navigateTo("/results");
        }
    }

    if (isLoading) {
        return <p>Loading questions...</p>;
    }

    if (error) {
        return <p>Error loading quiz: {error.message}</p>;
    }

    if (words.length === 0) {
        return <p>No questions available for this category.</p>;
    }

    return (
        <>
            <div className="quiz-slider">
                {currentSlide ? (
                    <QuizSliderItem
                        key={currentSlide.id}
                        {...currentSlide}
                        handleAnswer={handleAnswer}
                    />
                ) : (
                    <p>Loading questions...</p>
                )}
            </div>

            <div className="quiz-action">
                <button className="btn-primary" onClick={handleNext}>
                    Next
                </button>
            </div>
        </>
    );
}

export default QuizSlider;
