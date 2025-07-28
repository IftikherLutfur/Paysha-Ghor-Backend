import { model, Schema } from "mongoose";
import { IUser, Role } from "./user.interface";

const userSchema = new Schema<IUser>({
    name: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type:String, enum: Object.values(Role), default: Role.USER}
})

export const User = model<IUser>("User", userSchema)