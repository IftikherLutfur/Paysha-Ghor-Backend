import { partial } from "zod/v4/core/util.cjs";
import { User } from "../user/user.model";
import { IPaymentType, ITransaction, IWallet } from "./wallet.interface";
import { Transaction, Wallet } from "./wallet.model";
import { Role } from "../user/user.interface";

const walletCreate = async (payload: Partial<IWallet>, userId: string) => {
    // 1 jon user er 2 ta wallet jate khulte na pare
    const isSameWalletExist = await Wallet.findOne({ userId })
    if (isSameWalletExist) {
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
    const walletWithUser = await Wallet.findById(wallet._id).populate('userId');

    return walletWithUser
}

// pop-up
const deposite = async (userId: string, amount: number) => {
    const wallet = await Wallet.findOne({ userId })

    if (!wallet) {
        throw new Error("Wallet not found")
    }
    wallet.balance = wallet.balance + amount;
    await wallet.save();

    const deposite = await Transaction.create({
        type: IPaymentType.POPUP,
        from: userId,
        amount: amount
    })

    return deposite

}

// send money
const sendMoney = async (payload: Partial<ITransaction>) => {
    const { from, to, amount } = payload;

    const sender = await User.findById(from);
    if (!sender) {
        throw new Error("Sender does not exist")
    }

    const reciver = await User.findById(to);
    if (!reciver) {
        throw new Error("Reciever does not exist")
    }

    const senderWallet = await Wallet.findOne({ userId: from })
    if (!senderWallet) {
        throw new Error("Sender wallet is not found")
    }

    const recieverWallet = await Wallet.findOne({ userId: to })
    if (!recieverWallet) {
        throw new Error("Reciever wallet is not found")
    }

    if (amount === undefined) {
        throw new Error("Amount is required");
    }
    if (typeof amount !== "number" || isNaN(amount)) {
        throw new Error("Amount should be a valid number");
    }

    senderWallet.balance = senderWallet.balance - amount;
    recieverWallet.balance += amount;

    senderWallet.save();
    recieverWallet.save();

    const transaction = await Transaction.create({
        from: senderWallet,
        to: recieverWallet,
        amount: amount,
        type: IPaymentType.SENDMONEY
    })

    return transaction

}

const withdrawByUser = async (payload: ITransaction) => {
    const { from, amount } = payload;

    const isValidUser = await User.findById(from);
    if (!isValidUser) {
        throw new Error("Unvalid user")
    }

    const cashOutUser = await Wallet.findOne({ userId: from });
    if (!cashOutUser) {
        throw new Error("This user does not exist")
    }

    if (typeof amount !== "number" || isNaN(amount)) {
        throw new Error("Amount should be valid number")
    }

    cashOutUser.balance = cashOutUser.balance - amount;
    cashOutUser.save();

    const transaction = await Transaction.create({
        from: from,
        amount: amount,
        type: IPaymentType.WITHDRAW
    })

    return transaction;

}

const cashInMoney = async (payload: Partial<ITransaction>, userEmail: string) => {
    const { to, amount } = payload


    const reciever = await Wallet.findOne({ userId: to })
    if (!reciever) {
        throw new Error("This user doesn't exist")
    }
    if (typeof amount !== "number" || isNaN(amount)) {
        throw new Error("Amount should be valid number")
    }
    reciever.balance = reciever.balance + amount;
    reciever.save()

    const createTransaction = await Transaction.create({
        to: reciever,
        amount: amount,
        type: IPaymentType.AGENT_CASHIN,
        initiate: userEmail
    })

    return createTransaction;
}

const cashoutMoney = async (payload: Partial<ITransaction>, userEmail: string) => {
    const { from, amount } = payload
    const sender = await Wallet.findOne({ userId: from })
    if (!sender) {
        throw new Error("This user doesn't exist")
    }
    if (typeof amount !== "number" || isNaN(amount)) {
        throw new Error("Amount should be valid number")
    }
    sender.balance = sender.balance - amount;
    sender.save()

    const createTransaction = await Transaction.create({
        from: sender,
        amount: amount,
        type: IPaymentType.AGENT_CASHIN,
        initiate: userEmail
    })

    return createTransaction;
}


export const WalletService = {
    walletCreate,
    deposite,
    sendMoney,
    withdrawByUser,
    cashInMoney,
    cashoutMoney
}