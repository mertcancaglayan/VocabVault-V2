import Header from "../../components/header/Header"
import FlashCard from "../../components/flashcard/FlashCard";
import "./flashCards.css"
import { useFlashCards } from "../../hooks/useFlashCards";
import ContentState from "../../components/ui/contentState/ContentState";


function FlashCards() {
    const { isLoading, error, gameWords, currentSlideIndex, handlePrev, handleNext } = useFlashCards()

    return (
        <main className="game-section">
            <Header />
            <section className="flashCard-section">
                <ContentState
                    isLoading={isLoading}
                    error={error}
                    isEmpty={gameWords.length === 0}
                >
                    <div className="progress">
                        {currentSlideIndex + 1} / {gameWords.length}
                    </div>
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
                    </div>
                </ContentState>
            </section>
        </main>
    )
}

export default FlashCards
