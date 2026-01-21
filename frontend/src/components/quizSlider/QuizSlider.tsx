import { useContext } from "react";
import { buttonTexts } from "../../data/buttonTexts";
import { useQuizLogic } from "../../hooks/useQuizLogic";
import ContentState from "../ui/contentState/ContentState";
import QuizSliderItem from "./quizSliderItem/QuizSliderItem";
import AppContext from "../../context/AppContext";

function QuizSlider() {
    const {
        isLoading,
        error,
        gameWords,
        currentSlide,
        handleAnswer,
        handleNext
    } = useQuizLogic();

    const contextValue = useContext(AppContext);

    if (!contextValue) {
        throw new Error("Home must be used within AppProvider");
    }

    const { languagePair, } = contextValue;

    if (!languagePair) return null;
    const { from } = languagePair;

    const actionButtonText = buttonTexts[from].next

    return (
        <ContentState
            isLoading={isLoading}
            error={error}
            isEmpty={gameWords.length === 0}
            loadingMsg="questions"

        >
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
                    {actionButtonText}
                </button>
            </div>
        </ContentState>
    );
}

export default QuizSlider;
