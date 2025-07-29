import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { WalletService } from "./wallet.service";
import { User } from "../user/user.model";
import mongoose from "mongoose";

const createWallet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const userId = req.user?._id;
        
        // Id'r formate thik ache kina ta check korlam
        // if (!mongoose.Types.ObjectId.isValid(payload.userId)) {
        //     throw new Error("Invalid userId format in body");
        // }
        const walletCreate = await WalletService.walletCreate(payload, userId as string);
        sendResponse(res, {
            success: true,
            message: "Wallet created successfully",
            statusCode: res.statusCode,
            data: walletCreate
        })
    } catch (error) {
        next(error)
        console.log(error);
    }
}

export const WalletController = {
    createWallet
}