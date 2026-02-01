import { Request, Response } from "express";
import { Dictionary } from "../../models/Dictionary";

export const deleteWord = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const deletedItem = await Dictionary.findByIdAndDelete(id);

		if (!deletedItem) {
			return res.status(404).json({ message: "Word not found" });
		}

		return res.status(200).json({
			message: "Word deleted successfully",
			id,
		});
	} catch (error) {
		console.error("deleteWord failed", error);
		return res.status(500).json({ message: "Server error" });
	}
};
