import { prisma } from "../prisma";
import { getCachedSession } from "./cached";

type RequireUserSelect = {
    id: true;
    email?: true;
    name?: true;
    stripeCustomerId?: true;
    subscriptionPlan?: true;
    subscriptionStatus?: true;
};

export async function requireUserId() {
    const session = await getCachedSession();
    const userId = session?.user?.id;

    if (!userId) {
        return { error: "You Must Be Signed In." as const, userId: null };
    }

    if (!process.env.DATABASE_URL) {
        return { error: "Database Is Not Configued." as const, userId: null };
    }

    return { userId, error: null };
}

export async function requireUser<S extends RequireUserSelect>(select: S) {
    const session = await getCachedSession();
    const userId = session?.user?.id;

    if (!userId) {
        return { error: "You Must Be Signed In." as const, userId: null };
    }

    if (!process.env.DATABASE_URL) {
        return { error: "Database Is Not Configued." as const, userId: null };
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select,
    });

    if (!user) {
        return { error: "User Not Found." as const, user: null };
    }

    return { user, error: null };
}
