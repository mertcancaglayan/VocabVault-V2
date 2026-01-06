import { useContext, useState } from 'react';
import { getGameModes, type GameMode } from '../../data/gameModes';
import "../gameModes/GameModes.css";
import AppContext from '../../context/AppContext';

function GameModesComponent() {
    const [gameModes] = useState<GameMode[]>(() => getGameModes());
    const contextValue = useContext(AppContext);

    if (!contextValue) {
        throw new Error("GameModesComponent must be used within AppProvider");
    }

    const { gameMode, setGameMode } = contextValue;

    function switchGameMode(mode: GameMode) {
        setGameMode(mode);
    }

    return (
        <section className='gameModes'>
            <ul>
                {gameModes.map((mode) => (
                    <li className='gameModesItem' key={mode.key}>
                        <button className={gameMode?.key === mode.key ? "active" : ""} onClick={() => switchGameMode(mode)}>
                            {mode.icon} {mode.name}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default GameModesComponent;
