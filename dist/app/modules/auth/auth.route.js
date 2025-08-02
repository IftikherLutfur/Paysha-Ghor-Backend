"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth = (0, express_1.Router)();
auth.post("/login", auth_controller_1.AuthController.loginWithCredential);
auth.post("/logout", auth_controller_1.AuthController.logout);
exports.authRouter = auth;
