import { Response } from "express";

export interface AuthToken {
    accessToken: string;
}

export const setCookie = (res:Response, tokenInfo: AuthToken)=>{
    if(tokenInfo.accessToken){
        res.cookie("accessToken", tokenInfo.accessToken, {
            httpOnly: true,
            secure: false
        })
    }
}
