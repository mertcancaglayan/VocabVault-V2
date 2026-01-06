import { useContext } from "react"
import Header from "../../components/header/Header"
import "../results/results.css"
import AppContext from "../../context/AppContext"
import { useNavigate } from "react-router-dom"

function Results() {
    const contextValue = useContext(AppContext)
    if (!contextValue) throw new Error("QuizSlider must be used within AppProvider");

    const navigateTo = useNavigate();

    const { results, setResults, setCurrentSlideIndex, category, languagePair, difficulty } = contextValue;

    if (!languagePair) return;
    
    const { from, to } = languagePair;

    const ICONS = {
        correct: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
            </svg>
        ),
        incorrect: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9l-6 6M9 9l6 6" />
            </svg>
        )
    };


    function handleRetry() {
        resetQuiz()

        navigateTo(`/quiz`, {
            state: { category, from, to, difficulty },
        })
    }

    function handleHomeNavigation() {
        resetQuiz()
        navigateTo("/")
    }

    function resetQuiz() {
        setResults([])
        setCurrentSlideIndex(0)
    }


    return (
        <main className="quiz-main">
            <Header />
            <section className="result-section">
                {results.map((result, index) => {
                    return (
                        <article key={index} className={result.isCorrect ? "result-card correct" : "result-card incorrect"}>
                            <div className="result-icon">
                                {
                                    result.isCorrect ? ICONS.correct : ICONS.incorrect
                                }
                            </div>
                            <div className="result-info">
                                <p className="status">{result.isCorrect ? "Correct" : "Incorrect"}</p>
                                <h2 className="question">Question: {result.question.charAt(0).toUpperCase() + result.question.slice(1)}</h2>
                                <p className="answers">Your Answer: {result.selected} | Correct Answer: {result.correct}</p>
                            </div>
                        </article>
                    )
                })}
            </section>
            <div className="quiz-action">
                <button className="btn-primary" onClick={handleHomeNavigation
                }>
                    Home
                </button>
                <button className="btn-primary" onClick={handleRetry
                }>
                    Retry
                </button>
            </div>
        </main>

    )
}

export default Results