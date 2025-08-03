"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionValidation = exports.walletValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const wallet_interface_1 = require("./wallet.interface");
exports.walletValidation = zod_1.default.object({
    userId: zod_1.default.string().optional(),
    balance: zod_1.default.string().optional(),
    walletStatus: zod_1.default.enum(wallet_interface_1.Wallet_Status).optional(),
    walletType: zod_1.default.enum(wallet_interface_1.IType).optional(),
});
exports.transactionValidation = zod_1.default.object({
    from: zod_1.default.string().optional(),
    to: zod_1.default.string().optional(),
    amount: zod_1.default.number(),
    type: zod_1.default.enum(wallet_interface_1.IPaymentType).optional(),
    initiate: zod_1.default.string().optional(),
}).strict();
