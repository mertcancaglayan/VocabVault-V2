import express, { Router } from "express";
import cors from "cors";
import { authAdmin } from "../../middleware/auth";
import { patchWord } from "../../controllers/admin_controllers/patchWord";
import { postWord } from "../../controllers/admin_controllers/postWord";
import { deleteWord } from "../../controllers/admin_controllers/deleteWord";
import { getWords } from "../../controllers/wordsController";

const router: Router = express.Router();

const allowedOrigins = [process.env.ADMIN_URL, process.env.ADMIN_URL_PROD];

const adminCors = cors({
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	allowedHeaders: ["Content-Type", "x-api-key"],
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
	credentials: true,
});

router.options("*", adminCors);
router.use(adminCors);

router.get("/", authAdmin, getWords);
router.post("/", authAdmin, postWord);
router.patch("/:id", authAdmin, patchWord);
router.delete("/:id", authAdmin, deleteWord);

export default router;
