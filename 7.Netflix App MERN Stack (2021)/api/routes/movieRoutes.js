import { Router } from "express"
import {
  getMovies,
  updateMovie,
  deleteMovie,
  createMovie,
  getMovieById,
  getMovieRandom,
} from "../controllers/movieController.js"
import { verify, isAdmin } from "../middleware/authMiddleware.js"
const router = Router()

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

export default router
