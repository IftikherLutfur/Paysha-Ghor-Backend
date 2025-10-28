import { Router } from "express";
import { WalletController } from "./wallet.controller";
import { checkAuth } from "../../middleware/auth";
import { Role } from "../user/user.interface";
import { zodValidation } from "../../middleware/zodValidation";
import { transactionValidation, walletValidation } from "./wallet.validation";

const wallet = Router();

wallet.get("/",checkAuth(Role.ADMIN), WalletController.getAllWallet)
wallet.post("/deposite",checkAuth(Role.USER), zodValidation(transactionValidation), WalletController.depositeByUser)
wallet.post("/sendMoney", checkAuth(Role.USER), zodValidation(transactionValidation), WalletController.sendMoney)
wallet.post("/withdraw", checkAuth(Role.USER), zodValidation(transactionValidation), WalletController.withdraw)
wallet.post("/cash-in", checkAuth(Role.AGENT), zodValidation(transactionValidation), WalletController.cashIn)
wallet.post("/cash-out", checkAuth(Role.USER), zodValidation(transactionValidation), WalletController.cashout)
wallet.post("/recharge", checkAuth(Role.AGENT), WalletController.agentMobileRecharge)
wallet.get("/transaction", checkAuth(Role.ADMIN), WalletController.getAllTransaction)
wallet.get("/:id", checkAuth(Role.AGENT, Role.USER), WalletController.getIndividualWallet);
wallet.get("/transaction/:id", checkAuth(Role.AGENT, Role.USER), WalletController.getIndividualTransaction);
wallet.patch("/changeStatus/:id", checkAuth(Role.ADMIN), WalletController.changeWalletStatus)

export const walletRoute = wallet; 