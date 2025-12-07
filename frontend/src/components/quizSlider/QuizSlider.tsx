import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import QuizSliderItem from "./quizSliderItem/QuizSliderItem";
import AppContext from "../../context/AppContext";
import { useQuizWords } from "../../hooks/useQuizWords";


function QuizSlider() {
    const contextValue = useContext(AppContext);
    if (!contextValue) throw new Error("QuizSlider must be used within AppProvider");
    const { results, setResults } = contextValue;

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

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


    const currentSlide = words[currentSlideIndex];

    function handleAnswer(selected: string,) {
        setSelectedOption(selected);
    }

    function handleNext() {
        if (!selectedOption) {
            alert("Please select an option!");
            return;
        }

        setSelectedOption(null);

        const current = words[currentSlideIndex];

        const newResult = {
            id: current.id,
            selected: selectedOption,
            correct: current.to,
            isCorrect: selectedOption === current.to,
        };

        setResults(prev => [...prev, newResult]);

        setSelectedOption(null);

        console.log(results);

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
            <div className="progress">
                {currentSlideIndex + 1} / {words.length}
            </div>

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
