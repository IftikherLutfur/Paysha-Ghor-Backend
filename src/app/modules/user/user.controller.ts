import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { success } from "zod";

const createUser = async(req:Request, res: Response, next:NextFunction)=>{
    try {
        const payload = req.body;
    const user = await UserService.userCreate(payload)
    res.status(201).json({
        success:true,
        message: "User created successfully",
        data: user
    })
    } catch (error:any) {
        console.log(error);
        res.status(400).json({
            success: false,
            message:"Something went wrong",
            error
        })
    }
}

const getAllUser = async(req:Request,res:Response) =>{
    const findAllUser = await UserService.findAllUser()
    res.status(200).json({
        success: true,
        message: "All user retrived",
        data: findAllUser
    })
}


export const UserController = {
    createUser,
    getAllUser
}