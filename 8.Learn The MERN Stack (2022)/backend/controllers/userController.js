const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const generateToken = require('../services/token')

// @desc      Register new user
// @route     POST /api/user
// @access    Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields ⚠️')
  }

  // check if user exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //create user
  const user = await User.create({ name, email, password: hashedPassword })
  if (!user) {
    res.status(400)
    throw new Error('Invalid user data')
  }

  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  })
})

// @desc      Authenticate a user
// @route     POST /api/user/login
// @access    Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Please add all fields ⚠️')
  }

  // check for user email
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc      Get user data
// @route     GET /api/user/me
// @access    Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
