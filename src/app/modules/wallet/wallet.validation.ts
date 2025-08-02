import z from "zod";
import { IPaymentType, IType, Wallet_Status } from "./wallet.interface";

export const walletValidation = z.object({
userId: z.string().optional(),
balance: z.string().optional(),
walletStatus: z.enum(Wallet_Status).optional(),
walletType: z.enum(IType).optional(),
})

export const transactionValidation = z.object({
from: z.string().optional(),
to: z.string().optional(),
amount: z.number(),
type: z.enum(IPaymentType).optional(),
initiate: z.string().optional(),
}).strict()