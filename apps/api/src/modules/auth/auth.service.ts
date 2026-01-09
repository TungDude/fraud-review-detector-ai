import prisma from "@repo/db";

// mock signin function
export const signin = async (username: string) => {
    return prisma.user.findUnique({
        where: {
            username,
        },
    });
}