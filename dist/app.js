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
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./app/modules/user/user.route");
const auth_route_1 = require("./app/modules/auth/auth.route");
const wallet_route_1 = require("./app/modules/wallet/wallet.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/user", user_route_1.userRoute);
app.use("/api/auth", auth_route_1.authRouter);
app.use("/api/wallet", wallet_route_1.walletRoute);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Welcome to Poysha Ghor API");
}));
app.use((err, req, res, next) => {
    console.error("Global Error:", err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong!";
    res.status(statusCode).json({
        success: false,
        message,
        error: err.errors || null
    });
});
exports.default = app;
