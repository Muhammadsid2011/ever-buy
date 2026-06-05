import { ENV } from "./config/env";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import  userRouter  from "./routes/user.routes";
import  productRouter  from "./routes/product.routes";
import  commentRouter  from "./routes/comment.routes";

const app = express();
const PORT = ENV.PORT;

app.use(express.json());
app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to EverBuy API - Powered by PostgresSQL, Drizzle ORM & clerk auth",
        endpoints: {
            users: "/api/users",
            products: "/api/products",
            comments: "/api/comments"
        }
    })
})

app.use("/api/users", userRouter)
app.use("/api/products", productRouter)
app.use("/api/comments", commentRouter)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})