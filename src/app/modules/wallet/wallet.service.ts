import mongoose from "mongoose";
import { User } from "../user/user.model";
import { IPaymentType, ITransaction, IType, IWallet, Wallet_Status } from "./wallet.interface";
import { Finance, Transaction, Wallet } from "./wallet.model";
import { IUser, Role, UserStatus } from "../user/user.interface";
import { MyJwtPayload } from "../../utils/jwt";

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

const allWallets = async (userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.role !== "ADMIN") {
        throw new Error("Forbidden: Only admins can view all wallets");
    }

    const wallets = await Wallet.find({});
    return wallets;
};

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
        initiate: userId,
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

    if (reciver.role !== Role.USER) {
        throw new Error("Receiver must be a user");
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

    await senderWallet.save({ session });
    await recieverWallet.save({ session });

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

const withdrawByUser = async (amount: number, userId: string) => {

    // find wallet
    const cashOutUser = await Wallet.findOne({ userId: userId });
    if (!cashOutUser) {
        throw new Error("Your wallet doesn't exist");
    }

    if (cashOutUser.walletStatus === Wallet_Status.BLOCK) {
        throw new Error("Your wallet is blocked");
    }

    if (typeof amount !== "number" || isNaN(amount)) {
        throw new Error("Amount should be a valid number");
    }

    if (cashOutUser.balance < amount) {
        throw new Error("Not enough balance");
    }

    // withdraw
    cashOutUser.balance -= amount;
    await cashOutUser.save();

    const transaction = await Transaction.create({
        from: userId, // ✅ always logged-in user
        amount,
        type: IPaymentType.WITHDRAW,
        initiate: userId,
    });

    return transaction;
}

// cashin by agent
const cashInMoney = async (payload: Partial<ITransaction>, userId: string) => {
    const { to, amount } = payload;

    // Validate amount
    if (typeof amount !== "number" || isNaN(amount)) {
        throw new Error("Amount should be a valid number");
    }

    // Validate sender (agent)
    const sender = await Wallet.findOne({ userId: userId });
    if (!sender) {
        throw new Error("Sender walletsss not found");
    }

    const senderUser = await User.findById(userId)

    // ✅ sender must be an AGENT
    if (sender.walletType !== IType.AGENT) {
        throw new Error("Only agents are allowed to cash in money");
    }

    // ✅ sender's wallet must be ACTIVE
    if (senderUser?.userStatus !== UserStatus.APPROVED) {
        throw new Error("Your agent account is not yet approved by admin. Wait till the approved");
    }

    // ✅ sender.balance must be <= amount (your rule)
    if (sender.balance < amount) {
        throw new Error("You can't send money if your balance is greater than the amount"); // as per your condition
    }

    // ✅ Find receiver
    const receiver = await Wallet.findOne({ userId: to });
    if (!receiver) {
        throw new Error("Receiver wallet not found");
    }

    // ✅ Receiver's wallet must not be BLOCKED
    if (receiver.walletStatus === Wallet_Status.BLOCK) {
        throw new Error("Receiver's wallet is blocked");
    }

    // ✅ Do the balance update
    sender.balance -= amount;
    receiver.balance += amount;


    // ✅ Save updated wallets
    await sender.save();
    await receiver.save();

    // ✅ Create transaction
    const transaction = await Transaction.create({
        to: to,
        amount,
        from: userId,
        type: IPaymentType.AGENT_CASHIN,
        initiate: userId,
    });

    return transaction;
};


const cashoutMoney = async (payload: Partial<ITransaction>, user: any) => {
    const { amount, to } = payload;

    const admin = await Wallet.findOne({ walletType: IType.ADMIN })
    const sender = await Wallet.findOne({ userId: user.userId });
    const agent = await Wallet.findOne({ userId: to });

    if (!sender) throw new Error("Sender not found");
    if (!agent) throw new Error("Agent not found");
    if (!admin) throw new Error("Agent not found");

    if (sender.walletStatus === Wallet_Status.BLOCK) {
        throw new Error("Sender wallet is blocked");
    }

    if (agent.walletStatus === Wallet_Status.BLOCK) {
        throw new Error("Agent wallet is blocked");
    }

    if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
        throw new Error("Amount should be a valid positive number");
    }


    const userFee = amount + (amount * 10) / 1000; // 10% fee
    const agentCommission = (amount * 7) / 1000;   // 7% for agent
    const adminCommission = (amount * 3) / 1000;   // 3% for admin
    console.log(adminCommission)

    if (sender.balance < userFee) {
        throw new Error("Insufficient balance");
    }

    // Update balances
    sender.balance -= userFee;
    agent.balance += amount;
    agent.profit = (agent.profit ?? 0) + agentCommission;
    admin.balance = admin?.balance + adminCommission

    await sender.save();
    await agent.save();
    await admin.save();

    // Save admin profit


    // Save transaction record
    const createTransaction = await Transaction.create({
        from: sender.userId,
        to: to,
        amount,
        type: IPaymentType.AGENT_CASHOUT,
        initiate: user.userId,
    });

    return createTransaction;
};


const mobileRecharge = async (payload: Partial<ITransaction>, user: MyJwtPayload) => {
    const {amount} = payload;
    const sender = await Wallet.findOne({ userId: user.userId })
    if(!sender) {
        throw new Error("Sender is required")
    }

    sender.balance -= Number(amount);
    await sender.save() 

    const createTransaction = await Transaction.create({
        from: sender?.userId,
        number: payload.number,
        amount: amount,
        type: IPaymentType.MOBILE_RECHARGE,
        initiate: user.userId,
    });
    return createTransaction
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
    allWallets,
    deposite,
    sendMoney,
    withdrawByUser,
    cashInMoney,
    cashoutMoney,
    getAllTransaction,
    getIndividualWallet,
    getOwnTransaction,
    changeWalletStatus,
    mobileRecharge
}