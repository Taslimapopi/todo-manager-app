import { createAuthRepository } from "../modules/auth/repositories/authRepository";
import { asyncHandler } from "../utils/asyncHandler";
import { verifyAccessToken } from "../utils/jwt";

const userRepository = createAuthRepository()

export const protect = asyncHandler(async(req,_parse, next)=>{
    const headers = req.headers.authorization
    const token = headers.split(' ')[1]
    const decoded = verifyAccessToken(token)
    req.user = await userRepository.findById(decoded.id)
    next()
})