import { http_status } from "../shared/constant.js"

export const errMiddleware = (err, _req, res, _next)=>{
let statusCode = err.statusCode || http_status.internal_server_error
}