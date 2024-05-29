const OrderModel = require("../models/Order.model");
const User = require("../models/User.model");
const MenuItem = require("../models/Menu.model");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    // Extract user ID from the authenticated user
    const userId = req.payload._id;
    console.log("Request User ID:", userId);

    // Extract order details from request body
    const { items, amount, address } = req.body;
    console.log("Order Items:", items);
    console.log("Order Amount:", amount);
    console.log("Order Address:", address);

    // Validate essential fields
    if (!items || !amount || !address) {
      console.log("Invalid order data");
      return res
        .status(400)
        .json({ success: false, message: "Invalid order data" });
    }

    // Ensure each item has a name
    const itemsWithNames = await Promise.all(
      items.map(async (item) => {
        if (!item.name) {
          const menuItem = await MenuItem.findById(item.itemId).select(
            "itemName"
          );
          item.name = menuItem ? menuItem.itemName : "Unknown Item";
        }
        return item;
      })
    );

    // Create a new order
    const newOrder = new OrderModel({
      userId,
      items: itemsWithNames,
      amount,
      address,
    });
    await newOrder.save();
    console.log("Order saved successfully:", newOrder);

    // Clear the user's cart
    await User.findByIdAndUpdate(userId, { cartData: [] });
    console.log("User cart cleared");

    // Prepare line items for Stripe
    const line_items = itemsWithNames.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add delivery charge
    line_items.push({
      price_data: {
        currency: "eur",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 3 * 100,
      },
      quantity: 1,
    });

    console.log("Line items prepared for Stripe:", line_items);

    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    console.log("Stripe session created:", session);

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await OrderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await OrderModel.findByIdAndDelete(orderId);
      res.josn({ success: false, message: "Not Pid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// use orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.payload._id });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

module.exports = { userOrders };

module.exports = { placeOrder, verifyOrder, userOrders };
