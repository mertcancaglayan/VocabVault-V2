import type { ShuffledWord } from "../../../hooks/useWords";

interface QuizSliderItemProps extends ShuffledWord {
    handleAnswer: (selected: string, correct: string, id: string) => void;
}

function QuizSliderItem({ shuffledOptions, from, to, id, handleAnswer }: QuizSliderItemProps) {

    function handleSelect(opt: string) {
        handleAnswer(opt, to, id);
    }

    return (
        <section className="quiz-question" key={id}>
            <h1>
                Which word means "{from}"?
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
