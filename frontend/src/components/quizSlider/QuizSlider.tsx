import { useLocation, useNavigate } from "react-router-dom";
import { getWords, type WordItem } from "../../api/api";
import { useContext, useEffect, useState } from "react";
import QuizSliderItem from "./quizSliderItem/QuizSliderItem";
import AppContext from "../../context/AppContext";
import { shuffle } from "../../utils/shuffle";

export interface ShuffledWord extends WordItem {
    shuffledOptions: string[];
}

function QuizSlider() {
    const contextValue = useContext(AppContext);
    if (!contextValue) throw new Error("QuizSlider must be used within AppProvider");
    const { results, setResults } = contextValue;

    const [slides, setSlides] = useState<{ words: ShuffledWord[] }>();
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const location = useLocation();
    const { category, from, to } = location.state || {};

    const fromLangSafe = from || localStorage.getItem("wordvault_fromLang");
    const toLangSafe = to || localStorage.getItem("wordvault_toLang");

    const navigateTo = useNavigate();

    useEffect(() => {
        if (!category || !fromLangSafe || !toLangSafe) return;

        async function fetchWords() {
            try {
                const data = await getWords(category, fromLangSafe, toLangSafe);
                const QUIZ_WORD_LIMIT = 5;
                const limited = data.words?.slice(0, QUIZ_WORD_LIMIT) || [];

                const prepared = limited.map(w => ({
                    ...w,
                    shuffledOptions: shuffle([w.to, ...w.wrongWords]),
                }));

                setSlides({ words: prepared });
            } catch (error) {
                console.error("Error fetching words:", error);
            }
        }

        fetchWords();
    }, [category, fromLangSafe, toLangSafe]);

    const currentSlide = slides?.words[currentSlideIndex];

    function handleAnswer(selected: string,) {
        setSelectedOption(selected);
    }

    function handleNext() {
        if (!selectedOption) {
            alert("Please select an option!");
            return;
        }

        setSelectedOption(null);

        const current = slides!.words[currentSlideIndex];

        const newResult = {
            id: current.id,
            selected: selectedOption,
            correct: current.to,
            isCorrect: selectedOption === current.to,
        };

        setResults(prev => [...prev, newResult]);

        setSelectedOption(null);

        console.log(results);

        if (slides && currentSlideIndex < slides.words.length - 1) {
            setCurrentSlideIndex(prev => prev + 1);
        } else {
            navigateTo("/results");
        }
    }

    return (
        <>
            <div className="progress">
                {currentSlideIndex + 1} / {slides?.words.length}
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
