import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from "../models/Product.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getRecommendations = async (req, res) => {
  try {
    const { stallType } = req.query;

    // Fetch available products
    const products = await Product.find({ in_stock: true }).select("name -_id");
    const productNames = products.map(p => p.name);

    const prompt = `
      A vendor runs a "${stallType}" food stall.
      Recommend the top 10 items they should purchase ONLY from this available list:
      ${productNames.join(", ")}.
      Return the list strictly in valid JSON array format.
    `;

    // Use Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    // Parse the JSON output safely
    let recommendations = [];
    try {
      recommendations = JSON.parse(result.response.text());
    } catch (err) {
      console.error("JSON parse error:", err);
      return res.status(500).json({ error: "Failed to parse Gemini response" });
    }

    res.json({ stallType, recommendations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
};
