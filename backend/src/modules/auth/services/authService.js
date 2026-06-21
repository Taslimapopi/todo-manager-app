import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt.js"
import { createAuthRepository } from "../repositories/authRepository.js"

export const createAuthService = (userRepository = createAuthRepository() ) => {
      const generateTokenPair = async (userId) => {
        const accessToken =await generateAccessToken(userId)
        const refreshToken =await generateRefreshToken(userId)
        return {
            accessToken,
            refreshToken,
        }
    }
    return {
        register: async ({ name, email, password }) => {
            const user =await userRepository.create({ name, email, password })
            const tokens = await generateTokenPair(user._id)
            return{
                user,
                ...tokens

            }
        },
        login : async ({email, password}) =>{
            const user = await userRepository.findByEmail(email)
        }
    }
}