import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { config } from "./config/config";
import wordsRoute from "./routes/dictionaryRoutes";
import categoriesRoute from "./routes/categoryRoute";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

dotenv.config();

const app = express();

connectDB();

app.use(helmet());
app.use(mongoSanitize());

const allowedOrigins = [config.frontUrl, config.mobileTestUrl].filter(Boolean);
app.use(
	cors({
		origin: allowedOrigins,
		methods: ["GET"],
		credentials: true,
	}),
);

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: "draft-7",
	legacyHeaders: false,
	message: { message: "Too many requests, please try again later." },
});

app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/words", wordsRoute);
app.use("/api/v1/categories", categoriesRoute);

app.get("/", (req: Request, res: Response) => {
	res.send("API is running 🚀");
});

const PORT = config.port;
app.listen(PORT, () => {
	console.log(`✅ Server is running on port ${PORT}`);
});
