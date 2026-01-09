import { Stack } from "@mui/material";
import DashedBox from "../atoms/DashedBox";
import Comment from "../atoms/Comment";
import type { ICommentWithRelations } from "@repo/shared-types";

export interface CommentListProps {
    comments: ICommentWithRelations[];
    maxHeight?: number;
}

export default function CommentList({ comments, maxHeight }: Readonly<CommentListProps>) {
    return (
        <Stack
            spacing={1}
            maxHeight={maxHeight}
            sx={{
                overflowY: maxHeight ? "auto" : "visible",
                px: 2,
                py: 0.5,
            }}
            className="custom-scrollbar"
        >
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <Comment key={comment.commentId} comment={comment} />
                ))
            ) : (
                <DashedBox>No comments available.</DashedBox>
            )}
        </Stack>
    );
}