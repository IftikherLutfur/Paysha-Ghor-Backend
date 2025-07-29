// src/utils/jwt.ts
import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { Role } from "../modules/user/user.interface";

export interface MyJwtPayload extends JwtPayload {
    userId: string;
    email: string;
    role: Role
}
export const generateToken = (payload: MyJwtPayload, secret: string, expiresIn = "1d") => {
    return jwt.sign(payload, secret, { expiresIn } as SignOptions);
};

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as MyJwtPayload;
};
