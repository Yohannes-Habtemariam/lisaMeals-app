import express from "express";
import { postComment } from "../controllers/commentsController.js";

const router = express.Router();

router.post("/", postComment);

export default router;