import { http_status } from "../../../shared/constant.js";
import { ApiError } from "../../../utils/apiError.js";
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

  async register({ name, email, password }) {
    const existingUser = await this.#userRepository.findByEmail(email);

    if (existingUser) {
      throw new ApiError(http_status.conflict, "email already exist");
    }
    const user = await this.#userRepository.create({name, email, password})
    return{
        user
    }
  }
}
