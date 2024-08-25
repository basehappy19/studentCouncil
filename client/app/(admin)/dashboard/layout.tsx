import { ReactNode } from "react";
import SideBar from "@/app/layouts/SideBar";

interface RootLayoutProps {
    children: ReactNode;
}

export default async function Layout({ children }: RootLayoutProps) {
    return (
        <>
            <main>
                <SideBar />
                <div className="p-4 sm:ml-64 min-h-screen">
                    {children}
                </div>
            </main>
        </>
    )
}