import { useState } from 'react';
import { getGameModes, type GameMode } from '../../data/gameModes';
import "../gameModes/GameModes.css";
import type { allowedLangs } from '../../models/models';
import { useAppContext } from '../../hooks/useAppContext';


interface GameModesProps {
    fromLang: allowedLangs;
}

function GameModesComponent({ fromLang }: GameModesProps) {
    const [gameModes] = useState<GameMode[]>(() => getGameModes());
    
    const contextValue = useAppContext()

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
                            {mode.icon} {mode.name[fromLang]}
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default GameModesComponent;
