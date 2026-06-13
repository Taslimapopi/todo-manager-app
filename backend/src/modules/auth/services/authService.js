import { generateAccessToken } from "../../../utils/jwt.js"
import { createAuthRepository } from "../repositories/authRepository.js"

export const createAuthService = (userRepository = createAuthRepository() ) => {
      const generateTokenPair = async (userId) => {
        const accessToken = generateAccessToken()
    }
    return {
        register: async ({ name, email, password }) => {
            const user = userRepository.create({ name, email, password })
            return{
                user
            }
        }
    }
}