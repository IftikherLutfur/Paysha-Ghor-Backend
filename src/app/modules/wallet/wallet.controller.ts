import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { WalletService } from "./wallet.service";
import { catchAsync } from "../../utils/catchAsymc";
import { MyJwtPayload } from "../../utils/jwt";


const getAllWallet = catchAsync(async(req:Request, res:Response)=>{
    const {userId} = req.user as MyJwtPayload
   const wallets = await WalletService.allWallets(userId)
   sendResponse(res,{
    success: true,
    message:"All wallets retrived",
    statusCode: res.statusCode,
    data: wallets
    
   })
})

// pop-up
const depositeByUser = catchAsync(async (req: Request, res: Response) => {
    try {
        const userId = req.user as MyJwtPayload;
        const { amount } = req.body;
        const payload = req.body

        if (!amount || amount <= 0) {
            throw new Error("A valid amount is required")
        }

        const popUp = await WalletService.deposite(userId.userId as string, Number(amount))

        sendResponse(res, {
            success: true,
            message: "Money has been deposited",
            statusCode: res.statusCode,
            data: popUp
        })

    } catch (error) {
        console.log(error);
    }
}
)
const sendMoney = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const userId = req.user as MyJwtPayload;
    const send = await WalletService.sendMoney(payload, userId.userId)
    sendResponse(res, {
        success: true,
        message: "Money send successfully",
        statusCode: res.statusCode,
        data: send
    })
})

// cashin by agent
const cashIn = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const userId = req.user as MyJwtPayload;
  const result = await WalletService.cashInMoney(payload, userId.userId);

  sendResponse(res, {
    success: true,
    message: "Cashin Successful",
    data: result,
    statusCode: res.statusCode
  });
});



const cashout = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const userId = req.user as MyJwtPayload;
    const cashInByAgent = await WalletService.cashoutMoney(payload, userId.userId);
    sendResponse(res, {
        success: true,
        message: "Cashout Successful",
        statusCode: res.statusCode,
        data: cashInByAgent
    })
})

const withdraw = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const userId = req.user as MyJwtPayload;

    const withdraw = await WalletService.withdrawByUser(payload.amount, userId.userId); // ✅ only pass amount and userId

    sendResponse(res, {
        success: true,
        message: "Successfully cashout",
        statusCode: res.statusCode,
        data: withdraw
    });
});


const getAllTransaction = catchAsync(async (req: Request, res: Response) => {
    const transaction = await WalletService.getAllTransaction()
    sendResponse(res, {
        success: true,
        message: "All transaction retrived successfully",
        statusCode: res.statusCode,
        data: transaction
    })
})

const getIndividualWallet = catchAsync(async (req: Request, res: Response) => {
    const walletId = req.params.id;
    const getIndividual = await WalletService.getIndividualWallet(walletId);
    sendResponse(res, {
        success: true,
        message: "Find your walletttttttttttt",
        statusCode: res.statusCode,
        data: getIndividual
    })
})

const getIndividualTransaction = catchAsync(async (req: Request, res: Response) => {
    const transActionId = req.params.id
    const getYourOwnTransaction = await WalletService.getOwnTransaction(transActionId)
    sendResponse(res, {
        success: true,
        message: "Find your transaction",
        statusCode: res.statusCode,
        data: getYourOwnTransaction
    })
})

const changeWalletStatus = catchAsync(async (req: Request, res: Response) => {
    try {
        const walletId = req.params.id;
        const payload = req.body;
        const changeStatus = await WalletService.changeWalletStatus(walletId, payload);

        sendResponse(res, {
            success: true,
            message: "Wallet status has been changed",
            statusCode: 200,
            data: changeStatus,
        });
    } catch (error) {
        sendResponse(res, {
            success: false,
            message: "Something went wrong",
            statusCode: 404,
            data: null,
        });
    }
})


export const WalletController = {
    getAllWallet,
    depositeByUser,
    sendMoney,
    withdraw,
    cashIn,
    cashout,
    getAllTransaction,
    getIndividualWallet,
    getIndividualTransaction,
    changeWalletStatus
};