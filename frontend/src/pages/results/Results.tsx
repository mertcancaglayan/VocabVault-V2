import Header from "../../components/header/Header"
import { buttonTexts } from "../../data/buttonTexts";
import { useQuizLogic } from "../../hooks/useQuizLogic";
import "../results/results.css"
import { useNavigate } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import { resultPageText } from "../../data/resultPageTexts";

function Results() {
    const navigateTo = useNavigate();

    const { category, from, to, difficulty, results } = useQuizLogic()

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
        navigateTo(`/quiz`, {
            state: { category, from, to, difficulty, intent: "retry" },
        })
    }

    function handleHomeNavigation() {
        navigateTo("/")
    }

    const text = resultPageText[from]
    const buttonText = buttonTexts[from]

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
                                <p className="status">{result.isCorrect ? `${text.correct}` : `${text.incorrect}`}</p>
                                <h2 className="question">{text.question}: {result.question.charAt(0).toUpperCase() + result.question.slice(1)}</h2>
                                <p className="answers">{text.yourAnswer}: {result.selected} | {text.correctAnswer}: {result.correct}</p>
                            </div>
                        </article>
                    )
                })}
            </section>
            <div className="quiz-action">
                <button className="btn-primary" onClick={handleHomeNavigation
                }>
                    {buttonText.home}
                    <FaHome />
                </button>
                <button className="btn-primary" onClick={handleRetry
                }>
                    {buttonText.retry}
                    <FaArrowRotateRight />
                </button>
            </div>
        </main>

    )
}

export default Results