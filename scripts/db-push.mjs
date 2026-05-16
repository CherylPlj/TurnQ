import { config } from "dotenv";
import { execSync } from "node:child_process";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), ".env.local") });

const directUrl = process.env.DIRECT_URL;

if (!directUrl) {
  console.error(
    "DIRECT_URL is missing. Add it to .env.local from Supabase → Project Settings → Database → Connection string (URI, port 5432).",
  );
  process.exit(1);
}

process.env.DATABASE_URL = directUrl;

console.log("Pushing schema via direct connection (port 5432)...");
execSync("npx prisma db push", { stdio: "inherit", env: process.env });
