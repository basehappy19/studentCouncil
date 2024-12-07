import Link from 'next/link'
import React from 'react'

const TraffyFondue = () => {
    return (
        <div className='flex items-center min-h-screen justify-center'>
            <div className="flex flex-col space-y-3 items-center">
                <h1 className='text-3xl'>อยู่ในระหว่างเขียนโค้ดครับ....</h1>
                <Link href={`/`} className='text-md underline text-blue-500'>กลับหน้าแรก</Link>
            </div>
        </div>
    )
}

export default TraffyFondue