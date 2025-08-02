import { IUser, Role, UserStatus } from "./user.interface"
import { User } from "./user.model"
import bcryptjs from "bcryptjs";

const userCreate = async (payload: IUser) => {
    const isExist = await User.findOne({ email: payload.email })
    if (isExist) {
        throw new Error("User already exist")
    }
    const hashedPassword = await bcryptjs.hash(payload.password, 10)
    const user = await User.create({
        email: payload.email as string,
        password: hashedPassword,
        role: payload.role as string,
        ...(payload.role === "AGENT" && { userStatus: UserStatus.PENDING })

    })
    return user
}

const findAllUser = async () => {
    const findAll = await User.find({})
    return findAll;
}

const agentApprove = async (agentId: string, payload: IUser) => {
    const isAgent = await User.findById(agentId);
    if(isAgent?.role !== Role.AGENT){
        throw new Error("Agent not found")
    }
    const agent = await User.findByIdAndUpdate({ _id: agentId },
        { $set: { userStatus: payload.userStatus } },
        { new: true, runValidators: true }
    )
    return agent;
}

export const UserService = {
    userCreate,
    findAllUser,
    agentApprove
}