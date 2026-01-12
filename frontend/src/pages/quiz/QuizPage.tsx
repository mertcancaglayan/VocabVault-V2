import Header from "../../components/header/Header";
import ProgressBar from "../../components/progressBar/ProgressBar";
import QuizSlider from "../../components/quizSlider/QuizSlider";
import "./quizpage.css";

export default function QuizPage() {
    return (
        <main className="quiz-main">
            <Header />
            <ProgressBar></ProgressBar>
            <QuizSlider></QuizSlider>
        </main>
    );
}
