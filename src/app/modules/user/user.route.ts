import { Router } from "express";
import { UserController } from "./user.controller";
import { userZodValidation } from "./user.validation";
import { zodValidation } from "../../middleware/zodValidation";

const user = Router()

user.post("/", zodValidation(userZodValidation), UserController.createUser)
user.get("/", UserController.getAllUser)

export const userRoute = user;