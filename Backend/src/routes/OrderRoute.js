import express from "express";
import { createOrder, updateOrderStatus } from "../controllers/OrderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.patch("/:orderId/status", protect, updateOrderStatus);

export default router;
