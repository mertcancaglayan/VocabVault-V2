import Header from "../../components/header/Header";
import QuizSlider from "../../components/quizSlider/QuizSlider";
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


                <QuizSlider></QuizSlider>

                <div className="quiz-action">
                    <button className="btn-primary">Check</button>
                </div>
            </main>
        </>
    );
}
