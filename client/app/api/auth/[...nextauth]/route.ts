import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { username, password } = credentials;
                try {
                    const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/login", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(credentials)
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

            if (token) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.fullName = token.fullName;
                session.user.displayName = token.displayName;
                session.user.image = token.picture;
                session.user.role = token.role;
                session.user.accessId = token.accessId;
                session.token = token.token;
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
