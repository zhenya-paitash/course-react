import { Router } from "express"
import { getLists, createList, deleteList } from "../controllers/listController.js"
import { verify, isAdmin } from "../middleware/authMiddleware.js"
const router = Router()

router.route("/").get(verify, getLists).post(verify, isAdmin, createList)
router.route("/:id").delete(verify, isAdmin, deleteList)

export default router