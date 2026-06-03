import { Router } from "express";
import { register } from "../controller/authController";

export const authRoute = Router()

authRoute.post('/register', register)