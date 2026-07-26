import { response } from "express";
import { http_status } from "../../../shared/constant.js";
import { ApiResponse } from "../../../utils/apiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { TodoService } from "../services/todoService.js";
// import { createTodoService, TodoService} from "../services/todoService.js";

// const todoService = createTodoService()

const todoService =new TodoService()

export const createTodo = asyncHandler(async(req,res)=>{
    const todo = await todoService.create(req.body, req.user?._id)
    new ApiResponse(http_status.created, todo, 'todo created successfully').send(res)

})

export const createBulkTodos = asyncHandler(async(req,res)=>{
    const todos = req.body?.todos || []
    const bulkTodo = await todoService.createBulk(todos, req.user?._id)
     new ApiResponse(http_status.created, bulkTodo, `${bulkTodo?.count || 0} created successfully`).send(res)

})

export const getTodo = asyncHandler(async(req, res)=>{
    const todo = await todoService.getAll(req.query || {}, req.user?.id)
    new ApiResponse(http_status.ok, todo , 'todo retrieved successfully').send(res)
})

export const getTodoById = asyncHandler(async (req, res)=>{
    const todo = await todoService.getById(req.params?.id, req.user?.id)
    new ApiResponse(http_status.ok, todo , 'todo retrieved successfully').send(res)
})

export const updateTodo = asyncHandler(async (req, res)=>{
    const todo = await todoService.update(req.params?.id, req.body, req.user?.id)
    new ApiResponse(http_status.ok, todo, 'todo update successfully').send(res)
})

export const deleteTodo = asyncHandler(async(req, res)=>{
    const todo = await todoService.delete(req.params?.id, req.user?.id)
    new ApiResponse(http_status.ok, todo, 'todo deleted successfully').send(res)
})