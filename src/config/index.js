import dotenv from 'dotenv'
dotenv.config()

export const {
    APP_PORT,
    CONNECTION_URL,
    JWT_SECRET
} = process.env