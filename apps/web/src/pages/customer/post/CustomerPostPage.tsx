import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
    Alert,
    Box,
    Stack,
    Dialog,
    DialogTitle,
    Divider,
    CircularProgress,
    TextField,
    Button,
    Rating,
    Typography,
    IconButton,
} from "@mui/material";
import { useComments, useCreateComment } from "@/hooks/queries/useCommentQuery";
import CommentList from "@/components/molecules/CommentList";
import Post from "@/components/atoms/Post";
import type { IPostWithRelations } from "@repo/shared-types";
import { useHeaderStore } from "@/stores/header-store";
import { X } from "lucide-react";

export default function CustomerPostPage() {
    const location = useLocation();
    const post = location.state?.post as IPostWithRelations | undefined;
    const { postId } = useParams<{ postId: string }>();
    const { setAllowBack } = useHeaderStore();
    const [createCommentDialogOpen, setCreateCommentDialogOpen] = useState(false);
    const [text, setText] = useState("");
    const [rating, setRating] = useState<number | null>(0);
    const createCommentMutation = useCreateComment(postId ?? "");

    const { data: comments, isLoading, isError, error, isEnabled } = useComments(postId ?? "");

    useEffect(() => {
        setAllowBack(true);
        return () => setAllowBack(false);
    }, [setAllowBack]);

    const handleCreateComment = () => {
        if (!text || rating === null) {
            alert("Please fill in the comment text and rating.");
            return;
        }

        createCommentMutation.mutate(
            { text, rating },
            {
                onSuccess: () => {
                    setText("");
                    setRating(0);
                    setCreateCommentDialogOpen(false);
                },
                onError: (err) => {
                    alert("Failed to create comment. Please try again.");
                    console.error("Failed to create comment:", err);
                },
            }
        );
    };

    const handleOpenCreateCommentDialog = () => setCreateCommentDialogOpen(true);
    const handleCloseCreateCommentDialog = () => setCreateCommentDialogOpen(false);

    return (
        <Stack component="section" spacing={3}>
            {post && <Post post={post} showStats={false} />}
            {(isError || !isEnabled) && (
                <Alert severity="error">
                    {error instanceof Error
                        ? error.message
                        : "Failed to load comments. Please try again."}
                </Alert>
            )}

            {isLoading && (
                <div className="flex justify-center items-center h-full w-full py-8">
                    <CircularProgress />
                </div>
            )}

            {!isLoading && !isError && (
                <Stack spacing={2}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        gap={1}
                    >
                        <Typography variant="h5" fontWeight="bold">
                            Comments ({comments?.length || 0})
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleOpenCreateCommentDialog}
                        >
                            Add Comment
                        </Button>
                    </Box>
                    <Dialog
                        open={createCommentDialogOpen}
                        onClose={handleCloseCreateCommentDialog}
                        aria-labelledby="create-comment-Dialog-title"
                        aria-describedby="create-comment-Dialog-description"
                    >
                        <DialogTitle
                            id="create-comment-Dialog-title"
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            Share your thoughts
                            <IconButton
                                aria-label="close"
                                onClick={handleCloseCreateCommentDialog}
                                sx={{
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <X />
                            </IconButton>
                        </DialogTitle>
                        <Divider />
                        <Stack
                            spacing={2}
                            sx={{
                                px: 3,
                                pb: 3,
                                pt: 2,
                                width: 500,
                            }}
                        >
                            <Typography variant="subtitle1">
                                How was it?
                            </Typography>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Rating
                                    value={rating}
                                    precision={0.5}
                                    size="large"
                                    onChange={(_, newValue) => setRating(newValue)}
                                />
                            </Box>
                            <Stack spacing={1}>
                                <Typography variant="subtitle1">
                                    Tell us more
                                </Typography>
                                <TextField
                                    label="Write a comment"
                                    multiline
                                    rows={2}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    fullWidth
                                    sx={{
                                        backgroundColor: "#f9f9f9",
                                    }}
                                />
                            </Stack>
                            <Box display="flex" justifyContent="flex-end" alignItems="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCreateComment}
                                    disabled={createCommentMutation.isPending || !text.trim() || rating === null}
                                    sx={{ whiteSpace: "nowrap" }}
                                >
                                    {createCommentMutation.isPending ? "Submitting..." : "Submit"}
                                </Button>
                            </Box>
                        </Stack>
                    </Dialog>
                    <CommentList comments={comments || []} maxHeight={420} />
                </Stack>
            )}
        </Stack>
    )
}