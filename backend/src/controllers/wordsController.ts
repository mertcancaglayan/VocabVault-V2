import { Request, Response } from "express";
import { Dictionary, IDictionary, IWord } from "../models/Dictionary";
import { ICategory } from "../models/Category";
import { shuffle } from "../utils/shuffle";

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
}

export interface IFormattedWord {
	id: string;
	from: string;
	to: string;
	partOfSpeech?: string;
	wrongWords: string[];
}

export const getWordsByCategory = async (req: Request<IParams>, res: Response): Promise<void> => {
	try {
		const { category, langPair } = req.params;

		const [lang1, lang2] = langPair.split("-");

		const dictionary: IWord[] = await Dictionary.find({ category: category.toLowerCase() }).lean();

		if (!dictionary.length) {
			res.status(404).json({ message: `No words found for category: ${category}` });
		}

		const words: IFormattedWord[] = formatQuestions(dictionary, lang1, lang2);
		res.status(200).json({ words });
	} catch (error: any) {
		console.error("Error in getWordsByCategory", error);
		res.status(500).json({ message: error.message });
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


		if (from && to) {
			const wrongWords: string[] = getRandomWrongWords(to, allToWords);
			const id: string = word._id;

			words.push({
				id,
				from,
				to,
				partOfSpeech: word.partOfSpeech || "",
				wrongWords,
			});
		}
	});

	return words;
};
