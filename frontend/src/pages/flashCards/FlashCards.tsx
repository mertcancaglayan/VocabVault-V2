import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header"
import { useQuizWords } from "../../hooks/useQuizWords";
import FlashCard from "../../components/flashcard/FlashCard";
import { useState } from "react";
import "./flashCards.css"


function FlashCards() {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)


    const location = useLocation();
    const { category, from, to, difficulty } = location.state || {};

    const fromLangSafe = from || localStorage.getItem("wordvault_fromLang");
    const toLangSafe = to || localStorage.getItem("wordvault_toLang");
    const categorySafe = category || "colors";

    const { words, isLoading, error } = useQuizWords(
        categorySafe,
        fromLangSafe,
        toLangSafe,
        difficulty
    );

    function handlePrev() {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex(currentSlideIndex - 1);
        }
    }

    const navigateTo = useNavigate();

    function handleNext() {
        if (currentSlideIndex < words.length - 1) {
            setCurrentSlideIndex(currentSlideIndex + 1);
        } else {
            navigateTo("/");
        }
    }



    if (isLoading) return <p>Loading questions...</p>;
    if (error) return <p>Error loading quiz: {error.message}</p>;
    if (words.length === 0) return <p>No questions available for this category.</p>;

    return (
        <main className="game-section">
            <Header />
            <div className="progress">
                {currentSlideIndex + 1} / {words.length}
            </div>
            <section className="flashCard-section">
                <div className="flasCardSlider">
                    {
                        words.length === 0 ? (
                            <p>No questions available for this category.</p>

                        ) : (
                            <FlashCard frontText={words[currentSlideIndex].from} backText={words[currentSlideIndex].to} key={words[currentSlideIndex].id}></FlashCard>
                        )
                    }
                </div>
                <div className="controls">
                    <button className="card-btn" onClick={handlePrev} disabled={currentSlideIndex === 0}>prev</button>
                    <button className="card-btn" onClick={handleNext}>{currentSlideIndex === words.length - 1 ? "end" : "next"}</button>
                </div>
            </section>
        </main>
    )
}

export default FlashCards
