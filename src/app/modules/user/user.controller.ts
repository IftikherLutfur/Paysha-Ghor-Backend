import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsymc";
import { JwtPayload } from "jsonwebtoken";
import { MyJwtPayload } from "../../utils/jwt";


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const user = await UserService.userCreate(payload)
    sendResponse(res, {
      success: true,
      message: "User created successfully",
      statusCode: res.statusCode,
      data: user,
    })
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      error
    })
  }
})
// const createAgent = catchAsync(async (req: Request, res: Response) => {
//   const result = await UserService.createAgent(req.body);
//   sendResponse(res, {
//     success: true,
//     message: "Agent created successfully",
//     statusCode: res.statusCode,
//     data: result
//   })
// })

const getMe = catchAsync(async (req: Request, res: Response) => {
  const decodedUser = req.user as MyJwtPayload;
  const getMyAccount = await UserService.getMe(decodedUser.userId);

  sendResponse(res, {
    success: true,
    message: "Your info retrieved",
    data: getMyAccount,
    statusCode: res.statusCode,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  try {
    const findAllUser = await UserService.findAllUser()
    sendResponse(res, {
      success: true,
      message: "All users retrieved successfully",
      data: findAllUser,
      statusCode: res.statusCode,
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      error
    })
  }
})

const getUserAndAgent = catchAsync(async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const findUser = await UserService.userAndAgent(page, limit)
    sendResponse(res, {
      success: true,
      message: "All users or agent data retrived",
      meta: findUser.meta,
      data: findUser.data,
      statusCode: res.statusCode,
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      error
    })
  }
})

const getUserAndAgentById = catchAsync(async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const findUser = await UserService.userAndAgentById(id)
    sendResponse(res, {
      success: true,
      message: "All users or agent data retrived",
      data: findUser,
      statusCode: res.statusCode,
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      error
    })
  }
})

const agentApprove = catchAsync(async (req: Request, res: Response) => {
  try {
    const { agentId } = req.params;
    const body = req.body;  // ✅ এখন destructure safe

    const user = await UserService.agentApprove(agentId, body);

    sendResponse(res, {
      success: true,
      message: "Agent approved successfully",
      data: user,
      statusCode: res.statusCode,
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      error
    })
  }
})

const editProfile = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body)
  const decodedUser = req.user as MyJwtPayload;
  const updateUser = await UserService.updateUser(body, decodedUser.userId)
  sendResponse(res, {
    success: true,
    message: "Your info updated successfully",
    data: updateUser,
    statusCode: res.statusCode,
  })

})

const userStatusChange = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const { userId } = req.params;

  const data = await UserService.userStatusChange(body, userId)
  sendResponse(res, {
    success: true,
    message: "User status change successfully",
    data: data,
    statusCode: res.statusCode,
  })
})




export const UserController = {
  createUser,
  // createAgent,
  getAllUser,
  getUserAndAgent,
  getUserAndAgentById,
  agentApprove,
  getMe,
  editProfile,
  userStatusChange,
}