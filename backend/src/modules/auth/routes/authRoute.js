import { Router } from "express";
import { register } from "../controller/authController";
import { validate } from "../../../middleware/validateMiddleware";
import { registerSchema } from "../validations/authValidation";

export const authRoute = Router()

authRoute.post('/register',validate(registerSchema), register)