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
     const payload = req.body

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
        console.log(error);
    }
}

const sendMoney = async(req: Request, res:Response)=>{
  const payload = req.body;
  const send = await WalletService.sendMoney(payload)
  sendResponse(res,{
    success: true,
    message: "Money send successfully",
    statusCode: res.statusCode,
    data: send
  })
}

const cashIn = async(req:Request, res:Response) =>{
     const payload = req.body;
     const userEmail = req.user._id;
     const cashInByAgent = await WalletService.cashInMoney(payload, userEmail);
     sendResponse(res,{
        success:true,
        message:"Cashin Successful",
        statusCode: res.statusCode,
        data: cashInByAgent
     })
}

const cashout = async(req:Request, res:Response) =>{
     const payload = req.body;
     const userId = req.user._id;
     const cashInByAgent = await WalletService.cashoutMoney(payload, userId);
     sendResponse(res,{
        success:true,
        message:"Cashout Successful",
        statusCode: res.statusCode,
        data: cashInByAgent
     })
}

const withdraw = async (req:Request, res:Response) =>{
      const payload = req.body;
      const withdraw = await WalletService.withdrawByUser(payload)
      sendResponse(res,{
        success: true,
        message: "Successfully cashout",
        statusCode: res.statusCode,
        data: withdraw
      })

    }



export const WalletController = {
    createWallet,
    depositeByUser,
    sendMoney,
    withdraw,
    cashIn,
    cashout
}