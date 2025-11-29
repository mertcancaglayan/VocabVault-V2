import Header from "../../components/header/Header";
import "./quizPage.css";

export default function QuizPage() {
    return (
        <>

            <main className="quiz-main">
                <Header />

                <div className="quiz-progress">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: "60%" }}></div>
                    </div>
                </div>

                <section className="quiz-question">
                    <h1>Which word means "hello"?</h1>

                    <form className="quiz-options">
                        <label className="option">
                            <input type="radio" name="question1" defaultChecked />
                            <span className="option-text">Bonjour</span>
                        </label>

                        <label className="option">
                            <input type="radio" name="question1" />
                            <span className="option-text">Au revoir</span>
                        </label>

                        <label className="option">
                            <input type="radio" name="question1" />
                            <span className="option-text">Merci</span>
                        </label>

                        <label className="option">
                            <input type="radio" name="question1" />
                            <span className="option-text">S'il vous plaît</span>
                        </label>
                    </form>
                </section>

                <div className="quiz-action">
                    <button className="btn-primary">Check</button>
                </div>
            </main>
        </>
    );
}
