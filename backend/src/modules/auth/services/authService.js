import bcrypt from "bcryptjs";
import { http_status } from "../../../shared/constant.js";
import { ApiError } from "../../../utils/apiError.js";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt.js";
import { UserRepository } from "../repositories/authRepository.js";

// funtion-based

// import bcrypt from "bcryptjs"
// import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt.js"
// import { createAuthRepository } from "../repositories/authRepository.js"

// export const createAuthService = (userRepository = createAuthRepository() ) => {
//       const generateTokenPair = async (userId) => {
//         const accessToken =await generateAccessToken(userId)
//         const refreshToken =await generateRefreshToken(userId)
//         return {
//             accessToken,
//             refreshToken,
//         }
//     }
//     return {
//         register: async ({ name, email, password }) => {
//             const user =await userRepository.create({ name, email, password })
//             const tokens = await generateTokenPair(user._id)
//             return{
//                 user,
//                 ...tokens

//             }
//         },
//         login : async ({email, password}) =>{
//             const user = await userRepository.findByEmail(email)
//             const tokens = await generateTokenPair(user._id)
//             const isMatch = await bcrypt.compare(password, user.password)
//             if(!isMatch){
//                 console.error('invalid email or password')
//             }
//             const {password: _, ...userWithoutPassword} = user
//             return {
//                 user : userWithoutPassword,
//                 ...tokens
//             }
//         }
//     }
// }

// Class-based

export class AuthService {
  #userRepository;

  constructor(userRepo = new UserRepository()) {
    this.#userRepository = userRepo;
  }

  async #generateTokenPair (userId){
    if(!userId){
      throw new Error('userId is required')
    }
    const accessToken =await generateAccessToken(userId)
    const refreshToken =await generateRefreshToken(userId)
    return{
      accessToken,
      refreshToken
    }
  }

  async register({ name, email, password }) {
    const existingUser = await this.#userRepository.findByEmail(email);

    if (existingUser) {
      throw new ApiError(http_status.conflict, "email already exist");
    }
    const user = await this.#userRepository.create({name, email, password})
    const tokens = await this.#generateTokenPair(user._id)
    return{
        user,
        ...tokens
    }
  }

  async login ({email, password}){
    const user = await this.#userRepository.findByEmail(email)
    if(!user){
      throw new ApiError(http_status.unAuthorized, 'invalid email/password')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
      throw new ApiError(http_status.unAuthorized, 'invalid email/password')
    }

    const {password: _, ...userWithoutPassword} = user
    const tokens = await this.#generateTokenPair(user._id)
    return{
      user,
      ...tokens
    }
  }
}
