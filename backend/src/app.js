import express from "express";
import { appRoutes } from './routes/appRoutes.js'
import { router } from './routes/index.js'

export const app = express()

app.use(express.json({limit: '16kb'}))

app.use('/api/v1',router)

