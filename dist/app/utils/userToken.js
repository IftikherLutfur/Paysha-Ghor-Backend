"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserToken = void 0;
const dotenv_1 = require("dotenv");
const jwt_1 = require("./jwt");
(0, dotenv_1.configDotenv)();
const JWT_SECRET = process.env.JWT_SECRET_TOKEN;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}
const createUserToken = (user) => {
    if (!user.email || !user.role || !user._id) {
        throw new Error("User id, email and role are required");
    }
    const JwtPayload = {
        userId: typeof user._id === "string" ? user._id : user._id.toString(),
        email: user.email,
        role: user.role
    };
    const accessToken = (0, jwt_1.generateToken)(JwtPayload, JWT_SECRET, "1d");
    return { accessToken };
};
exports.createUserToken = createUserToken;
