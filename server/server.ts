import { ENV } from "./config/env";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

const app = express();
const PORT = ENV.PORT;

app.use(express.json());
app.use(cors({ origin: ENV.FRONTEND_URL}));
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

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})