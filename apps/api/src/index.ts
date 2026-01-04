import { config } from "@/config/env";
import { createApp } from "@/app";
import prisma from "@repo/db";

const app = createApp();

const PORT = config.port;
const ENV = config.env;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${ENV} mode.`);
});

const shutdown = async (signal: string) => {
    try {
        console.log(`\n${signal} received. Shutting down gracefully...`);

        server.close(async (err) => {
            if (err) {
                console.error("Error closing server:", err);
                process.exit(1);
            }

            await prisma.$disconnect();
            console.log("Prisma disconnected.");

            process.exit(0);
        });
        
        setTimeout(() => {
            console.warn("Forcing shutdown after 10s...");
            process.exit(1);
        }, 10000);
    } catch (error) {
        console.error("Error during shutdown:", error);
        process.exit(1);
    }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));