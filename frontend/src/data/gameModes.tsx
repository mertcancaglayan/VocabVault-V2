import type { JSX } from "react";
import { FaArrowsLeftRightToLine, FaClipboardQuestion, FaCreditCard } from "react-icons/fa6";

export interface GameMode {
	name: gameModeNames;
	key: string;
	icon: JSX.Element;
}

type gameModeNames = {
	en: string,
	tr: string,
	pl: string
}

export const gameModes: GameMode[] = [
	{
		name: {
			en: "Quiz",
			tr: "Test",
			pl: "Quiz"
		},
		key: "quiz",
		icon: <FaClipboardQuestion size={40} />
	},
	{
		name: {
			en: "Flash Cards",
			tr: "Flaş Kartlar",
			pl: "Fiszki"
		},
		key: "flashCards",
		icon: <FaCreditCard size={40} />,
	},
	{
		name: {
			en: "Word Matching",
			tr: "Kelime Eşleştirme",
			pl: "Dopasowanie słów"
		},

		key: "wordMatching",
		icon: <FaArrowsLeftRightToLine size={40} />,
	},
];

export function getGameModes(): GameMode[] {
	return gameModes;
}