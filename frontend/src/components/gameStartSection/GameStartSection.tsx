import { FaPlay } from "react-icons/fa6";
import { buttonTexts } from "../../data/buttonTexts";
import type { allowedLangs, Subcategory } from "../../models/models";
import type { GameMode } from "../../data/gameModes";

interface GameStartSectionProps {
    fromLang: allowedLangs;
    category: Subcategory | null;
    gameMode: GameMode | null;
    onStart: () => void;
}

function GameStartSection({ fromLang, category, gameMode, onStart }: GameStartSectionProps) {

    const actionButtonText = buttonTexts[fromLang].start

    return (
        <button className="btn-primary start-game-btn"
            onClick={onStart}
            disabled={!category || !gameMode}
        >
            {actionButtonText} <FaPlay />
        </button>
    )
}

export default GameStartSection
