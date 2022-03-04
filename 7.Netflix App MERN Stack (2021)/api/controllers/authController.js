import User from "../models/User.js"
import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"

// @desc    Login user
// @route   GET api/auth
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.checkPassword(user, password))) {
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    )
    const { password: _, ...info } = user._doc
    res.status(200).json({ ...info, accessToken })
  } else {
    res.status(401)
    throw new Error("Wrong password or username! 😪")
  }
})

// @desc    Create new User
// @route   POST api/auth
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  const user = await User.create({ username, email, password })
  res.status(201).json(user)
})

export { loginUser, registerUser }
