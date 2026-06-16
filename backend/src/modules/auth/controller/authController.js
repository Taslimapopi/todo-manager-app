import { http_status } from "../../../shared/constant.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { createAuthService } from "../services/authService.js";


const authService = createAuthService()

export const register = asyncHandler(async(req,res)=>{
    const {user , accessToken} =await authService.register(req.body)
    // return res.status(http_status.created).json({user},'user created successfully')
    return res.status(http_status.created).json({
    success: true,
    message: "user created successfully",
    user,
    accessToken
  });

})