import { User } from "@prisma/client";

export type safeUser = Omit<
    User, "createdAt" | "updateAt" | "emailVerified"
> & {
    createdAt: string;
    updateAt: string;
    emailVerified: string | null;
}
