import { model, Schema } from "mongoose";
import { IPaymentType, ITransaction, IType, IWallet } from "./wallet.interface";
import { required } from "zod/v4/core/util.cjs";

const walletSchema = new Schema<IWallet>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    balance: { type: Number, default: 50 },
    walletType: { type: String, enum: Object.values(IType), default: IType.USER },
    toalSent: { type: Number },
    totalWithdraw: { type: Number },
    totalRecieved: { type: Number },
    commissionEarned: { type: Number },
}, {
    timestamps: true,
    versionKey: false
})

const transactionSchema = new Schema<ITransaction>({
    from: { type: Schema.Types.ObjectId },
    to: { type: Schema.Types.ObjectId },
    amount: { type: Number, required: true },
    type: { type: String, enum: Object.values(IPaymentType), required: true },
    initiate: { type: Schema.Types.ObjectId },
})

export const Wallet = model<IWallet>("Wallet", walletSchema)

export const Transaction = model<ITransaction>("Transaction", transactionSchema)