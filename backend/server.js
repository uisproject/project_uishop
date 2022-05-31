import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorNotFound, errorHandler } from "./services/errorHandler.js";

// to use env
dotenv.config();

// connecting to db
connectDB();

// to use express service
const app = express();

// middleware
app.use(express.json());

// index page
app.get("/", (req, res) => {
  res.send("API is Running");
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

// --

app.use([errorNotFound, errorHandler]); // middleware to handle error

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Running in ${process.env.NODE_ENV} mode at ${process.env.PORT}`);
});
