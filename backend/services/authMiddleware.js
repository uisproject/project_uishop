import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  let token;

  if (!authorization || !authorization.startsWith("Bearer")) {
    res.status(401);
    throw new Error("Not Authorized with token");
  }

  console.log("Token is found");
  try {
    token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    req.user = await User.findById(decoded.id).select("-password"); // excluding the password field
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    throw new Error("Not Authorized token failed");
  }
});
