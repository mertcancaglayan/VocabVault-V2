// import GreetingsSection from '../components/greetings/Greetings'
import { useNavigate } from "react-router-dom";
import "../../src/index.css";
import CategoryContainer from "../components/categories/CategoryContainer";
import GameModesComponent from "../components/gameModes/GameModes";
import Header from '../components/header/Header';
import { useContext } from "react";
import AppContext from "../context/AppContext";


function Home() {
    const navigateToQuiz = useNavigate();

    const contextValue = useContext(AppContext);
    if (!contextValue) throw new Error("CategoryContainer must be used within AppProvider");

    const { category, languagePair, gameMode } = contextValue;


    if (!languagePair) return;

    const { from, to } = languagePair;

    


    return (
        <main>

            <Header></Header>
            {/* <GreetingsSection></GreetingsSection> */}
            <GameModesComponent></GameModesComponent>
            <CategoryContainer></CategoryContainer>
            <button
                onClick={() => {
                    if (gameMode) {
                        navigateToQuiz(`/${gameMode.key}`, {
                            state: { category, from, to },
                        })
                    }
                }}
                disabled={!category || !gameMode}
            >Go To Mode</button>

        </main>
    )
}

export default Home
