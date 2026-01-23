import Header from "../../components/header/Header";
import FlashCard from "../../components/flashcard/FlashCard";
import { useFlashCards } from "../../hooks/useFlashCards";
import ContentState from "../../components/ui/contentState/ContentState";
import ProgressBar from "../../components/progressBar/ProgressBar";
import { useNavigate } from "react-router-dom";
import { buttonTexts } from "../../data/buttonTexts";
import { FaAngleLeft, FaAngleRight, FaArrowRotateRight, FaHouse } from "react-icons/fa6";
import "../flashCards/flashCards.css"

function FlashCards() {
    const navigateTo = useNavigate();

    const {
        isLoading,
        error,
        gameWords,
        currentSlideIndex,
        handlePrev,
        handleNext,
        category,
        from,
        to,
        difficulty,
    } = useFlashCards();

    const isLastCard = currentSlideIndex === gameWords.length - 1;
    const currentWord = gameWords[currentSlideIndex];
    const buttonText = buttonTexts[from];

    function handleRetry() {
        navigateTo("/flashcards", {
            state: { category, from, to, difficulty, intent: "retry" },
        });
    }

    return (
        <main className="game-section">
            <Header />
            <section className="flashCard-section">
                <ContentState
                    isLoading={isLoading}
                    error={error}
                    isEmpty={gameWords.length === 0}
                    loadingMsg="cards"
                >
                    <ProgressBar />

                    <div className="flashCardSlider">
                        {gameWords.length === 0 ? (
                            <p>No questions available for this category.</p>
                        ) : (
                            <FlashCard
                                {...currentWord}
                            />
                        )}
                    </div>
                    <div className="controls flashcards-controls">
                        {isLastCard ? (
                            <>
                                <button
                                    className="btn-primary"
                                    onClick={handlePrev}
                                >
                                    <FaAngleLeft /> {buttonText.prev}
                                </button>
                                <button className="btn-primary" onClick={handleNext}>
                                    {buttonText.home} <FaHouse />
                                </button>
                                <button
                                    className="btn-primary"
                                    onClick={handleRetry}
                                >
                                    {buttonText.retry} <FaArrowRotateRight />
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="btn-primary"
                                    onClick={handlePrev}
                                >
                                    <FaAngleLeft /> {buttonText.prev}
                                </button>
                                <button
                                    className="btn-primary"
                                    onClick={handleNext}
                                >
                                    {buttonText.next} <FaAngleRight />
                                </button>
                            </>
                        )}
                    </div>
                </ContentState>
            </section>
        </main>
    );
}

export default FlashCards;
