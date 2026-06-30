import { http_status } from "../../../shared/constant.js";
import { ApiResponse } from "../../../utils/apiResponse.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { AuthService } from "../services/authService.js";
// import { AuthService, createAuthService } from "../services/authService.js";


// const authService = createAuthService()
const authService = new AuthService()

export const register = asyncHandler(async(req,res)=>{
    const {user , accessToken, refreshToken} =await authService.register(req.body)
    // const {user , accessToken, refreshToken} =await authService.register(req.body)
  //   return res.status(http_status.created).json({
  //   success: true,
  //   message: "user created successfully",
  //   user,
  //   accessToken,
  //   refreshToken
    
  // });

  // new ApiResponse(http_status.created, {user, accessToken, refreshToken},"user created successfully").send(res)
  new ApiResponse(http_status.created, {user, accessToken, refreshToken},"user created successfully").send(res)

})

export const login = asyncHandler(async(req, res)=>{
  const {user , accessToken, refreshToken} =await authService.login(req.body)
  new ApiResponse(http_status.ok, {user, accessToken, refreshToken}, 'logged in successfully').send(res)
})