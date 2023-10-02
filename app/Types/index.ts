// import { User } from "@prisma/client";

import { user } from "@prisma/client";

export type safeUser = Omit<
    user, "createdAt" | "updateAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: String;
    emailVarified: string | null;
}
