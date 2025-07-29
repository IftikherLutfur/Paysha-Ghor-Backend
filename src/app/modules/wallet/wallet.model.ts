import { model, Schema } from "mongoose";
import { IStatus, IWallet } from "./wallet.interface";

const walletSchema = new Schema<IWallet>({
    userId : {type: Schema.Types.ObjectId, required: true },
    balance: {type: Number, default: 50},
    status: {type: String, enum: Object.values(IStatus), default: IStatus.ACTIVE},
},{
    timestamps: true,
    versionKey: false
})

export const Wallet = model<IWallet>("Wallet", walletSchema)