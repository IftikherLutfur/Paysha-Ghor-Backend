import mongoose from "mongoose";
import { User } from "../user/user.model";
import { IPaymentType, ITransaction, IWallet, Wallet_Status } from "./wallet.interface";
import { Transaction, Wallet } from "./wallet.model";

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
    if (wallet?.walletStatus === Wallet_Status.BLOCK) {
        throw new Error("Your wallet is block")
    }

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

// send money from user to user
const sendMoney = async (payload: Partial<ITransaction>, userId: string) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { to, amount } = payload;
    const sender = await User.findById(userId);
    if (!sender) {
        throw new Error("Sender does not exist")
    }

    const reciver = await User.findById(to);
    if (!reciver) {
        throw new Error("Reciever does not exist")
    }
    // check sender wallet is exist or not
    const senderWallet = await Wallet.findOne({ userId: userId }).session(session);
    if (senderWallet?.walletStatus === Wallet_Status.BLOCK) {
        throw new Error("Your wallet is block")
    }
    if (!senderWallet) {
        throw new Error("Sender wallet is not found")
    }

    // check receiver wallet is exist or not
    const recieverWallet = await Wallet.findOne({ userId: to }).session(session);
    if (recieverWallet?.walletStatus === Wallet_Status.BLOCK) {
        throw new Error("Reciver wallet is block")
    }
    if (!recieverWallet) {
        throw new Error("Reciever wallet is not found")
    }

    if (amount === undefined) {
        throw new Error("Amount is required");
    }
    if (typeof amount !== "number" || isNaN(amount)) {
        throw new Error("Amount should be a valid number");
    }

    if (senderWallet.balance < amount) {
        throw new Error("Your wallet has not enough money to send")
    }

    senderWallet.balance = senderWallet.balance - amount;
    recieverWallet.balance += amount;

    await senderWallet.save({session});
    await recieverWallet.save({session});

    const transaction = await Transaction.create([{
        from: userId,
        to: recieverWallet,
        amount: amount,
        type: IPaymentType.SENDMONEY,
        initiate: userId
    }], { session });
 await session.commitTransaction();
    session.endSession();
    return transaction


}

const withdrawByUser = async (payload: Partial<ITransaction>, userId: string) => {
    const { from, amount } = payload;

    const isValidUser = await User.findById(from);
    if (!isValidUser) {
        throw new Error("Unvalid user")
    }

    const cashOutUser = await Wallet.findOne({ userId: from });
    if (!cashOutUser) {
        throw new Error("This user does not exist")
    }

    if (cashOutUser?.walletStatus === Wallet_Status.BLOCK) {
        throw new Error("Wallet is block")
    }

    if (typeof amount !== "number" || isNaN(amount)) {
        throw new Error("Amount should be valid number")
    }

    cashOutUser.balance = cashOutUser.balance - amount;
    cashOutUser.save();

    const transaction = await Transaction.create({
        from: from,
        amount: amount,
        type: IPaymentType.WITHDRAW,
        initiate: userId
    })

    return transaction;

}


// cashin by agent
const cashInMoney = async (payload: Partial<ITransaction>, userEmail: string) => {
    const { to, amount } = payload


    const reciever = await Wallet.findOne({ userId: to })
    if (!reciever) {
        throw new Error("This user doesn't exist")
    }
    if (reciever?.walletStatus === Wallet_Status.BLOCK) {
        throw new Error("This wallet is block")
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

// cashout by agent
const cashoutMoney = async (payload: Partial<ITransaction>, userEmail: string) => {
    const { from, amount } = payload
    const sender = await Wallet.findOne({ userId: from })
    if (!sender) {
        throw new Error("This user doesn't exist")
    }
    if (sender?.walletStatus === Wallet_Status.BLOCK) {
        throw new Error("This wallet is block")
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

const getAllTransaction = async () => {
    const transaction = await Transaction.find({});
    return transaction;
}

// get Individual Wallet
const getIndividualWallet = async (walletId: string) => {
    const wallet = await Wallet.findOne({ userId: walletId })
    return wallet;
}

// get individual transaction
const getOwnTransaction = async (transActionId: string) => {
    const getTransaction = await Transaction.find({
        initiate: transActionId
    })
    return getTransaction;
}

const changeWalletStatus = async (walletId: string, payload: IWallet,) => {
    const existingWallet = await Wallet.findOne({ _id: walletId });
    if (!existingWallet) {
        throw new Error("Wallet not found!");
    }

    const updatedWallet = await Wallet.findOneAndUpdate(
        { _id: walletId },
        { $set: { walletStatus: payload.walletStatus } },
        { new: true }
    );

    return updatedWallet;
};

export const WalletService = {
    walletCreate,
    deposite,
    sendMoney,
    withdrawByUser,
    cashInMoney,
    cashoutMoney,
    getAllTransaction,
    getIndividualWallet,
    getOwnTransaction,
    changeWalletStatus
}