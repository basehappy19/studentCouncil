import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { User } from "@/app/interfaces/User/User";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const { username, password } = credentials as {
                    username: string;
                    password: string;
                };

                try {
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_APP_API_URL}/auth/login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ username, password }),
                        }
                    );

                    if (res.ok) {
                        const user: User = await res.json();
                        if (user) {
                            return {
                                id: user.id,
                                accessId: user.accessId,
                                token: user.token,
                            };
                        }
                    }
                    return null;
                } catch (error) {
                    console.error("Error during authorization:", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.accessId = user.accessId;
                token.token = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as number;
                session.user.accessId = token.accessId as number;
                session.token = token.token as string; 
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth", 
        signOut: "/", 
    },
};
