import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import { menuItems } from "./app/layouts/SideBarMenu";

export async function middleware(request: NextRequest){
    const user = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    })
    
    if(request.nextUrl.pathname.startsWith('/dashboard') && (!user)){
        return NextResponse.redirect(new URL('/',request.url))
    }

    if (user && request.nextUrl.pathname.startsWith('/dashboard')) {
        const path = request.nextUrl.pathname;
        
        const requiredAccessId = menuItems.find(item => item.href === path)?.accessId || [];
        
        if (!requiredAccessId.includes("all") && !requiredAccessId.includes(user.accessId)) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
}