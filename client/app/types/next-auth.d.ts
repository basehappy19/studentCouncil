import { type DefaultSession, type DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: DefaultSession["user"] & {
            id: number;
            accessId: number;
        };
        token: string;
    }
    interface User extends DefaultUser {
        id: number;
        accessId: number;
        token: string;
    }
}
