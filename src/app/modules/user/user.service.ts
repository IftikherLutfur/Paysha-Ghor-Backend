import { IUser } from "./user.interface"
import { User } from "./user.model"
import bcryptjs from "bcryptjs";

const userCreate = async (payload:IUser) => {
    const isExist = await User.findOne({email: payload.email})
    const hashedPassword = await bcryptjs.hash(payload.password, 10)
    if(isExist){
        throw new Error("User already exist")
    } 
    const user = await User.create({
        email: payload.email as string,
        password: hashedPassword,
        role: payload.role as string,
    })
    return user
}

const findAllUser = async()=>{
    const findAll = await User.find({})
    return findAll;
}

export const UserService = {
    userCreate,
    findAllUser
}