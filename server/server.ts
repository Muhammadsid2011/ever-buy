import { ENV } from "./config/env";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import  userRouter  from "./routes/user.routes";
import  productRouter  from "./routes/product.routes";
import  commentRouter  from "./routes/comment.routes";

const app = express();
const PORT = ENV.PORT;

// Body parsing middleware (must be first)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration with explicit settings for non-GET requests
console.log("CORS allowed for:", ENV.FRONTEND_URL);
app.use(cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 3600
}));

// Authentication middleware
app.use(clerkMiddleware());

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