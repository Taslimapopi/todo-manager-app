import { Router } from "express";
import { authRoute } from "../modules/auth/routes/authRoute.js";
import { todoRoute } from "../modules/todo/routes/todoRoutes.js";

export const router = Router()

router.use('/auth', authRoute)
router.use('/todos', todoRoute)