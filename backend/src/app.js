import express from 'express'
import { appRoutes } from './routes/appRoutes.js'

export const app = express()

// app.get('/',appRoutes)

app.use('/api')