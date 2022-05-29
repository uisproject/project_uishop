import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is Running");
});

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/api/product/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product._id === id);
  res.status(200).json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Running in ${process.env.NODE_ENV} mode at ${process.env.PORT}`);
});
