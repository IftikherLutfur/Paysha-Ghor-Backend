import { Request, Response } from "express";
import { createUserToken } from "../../utils/userToken";
import { setCookie } from "../../utils/setCookie";
import { AuthService } from "./auth.service";
import { IUser } from "../user/user.interface";

interface AuthToken {
    accessToken: string;
}

const loginWithCredential = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    // Step 2: Validate user credentials via service
    const user: IUser | null = await AuthService.loginUser(payload);

    // Step 3: Generate JWT token
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const userToken: AuthToken = await createUserToken(user as IUser);

    // Step 4: Set cookie
    setCookie(res, userToken);

    // Step 5: Respond
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: userToken,
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
};

export const AuthController = {
    loginWithCredential
}