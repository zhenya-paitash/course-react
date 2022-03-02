import { Router } from "express"
import { loginUser, registerUser } from "../controllers/authController.js"
const router = Router()

router.route("/").get(loginUser).post(registerUser)

export default router
