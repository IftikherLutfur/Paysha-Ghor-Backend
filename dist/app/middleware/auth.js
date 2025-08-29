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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jwt_1 = require("../utils/jwt");
dotenv_1.default.config();
const checkAuth = (...authRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const token = req.headers.authorization || ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken);
            if (!token) {
                throw new Error("No token received");
            }
            const decoded = (0, jwt_1.verifyToken)(token, process.env.JWT_SECRET_TOKEN);
            // inject user into req
            req.user = {
                userId: decoded.userId,
                email: decoded.email,
                role: decoded.role,
            };
            // Role check (optional)
            if (authRoles.length && !authRoles.includes(decoded.role || "")) {
                throw new Error("Forbidden: You are not authorized");
            }
            next();
        }
        catch (error) {
            res.status(401).json({
                success: false,
                message: error.message || "Unauthorized",
            });
        }
    });
};
exports.checkAuth = checkAuth;
