import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { config } from "./config/config";
import wordsRoute from "./routes/dictionaryRoutes";
import adminRoute from "./routes/admin/adminRoute";
import categoriesRoute from "./routes/categoryRoute";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10kb" }));

connectDB();

app.use(helmet());
app.use(mongoSanitize());

const allowedOrigins = [config.frontUrl, config.mobileTestUrl, config.frontUrlDev].filter(Boolean);

const publicCors = cors({
	origin: allowedOrigins,
	methods: ["GET"],
	credentials: true,
});

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: "draft-7",
	legacyHeaders: false,
	message: { message: "Too many requests, please try again later." },
});

app.use("/api", limiter);

app.use("/api/v1/words", publicCors, wordsRoute);
app.use("/api/v1/admin/words", adminRoute);
app.use("/api/v1/categories", publicCors, categoriesRoute);

app.get("/", (req: Request, res: Response) => {
	res.send("API is running 🚀");
});

const PORT = config.port;
app.listen(PORT, () => {
	console.log(`✅ Server is running on port ${PORT}`);
});
