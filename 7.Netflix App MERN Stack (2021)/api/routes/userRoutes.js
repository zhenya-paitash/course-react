const router = require("express").Router()
const {
  getAll,
  getById,
  getStats,
  updateUser,
  deleteUser,
} = require("../controllers/userController")
const { verify, isAdmin } = require("../middleware/authMiddleware")

router.route("/").get(verify, isAdmin, getAll)
router.route("/stats").get(getStats)
router.route("/find/:id").get(getById)
router.route("/:id").put(verify, updateUser).delete(verify, deleteUser)

module.exports = router
