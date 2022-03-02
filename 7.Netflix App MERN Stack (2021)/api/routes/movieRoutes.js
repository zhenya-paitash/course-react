const router = require("express").Router()
const {
  getMovies,
  updateMovie,
  deleteMovie,
  createMovie,
  getMovieById,
  getMovieRandom,
} = require("../controllers/movieController")
const { verify, isAdmin } = require("../middleware/authMiddleware")

router
  .route("/")
  .get(verify, isAdmin, getMovies)
  .post(verify, isAdmin, createMovie)
router.route("/random").get(verify, getMovieRandom)
router
  .route("/:id")
  .get(verify, getMovieById)
  .put(verify, isAdmin, updateMovie)
  .delete(verify, isAdmin, deleteMovie)

module.exports = router
