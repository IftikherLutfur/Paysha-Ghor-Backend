import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsymc";


const createUser = catchAsync(async(req:Request, res: Response, next:NextFunction)=>{
    try {
        const payload = req.body;
    const user = await UserService.userCreate(payload)
    sendResponse(res,{
        success: true,
        message: "User created successfully",
        data: user,
        statusCode: res.statusCode,
    })
    } catch (error:any) {
        console.log(error);
        res.status(400).json({
            success: false,
            message:"Something went wrong",
            error
        })
    }
})





const getAllUser = catchAsync(async(req:Request,res:Response) =>{
    try {
        const findAllUser = await UserService.findAllUser()
    sendResponse(res,{
        success: true,
        message: "All users retrieved successfully",
        data: findAllUser,
        statusCode: res.statusCode,
    })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message:"Something went wrong",
            error
        })
    }
})

const agentApprove = catchAsync(async(req:Request, res:Response) =>{
    try {
        const { agentId } = req.params;
        const payload = req.body;
        const user = await UserService.agentApprove(agentId, payload);
        sendResponse(res,{
            success: true,
            message: "Agent approved successfully",
            data: user,
            statusCode: res.statusCode,
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message:"Something went wrong",
            error
        })
    }
})


export const UserController = {
    createUser,
    getAllUser,
    agentApprove
}