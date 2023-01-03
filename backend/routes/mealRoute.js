import express from "express";
import { mealGet } from "../controllers/mealsController.js";

const router = express.Router();

router.get("/", mealGet);

export default router;

