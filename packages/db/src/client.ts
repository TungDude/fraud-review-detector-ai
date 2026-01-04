import { PrismaClient } from "./generated/client/index.js";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

export default prisma;