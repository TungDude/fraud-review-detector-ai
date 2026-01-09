import { useHeaderStore } from "@/stores/header-store";
import { useShallow } from "zustand/react/shallow";

export function useHeader() {
    const { title, allowBack } = useHeaderStore(
        useShallow((state) => ({
            title: state.title,
            allowBack: state.allowBack,
        }))
    );

    return { title, allowBack };
}