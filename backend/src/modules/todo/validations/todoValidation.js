import z, { transform } from "zod";
import { pagination, validation } from "../../../shared/constant.js";
import { valid_priority_status, valid_todo_status } from "../../../shared/enums.js";

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
        .max(validation.bulk_create_max,`todos array cannot exceed ${validation.bulk_create_max} todos at once`)
    })
})

export const getTodoQuerySchema = z.object({
    query  : z.object({
        page: z.string().optional()
        .transform(val=> val !== undefined ? parseInt(val,10): 1)
        .pipe(z.number().int().min(pagination.default_page,'page must be at least 1')),
        limit: z.string().optional()
        .transform(val=> val !== undefine ? parseInt(val,10): 1)
        .pipe(z.number().int().min(pagination.default_page).max(pagination.max_page,`page must not be exceed ${pagination.max_page}`)),
        status : z.enum(valid_todo_status).optional(),
        priority : z.enum(valid_priority_status).optional(),
        search: z.string().trim().max(100,'search query must not be exceed 100 characters').optional(),
        overdue  : z.enum(['true', 'false'])
                    .optional().transform(val=>val==='true')
    })

})