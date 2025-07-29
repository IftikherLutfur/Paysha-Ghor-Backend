import { Router } from "express";
import { WalletController } from "./wallet.controller";
import { checkAuth } from "../../middleware/auth";
import { Role } from "../user/user.interface";

const wallet = Router();

wallet.post("/",checkAuth(Role.AGENT, Role.USER), WalletController.createWallet)

export const walletRoute = wallet;