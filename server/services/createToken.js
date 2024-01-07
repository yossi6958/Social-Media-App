import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const createToken = (userId) => {
    const token = jwt.sign({_id: userId}, process.env.TOKEN_SECRET, { expiresIn:'14d' })
    return token;
}