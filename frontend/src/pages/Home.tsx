import { useNavigate } from "react-router-dom";
import { useCallback, useContext } from "react";
import "../../src/index.css";
import CategoryContainer from "../components/categories/CategoryContainer";
import GameModesComponent from "../components/gameModes/GameModes";
import Header from "../components/header/Header";
import AppContext from "../context/AppContext";
import GreetingsSection from "../components/greetings/Greetings";
import { useGreetingState } from "../hooks/useGreetingState";
import GameStartSection from "../components/gameStartSection/GameStartSection";
import type { allowedLangs } from "../models/models";

function Home() {
    const navigate = useNavigate();
    const { isGreeted, handleContinue } = useGreetingState();

    const contextValue = useContext(AppContext);
    if (!contextValue) {
        throw new Error("Home must be used within AppProvider");
    }

    const { category, languagePair, gameMode, difficulty } = contextValue;

    const { from = "en" as allowedLangs, to = "tr" as allowedLangs } = languagePair || {};

    const handleStartGame = useCallback(() => {
        if (gameMode) {
            navigate(`/${gameMode.key}`, {
                state: { category, from, to, difficulty },
            });
        }
    }, [gameMode, navigate, category, from, to, difficulty]);

    if (!languagePair) return null;

    return (
        <main>
            <Header />
            {!isGreeted ? (
                <GreetingsSection fromLang={from} onContinue={handleContinue} />
            ) : (
                <>
                    <GameModesComponent fromLang={from} />
                    <CategoryContainer fromLang={from} />
                    <GameStartSection
                        fromLang={from}
                        category={category}
                        gameMode={gameMode}
                        onStart={handleStartGame}
                    />
                </>
            )}
        </main>
    );
}

export default Home;