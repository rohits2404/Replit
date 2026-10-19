"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useToast } from "@/components/ui/toast";
import {
    permanentlyDeleteProjectAction,
    restoreProjectAction,
} from "@/lib/actions/projects";
import type { AppTrashedProject } from "@/lib/app-types";
import { formatRelativeTime } from "@/lib/app-utils";

type TrashPageClientProps = {
    projects: AppTrashedProject[];
};

export function TrashPageClient({
    projects: initialProjects,
}: TrashPageClientProps) {
    const router = useRouter();
    const { success, error: toastError } = useToast();
    const [projects, setProjects] = useState(initialProjects);
    const [pendingId, setPendingId] = useState<string | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<AppTrashedProject | null>(
        null,
    );
    const [isPending, startTransition] = useTransition();

    function handleRestore(projectId: string) {
        setPendingId(projectId);

        startTransition(async () => {
            const result = await restoreProjectAction(projectId);

            if (result?.error) {
                toastError(result.error);
                setPendingId(null);
                return;
            }

            setProjects((current) =>
                current.filter((project) => project.id !== projectId),
            );
            success("Project Restored");
            router.refresh();
            setPendingId(null);
        });
    }

    function handleConfirmPermanentDelete() {
        if (!deleteTarget) return;

        setPendingId(deleteTarget.id);

        startTransition(async () => {
            const result = await permanentlyDeleteProjectAction(
                deleteTarget.id,
            );

            if (result?.error) {
                toastError(result.error);
                setPendingId(null);
                return;
            }

            setProjects((current) =>
                current.filter((item) => item.id !== deleteTarget.id),
            );
            setDeleteTarget(null);
            success("Project Permanently Deleted");
            router.refresh();
            setPendingId(null);
        });
    }

    if (projects.length === 0) {
        return null;
    }

    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-app-border bg-app-surface">
                <ul className="divide-y divide-app-border-subtle">
                    {projects.map((project) => {
                        const isRowPending =
                            isPending && pendingId === project.id;

                        return (
                            <li
                                key={project.id}
                                className="flex flex-col gap-4 px-4 py-4 tablet-up:flex-row tablet-up:items-center tablet-up:justify-between"
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h2 className="truncate text-sm font-medium text-app-text">
                                            {project.name}
                                        </h2>
                                        <span className="text-xs text-app-text-muted">
                                            {project.workspaceName}
                                        </span>
                                    </div>
                                    {project.description ? (
                                        <p className="mt-1 line-clamp-2 text-sm text-app-text-muted">
                                            {project.description}
                                        </p>
                                    ) : null}
                                    <p className="mt-2 text-xs text-app-text-muted">
                                        Deleted{" "}
                                        {formatRelativeTime(project.deletedAt)}{" "}
                                        · {project.artifacts.length}{" "}
                                        {project.artifacts.length === 1
                                            ? "Artifact"
                                            : "Artifacts"}
                                    </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        theme="app"
                                        disabled={isRowPending}
                                        onClick={() =>
                                            handleRestore(project.id)
                                        }
                                    >
                                        Restore
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        theme="app"
                                        disabled={isRowPending}
                                        onClick={() => setDeleteTarget(project)}
                                        className="text-replit-orange hover:text-replit-orange"
                                    >
                                        Delete Permanently
                                    </Button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <ConfirmDialog
                open={deleteTarget !== null}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleConfirmPermanentDelete}
                title="Delete Permanently?"
                description="This Project And All Of Its Artifacts Will Be Removed Forever. This Action Cannot Be Undone."
                itemName={deleteTarget?.name}
                confirmLabel="Delete Permanently"
                variant="destructive"
                isPending={isPending && pendingId === deleteTarget?.id}
            />
        </>
    );
}
