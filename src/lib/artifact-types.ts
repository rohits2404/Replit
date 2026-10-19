import { PROMPT_ATTACHMENTS_DIR } from "./prompt-attachments";
import type { ArtifactStatus, ArtifactType } from "@/generated/prisma/client";
import type { ProjectCategory } from "./types";
import { artifactTypeLabels, type AppAgentMessage } from "./app-types";

export const MAX_ARTIFACTS_PER_PROJECT = 7;
export const MIN_ARTIFACTS_PER_PROJECT = 1;

export const agentBuildableArtifactTypes = [
    "WEB_APP",
    "MOBILE_APP",
    "DESIGN",
] as const satisfies readonly ArtifactType[];

export function artifactSupportsAgentBuild(type: ArtifactType) {
    return (agentBuildableArtifactTypes as readonly ArtifactType[]).includes(
        type,
    );
}

export function artifactHasFiles(
    files: Array<{ path: string }>,
    artifactSlug: string,
) {
    return files.some((file) => {
        if (!file.path.startsWith(`${artifactSlug}/`)) return false;
        const relative = file.path.slice(`${artifactSlug}/`.length);
        return !relative.startsWith(`${PROMPT_ATTACHMENTS_DIR}/`);
    });
}

export function artifactHasPreviewContent(
    artifact: { slug: string; status: ArtifactStatus },
    files: Array<{ path: string }>,
    messages: AppAgentMessage[] = [],
) {
    if (artifactHasFiles(files, artifact.slug)) return true;
    if (artifact.status === "READY") return true;

    const prefix = `${artifact.slug}/`;
    return messages.some((message) =>
        message.metadata?.fileWrites?.some((file) =>
            file.path.startsWith(prefix),
        ),
    );
}

export function getArtifactEmptyStateMessage(type: ArtifactType) {
    if (!artifactSupportsAgentBuild(type)) {
        return {
            description: `${artifactTypeLabels[type]} Artifacts Are Not Supported Yet.`,
            hint: "Switch To Web App Or Mobile App, Or Add a New Artifact With +.",
        };
    }

    switch (type) {
        case "DESIGN":
            return {
                description: "Design Mockups And Wireframes Will Appear Here.",
                hint: "Ask Agent To Build A Layout, Or Use Plan Mode To Iterate Without Writing Files.",
            };
        case "MOBILE_APP":
            return {
                description: "A Mobile-Focused Preview Will Render Here.",
                hint: "Select This Tab And Ask Agent To Build A Phone-Sized Version.",
            };
        default:
            return {
                description:
                    "Live Preview Will Render Here As Agent Builds Your App.",
                hint: "Select This Tab And Tell Agent What To Build.",
            };
    }
}

/** Build types users can add from the + button in the editor. */
export const addableArtifactTypes: Array<{
    type: ArtifactType;
    label: string;
    icon: ProjectCategory["icon"];
}> = [
    { type: "WEB_APP", label: artifactTypeLabels.WEB_APP, icon: "website" },
    {
        type: "MOBILE_APP",
        label: artifactTypeLabels.MOBILE_APP,
        icon: "mobile",
    },
    { type: "DESIGN", label: artifactTypeLabels.DESIGN, icon: "design" },
];
