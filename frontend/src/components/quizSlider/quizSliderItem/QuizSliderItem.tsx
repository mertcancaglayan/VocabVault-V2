import type { WordItem } from "../../../api/api"
import { shuffle } from "../../../utils/shuffle";


function QuizSliderItem({ wrongWords, from, to, id }: WordItem) {

    const options = [to, ...wrongWords];
    const shuffled = shuffle(options);




    return (
        <section className="quiz-question" key={id}>
            <h1>
                Which word means "{from}"?
            </h1>

            <form className="quiz-options">
                {
                    shuffled.map((opt, i) => (
                        <label className="option" key={i}>
                            <input
                                type="radio"
                                name={`question-${id}`}
                            />
                            <span className="option-text">{opt}</span>
                        </label>
                    ))}
            </form>
        </section>
    )
}

export default QuizSliderItem
