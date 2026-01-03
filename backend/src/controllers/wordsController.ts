import { Request, Response } from "express";
import { Dictionary, IDictionary, IWord } from "../models/Dictionary";
import { shuffle } from "../utils/shuffle";

const ALLOWED_LANGUAGES = ["en", "tr", "pl"];

export const getDictionary = async (req: Request, res: Response): Promise<void> => {
	try {
		const words: IWord[] = await Dictionary.find();

		const dictionary: IDictionary = { words };

		res.status(200).json(dictionary);
	} catch (error: any) {
		console.error("Error in get controller", error);
		res.status(500).json({ message: error.message });
	}
};

interface IParams {
	category: string;
	langPair: string;
	difficulty: string;
}

export interface IFormattedWord {
	id: string;
	from: string;
	to: string;
	wrongWords: string[];
	example: string;
}

export const getWordsByCategory = async (req: Request<IParams>, res: Response): Promise<void> => {
	try {
		const { category, langPair, difficulty } = req.params;

		if (!langPair || !langPair.includes("-")) {
			res.status(400).json({ message: "Invalid language format. Use 'lang1-lang2' (e.g., en-tr)." });
			return;
		}

		const [lang1, lang2] = langPair.split("-");

		if (!ALLOWED_LANGUAGES.includes(lang1) || !ALLOWED_LANGUAGES.includes(lang2)) {
			res.status(400).json({ message: "One or more specified languages are not supported." });
			return;
		}

		const safeCategory = String(category).toLowerCase();

		let level: String[] = [];

		switch (difficulty) {
			case "easy":
				level = ["A1", "A2", "B1"];
				break;
			case "normal":
				level = ["A2", "B1", "B2"];
				break;
			case "expert":
				level = ["B2", "C1", "C2"];
				break;
			case "random":
				level = ["A1", "A2", "B1", "B2", "C1", "C2"];
				break;
			default:
				break;
		}

		const dictionary: IWord[] = await Dictionary.find({
			sub_category_key: safeCategory.toLowerCase(),
			level: { $in: level },
		}).lean();

		if (!dictionary.length) {
			res.status(404).json({ message: `No words found for category: ${safeCategory}` });
			return;
		}

		const words: IFormattedWord[] = formatQuestions(dictionary, lang1, lang2);

		res.status(200).json({ words });
	} catch (error: any) {
		console.error("Error in getWordsByCategory:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const getRandomWrongWords = (correctWord: string, allWords: string[]): string[] => {
	const otherWords = allWords.filter((w) => w && w !== correctWord);

	return shuffle(otherWords).slice(0, 3);
};

const formatQuestions = (dictionary: IWord[], lang1: string, lang2: string): IFormattedWord[] => {
	const allToWords: string[] = dictionary.map((word) => word.translations?.[lang2]).filter(Boolean);

	const words: IFormattedWord[] = [];

	dictionary.forEach((word) => {
		const from: string = word.translations[lang1];
		const to: string = word.translations[lang2];
		const example: string = word.example[lang2];

		if (from && to) {
			const wrongWords: string[] = getRandomWrongWords(to, allToWords);
			const id: string = word._id;

			words.push({
				id,
				from,
				to,
				wrongWords,
				example,
			});
		}
	});

	return shuffle(words);
};
