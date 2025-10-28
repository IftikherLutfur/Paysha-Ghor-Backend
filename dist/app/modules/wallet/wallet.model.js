"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.Finance = exports.Wallet = void 0;
const mongoose_1 = require("mongoose");
const wallet_interface_1 = require("./wallet.interface");
const walletSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    balance: { type: Number, default: 50 },
    walletStatus: { type: String, enum: Object.values(wallet_interface_1.Wallet_Status), default: wallet_interface_1.Wallet_Status.ACTIVE },
    profit: { type: Number },
    walletType: { type: String, enum: Object.values(wallet_interface_1.IType), default: wallet_interface_1.IType.USER },
}, {
    timestamps: true,
    versionKey: false
});
const transactionSchema = new mongoose_1.Schema({
    from: { type: mongoose_1.Schema.Types.ObjectId },
    to: { type: mongoose_1.Schema.Types.ObjectId },
    amount: { type: Number, required: true },
    type: { type: String, enum: Object.values(wallet_interface_1.IPaymentType), required: true },
    initiate: { type: mongoose_1.Schema.Types.ObjectId },
    number: { type: Number },
}, {
    timestamps: true,
    versionKey: false
});
const financeSchema = new mongoose_1.Schema({
    sendMoney: { type: Number },
    cashOut: { type: Number },
    profit: { type: Number }
}, {
    timestamps: true,
    versionKey: false
});
exports.Wallet = (0, mongoose_1.model)("Wallet", walletSchema);
exports.Finance = (0, mongoose_1.model)("Finance", financeSchema);
exports.Transaction = (0, mongoose_1.model)("Transaction", transactionSchema);
