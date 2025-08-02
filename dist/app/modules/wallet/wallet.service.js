"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../user/user.model");
const wallet_interface_1 = require("./wallet.interface");
const wallet_model_1 = require("./wallet.model");
const walletCreate = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // 1 jon user er 2 ta wallet jate khulte na pare
    const isSameWalletExist = yield wallet_model_1.Wallet.findOne({ userId });
    if (isSameWalletExist) {
        throw new Error("This user already have a walet");
    }
    // user Exist kina check korlam
    const isUserExist = yield user_model_1.User.findById(payload.userId);
    if (!isUserExist) {
        throw new Error("User does not exist");
    }
    const wallet = yield wallet_model_1.Wallet.create(Object.assign(Object.assign({}, payload), { userId: userId }));
    const walletWithUser = yield wallet_model_1.Wallet.findById(wallet._id).populate('userId');
    return walletWithUser;
});
// pop-up
const deposite = (userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findOne({ userId });
    if ((wallet === null || wallet === void 0 ? void 0 : wallet.walletStatus) === wallet_interface_1.Wallet_Status.BLOCK) {
        throw new Error("Your wallet is block");
    }
    if (!wallet) {
        throw new Error("Wallet not found");
    }
    wallet.balance = wallet.balance + amount;
    yield wallet.save();
    const deposite = yield wallet_model_1.Transaction.create({
        type: wallet_interface_1.IPaymentType.POPUP,
        from: userId,
        amount: amount
    });
    return deposite;
});
// send money from user to user
const sendMoney = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const { to, amount } = payload;
    const sender = yield user_model_1.User.findById(userId);
    if (!sender) {
        throw new Error("Sender does not exist");
    }
    const reciver = yield user_model_1.User.findById(to);
    if (!reciver) {
        throw new Error("Reciever does not exist");
    }
    // check sender wallet is exist or not
    const senderWallet = yield wallet_model_1.Wallet.findOne({ userId: userId }).session(session);
    if ((senderWallet === null || senderWallet === void 0 ? void 0 : senderWallet.walletStatus) === wallet_interface_1.Wallet_Status.BLOCK) {
        throw new Error("Your wallet is block");
    }
    if (!senderWallet) {
        throw new Error("Sender wallet is not found");
    }
    // check receiver wallet is exist or not
    const recieverWallet = yield wallet_model_1.Wallet.findOne({ userId: to }).session(session);
    if ((recieverWallet === null || recieverWallet === void 0 ? void 0 : recieverWallet.walletStatus) === wallet_interface_1.Wallet_Status.BLOCK) {
        throw new Error("Reciver wallet is block");
    }
    if (!recieverWallet) {
        throw new Error("Reciever wallet is not found");
    }
    if (amount === undefined) {
        throw new Error("Amount is required");
    }
    if (typeof amount !== "number" || isNaN(amount)) {
        throw new Error("Amount should be a valid number");
    }
    if (senderWallet.balance < amount) {
        throw new Error("Your wallet has not enough money to send");
    }
    senderWallet.balance = senderWallet.balance - amount;
    recieverWallet.balance += amount;
    yield senderWallet.save({ session });
    yield recieverWallet.save({ session });
    const transaction = yield wallet_model_1.Transaction.create([{
            from: userId,
            to: recieverWallet,
            amount: amount,
            type: wallet_interface_1.IPaymentType.SENDMONEY,
            initiate: userId
        }], { session });
    yield session.commitTransaction();
    session.endSession();
    return transaction;
});
const withdrawByUser = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, amount } = payload;
    const isValidUser = yield user_model_1.User.findById(from);
    if (!isValidUser) {
        throw new Error("Unvalid user");
    }
    const cashOutUser = yield wallet_model_1.Wallet.findOne({ userId: from });
    if (!cashOutUser) {
        throw new Error("This user does not exist");
    }
    if ((cashOutUser === null || cashOutUser === void 0 ? void 0 : cashOutUser.walletStatus) === wallet_interface_1.Wallet_Status.BLOCK) {
        throw new Error("Wallet is block");
    }
    if (typeof amount !== "number" || isNaN(amount)) {
        throw new Error("Amount should be valid number");
    }
    cashOutUser.balance = cashOutUser.balance - amount;
    cashOutUser.save();
    const transaction = yield wallet_model_1.Transaction.create({
        from: from,
        amount: amount,
        type: wallet_interface_1.IPaymentType.WITHDRAW,
        initiate: userId
    });
    return transaction;
});
// cashin by agent
const cashInMoney = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, amount } = payload;
    const reciever = yield wallet_model_1.Wallet.findOne({ userId: to });
    if (!reciever) {
        throw new Error("This user doesn't exist");
    }
    if ((reciever === null || reciever === void 0 ? void 0 : reciever.walletStatus) === wallet_interface_1.Wallet_Status.BLOCK) {
        throw new Error("This wallet is block");
    }
    if (typeof amount !== "number" || isNaN(amount)) {
        throw new Error("Amount should be valid number");
    }
    const sender = yield wallet_model_1.Wallet.findOne({ _id: userId });
    if (Number(sender === null || sender === void 0 ? void 0 : sender.balance) > amount) {
        throw new Error("Insufficient balance");
    }
    reciever.balance = reciever.balance + amount;
    reciever.save();
    const createTransaction = yield wallet_model_1.Transaction.create({
        to: reciever,
        amount: amount,
        type: wallet_interface_1.IPaymentType.AGENT_CASHIN,
        initiate: userId
    });
    return createTransaction;
});
// cashout by agent
const cashoutMoney = (payload, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, amount } = payload;
    const sender = yield wallet_model_1.Wallet.findOne({ userId: from });
    if (!sender) {
        throw new Error("This user doesn't exist");
    }
    if ((sender === null || sender === void 0 ? void 0 : sender.walletStatus) === wallet_interface_1.Wallet_Status.BLOCK) {
        throw new Error("This wallet is block");
    }
    if (typeof amount !== "number" || isNaN(amount)) {
        throw new Error("Amount should be valid number");
    }
    sender.balance = sender.balance - amount;
    sender.save();
    const createTransaction = yield wallet_model_1.Transaction.create({
        from: sender,
        amount: amount,
        type: wallet_interface_1.IPaymentType.AGENT_CASHIN,
        initiate: userEmail
    });
    return createTransaction;
});
const getAllTransaction = () => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield wallet_model_1.Transaction.find({});
    return transaction;
});
// get Individual Wallet
const getIndividualWallet = (walletId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findOne({ userId: walletId });
    return wallet;
});
// get individual transaction
const getOwnTransaction = (transActionId) => __awaiter(void 0, void 0, void 0, function* () {
    const getTransaction = yield wallet_model_1.Transaction.find({
        initiate: transActionId
    });
    return getTransaction;
});
const changeWalletStatus = (walletId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingWallet = yield wallet_model_1.Wallet.findOne({ _id: walletId });
    if (!existingWallet) {
        throw new Error("Wallet not found!");
    }
    const updatedWallet = yield wallet_model_1.Wallet.findOneAndUpdate({ _id: walletId }, { $set: { walletStatus: payload.walletStatus } }, { new: true });
    return updatedWallet;
});
exports.WalletService = {
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
};
