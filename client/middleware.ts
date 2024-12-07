import { PROTECT_ROUTES, DEFAULT_REDIRECT, ROOT } from "./lib/route";
import { menuItems } from "./app/layouts/SideBarMenu";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
    const { nextUrl, auth } = req;
    
    const accessId = auth?.user?.accessId;
    const isAuthenticated = !!auth?.user;
    const isProtectedRoute = PROTECT_ROUTES.includes(nextUrl.pathname);
    
    if (!isAuthenticated && isProtectedRoute) {
        return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }

    const menuItem = menuItems.find((item) => item.href === nextUrl.pathname);
    
    if (menuItem && accessId === undefined) {
        return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }

    if (menuItem) {
        if (menuItem.accessId.includes(0)) {
            if (!isAuthenticated) {
                return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
            }
        } else if (accessId !== undefined) {
            const isAccessAllowed = menuItem.accessId.includes(accessId);
            if (!isAccessAllowed) {
                return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
            }
        }
    }

    if ((nextUrl.pathname === DEFAULT_REDIRECT) && isAuthenticated) {
        return Response.redirect(new URL(ROOT, nextUrl));
    }
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
