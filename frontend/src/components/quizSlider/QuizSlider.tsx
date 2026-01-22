import { buttonTexts } from "../../data/buttonTexts";
import { useQuizLogic } from "../../hooks/useQuizLogic";
import ContentState from "../ui/contentState/ContentState";
import QuizSliderItem from "./quizSliderItem/QuizSliderItem";
import { MdNavigateNext } from "react-icons/md";
import { useAppContext } from "../../hooks/useAppContext";

function QuizSlider() {
    const {
        isLoading,
        error,
        gameWords,
        currentSlide,
        handleAnswer,
        handleNext
    } = useQuizLogic();

    const contextValue = useAppContext()

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
                    <MdNavigateNext />
                </button>
            </div>
        </ContentState>
    );
}

export default QuizSlider;
