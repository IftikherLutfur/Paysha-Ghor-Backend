import { model, Schema } from "mongoose";
import { IUser, Role } from "./user.interface";
import { timeStamp } from "console";

const userSchema = new Schema<IUser>({
    
    name: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type:String, enum: Object.values(Role), default: Role.USER}
},
{
    timestamps: true,
    versionKey: false
}
)

export const User = model<IUser>("User", userSchema)