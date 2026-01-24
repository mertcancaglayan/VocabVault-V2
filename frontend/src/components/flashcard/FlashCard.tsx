import { useEffect, useState } from "react";
import "./FlashCard.css"
import type { WordItem } from "../../models/models";
import { useLanguagePair } from "../../hooks/useLanguagePair";
import { FaVolumeLow } from "react-icons/fa6";

const langMap: Record<string, string> = {
	en: "en-US",
	tr: "tr-TR",
	pl: "pl-PL",
};

function FlashCard({
	fromWord,
	toWord,
	examples,
	phonetics }: WordItem) {
	const [isFlipped, setIsFlipped] = useState(false);
	const [fromVoice, setFromVoice] = useState(false);
	const [toVoice, setToVoice] = useState(false);

	function flipCard() {
		setIsFlipped((prev) => !prev);
	}

	const { from, to } = useLanguagePair()


	useEffect(() => {
		const updateVoices = () => {
			const voices = window.speechSynthesis.getVoices();

			const fromVoiceMatch = voices.some(v => v.lang === langMap[from]);
			const toVoiceMatch = voices.some(v => v.lang === langMap[to]);

			if (fromVoiceMatch) setFromVoice(fromVoiceMatch);
			if (toVoiceMatch) setToVoice(toVoiceMatch);
		};

		updateVoices();

		window.speechSynthesis.onvoiceschanged = updateVoices;

		return () => {
			window.speechSynthesis.onvoiceschanged = null;
		};
	}, [from, to]);


	function speak(word: string, lang: string) {
		const targetLang = langMap[lang];
		const utterance = new SpeechSynthesisUtterance(word);
		utterance.lang = targetLang;
		utterance.rate = 0.9;

		window.speechSynthesis.cancel();
		window.speechSynthesis.speak(utterance);
	}
	return (
		<article className={`flashcard-inner ${isFlipped ? "flipped" : ""}`}>
			<div onClick={flipCard} className="card-side card-front">
				<div className="language-label">{to}</div>
				<div className="word">	{toWord}</div>
				<div className="phonetic" >{phonetics.toWordPhonetic}</div>
				<div className="example">{examples.to}</div>
				<div className="hint">Click for pronunciation <span><strong><i>{to.toUpperCase()}</i></strong></span>
					{toVoice && <FaVolumeLow
						onClick={(e) => {
							e.stopPropagation();
							speak(toWord, to);
						}}
					/>}

				</div>

			</div>
			<div onClick={flipCard} className="card-side  card-back">
				<div className="language-label">{from}</div>
				<div className="word">{fromWord}</div>
				<div className="phonetic" >{phonetics.fromWordPhonetic}</div>
				<div className="example" >{examples.from}</div>
				<div className="hint">Click for pronunciation <span><strong><i>{from.toUpperCase()}</i></strong></span> {fromVoice && <FaVolumeLow
					onClick={(e) => {
						e.stopPropagation();
						speak(fromWord, from);
					}}
				/>}</div>
			</div>
		</article>


	);
}

export default FlashCard;

