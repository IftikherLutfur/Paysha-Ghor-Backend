import express, { Application, Request, Response } from "express"
import cookieParser from "cookie-parser";
import { userRoute } from "./app/modules/user/user.route"
import { authRouter } from "./app/modules/auth/auth.route"
import { walletRoute } from "./app/modules/wallet/wallet.route"
import cors from "cors"
const app: Application = express()
app.use(cors({
  origin: "https://payshaghor.vercel.app", 
  // origin: "http://localhost:3000", 
  credentials: true,                
}));
app.use(express.json())
app.use(cookieParser());
app.use("/api/user", userRoute)
app.use("/api/auth", authRouter)
app.use("/api/wallet", walletRoute)
app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to Poysha Ghor API")

})

app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
  console.error("Global Error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";

  res.status(statusCode).json({
    success: false,
    message,
    error: err.errors || null
  });
});


export default app;