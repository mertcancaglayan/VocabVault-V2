import { quizPageText } from "../../../data/quizPageTexts";
import type { ShuffledWord } from "../../../hooks/useWords";
import type { allowedLangs } from "../../../models/models";


interface QuizSliderItemProps extends ShuffledWord {
    handleAnswer: (selected: string, correct: string, id: string) => void;
    fromLang: allowedLangs;
    selectedOption: string
}

function QuizSliderItem({ shuffledOptions, fromWord, toWord, id, handleAnswer, fromLang, selectedOption, examples }: QuizSliderItemProps) {
    function handleSelect(opt: string) {
        handleAnswer(opt, toWord, id);
    }

    const question = quizPageText[fromLang].question;
    const exampleSentence = examples.from


    return (
        <section className="quiz-question" key={id}>
            <div className="question-text">
                <h1>
                    {question} "{fromWord}"?

                </h1>
                <div>
                    <strong><i>E.G. </i></strong>&nbsp;
                    <span>{exampleSentence}</span>
                </div>
            </div>
            <form className="quiz-options">
                {shuffledOptions.map((opt, i) => (
                    <label className="option" key={i}>
                        <input
                            type="radio"
                            name={`${id}`}
                            value={opt}
                            checked={selectedOption === opt}
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
