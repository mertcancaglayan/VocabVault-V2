import { useQuizLogic } from "../../hooks/useQuizLogic";
import QuizSliderItem from "./quizSliderItem/QuizSliderItem";

function QuizSlider() {
    const {
        isLoading,
        error,
        gameWords,
        currentSlide,
        handleAnswer,
        handleNext
    } = useQuizLogic();

    if (isLoading) return <p>Loading questions...</p>;
    if (error) return <p>Error loading quiz: {error.message}</p>;
    if (gameWords.length === 0) return <p>No questions available for this category.</p>;


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
