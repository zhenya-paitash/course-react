const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc      Get goals
// @route     GET /api/goal
// @access    Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })
  res.status(200).json(goals)
})

// @desc      Set goal
// @route     POST /api/goal
// @access    Private
const setGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.create({ user: req.user.id, text: req.body.text })
  res.status(201).json(goal)
})

// @desc      Update goal
// @route     PUT /api/goal/:id
// @access    Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }
  // make sure the loggd in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updGoal = await Goal.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  )
  res.status(200).json(updGoal)
})

// @desc      Delete goal
// @route     DELETE /api/goal/:id
// @access    Private🛡
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }
  // make sure the loggd in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.remove()
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
}
