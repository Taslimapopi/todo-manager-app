import { http_status } from "../../../shared/constant.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { createAuthService } from "../services/authService.js";

const authService = createAuthService()

export const register = asyncHandler(async(req,res)=>{
    const {user} =await authService.register(req.body)
    res.status(http_status.created).json({user},'user created successfully')
})