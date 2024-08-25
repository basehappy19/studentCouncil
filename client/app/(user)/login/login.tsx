"use client";
import { signIn } from "next-auth/react";
import { toast } from 'react-toastify';
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
function Login() {
    const router = useRouter()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const res = await signIn("credentials", {
            username: formData.get('username'),
            password: formData.get('password'),
            redirect: false,
        })
        if (!res?.error) {
            router.push("/dashboard")
        } else {
            toast.error('ชื่อหรือรหัสผิด กรุณาลองใหม่อีกครั้ง', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
    };
    return (
        <div className="bg-custom-background">
            <section>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-custom-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-custom-gray-900 md:text-2xl">
                                ล็อคอิน
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-custom-gray-900">รหัสสภานักเรียน</label>
                                    <input type="text" name="username" id="username" placeholder="stu01•••" className="border border-gray2 text-custom-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-custom-primary-dark block w-full p-2.5" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-custom-gray-900">รหัสผ่าน</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="border border-gray2 text-custom-gray-900 sm:text-sm rounded-lg focus:ring-custom-primary focus:border-custom-primary-dark block w-full p-2.5" required />
                                </div>
                                <p>ลืมรหัสติดต่อประธาน</p>
                                <button type="submit" className="w-full text-custom-white bg-custom-primary-dark focus:ring-4 focus:outline-none focus:ring-custom-primary-light font-medium rounded-lg text-sm px-5 py-2.5 text-center">ล็อคอิน</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Login