import { useState } from "react";
import "./FlashCard.css"
import type { WordItem } from "../../models/models";
import { useLanguagePair } from "../../hooks/useLanguagePair";

function FlashCard({
	fromWord,
	toWord,
	examples,
	phonetics }: WordItem) {
	const [isFlipped, setIsFlipped] = useState(false);

	function flipCard() {
		setIsFlipped((prev) => !prev);
	}

	const { from, to } = useLanguagePair()

	return (
		<article className={`flashcard-inner ${isFlipped ? "flipped" : ""}`}>
			<div onClick={flipCard} className="card-side card-front">
				<div className="language-label">{to}</div>
				<div className="word">	{toWord}</div>
				<div className="phonetic" >{phonetics.toWordPhonetic}</div>
				<div className="example">{examples.to}</div>
				<div className="hint">Click to return to <span><strong><i>{from.toUpperCase()}</i></strong></span></div>
			</div>
			<div onClick={flipCard} className="card-side  card-back">
				<div className="language-label">{from}</div>
				<div className="word">{fromWord}</div>
				<div className="phonetic" >{phonetics.fromWordPhonetic}</div>
				<div className="example" >{examples.from}</div>
				<div className="hint">Click to see <span><strong><i>{to.toUpperCase()}</i></strong></span> translation</div>
			</div>
		</article>


	);
}

export default FlashCard;

