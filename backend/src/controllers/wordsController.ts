import { Request, Response } from "express";
import { Dictionary, IWord } from "../models/Dictionary";
import { shuffle } from "../utils/shuffle";

const ALLOWED_LANGUAGES = ["en", "tr", "pl"];

const ITEM_PER_PAGE = 20;

export const getWords = async (req: Request, res: Response): Promise<void> => {
	try {
		const page = parseInt(req.query.page as string) || 1;

		const dictionary = await Dictionary.aggregate([
			{
				$facet: {
					metadata: [{ $count: "totalCount" }],
					data: [{ $skip: (page - 1) * ITEM_PER_PAGE }, { $limit: ITEM_PER_PAGE }],
				},
			},
		]);

		const totalCount = dictionary[0].metadata[0] ? dictionary[0].metadata[0].totalCount : 0;
		const totalPages = Math.ceil(totalCount / ITEM_PER_PAGE);

		res.status(200).json({ words: dictionary[0].data, totalCount, totalPages });
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

interface Examples {
	from: string;
	to: string;
}

interface Phonetics {
	fromWordPhonetic: string;
	toWordPhonetic: string;
}

export interface IFormattedWord {
	id: string;
	fromWord: string;
	toWord: string;
	wrongWords: string[];
	examples: Examples;
	phonetics: Phonetics;
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
		const fromWord: string = word.translations[lang1];
		const toWord: string = word.translations[lang2];
		const exampleFrom: string = word.example[lang1];
		const exampleTo: string = word.example[lang2];
		const examples: Examples = {
			from: exampleFrom,
			to: exampleTo,
		};
		const phonetics: Phonetics = {
			fromWordPhonetic: word.phonetics[lang1],
			toWordPhonetic: word.phonetics[lang2],
		};

		if (fromWord && toWord) {
			const wrongWords: string[] = getRandomWrongWords(toWord, allToWords);
			const id: string = word._id;

			words.push({
				id,
				fromWord,
				toWord,
				wrongWords,
				examples,
				phonetics,
			});
		}
	});

	return shuffle(words);
};
