import { useContext } from "react"
import AppContext from "../../context/AppContext"
import "../progressBar/ProgressBar.css"

function ProgressBar() {
    const contextValue = useContext(AppContext);
    if (!contextValue) throw new Error("ProgressBar must be used within AppProvider");

    const { currentSlideIndex, totalQuestions } = contextValue;

    const progressPercentage = totalQuestions > 0 ? ((currentSlideIndex + 1) / totalQuestions) * 100 : 0;

    return (
        <div className="quiz-progress">
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="progress">
                {currentSlideIndex + 1} / {totalQuestions}
            </div>
        </div>
    )
}

export default ProgressBar
