import { useEffect, useState } from "react";
import Header from "../../components/header/Header"
import { useQuizWords } from "../../hooks/useQuizWords"
import "../matching/matchingMode.css"
import { useLocation } from "react-router-dom";
import { shuffle } from "../../utils/shuffle";


interface SelectedWord {
    id: string;
    word: string;
    matched: boolean;
}

function MatchingMode() {
    const [isGameComplete, setIsGameComplete] = useState<boolean>(false)
    const [leftWords, setLeftWords] = useState<SelectedWord[]>([]);
    const [rightWords, setRightWords] = useState<SelectedWord[]>([]);
    const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());

    const [selectedLeft, setSelectedLeft] = useState<SelectedWord | null>(null);
    const [selectedRight, setSelectedRight] = useState<SelectedWord | null>(null);

    const location = useLocation();
    const { category, from, to } = location.state || {};

    const fromLangSafe = from || localStorage.getItem("wordvault_fromLang");
    const toLangSafe = to || localStorage.getItem("wordvault_toLang");
    const categorySafe = category || "colors";

    const { words, isLoading, error } = useQuizWords(
        categorySafe,
        fromLangSafe,
        toLangSafe
    );

    useEffect(() => {
        if (!words || words.length === 0) return;

        const left = words.map(w => ({
            id: w.id,
            word: w.from,
            matched: false
        }));

        const right = shuffle(words).map(w => ({
            id: w.id,
            word: w.to,
            matched: false
        }));

        setLeftWords(left);
        setRightWords(right);
    }, [words]);

    const handleLeftClick = (w: SelectedWord) => {
        if (w.matched) return
        setSelectedLeft(w)

        if (selectedRight) {
            checkMatch(w, selectedRight)
        }
    }

    const handleRightClick = (w: SelectedWord) => {
        if (w.matched) return
        setSelectedRight(w)

        if (selectedLeft) {
            checkMatch(selectedLeft, w)
        }
    }

    function checkMatch(left: SelectedWord, right: SelectedWord) {
        if (left.id === right.id) {
            setMatchedIds(prev => new Set([...prev, left.id]));
            setSelectedLeft(null);
            setSelectedRight(null);
        } else {
            setTimeout(() => {
                setSelectedLeft(null);
                setSelectedRight(null);
            }, 500);
        }
    }



    useEffect(() => {
        if (matchedIds.size === words.length && words.length > 0) {
            setIsGameComplete(true);
        }
    }, [matchedIds, words]);


    if (isLoading) return <p>Loading questions...</p>;
    if (error) return <p>Error loading quiz: {error.message}</p>;
    if (words.length === 0) return <p>No questions available for this category.</p>;

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
