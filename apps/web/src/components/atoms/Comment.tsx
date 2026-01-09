import {
    Card,
    Stack,
    Typography,
    Divider,
    Box
} from "@mui/material";
import { Star } from "lucide-react";
import type { ICommentWithRelations } from "@repo/shared-types";
import { formatDateTime } from "@/utils/date.util";

export interface CommentProps {
    comment: ICommentWithRelations;
}

export default function Comment({ comment }: Readonly<CommentProps>) {
    return (
        <Card
            sx={{
                padding: 2,
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
                boxShadow: 1,
                minHeight: "fit-content",
            }}
        >
            <Stack spacing={1}>
                <Typography variant="overline" fontWeight="bold" color="primary" fontSize={14}>
                    {comment.user.username}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ whiteSpace: "pre-line", lineHeight: 1.6 }}
                >
                    {comment.text}
                </Typography>
                <Divider />
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <Star size={16} color="#FFC107" fill="#FFC107" />
                        <Typography variant="body2" fontWeight="bold">
                            {comment.rating.toFixed(1)}
                        </Typography>
                    </Box>
                    <Typography variant="overline" color="text.secondary">
                        Posted: {formatDateTime(comment.createdAt)}
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
}