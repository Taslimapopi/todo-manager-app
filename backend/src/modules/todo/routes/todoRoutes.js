import { Router } from "express";
import { validate } from "../../../middleware/validateMiddleware.js";
import { createTodoSchema } from "../validations/todoValidation.js";
import { createTodo } from "../controllers/todoController.js";

export const todoRoute = Router()

todoRoute.post('/create', validate(createTodoSchema), createTodo)