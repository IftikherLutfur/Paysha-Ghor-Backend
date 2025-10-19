"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const sendResponse_1 = require("../../utils/sendResponse");
const catchAsymc_1 = require("../../utils/catchAsymc");
const createUser = (0, catchAsymc_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const user = yield user_service_1.UserService.userCreate(payload);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "User created successfully",
            data: user,
            statusCode: res.statusCode,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error
        });
    }
}));
const getMe = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedUser = req.user;
    
    const getMyAccount = yield user_service_1.UserService.getMe(decodedUser.userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Your info retrieved",
        data: getMyAccount,
        statusCode: res.statusCode,
    });
}));
const getAllUser = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllUser = yield user_service_1.UserService.findAllUser();
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "All users retrieved successfully",
            data: findAllUser,
            statusCode: res.statusCode,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error
        });
    }
}));
const agentApprove = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { agentId } = req.params;
        const body = req.body; // ✅ এখন destructure safe
        const user = yield user_service_1.UserService.agentApprove(agentId, body);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "Agent approved successfully",
            data: user,
            statusCode: res.statusCode,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error
        });
    }
}));
const editProfile = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    const decodedUser = req.user;
    const updateUser = yield user_service_1.UserService.updateUser(body, decodedUser.userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Your info updated successfully",
        data: updateUser,
        statusCode: res.statusCode,
    });
}));
const userStatusChange = (0, catchAsymc_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { userId } = req.params;
    const data = yield user_service_1.UserService.userStatusChange(body, userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User status change successfully",
        data: data,
        statusCode: res.statusCode,
    });
}));
exports.UserController = {
    createUser,
    getAllUser,
    agentApprove,
    getMe,
    editProfile,
    userStatusChange
};
