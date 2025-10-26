import { Types } from "mongoose";

export enum IType {
    USER="USER",
    AGENT="AGENT",
    ADMIN="ADMIN"
}

export enum Wallet_Status{
    ACTIVE="ACTIVE",
    BLOCK= "BLOCK"
}

export interface IWallet {
    id?: Types.ObjectId;
    userId: Types.ObjectId;
    balance: number;
    walletStatus: Wallet_Status;
    walletType?:IType;
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
    initiate?: Types.ObjectId;
}

export interface IFinance{
    sendMoney?:number;
    cashOut?: number;
    profit?: number;
}