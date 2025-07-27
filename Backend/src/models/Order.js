import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  wholesaler_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  distributor_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
  total_amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
