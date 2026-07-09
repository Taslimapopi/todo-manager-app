import { Router } from "express";

export const appRoutes = Router()

appRoutes.get('/',(_, res)=>{
    res.send('todo app is running')

}) 