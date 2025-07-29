import { IWallet } from "./wallet.interface";
import { Wallet } from "./wallet.model";

const walletCreate = async(payload: Partial<IWallet>)=>{
    const wallet = await Wallet.create({
        userId: payload.userId,
        ...payload
    })
    return wallet
}

export const WalletService = {
    walletCreate
}