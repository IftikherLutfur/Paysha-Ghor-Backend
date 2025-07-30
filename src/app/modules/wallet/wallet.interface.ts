import { Types } from "mongoose";

export enum IType {
    USER="USER",
    AGENT="AGENT",
}

export interface IWallet {
    id: Types.ObjectId;
    userId: Types.ObjectId;
    balance: number;
    isBlocked?:boolean;
    walletType?:IType;
    toalSent:number;
    totalWithdraw?: number;
    totalRecieved?: number;
    commissionEarned?: number;
}

export interface ITransaction {
    _id: Types.ObjectId;
    from: Types.ObjectId;
    to: Types.ObjectId;
    amount:number;
    initiate?: Types.ObjectId; // this is for agent

}