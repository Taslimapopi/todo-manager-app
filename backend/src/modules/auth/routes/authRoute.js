import { Router } from "express";
import { login, register } from "../controller/authController.js";
import { validate } from "../../../middleware/validateMiddleware.js";
import { loginSchema, registerSchema } from "../validations/authValidation.js";


export const authRoute = Router()

authRoute.post('/register',validate(registerSchema),register )

authRoute.post('/login', validate(loginSchema),login)
