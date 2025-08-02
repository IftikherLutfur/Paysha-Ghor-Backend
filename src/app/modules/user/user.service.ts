import { IType, Wallet_Status } from "../wallet/wallet.interface";
import { WalletService } from "../wallet/wallet.service";
import { IUser, Role, UserStatus } from "./user.interface"
import { User } from "./user.model"
import bcryptjs from "bcryptjs";

const mapRoleToWalletType = (role: Role): IType => {
  switch (role) {
    case Role.USER:
      return IType.USER;
    case Role.AGENT:
      return IType.AGENT;
    default:
      throw new Error("Invalid role for wallet type");
  }
};
const userCreate = async (payload: IUser) => {
  const isExist = await User.findOne({ email: payload.email });
  if (isExist) {
    throw new Error("User already exist");
  }

  const hashedPassword = await bcryptjs.hash(payload.password, 10);

  const user = await User.create({
    email: payload.email,
    password: hashedPassword,
    role: payload.role,
    ...(payload.role === "AGENT" && { userStatus: UserStatus.PENDING }),
  });

  // Auto-create wallet with initial balance (e.g., 50)
  await WalletService.walletCreate({
    userId: user._id,
    balance: 50,       // initial balance
    walletType: mapRoleToWalletType(payload.role), // or "USER"/"AGENT" accordingly
    walletStatus: Wallet_Status.ACTIVE,
  }, user._id.toString());

  return user;
};

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