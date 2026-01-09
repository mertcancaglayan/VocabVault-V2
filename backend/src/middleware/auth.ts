import { Request, Response, NextFunction } from "express";

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
	const receivedKey = req.headers["x-api-key"];
	const secretKey = process.env.ADMIN_API_KEY!;

	if (!receivedKey || receivedKey !== secretKey) {
		return res.status(403).send("Forbidden: Wrong API Key");
	}

	next();
};
