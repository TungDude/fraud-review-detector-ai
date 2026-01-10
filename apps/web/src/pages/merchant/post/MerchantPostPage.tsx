import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
    Alert,
    Stack,
    CircularProgress,
    Typography,
} from "@mui/material";
import { useComments } from "@/hooks/queries/useCommentQuery";
import CommentList from "@/components/molecules/CommentList";
import Post from "@/components/atoms/Post";
import type { IPostWithRelations } from "@repo/shared-types";
import { useHeaderStore } from "@/stores/header-store";

export default function MerchantPostPage() {
    const location = useLocation();
    const post = location.state?.post as IPostWithRelations | undefined;
    const { postId } = useParams<{ postId: string }>();
    const { setAllowBack } = useHeaderStore();

    const { data: comments, isLoading, isError, error, isEnabled } = useComments(postId ?? "");

    useEffect(() => {
        setAllowBack(true);
        return () => setAllowBack(false);
    }, [setAllowBack]);

    return (
        <Stack component="section" spacing={3}>
            {post && <Post post={post} showStats={{ rating: true, fraudPercentage: true }} />}
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
                    <Typography variant="h5" fontWeight="bold">
                        Comments ({comments?.length || 0})
                    </Typography>
                    <CommentList comments={comments || []} maxHeight={420} />
                </Stack>
            )}
        </Stack>
    )
}