import type { JSX } from "react";

export interface GameMode {
	name: string;
	key: string;
	icon: JSX.Element;
}

export const gameModes: GameMode[] = [
	{
		name: "Quiz",
		key: "quiz",
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentColor" width="40" height="40">
				<circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="4" fill="none" />
				<path d="M32 20c-4 0-6 2-6 6 0 3 3 5 6 5s6 2 6 5c0 2-2 3-2 3" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
				<circle cx="32" cy="46" r="2" fill="currentColor" />
			</svg>

		),
	},
	{
		name: "Flash Cards",
		key: "flashCards",
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentColor" width="40" height="40">
				<rect x="14" y="14" width="36" height="36" rx="4" ry="4" stroke="currentColor" strokeWidth="4" fill="none" />
				<rect x="20" y="20" width="36" height="36" rx="4" ry="4" stroke="currentColor" strokeWidth="4" fill="none" />
			</svg>

		),
	},
	{
		name: "Word Matching",
		key: "wordMatching",
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="currentColor" width="40" height="40">
				<rect x="12" y="20" width="20" height="40" rx="4" ry="4" stroke="currentColor" strokeWidth="4" fill="none" />
				<rect x="32" y="20" width="20" height="40" rx="4" ry="4" stroke="currentColor" strokeWidth="4" fill="none" />
				<line x1="28" y1="32" x2="36" y2="32" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
				<line x1="28" y1="36" x2="36" y2="36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
			</svg>

		),
	},
];

export function getGameModes(): GameMode[] {
	return gameModes;
}
