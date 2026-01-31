import express, { Router } from "express";
import cors from "cors";
import { getDictionary } from "../../controllers/wordsController";
import { authAdmin } from "../../middleware/auth";
import { patchWord } from "../../controllers/admin_controllers/patchWord";
import { postWord } from "../../controllers/admin_controllers/postWord";
import { deleteWord } from "../../controllers/admin_controllers/deleteWord";

const router: Router = express.Router();

const allowedOrigins = ["http://localhost:5174", "http://localhost:5500", "http://127.0.0.1:5500"];

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

router.get("/", getDictionary);
router.post("/", authAdmin, postWord);
router.patch("/:id", authAdmin, patchWord);
router.delete("/:id", authAdmin, deleteWord);

export default router;
