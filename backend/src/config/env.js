import z, { object } from "zod"

const envSchema = z.object({
    NODE_ENV: z.enum(['development','production']).default('development'),
    PORT: z.coerce.number().int().min(1).max(65535).default(5000),
    MONGODB_URI: z.string().min(1, 'mongodb Uri required'),
    JWT_ACCESS_SECRET: z.string().min(1, "JWT secret required"),

})

const parsed = envSchema.safeParse(process.env)
export const env = Object.freeze(parsed.data)