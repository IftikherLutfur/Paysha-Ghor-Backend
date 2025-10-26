import { model, Schema } from "mongoose";
import { IFinance, IPaymentType, ITransaction, IType, IWallet, Wallet_Status } from "./wallet.interface";

const walletSchema = new Schema<IWallet>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    balance: { type: Number, default: 50 },
    walletStatus: { type: String, enum: Object.values(Wallet_Status), default: Wallet_Status.ACTIVE},
    walletType: { type: String, enum: Object.values(IType), default: IType.USER },
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
},
    {
        timestamps: true,
        versionKey: false
    }
)

const financeSchema = new Schema<IFinance>({
    sendMoney: { type: Number },
    cashOut: { type: Number },
    profit: { type: Number }
},
{
    timestamps:true,
    versionKey:false
}
)

export const Wallet = model<IWallet>("Wallet", walletSchema)
export const Finance = model<IFinance>("Finance", financeSchema)
export const Transaction = model<ITransaction>("Transaction", transactionSchema)