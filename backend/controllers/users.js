import asyncHandler from "express-async-handler";
import generateToken from "../services/generateToken.js";
import User from "../models/userModel.js";

// @desc    AUTH user & get token
// @route   GET /api/user/login
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
      token: generateToken(user._id),
    });
  }

  res.status(401);
  throw new Error("Invalid Email or Password");
});

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(404);
    throw new Error("User is not found");
  }

  res.status(200).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// @desc    Register a new user
// @route   POST /api/user/
// @access  Public

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User is already exist");
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error(e.message);
  }
});

// @desc    Update User
// @route   PUT /api/user/
// @access  Public

export const updateProfile = asyncHandler(async (req, res) => {
  let { id } = req.user;
  const user = await User.findById(id);

  try {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(user._id),
    });
  } catch (e) {
    console.log(e);
    res.status(400);
    throw new Error(e.message);
  }
});
