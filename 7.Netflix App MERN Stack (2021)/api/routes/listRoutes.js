const router = require("express").Router()
const {
  getLists,
  createList,
  deleteList,
} = require("../controllers/listController")
const { verify, isAdmin } = require("../middleware/authMiddleware")

router.route("/").get(verify, getLists).post(verify, isAdmin, createList)
router.route("/:id").delete(verify, isAdmin, deleteList)

module.exports = router
