import { response } from "express";
import { http_status } from "../../../shared/constant.js";
import { ApiResponse } from "../../../utils/apiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { createTodoService} from "../services/todoService.js";

const todoService = createTodoService()

export const createTodo = asyncHandler(async(req,res)=>{
    const todo = await todoService.create(req.body)
    new ApiResponse(http_status.created, todo, 'todo created successfully').send(res)

})