import {
    Card,
    Chip,
    Stack,
    Typography,
    Divider,
    Box,
    Rating,
} from "@mui/material";
import { AlertTriangle } from "lucide-react";
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
                border: `1px solid ${comment.isFraud ? '#f44336' : '#e0e0e0'}`,
                backgroundColor: "#f9f9f9",
                boxShadow: 1,
                minHeight: "fit-content",
            }}
        >
            <Stack spacing={1}>
                <Box
                    component="span"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={1}
                >
                    <Stack direction="row" alignItems="center" gap={1}>
                        {comment.isFraud && <AlertTriangle size={20} className="text-mui-error" />}
                        <Typography variant="overline" fontWeight="bold" color={comment.isFraud ? "error" : "primary"} fontSize={14}>
                            {comment.user.username}
                        </Typography>
                    </Stack>
                    {comment.isFraud && (
                        <Chip
                            size="small"
                            variant="filled"
                            color="error"
                            label={`Fraudulent Comment (${(comment.fraudScore! * 100).toFixed(2)}%)`}
                        />
                    )}
                </Box>
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
                        <Rating
                            name="comment-rating"
                            value={comment.rating}
                            precision={0.5}
                            readOnly
                            size="small"
                        />
                        <Typography
                            variant="body2"
                            fontWeight="bold"
                            sx={{
                                textDecoration: comment.isFraud ? "line-through" : "none",
                            }}
                        >
                            {comment.rating.toFixed(1)}
                        </Typography>
                    </Box>
                    <Typography variant="overline" color="text.secondary">
                        Commented: {formatDateTime(comment.createdAt)}
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
}