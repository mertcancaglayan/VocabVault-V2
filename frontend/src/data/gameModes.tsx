import type { JSX } from "react";
import { MdQuiz } from "react-icons/md";
import { TbCards, TbArrowsJoin2 } from "react-icons/tb";

export interface GameMode {
	name: gameModeNames;
	key: string;
	icon: JSX.Element;
}

interface gameModeNames {
	en: string,
	tr: string,
	pl: string
}

export const gameModes: GameMode[] = [
	{
		name: {
			en: "Quiz",
			tr: "Test",
			pl: "Kwiz"
		},
		key: "quiz",
		icon: <MdQuiz size={40} />,
	},
	{
		name: {
			en: "Flash Cards",
			tr: "Flaş Kartlar",
			pl: "Karty Flash"
		},
		key: "flashCards",
		icon: <TbCards size={40} />,
	},
	{
		name: {
			en: "Word Matching",
			tr: "Kelime Eşleştirme",
			pl: "Dopasowanie słów"
		},

		key: "wordMatching",
		icon: <TbArrowsJoin2 size={40} />,
	},
];

export function getGameModes(): GameMode[] {
	return gameModes;
}