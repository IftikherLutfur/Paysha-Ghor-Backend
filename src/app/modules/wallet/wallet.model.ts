import { model, Schema } from "mongoose";
import { ITransaction, IType, IWallet } from "./wallet.interface";
import { required } from "zod/v4/core/util.cjs";

const walletSchema = new Schema<IWallet>({
    userId : {type: Schema.Types.ObjectId, required: true, ref:"User" },
    balance: {type: Number, default: 50},
    walletType: {type: String, enum: Object.values(IType), default: IType.USER},
    toalSent: {type:Number},
    totalWithdraw: {type:Number},
    totalRecieved: {type:Number},
    commissionEarned: {type:Number},
},{
    timestamps: true,
    versionKey: false
})

const transactionSchema = new Schema<ITransaction>({
_id: {type:Schema.Types.ObjectId, required: true},
from: {type:Schema.Types.ObjectId, required: true },
to: {type:Schema.Types.ObjectId, required: true},
amount: {type:Number, required: true},
initiate: {type:Schema.Types.ObjectId},
})

export const Wallet = model<IWallet>("Wallet", walletSchema)

export const Transaction = model<ITransaction>("Transaction", transactionSchema)