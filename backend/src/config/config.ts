import dotenv from "dotenv";

dotenv.config();

interface Config {
	port: number;
	nodeEnv: string;
	atlasUrl: string;
	frontUrl: string;
}

export const config: Config = {
	port: Number(process.env.PORT) || 3000,
	nodeEnv: process.env.NODE_ENV || "development",
	atlasUrl: process.env.ATLAS_URL || "",
	frontUrl: process.env.FRONT_URL || "",
};
