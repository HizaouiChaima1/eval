import { config } from "dotenv";
import { resolve } from "path";
import { defineConfig, env } from "prisma/config";

config({ path: resolve(__dirname, "../.env") });

export default defineConfig({
    schema: "schema.prisma",
    migrations: {
        path: "migrations",
    },
    datasource: {
        url: env("DIRECT_URL"),
        // Utilise DIRECT_URL (port 5432) pour les migrations/push.
        // L'app Next.js utilise DATABASE_URL (pooler) au runtime via PrismaClient.
    },
});