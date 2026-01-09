import {
    IconButton
} from "@mui/material";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate();

    return (
        <IconButton
            color="primary"
            onClick={() => navigate(-1)}
        >
            <ChevronLeft />
        </IconButton>
    )
}