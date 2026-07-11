import z from "zod";
import { validation } from "../../../shared/constant.js";
import { valid_todo_status } from "../../../shared/enums.js";

const todoSchemaItems =  z.object({
        title : z.string()
                .trim()
                .min(1,'title is required')
                .max(validation.todo_title_length, `title cannot be exceed ${validation.todo_title_length}`),
        description : z.string()
                .trim()
                .min(1,'description is required')
                .max(validation.todo_description_maxLength, `title cannot be exceed ${validation.todo_description_maxLength}`),
        status : z.enum(valid_todo_status, {
            message: `status must be ${valid_todo_status.join(', ')}`
        })
        .optional(),
    })

export const createTodoSchema = z.object({
    body :todoSchemaItems
})

export const createBulkTodoSchema = z.object({
    body : z.object({
        todos : z.array(todoSchemaItems)
        .min(1,'todos array cannot be empty')
        .max(validation.bulk_create_max,`todos array cannt exceed ${validation.bulk_create_max} todos at once`)
    })
})