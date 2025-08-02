"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletRoute = void 0;
const express_1 = require("express");
const wallet_controller_1 = require("./wallet.controller");
const auth_1 = require("../../middleware/auth");
const user_interface_1 = require("../user/user.interface");
const wallet = (0, express_1.Router)();
// wallet.post("/",checkAuth(Role.AGENT, Role.USER), WalletController.createWallet)
wallet.post("/deposite", (0, auth_1.checkAuth)(user_interface_1.Role.USER), wallet_controller_1.WalletController.depositeByUser);
wallet.post("/sendMoney", (0, auth_1.checkAuth)(user_interface_1.Role.USER), wallet_controller_1.WalletController.sendMoney);
wallet.post("/withdraw", (0, auth_1.checkAuth)(user_interface_1.Role.USER), wallet_controller_1.WalletController.withdraw);
wallet.post("/cash-in", (0, auth_1.checkAuth)(user_interface_1.Role.AGENT), wallet_controller_1.WalletController.cashIn);
wallet.post("/cash-out", (0, auth_1.checkAuth)(user_interface_1.Role.AGENT), wallet_controller_1.WalletController.cashout);
wallet.get("/transaction", (0, auth_1.checkAuth)(user_interface_1.Role.ADMIN), wallet_controller_1.WalletController.getAllTransaction);
wallet.get("/:id", (0, auth_1.checkAuth)(user_interface_1.Role.AGENT, user_interface_1.Role.USER), wallet_controller_1.WalletController.getIndividualWallet);
wallet.get("/transaction/:id", (0, auth_1.checkAuth)(user_interface_1.Role.AGENT, user_interface_1.Role.USER), wallet_controller_1.WalletController.getIndividualTransaction);
wallet.patch("/:id", (0, auth_1.checkAuth)(user_interface_1.Role.ADMIN), wallet_controller_1.WalletController.changeWalletStatus);
exports.walletRoute = wallet;
