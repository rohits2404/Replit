import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "../auth";
import { getUserWorkspaces } from "../queries/projects";

export const getCachedSession = cache(async () => {
    return auth.api.getSession({
        headers: await headers(),
    });
});

export const getCachedUserWorkspaces = cache(getUserWorkspaces);
