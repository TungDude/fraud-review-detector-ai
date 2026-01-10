import prisma from "@repo/db";
import { buildPostStats } from "./post.helper";

const postInclude = {
    author: true,
    comments: {
        select: {
            rating: true,
            isFraud: true,
        },
    },
} as const;

export const getPosts = async () => {
    const posts = await prisma.post.findMany({
        include: postInclude,
    });

    return posts.map(({ comments, ...post }) => ({
        ...post,
        stats: buildPostStats(comments),
    }));
};

export const getMerchantPosts = async (merchantId: string) => {
    const posts = await prisma.post.findMany({
        where: {
            authorId: merchantId,
        },
        include: postInclude,
    });

    return posts.map(({ comments, ...post }) => ({
        ...post,
        stats: buildPostStats(comments),
    }));
};

export const createPost = async (authorId: string, title: string, content: string) => {
    return await prisma.post.create({
        data: {
            authorId,
            title,
            content,
        },
    });
}