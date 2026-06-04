import z from "zod";
import { validation } from "../../../shared/constant";

export const registerSchema = z.object({
    body: z.object({
        name: z.string()
        .trim()
        .min(1,'name is required')
        .max(50, 'name is too long'),
    email: z.string()
    .trim()
    .min(1, 'email is required')
    .max(100,'email is too long')
    .toLowerCase()
    .pipe(z.email('please provide a valid email'))
    }),
    password: z.string
    .min(validation.passMinLength,`password must be at least ${validation.passMinLength} characters `)
    .max(120, 'password cannt exceed 120 characters')
    .regex(/[A-Z]/,'password must contain at least 1 upper case letter')
    .regex(/[0-9]/,'password must contain at least 1 number')
    .regex(/[^a-zA-Z0-9]/,'password must contain at least 1 special character')
})