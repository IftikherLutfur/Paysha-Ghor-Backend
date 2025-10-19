import { Types } from "mongoose";

export enum Role {
    ADMIN="ADMIN",
    USER="USER",
    AGENT="AGENT"
}

export enum UserStatus{
    APPROVED = "APPROVED",
    PENDING = "PENDING",
    SUSPEND = "SUSPEND",
    BLOCK = "BLOCK",
    ACTIVE = "ACTIVE"
}

export interface IUser{
    _id: Types.ObjectId;
    name:string;
    email:string;
    password:string;
    profilePhoto: string
    phone: string
    role: Role;
    userStatus?:UserStatus;
}
export interface IUserUpdate{
    name?:string;
    email?:string;
    profilePhoto?: string;
    phone?: string
    currentPassword: string;
    newPassword?:string;
}