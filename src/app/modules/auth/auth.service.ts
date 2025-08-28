import { IUser } from "../user/user.interface"
import { User } from "../user/user.model"
import bcryptjs from "bcryptjs";

const loginUser = async (payload: Partial<IUser>) => {
    const { email, password } = payload

    if (!email || !password) {
        console.log("Missing credentials");
        throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        console.log("User not found");
        return null;
    }

    const isMatch = await bcryptjs.compare(password, user.password as string);

    if (!isMatch) {
        console.log("Password did not match");
        return null;
    }
    return user;
}

export const AuthService = {
    loginUser
} 