import { Router } from "express";
import { validate } from "../../../middleware/validateMiddleware.js";
import { createBulkTodoSchema, createTodoSchema, getTodoParamSchema, getTodoQuerySchema, updateTodoSchema } from "../validations/todoValidation.js";
import { createBulkTodos, createTodo, deleteAllTodos, deleteTodo, getTodo, getTodoById, updateTodo } from "../controllers/todoController.js";
import { protect } from "../../../middleware/authMiddleware.js";

export const todoRoute = Router()

todoRoute.use(protect)

todoRoute.post('/create', validate(createTodoSchema), createTodo)

todoRoute.post('/bulk',validate(createBulkTodoSchema),createBulkTodos)

todoRoute.get('/getTodos',validate(getTodoQuerySchema),getTodo)

todoRoute.get('/getTodos/:id', validate(getTodoParamSchema), getTodoById)

todoRoute.put('/updateTodo/:id', validate(updateTodoSchema),updateTodo)

todoRoute.patch('/updateTodo/:id', validate(updateTodoSchema),updateTodo)

todoRoute.delete('/deleteTodo/:id', validate(getTodoParamSchema), deleteTodo)

todoRoute.delete('/deleteAll', deleteAllTodos)