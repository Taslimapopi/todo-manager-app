import { User } from "../models/userModel.js"

export const createAuthRepository = () => {
    return {
        create: async (userData) => {
            const user = await User.create(userData)
            const { password, ...userWithoutPassord } = user.toObject()
            return userWithoutPassord
        }
    }
}