import { NextFunction, Request, Response } from "express"

export const checkAuth = (...authRole: string[])=>{
    return async(req:Request, res: Response, next: NextFunction)=>{
        try {
             const accessToken = req.headers.authorization;
             if(!accessToken){
                throw new Error("No Token recieved")
             }
        } catch (error) {
            
        }
    }
}