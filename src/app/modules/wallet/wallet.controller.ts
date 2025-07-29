import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { WalletService } from "./wallet.service";

const createWallet = async(req:Request, res:Response)=>{
       try {
        const payload = req.body;
        const depositeTk= await WalletService.walletCreate(payload)
        sendResponse(res,{
            success: true,
            message: "Money has been deposited",
            statusCode: res.statusCode,
            data: depositeTk
        })
       } catch (error) {
        console.log(error);
       }
}

export const WalletController = {
    createWallet
}