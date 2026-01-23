import { buttonTexts } from "../../data/buttonTexts";
import { useQuizLogic } from "../../hooks/useQuizLogic";
import ContentState from "../ui/contentState/ContentState";
import QuizSliderItem from "./quizSliderItem/QuizSliderItem";
import { useLanguagePair } from "../../hooks/useLanguagePair";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

function QuizSlider() {
    const {
        isLoading,
        error,
        gameWords,
        currentSlide,
        handleAnswer,
        handleNext,
        handlePrev,
        selectedOption
    } = useQuizLogic();

    const { from } = useLanguagePair();
    const actionButtonTextNext = buttonTexts[from].next
    const actionButtonTextPrev = buttonTexts[from].prev

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
                        selectedOption={selectedOption}
                        key={currentSlide.id}
                        {...currentSlide}
                        handleAnswer={handleAnswer}
                        fromLang={from}
                    />
                ) : (
                    <p>Loading questions...</p>
                )}
            </div>

            <div className="quiz-action">
                <button className="btn-primary" onClick={handlePrev}>
                    <FaAngleLeft />
                    {actionButtonTextPrev}
                </button>
                <button className="btn-primary" onClick={handleNext}>
                    {actionButtonTextNext}
                    <FaAngleRight />
                </button>
            </div>
        </ContentState>
    );
}

export default QuizSlider;
