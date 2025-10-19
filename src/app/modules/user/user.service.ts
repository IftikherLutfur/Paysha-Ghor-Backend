import { IType, Wallet_Status } from "../wallet/wallet.interface";
import { WalletService } from "../wallet/wallet.service";
import { IUser, IUserUpdate, Role, UserStatus } from "./user.interface"
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
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    profilePhoto: payload.profilePhoto,
    phone: payload.phone,
    role: payload.role,
    ...(payload.role === "AGENT" && { userStatus: UserStatus.PENDING }),
    ...(payload.role === "USER" && { userStatus: UserStatus.ACTIVE }),

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

const getMe = async (userId: String) => {
  const getUser = await User.findById(userId).select("-password")
  return getUser;
};

const findAllUser = async () => {
  const findAll = await User.find({})
  return findAll;
}

const userAndAgent = async (page: number, limit: number) => {

  const parsedLimit = Number(limit)
  const parsedPage = Number(page)
  const skip = (parsedPage - 1) * parsedLimit

  const agentUser = await User.find({
    role: { $in: [Role.USER, Role.AGENT] }
  }).skip(skip).limit(parsedLimit)

  const total = await User.countDocuments({
    role: { $in: [Role.AGENT, Role.USER] }
  })

  return {
    data: agentUser,
    meta: {
      total,
      page: parsedPage,
      lkmit: parsedLimit,
      totalPages: Math.ceil(total / parsedLimit)
    }
  }
}

const userAndAgentById = async (id: string) => {
  const agentUser = await User.find({
    role: { $in: [Role.USER, Role.AGENT] }
  })
  if (!agentUser) {
    throw new Error("You are not authorized to get this user information")
  }
  const getById = await User.findById(id)
  return getById;
}

const agentApprove = async (agentId: string, payload: IUser) => {
  const isAgent = await User.findById(agentId)
  if (!isAgent || isAgent.role !== Role.AGENT) {
    throw new Error("Agent not found")
  }

  const agent = await User.findByIdAndUpdate(
    agentId,
    { userStatus: payload.userStatus }, // $set optional in Mongoose
    { new: true, runValidators: true }
  )
  if (!agent) {
    throw new Error("Failed to update agent")
  }
  return agent
}


const userStatusChange = async (payload: IUser, userId: string) => {
  const isUserExist = await User.findById(userId)
  if (!isUserExist) {
    throw new Error("This user is not exist")
  }

  const userStatus = await User.findByIdAndUpdate(
    userId,
    { userStatus: payload.userStatus },
    { new: true, runValidators: true }
  )
  return userStatus;
}


const updateUser = async (payload: IUserUpdate, userId: string) => {
  const { name, email, currentPassword, newPassword } = payload;
  const isUserExist = await User.findById(userId);

  if (!isUserExist) {
    throw new Error("User not found");
  }

  // Step 1: সবসময় currentPassword মিলছে কিনা চেক করবে
  const isMatch = await bcryptjs.compare(currentPassword, isUserExist.password);
  if (!isMatch) {
    throw new Error("Current password is incorrect, update cancelled!");
  }

  let hashedPassword = isUserExist.password;
  if (newPassword) {
    hashedPassword = await bcryptjs.hash(newPassword, 10);
  }

  // Step 4: updateData বানানো
  const updateData: Partial<IUser> = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  updateData.password = hashedPassword;

  const update = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  return update;
};

export const UserService = {
  userCreate,
  findAllUser,
  userAndAgentById,
  userAndAgent,
  agentApprove,
  getMe,
  updateUser,
  userStatusChange
}