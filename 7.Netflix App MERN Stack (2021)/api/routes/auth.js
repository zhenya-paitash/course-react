const route = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")

// @route   POST api/auth/register
// @desc    Create new User
// @access  Public
route.post("/register", async (req, res) => {
  const { username, email, password } = req.body

  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
  })

  try {
    const user = await newUser.save()
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = route
