import { config } from "dotenv";
import { drizzle } from "drizzle-orm/vercel-postgres";

config({ path: ".env.local" }); // or .env

export const db = drizzle({});
