import { useLocation } from "react-router-dom";
import { getWords, type WordsDocument } from "../../api/api";
import { useEffect, useState } from "react";
import QuizSliderItem from "./quizSliderItem/QuizSliderItem";

function QuizSlider() {
    const [words, setWords] = useState<WordsDocument>();

    const location = useLocation();
    const { category, from, to } = location.state || {};

    const fromLangSafe = from || localStorage.getItem("wordvault_fromLang");
    const toLangSafe = to || localStorage.getItem("wordvault_toLang");

    useEffect(() => {
        if (!category || !fromLangSafe || !toLangSafe) return;

        async function fetchWords() {
            try {
                const data = await getWords(category, fromLangSafe, toLangSafe);
                setWords(data);
            } catch (error) {
                console.error("Error fetching words:", error);
            }
        }

        fetchWords();
    }, [category, fromLangSafe, toLangSafe]);


    return (
        <div className="quiz-slider">
            {words ? (
                words.words.map((word) => {
                    return (
                        <QuizSliderItem key={word.id} {...word} />
                    );
                })
            ) : (
                <p>Loading questions...</p>
            )}
        </div>
    );
}

export default QuizSlider;
