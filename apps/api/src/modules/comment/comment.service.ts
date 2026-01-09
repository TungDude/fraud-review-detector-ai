import prisma from "@repo/db";

export const getComments = async (postId: string) => {
    return prisma.comment.findMany({
        where: {
            postId,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            user: true,
        }
    });
};

export const createComment = async (userId:string, postId: string, text: string, rating: number) => {
    return prisma.comment.create({
        data: {
            userId,
            postId,
            text,
            rating,
        },
    });
}