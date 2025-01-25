import NextAuth, { User, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
    interface User {
        accessId: number;
        token: string;
    }

    interface Session {
        user: User;
    }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                username: credentials.username,
                                password: credentials.password,
                            }),
                        }
                    );

                    if (!res.ok) {
                        throw new Error("Authentication failed");
                    }

                    const user = await res.json();

                    if (user && user.token) {
                        return {
                            id: user.id,
                            token: user.token,
                            accessId: user.accessId,
                        };
                    }

                    return null;
                } catch (error) {
                    console.error("Authentication error:", error);
                    return null;
                }
            },
        }),
    ],
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
        maxAge: 365 * 24 * 60 * 60,
    },
    secret: process.env.AUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
});
