import { http_status } from "../shared/constant.js"
import { env } from "../config/env.js"

export const errMiddleware = (err, _req, res, _next)=>{
let statusCode = err.statusCode || http_status.internal_server_error
let message = err.message || 'internal server error'
let errors = err.errors || []

if(err.name === 'CastError') {
    statusCode = http_status.bad_request
    message = `invalid ${err.path} : ${err.value}`
}
if (err.code===11000){
    statusCode = http_status.conflict
    const field = Object.keys(err.keyValue).join(',')
    message = `duplicate value for ${field}`
}

if (err.name === 'ValidationError'){
    statusCode = http_status.bad_request
    errors = Object.values(err.errors).map(e=>({field : e.path, message: e.message}))
    message = 'validation failed'
}
if (err.name === 'JsonWebTokenError'){
    statusCode = http_status.unAuthorized
    message  = 'invalid Token'
}

if(err.name === 'TokenExpiredError'){
    statusCode = http_status.unAuthorized
    message  = 'Token expired' 
}
if (statusCode >= 500){
    console.error({err}, message)
}

if (env.NODE_ENV === 'production' && statusCode === 500 && !err.isOperational){
    message = 'internal server error'
}

res.status(statusCode).json({
    statusCode,
    success : false,
    message,
    errors,
    ...(env.NODE_ENV === 'development' && {stack: err.stack} )
})

}