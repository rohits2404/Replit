const DEFAULT_MAX_TOKENS = 700;
const DEFAULT_MAX_TURNS = 48;

export const GROQ_MAX_TOKENS = readIntEnv(
    process.env.GROQ_MAX_TOKENS,
    DEFAULT_MAX_TOKENS,
);
export const MAX_AGENT_TURNS = readIntEnv(
    process.env.MAX_AGENT_TURNS,
    DEFAULT_MAX_TURNS,
);

export const MAX_AGENT_CONTINUE_NUDGES = readIntEnv(
    process.env.MAX_AGENT_CONTINUE_NUDGES,
    5,
);

// Qwen 3.8 is multimodal and supports local tool calling on Groq.
// Override this in .env if you choose another model enabled for your account.
const DEFAULT_MODEL = "qwen/qwen3.8-27b";

function readIntEnv(value: string | undefined, fallback: number) {
    if (!value?.trim()) return fallback;
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function getGroqModel() {
    return process.env.GROQ_MODEL?.trim() || DEFAULT_MODEL;
}
