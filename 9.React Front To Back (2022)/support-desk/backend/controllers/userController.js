const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// @desc    Get current user
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
  const { _id: id, email, name, isAdmin } = req.user
  res.status(200).send({ id, email, name, isAdmin })
}

// @desc    Register a new user
// @route   POST /api/users/
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  // Validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Find if user already exists
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
}

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  // Check user and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }

  res.status(200).send({ message: 'Login Route' })
}

// ? Generate JWT token
const generateToken = id => {
  const { JWT_SECRET } = process.env
  const opts = { expiresIn: '30d' }
  return jwt.sign({ id }, JWT_SECRET, opts)
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}
