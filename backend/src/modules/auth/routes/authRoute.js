import { Router } from "express";
import { register } from "../controller/authController.js";
import { validate } from "../../../middleware/validateMiddleware.js";
import { registerSchema } from "../validations/authValidation.js";


export const authRoute = Router()

authRoute.post('/register',validate(registerSchema),register )

authRoute.post('/login', validate(loginSchema),login)
