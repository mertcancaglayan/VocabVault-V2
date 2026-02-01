import { Request, Response } from "express";
import { Dictionary } from "../../models/Dictionary";

export const patchWord = async (req: Request, res: Response) => {
	try {
		const updatedWord = await Dictionary.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true, runValidators: true },
		);

		if (!updatedWord) {
			return res.status(404).json({ message: "Word not found" });
		}

		res.status(200).json(updatedWord);
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ message: error.message });
		} else {
			res.status(400).json({ message: "Unknown error" });
		}
	}
};
