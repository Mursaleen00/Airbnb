// import { User } from "@prisma/client";

import { User } from "@prisma/client";

export type safeUser = Omit<
    User, "createdAt" | "updateAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: String;
    emailVarified: string | null;
}
