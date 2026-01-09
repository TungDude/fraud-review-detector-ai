import { Outlet } from "react-router-dom";

export default function BaseLayout() {
    return (
        <main className="flex h-screen bg-gray-100 custom-scrollbar">
            <Outlet />
        </main>
    )
}