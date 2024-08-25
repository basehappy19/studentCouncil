"use client"
import { signOut } from "next-auth/react"
import { FC } from "react"

const SignOut: FC = () => {
    return (
        <button onClick={() => signOut()} className="font-semibold cursor-pointer text-[#919396]">
            Logout
        </button>
    )
}

export default SignOut