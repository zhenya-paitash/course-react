const router = require("express").Router()
const List = require("../models/List")
const verify = require("../verifyToken")

// @route   GET api/lists
// @desc    Delete list
// @access  Private
router.get("/", verify, async (req, res) => {
  const { type, genre } = req.query
  let list = []

  try {
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
    // const list = await List.aggregate([
    //   { $sample: { size: 10 } },
    //   (type && genre) ?? {
    //     $match: { type, genre },
    //   },
    //   type ?? {
    //     $match: { type },
    //   },
    //   genre ?? {
    //     $match: { genre },
    //   },
    // ])
    res.status(200).json(list)
  } catch (err) {
    res.status(500).json(err.message)
  }
})

// @route   POST api/lists
// @desc    Create new list
// @access  Private
router.post("/", verify, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json("You are not allowed! 🛡️")
  }

  try {
    const newList = new List(req.body)
    const savedList = await newList.save()
    res.status(201).json(savedList)
  } catch (err) {
    res.status(500).json(err.message)
  }
})

// @route   DELETE api/lists/:id
// @desc    Delete list
// @access  Private
router.delete("/:id", verify, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json("You are not allowed! 🛡️")
  }

  try {
    await List.findByIdAndDelete(req.params.id)
    res.status(201).json("The list has been deleted! ⚠️")
  } catch (err) {
    res.status(500).json(err.message)
  }
})

module.exports = router
