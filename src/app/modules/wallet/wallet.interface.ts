import { Types } from "mongoose";

export enum IStatus {
    ACTIVE="ACTIVE",
    BLOK="BLOCK",
}

export interface IWallet {
    id: Types.ObjectId;
    userId: Types.ObjectId;
    balance: number;
    status: IStatus;
}