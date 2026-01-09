import prisma from "@repo/db";

export class HealthService {
    static async check() {
        
        await prisma.$queryRaw`SELECT 1`;

        return {
            app: "ok",
            db: "ok",
            timestamp: new Date().toISOString(),
        };
    }
}
