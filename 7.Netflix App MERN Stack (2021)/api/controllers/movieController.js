import Movie from "../models/Movie.js"
import asyncHandler from "express-async-handler"

// @desc    Get all movies
// @route   GET api/movie
// @access  Private
const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find()
  res.status(200).json(movies.reverse())
})

// @desc    Get movie by ID
// @route   GET api/movie/:id
// @access  Private
const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id)
  res.status(200).json(movie)
})

// @desc    Get random movie
// @route   GET api/movie/random
// @access  Private
const getMovieRandom = asyncHandler(async (req, res) => {
  const movie = await Movie.aggregate([
    { $match: { isSeries: req.query.type === "series" } },
    { $sample: { size: 1 } },
  ])
  res.status(200).json(movie)
})

// @desc    Create new movie
// @route   POST api/movie
// @access  Private
const createMovie = asyncHandler(async (req, res) => {
  const newMovie = new Movie(req.body)
  const savedMovie = await newMovie.save()
  res.status(201).json(savedMovie)
})

// @desc    Update Movie information
// @route   PUT api/movie/:id
// @access  Private
const updateMovie = asyncHandler(async (req, res) => {
  const updMovie = await Movie.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  )
  res.status(200).json(updMovie)
})

// @desc    Delete movie
// @route   DELETE api/movie/:id
// @access  Private
const deleteMovie = asyncHandler(async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id)
  res.status(200).json("The movie has been deleted... ⚠️")
})

export {
  getMovies,
  getMovieById,
  getMovieRandom,
  createMovie,
  updateMovie,
  deleteMovie,
}
