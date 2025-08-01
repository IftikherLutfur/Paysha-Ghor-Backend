import { Types } from "mongoose";

export enum IType {
    USER="USER",
    AGENT="AGENT",
}

export interface IWallet {
    id?: Types.ObjectId;
    userId: Types.ObjectId;
    balance: number;
    isBlocked?:boolean;
    walletType?:IType;
    toalSent?:number;
    totalWithdraw?: number;
    totalRecieved?: number;
    commissionEarned?: number;
}

export enum IPaymentType {
    POPUP = "POPUP",
    SENDMONEY = "SENDMONEY",
    WITHDRAW = "WITHDRAW",
    AGENT_CASHIN = "AGENT_CASHIN",
    AGENT_CASHOUT = "AGENT_CASHOUT"
}

export interface ITransaction {
    _id?: Types.ObjectId;
    from?: Types.ObjectId;
    to?: Types.ObjectId;
    amount?:number;
    type?:IPaymentType;
    initiate?: Types.ObjectId; // this is for agent
}