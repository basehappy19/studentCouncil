import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { username, password } = credentials as { username: string; password: string };
                try {
                    const response = await fetch(process.env.NEXT_PUBLIC_APP_API_URL + "/login", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username, password })
                    });
                    
                    if (response.ok) {
                        const user = await response.json();                        
                        if (user) {
                            return {
                                id: user.id,
                                username: user.username,
                                fullName: user.fullName,
                                displayName: user.displayName,
                                image: user.profilePicture,
                                role: user.role,
                                accessId: user.accessId,
                                token: user.token,
                            };
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                } catch (err) {
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, 
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.fullName = user.fullName;
                token.displayName = user.displayName;
                token.picture = user.image;
                token.role = user.role;
                token.accessId = user.accessId;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                session.user.fullName = token.fullName as string;
                session.user.displayName = token.displayName as string;
                session.user.image = token.picture as string;
                session.user.role = token.role as string;
                session.user.accessId = token.accessId as string;
                session.token = token.token as string;
            }
            
            return session;
        }        
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        signOut: "/",
    }
};