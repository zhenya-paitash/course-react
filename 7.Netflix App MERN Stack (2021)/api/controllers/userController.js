const User = require("../models/User")
const CryptoJS = require("crypto-js")

// @desc    Get ALL Users
// @route   GET api/user/find
// @access  Private
const getAll = async (req, res) => {
  try {
    const query = req.query.new
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(10)
      : await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

// @desc    Get user by ID
// @route   GET api/user/find/:id
// @access  Public
const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...info } = user._doc
    res.status(200).json(info)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

// @desc    Get User Stats
// @route   GET api/user/
// @access  Public
const getStats = async (req, res) => {
  // const today = new Date()
  // const lastYear = today.setFullYear(today.setFullYear - 1)
  // const monthsArr = [
  //   "ЯНВ",
  //   "ФЕВ",
  //   "МРТ",
  //   "АПР",
  //   "МАЙ",
  //   "ИЮН",
  //   "ИЮЛ",
  //   "АВГ",
  //   "СЕН",
  //   "ОКТ",
  //   "НОЯ",
  //   "ДЕК",
  // ]

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ])
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

// @desc    Update User information
// @route   PUT api/user/:id
// @access  Private
const updateUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString()
    }

    try {
      const updUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      )
      res.status(200).json(updUser)
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json("You can update only your account! 🤐")
  }
}

// @desc    Delete User
// @route   DELETE api/user/:id
// @access  Private
const deleteUser = async (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin)
    return res.status(403).json("You can delete only your account! 🤐")

  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("User has been deleted! ⚠️")
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  getAll,
  getById,
  getStats,
  updateUser,
  deleteUser
}
