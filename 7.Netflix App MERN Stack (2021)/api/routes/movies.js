const router = require("express").Router()
const Movie = require("../models/Movie")
const verify = require("../verifyToken")

// @route   GET api/movie/:id
// @desc    Get all movies
// @access  Private
router.get("/", verify, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json("You are not allowed! 🛡️")

  try {
    const movies = await Movie.find()
    res.status(200).json(movies.reverse())
  } catch (err) {
    res.status(500).json(err.message)
  }
})

// @route   GET api/movie/find/:id
// @desc    Get movie by ID
// @access  Private
router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
    res.status(200).json(movie)
  } catch (err) {
    res.status(500).json(err.message)
  }
})

// @route   GET api/movie/random
// @desc    Get random movie by ID
// @access  Private
router.get("/random", verify, async (req, res) => {
  const { type } = req.query

  try {
    const movie = await Movie.aggregate([
      { $match: { isSeries: type === "series" ? true : false } },
      { $sample: { size: 1 } },
    ])
    res.status(200).json(movie)
  } catch (err) {
    res.status(500).json(err.message)
  }
})

// @route   POST api/movie
// @desc    Create new movie
// @access  Private
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body)

    try {
      const savedMovie = await newMovie.save()
      res.status(201).json(savedMovie)
    } catch (err) {
      res.status(500).json(err.message)
    }
  } else {
    res.status(403).json("You are not allowed! 🛡️")
  }
})

// @route   PUT api/movie/:id
// @desc    Update Movie information
// @access  Private
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      )
      res.status(200).json(updMovie)
    } catch (err) {
      res.status(500).json(err.message)
    }
  } else {
    res.status(403).json("You are not allowed! 🛡️")
  }
})

// @route   DELETE api/movie/:id
// @desc    Delete movie
// @access  Private
router.delete("/:id", verify, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json("You are not allowed! 🛡️")

  try {
    await Movie.findByIdAndDelete(req.params.id)
    res.status(200).json("The movie has been deleted... ⚠️")
  } catch (err) {
    res.status(500).json(err.message)
  }
})

module.exports = router
