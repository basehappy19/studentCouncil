"use client"
import { signOut } from "next-auth/react"

const SignOut = () => {
    return (
        <button onClick={() => signOut()} className="font-semibold cursor-pointer">
            ออกจากระบบ
        </button>
    )
}

export default SignOut