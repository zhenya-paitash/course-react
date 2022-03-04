import List from "../models/List.js"
import asyncHandler from "express-async-handler"

// @desc    Get list
// @route   GET api/list
// @access  Private
const getLists = asyncHandler(async (req, res) => {
  const { type, genre } = req.query
  let list = []

  if (type) {
    if (genre) {
      list = await List.aggregate([
        { $sample: { size: 10 } },
        { $match: { type, genre } },
      ])
    } else {
      list = await List.aggregate([
        { $sample: { size: 10 } },
        { $match: { type } },
      ])
    }
  } else {
    list = await List.aggregate([{ $sample: { size: 10 } }])
  }
  res.status(200).json(list)
})

// @desc    Create new list
// @route   POST api/list
// @access  Private
const createList = asyncHandler(async (req, res) => {
  const newList = new List(req.body)
  const savedList = await newList.save()
  res.status(201).json(savedList)
})

// @desc    Delete list
// @route   DELETE api/list/:id
// @access  Private
const deleteList = asyncHandler(async (req, res) => {
  await List.findByIdAndDelete(req.params.id)
  res.status(201).json("The list has been deleted! ⚠️")
})

export { getLists, createList, deleteList }
