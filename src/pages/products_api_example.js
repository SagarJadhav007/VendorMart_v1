// This file is used to fetch products for the order form in the frontend.
// It is not used by the backend directly, but helps the frontend get product and wholesaler IDs.

// Example product object from backend:
// {
//   _id: "688496a84d75b0fbe4cd1c62",
//   wholesaler_id: {
//     _id: "68848c5f3fab60e3502e46b1",
//     name: "Test Wholesaler",
//     email: "wholesaler@test.com"
//   },
//   name: "Tomatoes",
//   description: "Fresh red tomatoes",
//   price: 30,
//   unit: "kg",
//   stock: 100,
//   imageUrl: "..."
// }

// You will need to fetch /api/products in your frontend and use the _id for product_id and wholesaler_id._id for wholesaler_id when creating an order.
