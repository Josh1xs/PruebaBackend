import dotenv from "dotenv"

dotenv.config();


export const config = {
    JWT: {
        secret: process.env.JWT_Secret_key,
    },

    email: {
        USER_email: process.env.USER_email,
        USER_password: process.env.USER_password
    }
}