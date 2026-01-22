import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import "../../src/index.css";
import CategoryContainer from "../components/categories/CategoryContainer";
import GameModesComponent from "../components/gameModes/GameModes";
import Header from "../components/header/Header";
import GreetingsSection from "../components/greetings/Greetings";
import { useGreetingState } from "../hooks/useGreetingState";
import GameStartSection from "../components/gameStartSection/GameStartSection";
import type { allowedLangs } from "../models/models";
import { useAppContext } from "../hooks/useAppContext";

function Home() {
    const navigate = useNavigate();
    const { isGreeted, handleContinue } = useGreetingState();

    const contextValue = useAppContext()

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