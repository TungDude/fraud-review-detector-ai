export interface CommentStatsInput {
    rating: number;
    isFraud: boolean;
}

export function buildPostStats(comments: CommentStatsInput[]) {
    const commentStats = comments.reduce(
        (acc, { rating, isFraud }) => {
            acc.totalCount++;

            if (isFraud) {
                acc.fraudCount++;
            } else {
                acc.legitimateCount++;
                acc.totalRating += rating;
            }

            return acc;
        },
        {
            totalCount: 0,
            fraudCount: 0,
            legitimateCount: 0,
            totalRating: 0,
        }
    );

    const averageRating = commentStats.legitimateCount
        ? (commentStats.totalRating / commentStats.legitimateCount).toFixed(1)
        : null;

    const fraudCommentsPercentage = commentStats.totalCount
        ? ((commentStats.fraudCount / commentStats.totalCount) * 100).toFixed(2)
        : null;

    return {
        commentsCount: commentStats.totalCount,
        fraudCommentsPercentage,
        averageRating,
    };
}