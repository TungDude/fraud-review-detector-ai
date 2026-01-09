import {
    Box,
    Card,
    Stack,
    Typography,
    Divider,
    Chip,
} from '@mui/material';
import type { IPostWithRelations } from '@repo/shared-types';
import { formatDateTime } from '@/utils/date.util';
import { Star, MessageCircle } from 'lucide-react';

export interface PostProps {
    post: IPostWithRelations;
    showStats?: boolean;
    onClick?: () => void;
};

export default function Post({ post, showStats = true, onClick }: Readonly<PostProps>) {
    return (
        <Card
            sx={{
                padding: 3,
                borderRadius: 2,
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
                {/* <Divider /> */}
                {showStats && (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={1}
                    >
                        <Stack direction="row" alignItems="center" gap={1}>
                            <Star size={16} color="#FFC107" fill="#FFC107" />
                            <Typography variant="body2" fontWeight="bold">
                                {post.stats.averageRating ?? "N/A"}
                            </Typography>
                        </Stack>
                        <Chip
                            sx={{
                                pl: 0.5,
                            }}
                            color="primary"
                            variant={post.stats.commentsCount > 0 ? "filled" : "outlined"}
                            icon={<MessageCircle size={12} color={post.stats.commentsCount > 0 ? "white" : "#1976d2"} />}
                            label={`${post.stats.commentsCount} Comment${post.stats.commentsCount <= 1 ? '' : 's'}`}
                            size="small"
                        />
                    </Box>
                )}
            </Stack>
        </Card>
    );
}