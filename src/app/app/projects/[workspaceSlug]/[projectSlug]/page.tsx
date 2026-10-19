import { ProjectEditor } from "@/components/app/editor/project-editor";
import { getCachedSession } from "@/lib/auth/cached";
import { getAppTier } from "@/lib/billing/entitlements";
import { getUserBillingFields } from "@/lib/queries/billing";
import { getProjectBySlugs } from "@/lib/queries/projects";
import { notFound, redirect } from "next/navigation";
import React from "react";

type ProjectPageProps = {
    params: Promise<{
        workspaceSlug: string;
        projectSlug: string;
    }>;
};

const AppProjectsPage = async ({ params }: ProjectPageProps) => {
    const session = await getCachedSession();
    const userId = session?.user?.id;

    if (!userId) {
        redirect("/?auth=login&callbackUrl=/app");
    }

    if (!process.env.DATABASE_URL) {
        notFound();
    }

    const { workspaceSlug, projectSlug } = await params;
    const project = await getProjectBySlugs(userId, workspaceSlug, projectSlug);

    if (!project) {
        notFound();
    }

    const billingUser = await getUserBillingFields(userId);

    return (
        <ProjectEditor project={project} appTier={getAppTier(billingUser)} />
    );
};

export default AppProjectsPage;
