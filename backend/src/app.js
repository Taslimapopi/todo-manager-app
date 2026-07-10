import express from "express";
import { router } from './routes/index.js'
import { errMiddleware } from "./middleware/errorMiddleware.js";

export const app = express()

app.use(express.json({limit: '16kb'}))

app.use('/api/v1',router)

app.use(errMiddleware)