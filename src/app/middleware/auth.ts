import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { verifyToken, MyJwtPayload } from "../utils/jwt";

dotenv.config();

export const checkAuth = (...authRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.headers.authorization || (req.cookies?.accessToken as string);
      

      if (!token) {
        throw new Error("No token received");
      }

      const decoded = verifyToken(token, process.env.JWT_SECRET_TOKEN as string);

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
    } catch (error) {
      res.status(401).json({
        success: false,
        message: (error as Error).message || "Unauthorized",
      });
    }
  };
};
