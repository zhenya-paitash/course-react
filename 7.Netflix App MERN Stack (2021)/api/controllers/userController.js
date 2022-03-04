import User from "../models/User.js"
import CryptoJS from "crypto-js"
import asyncHandler from "express-async-handler"

// ? parameter "select('-password')" can be corrected at the schema definition level:
// ! password : { type: String, select: false }

// @desc    Get ALL Users
// @route   GET api/user
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  const query = req.query.new
  const users = query
    ? await User.find().select("-password").sort({ _id: -1 }).limit(10)
    : await User.find().select("-password")
  res.status(200).json(users)
})

// @desc    Get user by ID
// @route   GET api/user/:id
// @access  Public
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("+password")
  res.status(200).json(user._doc)
})

// @desc    Get User Stats
// @route   GET api/user/stats
// @access  Public
const getUsersStats = asyncHandler(async (req, res) => {
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

  const data = await User.aggregate([
    {
      $project: {
        month: {
          $month: "$createdAt",
        },
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
})

// @desc    Update User information
// @route   PUT api/user/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) {
    res.status(403)
    throw new Error("You can update only your account! 🤐")
  }

  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString()
  }

  const updUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  )
  res.status(200).json(updUser)
})

// @desc    Delete User
// @route   DELETE api/user/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) {
    res.status(403)
    throw new Error("You can delete only your account! 🤐")
  }

  await User.findByIdAndDelete(req.params.id)
  res.status(200).json("User has been deleted! ⚠️")
})

export { getUsers, getUserById, getUsersStats, updateUser, deleteUser }
