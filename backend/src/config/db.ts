import mongoose from "mongoose";
import { config } from "./config";

export const connectDB = async (): Promise<void> => {
	try {
		if (!config.atlasUrl) {
			throw new Error("Missing ATLAS_URL in environment variables");
		}

		await mongoose.connect(config.atlasUrl);
		console.log("✅ MongoDB connected successfully");
	} catch (error: any) {
		console.error("❌ MongoDB connection error:", error.message);
		process.exit(1);
	}
};
