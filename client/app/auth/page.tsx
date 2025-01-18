import type { Metadata } from "next";
import LoginForm from "./LoginForm";


export const metadata: Metadata = {
    title: `เข้าสู่ระบบสมาชิก ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description: "เข้าสู่ระบบ สำหรับสมาชิก",
    openGraph: {
        title: `เข้าสู่ระบบสมาชิก ${process.env.NEXT_PUBLIC_APP_TITLE}`,
        description: "เข้าสู่ระบบ สำหรับสมาชิก",
    },
    keywords: [
        "Student Own School",
        "เพราะนักเรียนเป็นเจ้าของโรงเรียน",
        "ติดตามนโยบาย",
        "ความคืบหน้านโยบาย",
        "หมวดหมู่นโยบาย",
        "สถานะนโยบาย",
        "นโยบายสภานักเรียน",
        "การอัปเดตนโยบาย",
        "การตรวจสอบนโยบาย",
        "สถิตินโยบาย",
        "สภานักเรียนโปร่งใส",
        "สภาโปร่งใส",
        "สภานักเรียน",
        "นักเรียน",
        "นโยบาย",
        "งบประมาณ",
        "มติ",
        "โรงเรียนภูเขียว"
    ],
}

const LoginPage = () => {

    return (
        <LoginForm />
    );
};

export default LoginPage;