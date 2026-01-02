import type { JSX } from "react";
// We use Material Design (Md) for the standard Quiz icon
// We use Tabler Icons (Tb) for Cards and Matching as they have the best specific visuals
import { MdQuiz } from "react-icons/md";
import { TbCards, TbArrowsJoin2 } from "react-icons/tb";

export interface GameMode {
	name: string;
	key: string;
	icon: JSX.Element;
}

export const gameModes: GameMode[] = [
	{
		name: "Quiz",
		key: "quiz",
		icon: <MdQuiz size={40} />,
	},
	{
		name: "Flash Cards",
		key: "flashCards",
		icon: <TbCards size={40} />,
	},
	{
		name: "Word Matching",
		key: "wordMatching",
		icon: <TbArrowsJoin2 size={40} />,
	},
];

export function getGameModes(): GameMode[] {
	return gameModes;
}