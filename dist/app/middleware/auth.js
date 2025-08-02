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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const checkAuth = (...authRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new Error("No token received");
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_TOKEN);
            // Inject user info into req.user
            req.user = {
                _id: decoded.userId,
                email: decoded.email,
                role: decoded.role,
            };
            // Optional: Role check (if you pass roles to checkAuth())
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
