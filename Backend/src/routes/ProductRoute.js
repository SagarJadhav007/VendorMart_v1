import express from "express";
import upload from "../middlewares/multer.js";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/ProductController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add `upload.single("image")` for file uploads
router.post("/", protect, upload.single("image"), createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, upload.single("image"), updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
