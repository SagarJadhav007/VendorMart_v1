import { Configuration, OpenAIApi } from "openai";
import Product from "../models/Product.js";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export const getRecommendations = async (req, res) => {
  try {
    const { stallType } = req.query;
    const products = await Product.find({ in_stock: true }).select("name -_id");
    const productNames = products.map(p => p.name);

    const prompt = `
    A vendor runs a "${stallType}" food stall.
    Recommend the top 10 items they should purchase ONLY from this available list:
    ${productNames}.
    Return the list in JSON array format.
    `;

    const response = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You must recommend only from the provided product list." },
        { role: "user", content: prompt }
      ],
      max_tokens: 200,
      temperature: 0.5
    });

    const recommendations = JSON.parse(response.data.choices[0].message.content);
    res.json({ stallType, recommendations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
};
