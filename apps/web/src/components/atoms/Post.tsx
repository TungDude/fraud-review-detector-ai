import {
    Box,
    Card,
    Stack,
    Typography,
    Divider,
    Chip,
    Rating,
} from '@mui/material';
import type { IPostWithRelations } from '@repo/shared-types';
import { formatDateTime } from '@/utils/date.util';
import { MessageCircle, HatGlasses } from 'lucide-react';

export interface PostProps {
    post: IPostWithRelations;
    showStats?: {
        rating?: boolean;
        comments?: boolean;
        fraudPercentage?: boolean;
    };
    onClick?: () => void;
};

export default function Post({ post, showStats = { rating: true, comments: true, fraudPercentage: true }, onClick }: Readonly<PostProps>) {
    return (
        <Card
            sx={{
                padding: 3,
                borderRadius: 2,
                border: '1px solid #e0e0e0',
                backgroundColor: "#f9f9f9",
                minHeight: "fit-content",
                cursor: "pointer",
                "&:hover": {
                    boxShadow: 6,
                },
            }}
            onClick={onClick}
        >
            <Stack
                direction="column"
                spacing={2}
            >
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="overline" color="text.secondary">
                        Author: <strong>{post.author.username}</strong>
                    </Typography>
                    <Typography variant="overline" color="text.secondary">
                        Posted: {formatDateTime(post.createdAt)}
                    </Typography>
                </Stack>
                <Divider />
                <Typography variant="h6" fontWeight="bold" color="primary">
                    {post.title}
                </Typography>
                <Divider />
                <Typography variant="body2" sx={{ whiteSpace: "pre-line", lineHeight: 1.6 }}>
                    {post.content}
                </Typography>
                {showStats && (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={1}
                    >
                        <Stack direction="row" alignItems="center" gap={1}>
                            {showStats.rating && (
                                <>
                                    <Rating
                                        name="post-average-rating"
                                        value={post.stats.averageRating ?? 0}
                                        precision={0.1}
                                        readOnly
                                    />
                                    <Typography variant="body2" fontWeight="bold">
                                        {post.stats.averageRating ?? "N/A"}
                                    </Typography>
                                </>
                            )}
                        </Stack>
                        <Stack direction="row" alignItems="center" gap={1}>
                            {showStats.comments && (
                                <Chip
                                    sx={{
                                        pl: 0.5,
                                    }}
                                    color="primary"
                                    variant={post.stats.commentsCount > 0 ? "filled" : "outlined"}
                                    icon={<MessageCircle size={12} className={post.stats.commentsCount > 0 ? "text-white" : "text-mui-primary"} />}
                                    label={`${post.stats.commentsCount} Comment${post.stats.commentsCount <= 1 ? '' : 's'}`}
                                    size="small"
                                />
                            )}
                            {showStats.fraudPercentage && post.stats.fraudCommentsPercentage !== null && (
                                <Chip
                                    sx={{
                                        pl: 0.5,
                                    }}
                                    color={post.stats.fraudCommentsPercentage > 0 ? "error" : "default"}
                                    variant={post.stats.fraudCommentsPercentage >= 50 ? "filled" : "outlined"}
                                    icon={<HatGlasses size={12} className={post.stats.fraudCommentsPercentage >= 50 ? "text-white" : "text-mui-error"} />}
                                    label={`${post.stats.fraudCommentsPercentage}% Fraud Comment${post.stats.commentsCount <= 1 ? '' : 's'}`}
                                    size="small"
                                />
                            )}
                        </Stack>
                    </Box>
                )}
            </Stack>
        </Card>
    );
}