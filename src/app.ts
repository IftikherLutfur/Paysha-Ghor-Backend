import express, { Request, Response } from "express"
import { userRoute } from "./app/modules/user/user.route"
import { authRouter } from "./app/modules/auth/auth.route"
import { walletRoute } from "./app/modules/wallet/wallet.route"
const app = express()

app.use(express.json())
app.use("api/user", userRoute)
app.use("api/auth", authRouter)
app.use("api/wallet", walletRoute)

app.get("/", async(req:Request, res: Response)=>{
    res.status(200).json({
        message:"The payshaghor backend is running"
    })
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