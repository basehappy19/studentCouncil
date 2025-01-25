'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { User, KeyRound, LucideLoader } from "lucide-react";
import Link from "next/link";

const LoginForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        if (!username || !password) {
            toast.error("กรุณากรอกข้อมูลให้ครบถ้วน", { position: "bottom-right" });
            setIsLoading(false);
            return;
        }

        try {
            const res = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (res?.error) {
                toast.error("รหัสมาชิก หรือ รหัสผ่านไม่ถูกต้องลองใหม่ดูครับ", { position: "bottom-right" });
            } else {
                router.push("/dashboard/home");
            }
        } catch (error) {
            toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อ", { position: "bottom-right" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <Card className="w-full max-w-md border-0 shadow-lg dark:bg-gray-800/50 backdrop-blur-sm">
                <CardHeader className="space-y-4">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full">
                        <User className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        ล็อกอินสมาชิกสภานักเรียน
                    </CardTitle>
                </CardHeader>
                <form onSubmit={onSubmit}>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-sm font-medium">
                                รหัสสมาชิก
                            </Label>
                            <div className="relative">
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="กรอกชื่อผู้ใช้"
                                    type="text"
                                    className="pl-10"
                                    disabled={isLoading}
                                    required
                                />
                                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                                รหัสผ่าน
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="กรอกรหัสผ่าน"
                                    type="password"
                                    className="pl-10"
                                    disabled={isLoading}
                                    required
                                />
                                <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center space-y-4">
                        <Button
                            type="submit"
                            className="bg-blue-400 hover:bg-blue-500 dark:bg-blue-600 hover:dark:bg-blue-700 w-full text-base font-medium transition-all hover:scale-[1.02]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <LucideLoader className="mr-2 h-4 w-4 animate-spin" />
                                    กำลังเข้าสู่ระบบ...
                                </>
                            ) : (
                                'เข้าสู่ระบบ'
                            )}
                        </Button>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                            ลืมรหัสผ่าน? <br />
                            <span className="text-primary hover:underline cursor-pointer">
                                กรุณาติดต่อประธานสภานักเรียน
                            </span><br />
                            <span className="text-blue-600 dark:text-blue-700 hover:underline cursor-pointer">
                                <Link href={`/`}>
                                    กลับหน้าหลัก....
                                </Link>
                            </span>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default LoginForm;