import express, { Router } from "express";
import { getDictionary, getWordsByCategory } from "../controllers/wordsController";

const router: Router = express.Router();

router.get("/", getDictionary);

router.get("/category/:category/lang/:langPair/difficulty/:difficulty", getWordsByCategory);

export default router;
