import { Listing, User } from "@prisma/client";

export type SafeListing = Omit<
    Listing,
    'createdAt'
> & {
    createdAt: string;
}

export type safeUser = Omit<
    User, "createdAt" | "updateAt" | "emailVerified"
> & {
    createdAt: string;
    updateAt: string;
    emailVerified: string | null;
}
