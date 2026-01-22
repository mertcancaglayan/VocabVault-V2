import { useState, useEffect, useMemo } from "react";
import { useWords } from "./useWords";
import { shuffle } from "../utils/shuffle";
import { useParams } from "./useParams";

const MATCHING_GAME_LIMIT = 10;

interface SelectedWord {
	id: string;
	word: string;
	matched: boolean;
}

export function useMatchingGame() {
	const { category, from, to, difficulty } = useParams();

	const { words: allWords, isLoading, error } = useWords(category, from, to, difficulty);

	const [leftWords, setLeftWords] = useState<SelectedWord[]>([]);
	const [rightWords, setRightWords] = useState<SelectedWord[]>([]);
	const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());

	const [selectedLeft, setSelectedLeft] = useState<SelectedWord | null>(null);
	const [selectedRight, setSelectedRight] = useState<SelectedWord | null>(null);

	const gameWords = useMemo(() => {
		return allWords.slice(0, MATCHING_GAME_LIMIT);
	}, [allWords]);

	useEffect(() => {
		if (gameWords.length === 0) return;

		const left = gameWords.map((w) => ({
			id: w.id,
			word: w.fromWord,
			matched: false,
		}));

		const right = shuffle(gameWords).map((w) => ({
			id: w.id,
			word: w.toWord,
			matched: false,
		}));

		setLeftWords(left);
		setRightWords(right);
		setMatchedIds(new Set());
		setSelectedLeft(null);
		setSelectedRight(null);
	}, [gameWords]);

	const handleLeftClick = (w: SelectedWord) => {
		if (w.matched || matchedIds.has(w.id)) return;
		setSelectedLeft(w);

		if (selectedRight) {
			checkMatch(w, selectedRight);
		}
	};

	const handleRightClick = (w: SelectedWord) => {
		if (w.matched || matchedIds.has(w.id)) return;
		setSelectedRight(w);

		if (selectedLeft) {
			checkMatch(selectedLeft, w);
		}
	};

	function checkMatch(left: SelectedWord, right: SelectedWord) {
		if (left.id === right.id) {
			setMatchedIds((prev) => new Set([...prev, left.id]));
			setSelectedLeft(null);
			setSelectedRight(null);
		} else {
			setTimeout(() => {
				setSelectedLeft(null);
				setSelectedRight(null);
			}, 500);
		}
	}

	const isGameComplete = gameWords.length > 0 && matchedIds.size === gameWords.length;

	return {
		isLoading,
		error,
		gameWords: allWords,
		leftWords,
		rightWords,
		matchedIds,
		selectedLeft,
		selectedRight,
		handleLeftClick,
		handleRightClick,
		isGameComplete,
	};
}
