const router = require("express").Router()
const { register, login } = require("../controllers/authController")

router.route("/login").get(login)
router.route("/register").post(register)

module.exports = router
