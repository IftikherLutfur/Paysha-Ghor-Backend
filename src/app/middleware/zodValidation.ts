import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const zodValidation = (zodSchema: ZodSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedBody = await zodSchema.parseAsync(req.body);
      (req as any).validatedBody = parsedBody;
      next();
    } catch (error) {
      console.error("Kiser error re bhai?",error);
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        "kisher Error re bhai?": error
      });
    }
  };
