import { useState } from "react";
import "./FlashCard.css"

function FlashCard({ frontText, backText }: { frontText: string; backText: string }) {
	const [isFlipped, setIsFlipped] = useState(false);

	function flipCard() {
		setIsFlipped((prev) => !prev);
	}

	return (
		<article className={`flashcard-inner ${isFlipped ? "flipped" : ""}`}>
			<div onClick={flipCard} className="front">
				{frontText}
			</div>
			<div onClick={flipCard} className="back">
				{backText}
			</div>
		</article>
	);
}

export default FlashCard;
