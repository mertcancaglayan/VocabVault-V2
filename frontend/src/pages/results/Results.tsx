import { useContext } from "react"
import Header from "../../components/header/Header"
import "../results/results.css"
import AppContext from "../../context/AppContext"

function Results() {
    const contextValue = useContext(AppContext)
    if (!contextValue) throw new Error("QuizSlider must be used within AppProvider");
    const { results } = contextValue;


    return (
        <main className="quiz-main">
            <Header />
            <section>
                {results.map((result) => {
                    return (
                        <article className={result.isCorrect ? "result-card correct" : "result-card incorrect"}>
                            <div className="result-icon">
                                {
                                    result.isCorrect ? (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M9 12l2 2 4-4" />
                                    </svg>) : (<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M15 9l-6 6M9 9l6 6" />
                                    </svg>)
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
        </main>

    )
}

export default Results