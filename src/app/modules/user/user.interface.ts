import { Types } from "mongoose";

export enum Role {
    ADMIN="ADMIN",
    USER="USER",
    AGENT="AGENT"
}

export enum UserStatus{
    APPROVED = "APPROVED",
    PENDING = "PENDING",
    SUSPEND = "SUSPEND"
}

export interface IUser{
    _id: Types.ObjectId;
    name?:string;
    email:string;
    password:string;
    role: Role,
    userStatus?:UserStatus;
}