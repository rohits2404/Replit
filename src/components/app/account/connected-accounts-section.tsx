import type { ConnectedAccount } from "@/lib/types/account";

type ConnectedAccountsSectionProps = {
    accounts: ConnectedAccount[];
};

export function ConnectedAccountSection({
    accounts,
}: ConnectedAccountsSectionProps) {
    const githubAccounts = accounts.filter(
        (account) => account.provider === "github",
    );

    return (
        <section className="rounded-2xl border border-app-border bg-app-surface p-6">
            <div className="mb-4">
                <h2 className="font-display text-lg text-app-text">
                    Connected Accounts
                </h2>
                <p className="mt-1 text-sm text-app-text-muted">
                    GitHub Account Linked To Your Replit Account.
                </p>
            </div>

            {githubAccounts.length > 0 ? (
                <ul className="divide-y divide-app-border-subtle">
                    {githubAccounts.map((account) => (
                        <li
                            key={`${account.provider}-${account.providerAccountId}`}
                            className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-app-border bg-app-input-bg text-app-text-secondary">
                                    <GitHubIcon className="h-4 w-4" />
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-app-text">
                                        GitHub
                                    </p>
                                    <p className="text-xs text-app-text-muted">
                                        Connected
                                    </p>
                                </div>
                            </div>

                            <span className="rounded-full bg-app-surface-active px-2.5 py-0.5 text-xs text-app-text-secondary">
                                Active
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-app-text-muted">
                    No Connected GitHub Account Found.
                </p>
            )}
        </section>
    );
}

function GitHubIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0 0 22 12.021C22 6.484 17.523 2 12 2Z" />
        </svg>
    );
}
