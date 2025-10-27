import z from "zod";
import { Role } from "./user.interface";

export const userZodValidation = z.object({
    email: z.email(),
     password: z.string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
    role: z.enum(Role)
});





// export const agentZodValidation = z.object({
//     email: z.email(),
//     password: z.string()
//         .min(6, "Password must be at least 6 characters")
//         .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//         .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//         .regex(/[0-9]/, "Password must contain at least one number")
//         .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
//     role: z.string().optional(),
//     phone: z.string(),
//     profilePhoto: z.string()
// });
