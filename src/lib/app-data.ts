export const appHomeExamplePrompts = [
    {
        label: "Startup Analytics Dashboard",
        text: "A SaaS KPI Dashboard Showing User Growth, Churn Rate, And Retention Trends Over Time",
    },
    {
        label: "B2B Project Management App",
        text: "A Project Management Web App For A Small B2B SaaS Startup Team To Track Tasks, Assign Owners, Set Deadlines, And View Progress Across Projects",
    },
    {
        label: "Product Launch Presentation",
        text: "A Pitch Deck For A Product Launch With Problem, Solution, Traction, And Roadmap Slides",
    },
];

export function getDisplayName(
    name?: string | null,
    email?: string | null,
    username?: string | null,
) {
    if (username) return username;
    if (name) return name.split(" ")[0] ?? name;
    if (email) return email.split("@")[0] ?? "There";
    return "There";
}

export function getWorkspaceLabel(
    workspaces: { name: string; slug: string }[],
    activeSlug?: string,
) {
    const workspace =
        workspaces.find((item) => item.slug === activeSlug) ?? workspaces[0];

    if (!workspace) return "Your Workspace";
    return workspace.name.endsWith("Workspace")
        ? workspace.name
        : `${workspace.name}'s Workspace`;
}
