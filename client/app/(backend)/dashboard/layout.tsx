import { ReactNode } from "react";
import SideBar from "../../layouts/SideBar";
import { getUserData } from "@/app/functions/Auth";
import type { Metadata } from "next" 
import { UserData } from "@/app/interfaces/Auth/User";

export const metadata : Metadata = {
    title: `แดชบอร์ด ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description:
        "แดชบอร์ดสำหรับสภานักเรียน",
    openGraph: {
        title: `แดชบอร์ด ${process.env.NEXT_PUBLIC_APP_TITLE}`,
        description:
            "แดชบอร์ดสำหรับสภานักเรียน",
    },
};

export default async function Layout({ children }: { children: ReactNode }) {
    const user : UserData | null = await getUserData();
    return (
        <main>
            <SideBar user={user} />
            <div className="p-4 sm:ml-64 min-h-screen">
                {children}
            </div>
        </main>
    )
}