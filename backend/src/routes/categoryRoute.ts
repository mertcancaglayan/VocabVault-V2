import express, { Router } from "express";
import { getCategories } from "../controllers/categoriesController";

const router: Router = express.Router();

router.get("/", getCategories);

export default router;
