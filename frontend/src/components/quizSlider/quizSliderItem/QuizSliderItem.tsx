import { useContext, useCallback } from "react";
import { quizPageText } from "../../../data/quizPageTexts";
import type { ShuffledWord } from "../../../hooks/useWords";
import AppContext from "../../../context/AppContext";

interface QuizSliderItemProps extends ShuffledWord {
    handleAnswer: (selected: string, correct: string, id: string) => void;
}

function QuizSliderItem({
    shuffledOptions,
    fromWord,
    toWord,
    id,
    handleAnswer,
}: QuizSliderItemProps) {
    const contextValue = useContext(AppContext);
    
    const handleSelect = useCallback(
        (opt: string) => {
            handleAnswer(opt, toWord, id);
        },
        [handleAnswer, toWord, id]
    );

    if (!contextValue) {
        throw new Error("QuizSliderItem must be used within AppProvider");
    }

    const { languagePair } = contextValue;
    if (!languagePair) return null;

    const { from } = languagePair;

    const question =
        quizPageText[from]?.question ?? "What is the meaning of";

    return (
        <section className="quiz-question">
            <h1>
                {question} "{fromWord}"?
            </h1>

            <form className="quiz-options">
                {shuffledOptions.map((opt) => (
                    <label className="option" key={`${id}-${opt}`}>
                        <input
                            type="radio"
                            name={`question-${id}`}
                            value={opt}
                            aria-label={opt}
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
