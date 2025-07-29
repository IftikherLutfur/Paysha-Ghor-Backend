import dotenv  from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();

// Example user payload type
interface DecodedUser extends JwtPayload {
  _id: string;
  email?: string;
  role?: string;
}

export const checkAuth = (...authRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("No token received");
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN as string) as DecodedUser;

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
    } catch (error) {
      res.status(401).json({
        success: false,
        message: (error as Error).message || "Unauthorized",
      });
    }
  };
};
