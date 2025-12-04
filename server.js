const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ClientSession } = require("mongodb");

const app = express();

app.use(cors());                   // VERY IMPORTANT
app.use(express.json());           // To read JSON data

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/hari")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log("❌ MongoDB error:", err));

// Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number
});

// Model
const Product = mongoose.model("product", productSchema);

// POST Route
app.post("/product", async (req, res) => {
  try {
    console.log("📥 Received data:", req.body);  // debug
    const product = new Product(req.body);
    await product.save();
    res.json({ message: "Product saved successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(4400, () => console.log("🚀 Server running on port 4400"));
