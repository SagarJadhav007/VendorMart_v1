import express from "express";
import { createOrder, updateOrderStatus, getOrders } from "../controllers/OrderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.patch("/:orderId/status", protect, updateOrderStatus);
router.get("/", protect, getOrders); // ✅ New route for fetching orders

export default router;
