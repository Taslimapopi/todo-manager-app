import { Router } from "express";
import { validate } from "../../../middleware/validateMiddleware.js";
import { createTodoSchema } from "../validations/todoValidation.js";
import { createTodo } from "../controllers/todoController.js";
import { protect } from "../../../middleware/authMiddleware.js";

export const todoRoute = Router()

todoRoute.use(protect)

todoRoute.post('/create', validate(createTodoSchema), createTodo)