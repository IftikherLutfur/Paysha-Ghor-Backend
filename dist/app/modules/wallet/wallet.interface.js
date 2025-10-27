"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPaymentType = exports.Wallet_Status = exports.IType = void 0;
var IType;
(function (IType) {
    IType["USER"] = "USER";
    IType["AGENT"] = "AGENT";
    IType["ADMIN"] = "ADMIN";
})(IType || (exports.IType = IType = {}));
var Wallet_Status;
(function (Wallet_Status) {
    Wallet_Status["ACTIVE"] = "ACTIVE";
    Wallet_Status["BLOCK"] = "BLOCK";
})(Wallet_Status || (exports.Wallet_Status = Wallet_Status = {}));
var IPaymentType;
(function (IPaymentType) {
    IPaymentType["POPUP"] = "POPUP";
    IPaymentType["SENDMONEY"] = "SENDMONEY";
    IPaymentType["WITHDRAW"] = "WITHDRAW";
    IPaymentType["AGENT_CASHIN"] = "AGENT_CASHIN";
    IPaymentType["AGENT_CASHOUT"] = "AGENT_CASHOUT";
})(IPaymentType || (exports.IPaymentType = IPaymentType = {}));
