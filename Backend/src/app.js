import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/AuthRoute.js";
import productRoutes from "./routes/ProductRoute.js";
import OrderRoute from "./routes/OrderRoute.js";
import ratingRoutes from "./routes/RatingRoute.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", OrderRoute);
app.use("/api/auth", authRoutes);
app.use("/api/ratings", ratingRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
