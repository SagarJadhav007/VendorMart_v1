import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  rater_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rated_user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  feedback: { type: String }
}, { timestamps: true });

export default mongoose.model("Rating", ratingSchema);
