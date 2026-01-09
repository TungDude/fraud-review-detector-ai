import {
    Typography,
    Stack,
    Chip,
} from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import { CircleUserRound } from "lucide-react";

export default function ProfileBadge() {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
        >
            <CircleUserRound size={54} strokeWidth={1} />
            <Stack>
                <Typography variant="subtitle1">
                    {user.username}
                </Typography>
                <Chip
                    label={user.role}
                    color={user.role === 'CUSTOMER' ? 'primary' : 'secondary'}
                    size="small"
                />
            </Stack>
        </Stack>
    );
}