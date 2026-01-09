import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import Header from "@/components/organisms/Header";

export default function AppLayout() {
    return (
        <Stack
            direction="column"
            height="100vh"
            overflow="hidden"
            width="100vw"
        >
            <Header />
            <Box
                flexGrow={1}
                padding={4}
                overflow="auto"
                className="custom-scrollbar"
            >
                <Outlet />
            </Box>
        </Stack>

    )
}