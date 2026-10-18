import { cn } from "@/lib/utils";
import { GitHubIcon } from "./auth-icons";

type OAuthButtonProps = {
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
};

export function OAuthButton({
    onClick,
    className,
    disabled,
}: OAuthButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-border-light bg-surface-white px-4 text-sm font-medium text-text-secondary transition-colors hover:bg-pricing-surface hover:text-text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-replit-orange focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-60",
                className,
            )}
        >
            <GitHubIcon className="h-5 w-5 shrink-0" />
            Continue With GitHub
        </button>
    );
}
