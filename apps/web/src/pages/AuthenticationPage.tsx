import {
    Box,
    Stack,
    Typography,
    Button,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useSignin } from '@/hooks/queries/useAuthQuery';
import { PATHS } from '@/app/routes/paths';

const povs = [
    { label: "Customer", username: "JohnDoe69", role: "customer" },
    { label: "Merchant", username: "SweatyShop888", role: "merchant" },
]

export default function AuthenticationPage() {
    const navigate = useNavigate();
    const signinMutation = useSignin();

    const handleClickRole = ({ username, role }: { username: string; role: string }) => {
        signinMutation.mutate(
            { username },
            {
                onSuccess: () => {
                    navigate(role === "customer" ? PATHS.customer : PATHS.merchant, { replace: true });
                }
            }
        );
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
        >
            <Stack
                direction="column"
                justifyContent="center"
                gap={4}
            >
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                >
                    <img
                        src="/blue-eyes.svg"
                        alt="Blue Eyes"
                        style={{ width: 100, height: 100 }}
                    />
                    <Typography variant="h4">
                        Welcome to Fraud Review Detector AI Demo
                    </Typography>
                    <Typography variant="body1">
                        Select Point of View
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="center"
                    gap={2}
                >
                    {povs.map((pov) => (
                        <Button
                            key={pov.username}
                            variant="contained"
                            onClick={() => handleClickRole({ username: pov.username, role: pov.role })}
                        >
                            {pov.label}
                        </Button>
                    ))}
                    <Button variant="contained" color="error">
                        Admin
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}