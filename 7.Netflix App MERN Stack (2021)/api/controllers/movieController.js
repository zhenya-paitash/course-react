const Movie = require("../models/Movie")

// @desc    Get all movies
// @route   GET api/movie
// @access  Private
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
    res.status(200).json(movies.reverse())
  } catch (err) {
    res.status(500).json(err.message)
  }
}

// @desc    Get movie by ID
// @route   GET api/movie/:id
// @access  Private
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
    res.status(200).json(movie)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

// @desc    Get random movie by ID
// @route   GET api/movie/random
// @access  Private
const getMovieRandom = async (req, res) => {
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
}

// @desc    Create new movie
// @route   POST api/movie
// @access  Private
const createMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body)
    const savedMovie = await newMovie.save()
    res.status(201).json(savedMovie)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

// @desc    Update Movie information
// @route   PUT api/movie/:id
// @access  Private
const updateMovie = async (req, res) => {
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
}

// @desc    Delete movie
// @route   DELETE api/movie/:id
// @access  Private
const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id)
    res.status(200).json("The movie has been deleted... ⚠️")
  } catch (err) {
    res.status(500).json(err.message)
  }
}

module.exports = {
  getMovies,
  getMovieById,
  getMovieRandom,
  createMovie,
  updateMovie,
  deleteMovie,
}
