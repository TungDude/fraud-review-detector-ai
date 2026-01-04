import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/app/lib/query-client";
import { BrowserRouter } from "react-router-dom";

interface AppProvidersProps {
    children: ReactNode;
}

export default function AppProviders({ children }: Readonly<AppProvidersProps>) {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </QueryClientProvider>
    );
}