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
// const createWallet = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const payload = req.body;
//         const userId = req.user?._id;
//         // Id'r formate thik ache kina ta check korlam
//         // if (!mongoose.Types.ObjectId.isValid(payload.userId)) {
//         //     throw new Error("Invalid userId format in body");
//         // }
//         const walletCreate = (await WalletService.walletCreate(payload, userId as string));
//         sendResponse(res, {
//             success: true,
//             message: "Wallet created successfully",
//             statusCode: res.statusCode,
//             data: walletCreate
//         })
//     } catch (error) {
//         next(error)
//         console.log(error);
//     }
// }
// pop-up
const depositeByUser = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        const { amount } = req.body;
        const payload = req.body;
        if (!amount || amount <= 0) {
            throw new Error("A valid amount is required");
        }
        const popUp = yield wallet_service_1.WalletService.deposite(userId, Number(amount));
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
    const userId = req.user._id;
    const send = yield wallet_service_1.WalletService.sendMoney(payload, userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Money send successfully",
        statusCode: res.statusCode,
        data: send
    });
}));
const cashIn = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const userId = req.user._id;
    const cashInByAgent = yield wallet_service_1.WalletService.cashInMoney(payload, userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Cashin Successful",
        statusCode: res.statusCode,
        data: cashInByAgent
    });
}));
const cashout = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const userId = req.user._id;
    const cashInByAgent = yield wallet_service_1.WalletService.cashoutMoney(payload, userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Cashout Successful",
        statusCode: res.statusCode,
        data: cashInByAgent
    });
}));
const withdraw = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const userId = req.user._id;
    const withdraw = yield wallet_service_1.WalletService.withdrawByUser(payload, userId);
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
    // createWallet,
    depositeByUser,
    sendMoney,
    withdraw,
    cashIn,
    cashout,
    getAllTransaction,
    getIndividualWallet,
    getIndividualTransaction,
    changeWalletStatus
};
