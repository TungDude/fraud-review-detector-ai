import prisma from "@repo/db";

export const getUsers = async () => {
    return prisma.user.findMany();
}