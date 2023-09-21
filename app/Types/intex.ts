import { user } from "@prisma/client";

export type safeUser = Omit<
    user,
    "createdAt" | "updatedAt" | "emailVarified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVarified: string | null;
}
