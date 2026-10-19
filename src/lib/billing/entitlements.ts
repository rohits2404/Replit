import {
    GROQ_MAX_TOKENS,
    MAX_AGENT_TURNS,
    getGroqModel,
} from "@/lib/agent/constants";

import { PublishVisibility } from "../publish/visibility";

export type AppTier = "guest" | "free" | "pro";

export type UserBillingFields = {
    subscriptionPlan: string;
    subscriptionStatus: string | null;
};

export type AgentLimits = {
    maxTurns: number;
    maxTokens: number;
    model: string;
};

export const FREE_PROJECT_LIMIT = 3;
export const FREE_PRIVATE_DEPLOYMENT_LIMIT = 1;

const FREE_AGENT_LIMITS: AgentLimits = {
    maxTurns: 12,
    maxTokens: 700,
    model: "qwen/qwen3.8-27b",
};

const PRO_AGENT_LIMITS: AgentLimits = {
    maxTurns: MAX_AGENT_TURNS,
    maxTokens: GROQ_MAX_TOKENS,
    model: getGroqModel(),
};

export function isProUser(user: UserBillingFields): boolean {
    return (
        user.subscriptionPlan === "pro" &&
        (user.subscriptionStatus === "active" ||
            user.subscriptionStatus === "trialing")
    );
}

export function getAppTier(
    user: UserBillingFields | null | undefined,
): AppTier {
    if (!user) {
        return "guest";
    }

    return isProUser(user) ? "pro" : "free";
}

export function getAgentLimits(tier: AppTier): AgentLimits {
    if (tier === "pro") {
        return PRO_AGENT_LIMITS;
    }

    return FREE_AGENT_LIMITS;
}

export function canPublishVisibility(
    tier: AppTier,
    visibility: PublishVisibility,
): boolean {
    if (tier === "pro") {
        return true;
    }

    return visibility === "private";
}

export function getProjectLimit(tier: AppTier): number | null {
    if (tier === "free") {
        return FREE_PROJECT_LIMIT;
    }

    return null;
}

export function publishUpgradeMessage(visibility: PublishVisibility): string {
    if (visibility === "public") {
        return "Public Publishing Is A Pro Feature. Upgrade To Pro To Share Your Project With Anyone.";
    }

    if (visibility === "workspace") {
        return "Workspace Publishing Is A Pro Feature. Upgrade To Pro To Publish To Your Workspace.";
    }

    return "Upgrade To Pro For More Publishing Options.";
}

export function projectLimitMessage(limit: number): string {
    return `Free Plan Is Limited To ${limit} Active Projects. Upgrade To Pro For Unlimited Projects.`;
}

export const FREE_PLAN_FEATURES = [
    "Up To 3 Active Projects",
    "Agent With Economy Limits",
    "Plan Mode And Prompt Attachments",
    "Private Publish (1 Project)",
] as const;

export const PRO_PLAN_FEATURES = [
    "Unlimited Projects",
    "Full Agent Limits And Premium Models",
    "Public And Workspace Publishing",
    "Commercial Use",
] as const;
