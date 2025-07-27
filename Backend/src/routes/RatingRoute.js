import express from "express";
import { addRating, getRatingsForUser } from "../controllers/RatingController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addRating);
router.get("/:userId", getRatingsForUser);

export default router;
