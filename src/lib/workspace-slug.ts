import { slugify, slugifyUsername, uniqueSlugWithSuffix } from "./app-utils";
import { prisma } from "./prisma";

export const WORKSPACE_SLUG_PATTERN = /^[a-z0-9](?:[a-z0-9-]{1,38}[a-z0-9])?$/;

export function normalizeWorkspaceSlug(input: string) {
    return slugifyUsername(input.replace(/^@/, ""));
}

type WorkspaceSlugUser = {
    username?: string | null;
    name?: string | null;
};

export function defaultWorkspaceSlugFromUser(user: WorkspaceSlugUser) {
    const fromUsername = user.username
        ? normalizeWorkspaceSlug(user.username)
        : "";
    if (fromUsername.length >= 3) return fromUsername;

    const fromName = user.name ? slugify(user.name).slice(0, 40) : "";
    if (fromName.length >= 3) return fromName;

    return fromUsername || fromName || "workspace";
}

export function validateWorkspaceSlug(slug: string) {
    if (!slug || slug.length < 3) {
        return "Workspace-Url-Must-Be-At-Least-3-Characters";
    }

    if (!WORKSPACE_SLUG_PATTERN.test(slug)) {
        return "Use-Lowercase-Letters-Numbers-And-Hyphens-Cannot-Start-Or-End-With-A-Hyphen";
    }

    return null;
}

export async function uniqueWorkspaceSlug(
    base: string,
    excludeWorkspaceId?: string,
) {
    const normalized = normalizeWorkspaceSlug(base) || "workspace";

    return uniqueSlugWithSuffix(
        normalized,
        async (candidate) => {
            const existing = await prisma.workspace.findUnique({
                where: { slug: candidate },
                select: { id: true },
            });
            return Boolean(existing && existing.id !== excludeWorkspaceId);
        },
        "workspace",
    );
}
