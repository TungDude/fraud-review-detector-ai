import { useState, useEffect } from "react";
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
    Tooltip,
    Typography,
    IconButton,
    Fab,
} from "@mui/material";
import PostList from "@/components/molecules/PostList";
import { useMerchantPosts, useCreatePost } from "@/hooks/queries/usePostQuery";
import { useAuth } from "@/hooks/useAuth";
import { useHeaderStore } from "@/stores/header-store";
import { RotateCw, Plus, X } from "lucide-react";

export default function MerchantPage() {
    const { user } = useAuth();
    const { data: posts, isLoading, isError, error, refetch } = useMerchantPosts(user?.userId ?? "");
    const setTitle = useHeaderStore((state) => state.setTitle);
    const [createPostDialogOpen, setCreatePostDialogOpen] = useState(false);
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const createPostMutation = useCreatePost(user?.userId ?? "");

    useEffect(() => {
        setTitle("Merchant Point of View");
    }, [setTitle]);

    if (!user) {
        return null;
    }

    const handleCreatePost = () => {
        if (!postTitle || !postContent) {
            alert("Please fill in the post title and content.");
            return;
        }

        createPostMutation.mutate(
            { title: postTitle, content: postContent },
            {
                onSuccess: () => {
                    setPostTitle("");
                    setPostContent("");
                    setCreatePostDialogOpen(false);
                },
                onError: (err) => {
                    alert("Failed to create post. Please try again.");
                    console.error("Failed to create post:", err);
                },
            }
        );
    };

    const handleOpenCreatePostDialog = () => setCreatePostDialogOpen(true);
    const handleCloseCreatePostDialog = () => setCreatePostDialogOpen(false);

    return (
        <Stack component="section" spacing={2}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
            >
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                        textAlign: "center",
                        mb: 2,
                        textTransform: "uppercase",
                        letterSpacing: 1.2,
                    }}
                >
                    {user.username} Posts
                </Typography>
                <Tooltip
                    title="Refresh Posts"
                    placement="right"
                    arrow
                >
                    <Box component="span">
                        <IconButton
                            color="primary"
                            onClick={() => refetch()}
                            disabled={isLoading}
                        >
                            <RotateCw />
                        </IconButton>
                    </Box>
                </Tooltip>
            </Stack>

            {isError && (
                <Alert severity="error">
                    {error instanceof Error
                        ? error.message
                        : "Failed to load posts. Please try again."}
                </Alert>
            )}

            {isLoading && (
                <div className="flex justify-center items-center h-full w-full py-8">
                    <CircularProgress />
                </div>
            )}

            {!isLoading && !isError && (
                <>
                    <PostList posts={posts || []} maxHeight={600} showStats={{ rating: true, comments: true, fraudPercentage: true }} />
                    <Fab
                        color="primary"
                        aria-label="add"
                        sx={{
                            position: "absolute",
                            bottom: 16,
                            right: 16,
                        }}
                        onClick={handleOpenCreatePostDialog}
                    >
                        <Plus />
                    </Fab>
                    <Dialog
                        open={createPostDialogOpen}
                        onClose={handleCloseCreatePostDialog}
                        aria-labelledby="create-post-Dialog-title"
                        aria-describedby="create-post-Dialog-description"
                    >
                        <DialogTitle
                            id="create-post-Dialog-title"
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            Create new post
                            <IconButton
                                aria-label="close"
                                onClick={handleCloseCreatePostDialog}
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
                            <TextField
                                label="Title"
                                multiline
                                rows={1}
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                                fullWidth
                                sx={{
                                    backgroundColor: "#f9f9f9",
                                }}
                            />
                            <TextField
                                label="Description"
                                multiline
                                rows={3}
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                                fullWidth
                                sx={{
                                    backgroundColor: "#f9f9f9",
                                }}
                            />
                            <Box display="flex" justifyContent="flex-end" alignItems="center">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCreatePost}
                                    disabled={createPostMutation.isPending || !postTitle.trim() || !postContent.trim()}
                                    sx={{ whiteSpace: "nowrap" }}
                                >
                                    {createPostMutation.isPending ? "Submitting..." : "Submit"}
                                </Button>
                            </Box>
                        </Stack>
                    </Dialog>
                </>
            )}
        </Stack>
    );
}