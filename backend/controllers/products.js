import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  // res.status(401);
  // throw new Error("unauthorized");
  res.status(200).json(products);
});

export const getSingleProduct = asyncHandler(async (req, res) => {
  let { id } = req.params;

  //   so to fix that I suggest to throw a new id similar to mongoDB id
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    id = 999999999999999999999999n; // since the number is too large i need to put n to tell that this is bigInt datatype
  }

  const product = await Product.findById(id); // there is something you must know that mongoose/mongoDB can detect if the id is the same format as the object_id provided by mongoDB, if put params like "1" the throw of Product not found will be replaced by the throw by the mongoDB,

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
