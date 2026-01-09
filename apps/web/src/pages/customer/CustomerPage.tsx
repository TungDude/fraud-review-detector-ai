import { useEffect } from "react";
import {
    Box,
    Stack,
    Alert,
    CircularProgress,
    Typography,
    IconButton,
    Tooltip,
} from "@mui/material";
import PostList from "@/components/molecules/PostList";
import { usePosts } from "@/hooks/queries/usePostQuery";
import { useHeaderStore } from "@/stores/header-store";
import { RotateCw } from "lucide-react";

export default function CustomerPage() {
    const { data: posts, isLoading, isError, error, refetch } = usePosts();
    const setTitle = useHeaderStore((state) => state.setTitle);

    useEffect(() => {
        setTitle("Customer Point of View");
    }, [setTitle]);

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
                    Product Listings
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
                <PostList posts={posts || []} maxHeight={600} />
            )}
        </Stack>
    );
}