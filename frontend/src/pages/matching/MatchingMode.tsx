import Header from "../../components/header/Header"
import ContentState from "../../components/ui/contentState/ContentState";
import { useMatchingGame } from "../../hooks/useMatchingGame";
import "../matching/matchingMode.css"

function MatchingMode() {
    const {
        isLoading,
        error,
        gameWords,
        leftWords,
        rightWords,
        matchedIds,
        selectedLeft,
        selectedRight,
        handleLeftClick,
        handleRightClick,
        isGameComplete
    } = useMatchingGame();

    return (
        <main className="game-section">
            <Header />

            <ContentState
                isLoading={isLoading}
                error={error}
                isEmpty={gameWords.length === 0}
                loadingMsg="words"
            >
                <section className="matching-grid">
                    {!isGameComplete ? (
                        <>
                            <ul className="word-list left-list">
                                {leftWords.map((w) => (
                                    <li
                                        key={`from-${w.id}`}
                                        className={`word-item 
                                    ${matchedIds.has(w.id) ? "matched" : ""} 
                                    ${selectedLeft?.id === w.id ? "selected" : ""}
                                `}
                                        onClick={() => handleLeftClick(w)}
                                    >
                                        {w.word}
                                    </li>
                                ))}
                            </ul>

                            <ul className="word-list right-list">
                                {rightWords.map((w) => (
                                    <li
                                        key={`to-${w.id}`}
                                        className={`word-item 
                                    ${matchedIds.has(w.id) ? "matched" : ""} 
                                    ${selectedRight?.id === w.id ? "selected" : ""}
                                `}
                                        onClick={() => handleRightClick(w)}
                                    >
                                        {w.word}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p className="complete-message">
                            🎉 Congrats, you matched all words!
                        </p>
                    )}
                </section>
            </ContentState>
        </main>

    );
}

export default MatchingMode;
