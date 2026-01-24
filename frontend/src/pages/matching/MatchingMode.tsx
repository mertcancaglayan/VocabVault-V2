import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import ContentState from "../../components/ui/contentState/ContentState";
import { useMatchingGame } from "../../hooks/useMatchingGame";
import "../matching/matchingMode.css";
import { buttonTexts } from "../../data/buttonTexts";
import { FaArrowRotateRight, FaHouse } from "react-icons/fa6";
import { useParams } from "../../hooks/useParams";

function MatchingMode() {
    const navigateTo = useNavigate();

    const {
        isLoading,
        error,
        gameWords,
        leftWords,
        rightWords,
        matchedIds,
        selectedLeft,
        selectedRight,
        isGameComplete,
        handleLeftClick,
        handleRightClick,

    } = useMatchingGame();

    const { category, from, to, difficulty } = useParams()

    function handleRetry() {
        navigateTo("/wordMatching", {
            state: { category, from, to, difficulty, intent: "retry" },
        });
    }

    function handleHome() {
        navigateTo("/");
    }

    const buttonText = buttonTexts[from]

    return (
        <main className="game-section">
            <Header />
            <ContentState
                isLoading={isLoading}
                error={error}
                isEmpty={gameWords.length === 0}
                loadingMsg="words"
            >
                {!isGameComplete ? (
                    <section className="matching-grid">
                        <ul className="word-list left-list">
                            {leftWords.map((w) => (
                                <li
                                    key={`from-${w.id}`}
                                    role="button"
                                    tabIndex={0}
                                    className={`word-item
                                            ${matchedIds.has(w.id) ? "matched" : ""}
                                            ${selectedLeft?.id === w.id ? "selected" : ""}
                                        `}
                                    onClick={() => handleLeftClick(w)}
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && handleLeftClick(w)
                                    }
                                >
                                    {w.word}
                                </li>
                            ))}
                        </ul>

                        <ul className="word-list right-list">
                            {rightWords.map((w) => (
                                <li
                                    key={`to-${w.id}`}
                                    role="button"
                                    tabIndex={0}
                                    className={`word-item
                                            ${matchedIds.has(w.id) ? "matched" : ""}
                                            ${selectedRight?.id === w.id ? "selected" : ""}
                                        `}
                                    onClick={() => handleRightClick(w)}
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && handleRightClick(w)
                                    }
                                >
                                    {w.word}
                                </li>
                            ))}
                        </ul>
                    </section>

                ) : (
                    <section className="complete-state">
                        <p className="complete-message">
                            🎉 Congrats, you matched all words!
                        </p>

                        <div className="controls">
                            <button
                                className="btn-primary"
                                onClick={handleRetry}
                            >
                                {buttonText.retry}  <FaArrowRotateRight />

                            </button>
                            <button className="btn-primary" onClick={handleHome}>
                                {buttonText.home} <FaHouse />
                            </button>
                        </div>
                    </section>
                )}

            </ContentState>
        </main>
    );
}

export default MatchingMode;
