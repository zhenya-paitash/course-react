const router = require("express").Router()
const Movie = require("../models/Movie")
const { verify, isAdmin } = require("../middleware/authMiddleware")

// @route   GET api/movie/:id
// @desc    Get all movies
// @access  Private
router.get("/", verify, isAdmin, async (req, res) => {
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
  try {
    const { type } = req.query
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
router.post("/", verify, isAdmin, async (req, res) => {
  try {
    const newMovie = new Movie(req.body)
    const savedMovie = await newMovie.save()
    res.status(201).json(savedMovie)
  } catch (err) {
    res.status(500).json(err.message)
  }
})

// @route   PUT api/movie/:id
// @desc    Update Movie information
// @access  Private
router.put("/:id", verify, isAdmin, async (req, res) => {
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
})

// @route   DELETE api/movie/:id
// @desc    Delete movie
// @access  Private
router.delete("/:id", verify, isAdmin, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id)
    res.status(200).json("The movie has been deleted... ⚠️")
  } catch (err) {
    res.status(500).json(err.message)
  }
})

module.exports = router
