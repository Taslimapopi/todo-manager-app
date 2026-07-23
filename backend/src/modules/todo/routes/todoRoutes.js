import { Router } from "express";
import { validate } from "../../../middleware/validateMiddleware.js";
import { createBulkTodoSchema, createTodoSchema, getTodoQuerySchema } from "../validations/todoValidation.js";
import { createBulkTodos, createTodo, getTodo } from "../controllers/todoController.js";
import { protect } from "../../../middleware/authMiddleware.js";

export const todoRoute = Router()

todoRoute.use(protect)

todoRoute.post('/create', validate(createTodoSchema), createTodo)

todoRoute.post('/bulk',validate(createBulkTodoSchema),createBulkTodos)

todoRoute.get('/getTodos',validate(getTodoQuerySchema),getTodo)