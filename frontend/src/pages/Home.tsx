import { useNavigate } from "react-router-dom";
import "../../src/index.css";
import CategoryContainer from "../components/categories/CategoryContainer";
import GameModesComponent from "../components/gameModes/GameModes";
import Header from "../components/header/Header";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import GreetingsSection from "../components/greetings/Greetings";
import { buttonTexts } from "../data/buttonTexts";
import { FaPlay } from "react-icons/fa";
import { useGreetingState } from "../hooks/useGreetingState";

function Home() {
    const navigate = useNavigate();
    const { isGreeted, handleContinue } = useGreetingState()

    const contextValue = useContext(AppContext);
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
