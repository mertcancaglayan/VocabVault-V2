import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { config } from "./config/config"; 

dotenv.config();

const app = express();
const PORT = config.port;

connectDB();

const allowedOrigin = config.frontUrl;

app.use( cors({ origin: allowedOrigin, methods: ["GET"], credentials: true, }), );

app.use(express.json());

// Routes (uncomment when ready)
// import { wordsRoute } from "./routes/wordsRoutes.js";
// import { categoriesRoute } from "./routes/categoriesRoute.js";
// app.use("/api/v1/words", wordsRoute);
// app.use("/api/v1/categories", categoriesRoute);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
