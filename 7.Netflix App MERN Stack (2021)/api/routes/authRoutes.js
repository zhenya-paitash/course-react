const router = require("express").Router()
const { loginUser, registerUser } = require("../controllers/authController")

router.route("/").get(loginUser).post(registerUser)

module.exports = router
