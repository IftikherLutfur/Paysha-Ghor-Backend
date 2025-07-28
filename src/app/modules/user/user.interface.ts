export enum Role {
    ADMIN="ADMIN",
    USER="USER",
    AGENT="AGENT"
}

export interface IUser{
    name?:string;
    email:string;
    password:string;
    role: Role
}