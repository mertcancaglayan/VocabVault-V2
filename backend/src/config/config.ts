import dotenv from "dotenv";

dotenv.config();

interface Config {
	port: number;
	nodeEnv: string;
	atlasUrl: string;
	frontUrl: string;
	mobileTestUrl: string;
	adminUrl: string;
	frontUrlDev: string;
}

export const config: Config = {
	port: Number(process.env.PORT) || 3000,
	nodeEnv: process.env.NODE_ENV || "development",
	atlasUrl: process.env.ATLAS_URL || "",
	frontUrl: process.env.FRONT_URL || "",
	frontUrlDev: process.env.FRONT_URL_DEV || "",
	mobileTestUrl: process.env.MODEL_TEST_URL || "",
	adminUrl: process.env.ADMIN_URL || "",
};
