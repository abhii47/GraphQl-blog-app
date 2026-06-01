import { TokenData } from "../types"
import jwt from "jsonwebtoken"

const secret = String(process.env.SECRET_KEY);

export const generateToken = (userData: TokenData) => {
    const token = jwt.sign(
        {
            user_id:userData.user_id,
            name:userData.name,
            email:userData.email
        },
        secret,
        {
            expiresIn:'24h'
        }

    );
    return token;
}

export const verifyToken = (token:string) => {
    const data = jwt.verify(token, secret);
    return data;
}