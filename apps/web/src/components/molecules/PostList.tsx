import { useNavigate } from "react-router-dom";
import DashedBox from "../atoms/DashedBox";
import Post from "../atoms/Post";
import { Box } from "@mui/material";
import type { IPostWithRelations } from "@repo/shared-types";

export interface PostListProps {
    posts: IPostWithRelations[];
    showStats?: {
        rating?: boolean;
        comments?: boolean;
        fraudPercentage?: boolean;
    };
    maxHeight?: number;
};

export default function PostList({ posts, showStats = { rating: true, comments: true, fraudPercentage: true }, maxHeight }: Readonly<PostListProps>) {
    const navigate = useNavigate();

    const handlePostClick = (post: IPostWithRelations) => {
        navigate(`post/${post.postId}`, { state: { post } });
    };

    return (
        <Box
            maxHeight={maxHeight}
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
                gap: 2,
                overflowY: maxHeight ? "auto" : "visible",
                p: 2,
            }}
            className="custom-scrollbar"
        >
            {posts.length > 0 ? (
                posts.map((post) => (
                    <Post
                        key={post.postId}
                        post={post}
                        showStats={showStats}
                        onClick={() => handlePostClick(post)}
                    />
                ))
            ) : (
                <DashedBox>No posts available.</DashedBox>
            )}
        </Box>
    );
}