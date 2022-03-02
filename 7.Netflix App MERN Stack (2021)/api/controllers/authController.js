import User from "../models/User.js"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"

// @desc    Login
// @route   GET api/auth
// @access  Public
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(401).json("Wrong password or username! 😪")

    const { _id: id, password, isAdmin } = user
    const KEY = process.env.SECRET_KEY

    // check password
    const bytes = CryptoJS.AES.decrypt(password, KEY)
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8)
    if (originalPassword !== req.body.password)
      return res.status(401).json("Wrong password or username! 😪")

    const accessToken = jwt.sign({ id, isAdmin }, KEY, { expiresIn: "5d" })

    const { password: _, ...info } = user._doc
    res.status(200).json({ ...info, accessToken })
  } catch (err) {
    res.status(500).json(err)
  }
}

// @desc    Create new User
// @route   POST api/auth
// @access  Public
const registerUser = async (req, res) => {
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
}

export { loginUser, registerUser }
