import Header from "../../components/header/Header"
import FlashCard from "../../components/flashcard/FlashCard";
import "./flashCards.css"
import { useFlashCards } from "../../hooks/useFlashCards";


function FlashCards() {
    const { isLoading, error, gameWords, currentSlideIndex, handlePrev, handleNext } = useFlashCards()


    if (isLoading) return <p>Loading questions...</p>;
    if (error) return <p>Error loading quiz: {error.message}</p>;
    if (gameWords.length === 0) return <p>No questions available for this category.</p>;

    return (
        <main className="game-section">
            <Header />
            <div className="progress">
                {currentSlideIndex + 1} / {gameWords.length}
            </div>
            <section className="flashCard-section">
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
            </section>
        </main>
    )
}

export default FlashCards
