import { Router } from "express";
import { WalletController } from "./wallet.controller";

const wallet = Router();

wallet.post("/", WalletController.createWallet)

export const walletRoute = wallet;