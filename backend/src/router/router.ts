import { login, register } from "controllers"
import express from "express"
const router = express.Router()

router.post("/auth/register", register)
router.post("/auth/login", login)

export default router