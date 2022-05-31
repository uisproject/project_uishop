import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    AUTH user & get token
// @route   GET /api/users/login
// @access  Public

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  }

  res.status(401);
  throw new Error("Invalid Email or Password");
});
