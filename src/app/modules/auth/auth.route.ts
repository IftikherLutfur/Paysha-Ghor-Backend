import { Router } from "express";
import { AuthController } from "./auth.controller";

const auth = Router();

auth.post("/login", AuthController.loginWithCredential)
auth.post("/logout", AuthController.logout)

export const authRouter = auth; 