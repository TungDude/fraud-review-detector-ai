import { Typography, Stack } from "@mui/material";
import SignoutButton from "../molecules/SignoutButton";
import ProfileBadge from "../molecules/ProfileBadge";
import BackButton from "../molecules/BackButton";
import { useHeader } from "@/hooks/useHeader";

export default function Header() {
    const { title, allowBack } = useHeader();

    return (
        <header className="sticky bg-white top-0 z-10 flex items-center justify-between px-8 py-4 border-b border-gray-300">
            <Stack direction="row" alignItems="center" spacing={1}>
                {allowBack && <BackButton />}
                <Typography variant="h4">{title}</Typography>
            </Stack>
            <img
                src="/blue-eyes.svg"
                alt="Blue Eyes"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 50,
                    height: 50,
                }}
            />
            <Stack direction="row" alignItems="center" spacing={2}>
                <ProfileBadge />
                <SignoutButton />
            </Stack>
        </header>
    );
}