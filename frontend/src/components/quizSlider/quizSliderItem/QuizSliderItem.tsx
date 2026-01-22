import { useContext, useEffect } from "react";
import { quizPageText } from "../../../data/quizPageTexts";
import type { ShuffledWord } from "../../../hooks/useWords";
import AppContext from "../../../context/AppContext";

interface QuizSliderItemProps extends ShuffledWord {
    handleAnswer: (selected: string, correct: string, id: string) => void;
}

function QuizSliderItem({ shuffledOptions, fromWord, toWord, id, handleAnswer }: QuizSliderItemProps) {

    const contextValue = useContext(AppContext);
    if (!contextValue) {
        throw new Error("Home must be used within AppProvider");
    }

    const { languagePair } = contextValue;

    useEffect(() => {
        console.log(fromWord)
    }, [fromWord])

    if (!languagePair) return null;
    const { from } = languagePair;

    function handleSelect(opt: string) {
        handleAnswer(opt, toWord, id);
    }

    const question = quizPageText[from].question;

    return (
        <section className="quiz-question" key={id}>
            <h1>
                {question} "{fromWord}"?
            </h1>

            <form className="quiz-options">
                {shuffledOptions.map((opt, i) => (
                    <label className="option" key={i}>
                        <input
                            type="radio"
                            name={`question-${id}`}
                            value={opt}
                            onChange={() => handleSelect(opt)}
                        />
                        <span className="option-text">{opt}</span>
                    </label>
                ))}
            </form>
        </section>
    );
}

export default QuizSliderItem;
