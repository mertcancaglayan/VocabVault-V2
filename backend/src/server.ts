import express, {Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { config } from "./config/config"; 
import  wordsRoute from "./routes/dictionaryRoutes";
import categoriesRoute  from "./routes/categoryRoute";

dotenv.config();

const app = express();
const PORT = config.port;

connectDB();

const allowedOrigin = config.frontUrl && config.mobileTestUrl;

app.use( cors({ origin: allowedOrigin, methods: ["GET"], credentials: true, }), );

app.use(express.json());


app.use("/api/v1/words", wordsRoute);
app.use("/api/v1/categories", categoriesRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
