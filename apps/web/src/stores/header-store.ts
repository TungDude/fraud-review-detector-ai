import { create } from "zustand";

interface HeaderState {
    title: string | null;
    allowBack?: boolean;
    setTitle: (title: string | null) => void;
    setAllowBack: (allowBack: boolean) => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
    title: null,
    allowBack: false,
    setTitle: (title: string | null) => set({ title }),
    setAllowBack: (allowBack: boolean) => set({ allowBack }),
}))