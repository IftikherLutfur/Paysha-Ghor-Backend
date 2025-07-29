import { configDotenv } from "dotenv";
import { IUser, Role } from "../modules/user/user.interface";
import { generateToken } from "./jwt";

configDotenv();

const JWT_SECRET = process.env.JWT_SECRET_TOKEN as string;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

interface MyJwtPayload {
    userId: string;
    email: string;
    role: Role;
}

export const createUserToken = (user: Partial<IUser>)=>{

    if(!user.email || !user.role || !user._id){
        throw new Error("User id, email and role are required")
    }

    const JwtPayload: MyJwtPayload = {
        userId: typeof user._id === "string" ? user._id : user._id.toString(),
        email: user.email,
        role: user.role
    }
    const accessToken = generateToken(JwtPayload,JWT_SECRET, "1d")
    console.log(accessToken);
    return {accessToken};

}