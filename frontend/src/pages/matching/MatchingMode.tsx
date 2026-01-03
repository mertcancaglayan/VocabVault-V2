import Header from "../../components/header/Header"
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

    if (isLoading) return <p>Loading questions...</p>;
    if (error) return <p>Error loading quiz: {error.message}</p>;
    if (gameWords.length === 0) return <p>No questions available for this category.</p>;

    return (
        <main className="game-section">
            <Header />
            <section className="matching-grid">

                {isGameComplete === false ? (
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
                    <p className="complete-message">🎉 Congrats, you matched all words!</p>
                )}

            </section>
        </main>
    );
}

export default MatchingMode;
