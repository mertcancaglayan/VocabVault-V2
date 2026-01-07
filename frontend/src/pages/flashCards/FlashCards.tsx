import Header from "../../components/header/Header"
import FlashCard from "../../components/flashcard/FlashCard";
import "./flashCards.css"
import { useFlashCards } from "../../hooks/useFlashCards";
import ContentState from "../../components/ui/contentState/ContentState";
import ProgressBar from "../../components/progressBar/ProgressBar";
import { useNavigate } from "react-router-dom";

function FlashCards() {
    const navigateTo = useNavigate();

    const { isLoading, error, gameWords, currentSlideIndex, handlePrev, handleNext, category, from, to, difficulty, } = useFlashCards()

    function handleRetry() {
        navigateTo(`/flashcards`, {
            state: { category, from, to, difficulty, intent: "retry" },
        })
    }

    return (
        <main className="game-section">
            <Header />
            <section className="flashCard-section">
                <ContentState
                    isLoading={isLoading}
                    error={error}
                    isEmpty={gameWords.length === 0}
                >
                    <ProgressBar></ProgressBar>
                    <div className="flasCardSlider">
                        {
                            gameWords.length === 0 ? (
                                <p>No questions available for this category.</p>

                            ) : (
                                <FlashCard frontText={gameWords[currentSlideIndex].from} backText={gameWords[currentSlideIndex].to} key={gameWords[currentSlideIndex].id}></FlashCard>
                            )
                        }
                    </div>
                    <div className="controls">
                        <button className="card-btn" onClick={handlePrev} disabled={currentSlideIndex === 0}>prev</button>
                        <button className="card-btn" onClick={handleNext}>{currentSlideIndex === gameWords.length - 1 ? "end" : "next"}</button>
                        <button className="card-btn" onClick={handleRetry} disabled={currentSlideIndex != gameWords.length - 1}>Retry</button>
                    </div>
                </ContentState>
            </section>
        </main>
    )
}

export default FlashCards
