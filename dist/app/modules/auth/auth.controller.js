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
exports.AuthController = void 0;
const userToken_1 = require("../../utils/userToken");
const setCookie_1 = require("../../utils/setCookie");
const auth_service_1 = require("./auth.service");
const sendResponse_1 = require("../../utils/sendResponse");
const loginWithCredential = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        // Step 2: Validate user credentials via service
        const user = yield auth_service_1.AuthService.loginUser(payload);
        // Step 3: Generate JWT token
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const userToken = yield (0, userToken_1.createUserToken)(user);
        // Step 4: Set cookie
        (0, setCookie_1.setCookie)(res, userToken);
        // Step 5: Respond
        res.status(200).json(Object.assign(Object.assign({ success: true, message: "Login successful" }, payload), { data: userToken }));
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid credentials",
        });
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Logout successful",
        data: null,
        statusCode: res.statusCode
    });
});
exports.AuthController = {
    loginWithCredential,
    logout
};
