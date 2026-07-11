// import { createAuthRepository } from "../modules/auth/repositories/authRepository.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { verifyAccessToken } from "../utils/jwt.js";

import { UserRepository } from "../modules/auth/repositories/authRepository.js";
import { http_status } from "../shared/constant.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/jwt.js";

// const userRepository = createAuthRepository()

// export const protect = asyncHandler(async(req,_res, next)=>{
//     const headers = req.headers.authorization
//     const token = headers.split(' ')[1]
//     const decoded = verifyAccessToken(token)
//     req.user = await userRepository.findById(decoded.id)
//     next()
// })

const userRepository =new UserRepository()

export const protect = asyncHandler(async(req,_parse,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new ApiError(http_status.unAuthorized,'not authorized and no token provided')
    }

    const token = authHeader.split(' ').at(1)
    const decoded = verifyAccessToken(token)
    const user =await userRepository.findById(decoded.id , '-password -__v')
    if(!user){
        throw new ApiError(http_status.unAuthorized,'not authorized and no user found')

    }
    req.user = user
    next()
})