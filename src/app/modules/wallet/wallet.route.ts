import { Router } from "express";
import { WalletController } from "./wallet.controller";
import { checkAuth } from "../../middleware/auth";
import { Role } from "../user/user.interface";

const wallet = Router();

wallet.post("/",checkAuth(Role.AGENT, Role.USER), WalletController.createWallet)
wallet.post("/deposite",checkAuth(Role.USER), WalletController.depositeByUser)
wallet.post("/sendMoney", checkAuth(Role.USER), WalletController.sendMoney)
wallet.post("/withdraw", checkAuth(Role.USER), WalletController.withdraw)
wallet.post("/cash-in", checkAuth(Role.AGENT), WalletController.cashIn)
wallet.post("/cash-out", checkAuth(Role.AGENT), WalletController.cashout)

export const walletRoute = wallet;