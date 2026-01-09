import prisma from "@repo/db";

export const getPosts = async () => {
    const posts = await prisma.post.findMany({
        include: {
            author: true,
            _count: {
                select: { comments: true },
            },
            comments: {
                select: {
                    rating: true,
                }
            }
        }
    });

    return posts.map((post) => {
        const totalRatings = post.comments.reduce((sum, comment) => sum + comment.rating, 0);
        const averageRating = post.comments.length > 0 ? (totalRatings / post.comments.length).toFixed(1) : null;

        return {
            ...post,
            stats: {
                commentsCount: post._count.comments,
                averageRating,
            },
        };
    });
}