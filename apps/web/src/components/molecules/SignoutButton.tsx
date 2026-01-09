import {
    Button
} from '@mui/material';
import { useSignout } from '@/hooks/queries/useAuthQuery';

export default function SignoutButton() {
    const signoutMutation = useSignout();

    const handleSignout = () => {
        signoutMutation.mutate();
    };

    return (
        <Button
            variant="contained"
            color="error"
            onClick={handleSignout}
        >
            Sign Out
        </Button>
    )
}