import { Request, Response } from "express";
import { ICategory, Categories } from "../models/Category";

export const getCategories = async (req: Request, res: Response): Promise<void> => {
	try {
		const categories: ICategory[] = await Categories.find();
		res.status(200).json(categories);
	} catch (error: any) {
		console.error("Error in get controller", error);
		res.status(500).json({ message: error.message });
	}
};
