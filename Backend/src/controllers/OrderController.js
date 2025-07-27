import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    if (req.user.role !== "vendor") {
      return res.status(403).json({ message: "Only vendors can place orders" });
    }

    const { wholesaler_id, items } = req.body;

    if (!wholesaler_id || !items || items.length === 0) {
      return res.status(400).json({ message: "Wholesaler ID and items are required" });
    }

    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await Product.findById(item.product_id);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.product_id} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      const price = product.price;
      totalAmount += price * item.quantity;

      orderItemsData.push({
        product_id: product._id,
        quantity: item.quantity,
        price
      });
      
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      vendor_id: req.user.id,
      wholesaler_id,
      total_amount: totalAmount
    });

    for (const item of orderItemsData) {
      await OrderItem.create({
        order_id: order._id,
        ...item
      });
    }

    res.status(201).json({ message: "Order placed successfully", orderId: order._id, totalAmount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (req.user.role === "vendor" && order.vendor_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own orders" });
    }
    if (req.user.role === "wholesaler" && order.wholesaler_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own orders" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
