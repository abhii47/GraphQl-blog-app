import { TokenData } from "../types"
import jwt from "jsonwebtoken"

export const generateToken = (userData: TokenData) => {
    const token = jwt.sign(
        {
            user_id:userData.user_id,
            name:userData.name,
            email:userData.email
        },
        process.env.SECRET_KEY as string,
        {
            expiresIn:'24h'
        }

    );
    return token;
}