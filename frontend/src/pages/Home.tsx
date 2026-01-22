import { useNavigate } from "react-router-dom";
import "../../src/index.css";
import CategoryContainer from "../components/categories/CategoryContainer";
import GameModesComponent from "../components/gameModes/GameModes";
import Header from "../components/header/Header";
import { useCallback, useContext, useState } from "react";
import AppContext from "../context/AppContext";
import GreetingsSection from "../components/greetings/Greetings";
import { buttonTexts } from "../data/buttonTexts";
import { FaPlay } from "react-icons/fa";

function Home() {
    const [isGreeted, setIsGreeted] = useState(() => sessionStorage.getItem("greeted") === "true");
    const navigate = useNavigate();

    const contextValue = useContext(AppContext);

    const handleContinue = useCallback(() => {
        sessionStorage.setItem("greeted", "true")
        setIsGreeted(true)
    }, []);

    if (!contextValue) {
        throw new Error("Home must be used within AppProvider");
    }

    const { category, languagePair, gameMode, difficulty } = contextValue;

    if (!languagePair) return null;
    const { from, to } = languagePair;

    const actionButtonText = buttonTexts[from].start

    return (
        <main>
            <Header />
            {!isGreeted ? (
                <GreetingsSection fromLang={from} onContinue={handleContinue} />
            ) : (
                <>
                    <GameModesComponent fromLang={from} />
                    <CategoryContainer fromLang={from} />

                    <button className="btn-primary start-game-btn"
                        onClick={() => {
                            if (gameMode) {
                                navigate(`/${gameMode.key}`, {
                                    state: { category, from, to, difficulty },
                                });
                            }
                        }}
                        disabled={!category || !gameMode}
                    >
                        {actionButtonText} <FaPlay />
                    </button>
                </>
            )}
        </main>
    );
}

export default Home;
