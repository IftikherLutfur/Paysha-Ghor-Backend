import { Router } from "express";
import { UserController } from "./user.controller";
import { userZodValidation } from "./user.validation";
import { zodValidation } from "../../middleware/zodValidation";
import { checkAuth } from "../../middleware/auth";
import { Role } from "./user.interface";

const user = Router()

user.post("/", zodValidation(userZodValidation), UserController.createUser)
user.get("/", checkAuth(Role.ADMIN), UserController.getAllUser)
user.get("/me", checkAuth(...Object.values(Role)), UserController.getMe)
user.patch("/edit-profile", checkAuth(...Object.values(Role)), UserController.editProfile)
user.patch("/userStatus/:userId", checkAuth(Role.ADMIN), UserController.userStatusChange)
user.patch("/agent-approve/:agentId", checkAuth(Role.ADMIN), UserController.agentApprove)

export const userRoute = user;  