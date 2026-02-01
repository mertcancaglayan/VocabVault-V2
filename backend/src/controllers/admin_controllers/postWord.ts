import { Request, Response } from "express";
import { Dictionary } from "../../models/Dictionary";

export const postWord = async (req: Request, res: Response) => {
	try {
		const newWord = req.body;

		if (!newWord) {
			return res.status(400).json({ message: "Word is required" });
		}
		
		const word = new Dictionary(newWord);
		await word.save();

		res.status(201).json(word);
	} catch (error: any) {
		if (error?.name === "ValidationError") {
			return res.status(400).json({ message: "Invalid word payload" });
		}
		res.status(500).json({ message: "Failed to add word" });
	}
};
