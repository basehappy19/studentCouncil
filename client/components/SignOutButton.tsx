"use client"
import { signOut } from "next-auth/react"

const SignOut = () => {
    return (
        <button onClick={() => signOut({ callbackUrl: '/' })} className="font-semibold cursor-pointer">
            ออกจากระบบ
        </button>
    )
}

export default SignOut