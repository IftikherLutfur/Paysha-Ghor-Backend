import { Router } from "express";
import { AuthController } from "./auth.controller";

const auth = Router();

auth.post("/login", AuthController.loginWithCredential)

export const authRouter = auth; 