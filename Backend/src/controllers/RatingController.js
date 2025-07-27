import Rating from "../models/Rating.js";

export const addRating = async (req, res) => {
  try {
    const { rated_user_id, rating, feedback } = req.body;
    const rater_id = req.user._id;

    if (!rated_user_id || !rating) {
      return res.status(400).json({ message: "Rated user and rating are required" });
    }

    if (rater_id.toString() === rated_user_id) {
      return res.status(400).json({ message: "You cannot rate yourself" });
    }

    const newRating = await Rating.create({
      rater_id,
      rated_user_id,
      rating,
      feedback
    });

    res.status(201).json({ message: "Rating added successfully", rating: newRating });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRatingsForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const ratings = await Rating.find({ rated_user_id: userId }).populate("rater_id", "name role");
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
