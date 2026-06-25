import z from "zod";
import { validation } from "../../../shared/constant.js";
import { valid_todo_status } from "../../../shared/enums.js";

export const createTodoSchema = z.object({
    body : z.object({
        title : z.string()
                .trim()
                .min(1,'title is required')
                .max(validation.todo_title_length, `title cannot be exceed ${validation.todo_title_length}`),
        description : z.string()
                .trim()
                .min(1,'title is required')
                .max(validation.todo_description_maxLength, `title cannot be exceed ${validation.todo_description_maxLength}`),
        status : z.enum(valid_todo_status, {
            message: `status must be ${valid_todo_status.join(', ')}`
        })
        .optional(),
        user: z.string()        
      .min(1, 'user is required')
    })
})