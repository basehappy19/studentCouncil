'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "react-toastify";


const LoginPage = () => {
    const router = useRouter();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        if (!username || !password) {
            toast.error("กรุณากรอกข้อมูลให้ครบถ้วน", { position: "bottom-right" });
            return;
        }

        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (!res?.ok) {
            toast.error("ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง", { position: "bottom-right" });
            return;
        } else {
            router.push("/dashboard/home");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        ล็อกอินสมาชิกสภานักเรียน
                    </CardTitle>
                </CardHeader>
                <form onSubmit={onSubmit}>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="username" className="block mb-2">
                                รหัสสมาชิก
                            </Label>
                            <Input
                                id="username"
                                name="username"
                                placeholder="กรอกชื่อผู้ใช้"
                                type="text"
                                className="w-full"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" className="block mb-2">
                                รหัสผ่าน
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                placeholder="กรอกรหัสผ่าน"
                                type="password"
                                className="w-full"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center space-y-4">
                        <Button type="submit" className="w-full">
                            เข้าสู่ระบบ
                        </Button>
                        <p className="text-sm text-gray-500">
                            ลืมรหัสผ่าน? กรุณาติดต่อประธานสภานักเรียน
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default LoginPage;
