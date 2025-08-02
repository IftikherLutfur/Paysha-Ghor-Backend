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
exports.UserService = void 0;
const wallet_interface_1 = require("../wallet/wallet.interface");
const wallet_service_1 = require("../wallet/wallet.service");
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mapRoleToWalletType = (role) => {
    switch (role) {
        case user_interface_1.Role.USER:
            return wallet_interface_1.IType.USER;
        case user_interface_1.Role.AGENT:
            return wallet_interface_1.IType.AGENT;
        default:
            throw new Error("Invalid role for wallet type");
    }
};
const userCreate = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ email: payload.email });
    if (isExist) {
        throw new Error("User already exist");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(payload.password, 10);
    const user = yield user_model_1.User.create(Object.assign({ email: payload.email, password: hashedPassword, role: payload.role }, (payload.role === "AGENT" && { userStatus: user_interface_1.UserStatus.PENDING })));
    // Auto-create wallet with initial balance (e.g., 50)
    yield wallet_service_1.WalletService.walletCreate({
        userId: user._id,
        balance: 50, // initial balance
        walletType: mapRoleToWalletType(payload.role), // or "USER"/"AGENT" accordingly
        walletStatus: wallet_interface_1.Wallet_Status.ACTIVE,
    }, user._id.toString());
    return user;
});
const findAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const findAll = yield user_model_1.User.find({});
    return findAll;
});
const agentApprove = (agentId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isAgent = yield user_model_1.User.findById(agentId);
    if ((isAgent === null || isAgent === void 0 ? void 0 : isAgent.role) !== user_interface_1.Role.AGENT) {
        throw new Error("Agent not found");
    }
    const agent = yield user_model_1.User.findByIdAndUpdate({ _id: agentId }, { $set: { userStatus: payload.userStatus } }, { new: true, runValidators: true });
    return agent;
});
exports.UserService = {
    userCreate,
    findAllUser,
    agentApprove
};
