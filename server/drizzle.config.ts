import { defineConfig } from "drizzle-kit";
import { ENV } from "./config/env";


export default defineConfig({
    schema: "./db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: ENV.DATABASE_URL!,
    }
})