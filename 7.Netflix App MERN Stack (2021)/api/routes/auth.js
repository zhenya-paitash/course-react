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

// @route   GET api/auth/login
// @desc    Login
// @access  Public
route.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json("Wrong password or username! 😪")

    // check password
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8)
    if (originalPassword !== password)
      return res.status(401).json("Wrong password or username! 😪")

    const { password: _, ...info } = user._doc
    res.status(200).json(info)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = route
