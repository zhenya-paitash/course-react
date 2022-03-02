import { Router } from "express"
import {
  getUsers,
  getUserById,
  getUsersStats,
  updateUser,
  deleteUser,
} from "../controllers/userController.js"
import { verify, isAdmin } from "../middleware/authMiddleware.js"
const router = Router()

router.route("/").get(verify, isAdmin, getUsers)
router.route("/stats").get(getUsersStats)
router
  .route("/:id")
  .get(getUserById)
  .put(verify, updateUser)
  .delete(verify, deleteUser)

export default router
