import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import "../../src/index.css";
import CategoryContainer from "../components/categories/CategoryContainer";
import GameModesComponent from "../components/gameModes/GameModes";
import Header from "../components/header/Header";
import GreetingsSection from "../components/greetings/Greetings";
import { useGreetingState } from "../hooks/useGreetingState";
import GameStartSection from "../components/gameStartSection/GameStartSection";
import { useAppContext } from "../hooks/useAppContext";
import { useLanguagePair } from "../hooks/useLanguagePair";

function Home() {
    const navigate = useNavigate();
    const { isGreeted, handleContinue } = useGreetingState();

    const contextValue = useAppContext()
    const { category, gameMode, difficulty } = contextValue;

    const { from, to } = useLanguagePair();

    const handleStartGame = useCallback(() => {
        if (gameMode) {
            navigate(`/${gameMode.key}`, {
                state: { category, from, to, difficulty },
            });
        }
    }, [gameMode, navigate, category, from, to, difficulty]);

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