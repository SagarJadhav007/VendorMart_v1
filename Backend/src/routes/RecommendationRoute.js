import express from "express";
import { getRecommendations } from "../controllers/RecommendationController.js";

const router = express.Router();
router.get("/", getRecommendations);

export default router;
