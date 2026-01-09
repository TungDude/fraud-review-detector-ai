import { useEffect } from "react";
import { useHeaderStore } from "@/stores/header-store";

export default function MerchantPage() {
    const setTitle = useHeaderStore((state) => state.setTitle);

    useEffect(() => {
        setTitle("Merchant Point of View");
        return () => {
            setTitle(null);
        };
    }, [setTitle]);

    return (
        <div>
            Merchant Page
        </div>
    );
}