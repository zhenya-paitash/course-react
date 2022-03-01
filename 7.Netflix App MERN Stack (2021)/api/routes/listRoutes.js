const router = require("express").Router()
const {
  getAllLists,
  createList,
  deleteList,
} = require("../controllers/listController")
const { verify, isAdmin } = require("../middleware/authMiddleware")

router.route("/").get(verify, getAllLists).post(verify, isAdmin, createList)
router.route("/:id").delete(verify, isAdmin, deleteList)

module.exports = router
