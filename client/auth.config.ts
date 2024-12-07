import { NextAuthConfig } from "next-auth";

export const authConfig = {
    providers: [],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; 
                token.token = user.token; 
                token.accessId = user.accessId; 
            }            
            return token;
        },

        async session({ session, token }) {
            if (token?.token) {
                session.user.id = token.id as string;  
                session.user.token = token.token as string;  
                session.user.accessId = token.accessId as number;  
            }            
            return session;
        },
    },
    pages: {
        signIn: "/auth",
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60,
    },    
    secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
