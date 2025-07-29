import { User } from "../user/user.model";
import { IWallet } from "./wallet.interface";
import { Wallet } from "./wallet.model";

const walletCreate = async (payload: Partial<IWallet>, userId: string) => {
    // 1 jon user er 2 ta wallet jate khulte na pare
    const isSameWalletExist = await Wallet.findOne({userId})
    if(isSameWalletExist){
        throw new Error("This user already have a walet")
    }
    // user Exist kina check korlam
    const isUserExist = await User.findById(payload.userId);
    if (!isUserExist) {
        throw new Error("User does not exist");
    }

    const wallet = await Wallet.create({
        ...payload,
        userId: userId
    })
    return wallet
}

export const WalletService = {
    walletCreate
}