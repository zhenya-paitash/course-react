const router = require("express").Router()
const {
  getUsers,
  getUserById,
  getUsersStats,
  updateUser,
  deleteUser,
} = require("../controllers/userController")
const { verify, isAdmin } = require("../middleware/authMiddleware")

router.route("/").get(verify, isAdmin, getUsers)
router.route("/stats").get(getUsersStats)
router
  .route("/:id")
  .get(getUserById)
  .put(verify, updateUser)
  .delete(verify, deleteUser)

module.exports = router
