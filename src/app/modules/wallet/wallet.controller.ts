import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { WalletService } from "./wallet.service";


const createWallet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const userId = req.user?._id;
        
        // Id'r formate thik ache kina ta check korlam
        // if (!mongoose.Types.ObjectId.isValid(payload.userId)) {
        //     throw new Error("Invalid userId format in body");
        // }
        const walletCreate = (await WalletService.walletCreate(payload, userId as string));
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

// pop-up
const depositeByUser = async(req:Request, res: Response)=>{
    try {
     const userId = req.user._id;
     const {amount} = req.body;

     if(!amount || amount <=0){
        throw new Error("A valid amount is required")
     }

     const popUp = await WalletService.deposite(userId as string, Number(amount))

     sendResponse(res,{
        success: true,
        message: "Money has been deposited",
        statusCode: res.statusCode,
        data: popUp
     })

    } catch (error) {
        
    }
}

// *1.Send money from a valid user who is exist on db at the user collection
// *2.Recieved money a valid user, who is exist on db at the user collection
// *3.This operation done by transaction collection
// *4.To means who send and the sender's data will be stored by the sender id (to)
// *5.By this operation wallet collection will be change, add or out from the user wallet.
// *6.



const sendMoney = async(req: Request, res:Response)=>{
  const payload = req.body;
  const userId = req.user._id
  const send = await WalletService.sendMoney(payload, userId)
  sendResponse(res,{
    success: true,
    message: "Money send successfully",
    statusCode: res.statusCode,
    data: send
  })
}

export const WalletController = {
    createWallet,
    depositeByUser,
    sendMoney
}