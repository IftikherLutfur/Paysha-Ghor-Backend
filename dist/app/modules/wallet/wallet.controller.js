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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const wallet_service_1 = require("./wallet.service");
const catchAsymc_1 = require("../../utils/catchAsymc");
const getAllWallet = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const wallets = yield wallet_service_1.WalletService.allWallets(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "All wallets retrived",
        statusCode: res.statusCode,
        data: wallets
    });
}));
// pop-up
const depositeByUser = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user;
        const { amount } = req.body;
        const payload = req.body;
        if (!amount || amount <= 0) {
            throw new Error("A valid amount is required");
        }
        const popUp = yield wallet_service_1.WalletService.deposite(userId.userId, Number(amount));
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Money has been deposited",
            statusCode: res.statusCode,
            data: popUp
        });
    }
    catch (error) {
        console.log(error);
    }
}));
const sendMoney = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const userId = req.user;
    const send = yield wallet_service_1.WalletService.sendMoney(payload, userId.userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Money send successfully",
        statusCode: res.statusCode,
        data: send
    });
}));
// cashin by agent
const cashIn = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const userId = req.user;
    const result = yield wallet_service_1.WalletService.cashInMoney(payload, userId.userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Cashin Successful",
        data: result,
        statusCode: res.statusCode
    });
}));
const agentMobileRecharge = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const body = req.body;
    const result = yield wallet_service_1.WalletService.mobileRecharge(body, userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Recharge Successful",
        statusCode: res.statusCode,
        data: result
    });
}));
const cashout = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const userId = req.user;
        const cashInByAgent = yield wallet_service_1.WalletService.cashoutMoney(payload, userId);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Cashout Successful",
            statusCode: res.statusCode,
            data: cashInByAgent
        });
    }
    catch (error) {
        console.log(error);
    }
}));
const withdraw = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const userId = req.user;
    const withdraw = yield wallet_service_1.WalletService.withdrawByUser(payload.amount, userId.userId); // ✅ only pass amount and userId
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Successfully cashout",
        statusCode: res.statusCode,
        data: withdraw
    });
}));
const getAllTransaction = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield wallet_service_1.WalletService.getAllTransaction();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "All transaction retrived successfully",
        statusCode: res.statusCode,
        data: transaction
    });
}));
const getIndividualWallet = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const walletId = req.params.id;
    const getIndividual = yield wallet_service_1.WalletService.getIndividualWallet(walletId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Find your walletttttttttttt",
        statusCode: res.statusCode,
        data: getIndividual
    });
}));
const getIndividualTransaction = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transActionId = req.params.id;
    const getYourOwnTransaction = yield wallet_service_1.WalletService.getOwnTransaction(transActionId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Find your transaction",
        statusCode: res.statusCode,
        data: getYourOwnTransaction
    });
}));
const changeWalletStatus = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const walletId = req.params.id;
        const payload = req.body;
        const changeStatus = yield wallet_service_1.WalletService.changeWalletStatus(walletId, payload);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Wallet status has been changed",
            statusCode: 200,
            data: changeStatus,
        });
    }
    catch (error) {
        (0, sendResponse_1.sendResponse)(res, {
            success: false,
            message: "Something went wrong",
            statusCode: 404,
            data: null,
        });
    }
}));
exports.WalletController = {
    getAllWallet,
    depositeByUser,
    sendMoney,
    withdraw,
    cashIn,
    cashout,
    getAllTransaction,
    getIndividualWallet,
    getIndividualTransaction,
    changeWalletStatus,
    agentMobileRecharge
};
