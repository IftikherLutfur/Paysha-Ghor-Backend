import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsymc";
import { JwtPayload } from "jsonwebtoken";
import { MyJwtPayload } from "../../utils/jwt";


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

const getMe = catchAsync(async (req: Request, res: Response) => {
  const decodedUser = req.user as MyJwtPayload;

  console.log("Decoded from middleware:", decodedUser);

  const getMyAccount = await UserService.getMe(decodedUser.userId);

  sendResponse(res, {
    success: true,
    message: "Your info retrieved",
    data: getMyAccount,
    statusCode: res.statusCode,
  });
});

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
    const body = req.body;  // ✅ এখন destructure safe

    const user = await UserService.agentApprove(agentId, body);

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

const editProfile = catchAsync(async(req:Request, res:Response)=>{
    const body = req.body;
    console.log(body)
    const decodedUser = req.user as MyJwtPayload;
    const updateUser = await UserService.updateUser(body,decodedUser.userId)
    sendResponse(res,{
            success: true,
            message: "Your info updated successfully",
            data: updateUser,
            statusCode: res.statusCode,
        })
  
})



export const UserController = {
    createUser,
    getAllUser,
    agentApprove,
    getMe,
    editProfile
}