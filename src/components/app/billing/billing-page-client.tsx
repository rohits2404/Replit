"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import {
    createBillingPortalSessionAction,
    createProCheckoutSessionAction,
} from "@/lib/actions/billing";
import {
    FREE_PLAN_FEATURES,
    PRO_PLAN_FEATURES,
} from "@/lib/billing/entitlements";
import type { ProPlanInfo } from "@/lib/stripe";
import type { SubscriptionDisplayInfo } from "@/lib/billing/stripe-subscription";
import { cn } from "@/lib/utils";

type BillingPageClientProps = {
    plan: "free" | "pro";
    status: string | null;
    hasCustomer: boolean;
    proPlan: ProPlanInfo;
    subscription: SubscriptionDisplayInfo | null;
    justUpgraded?: boolean;
};

function proPriceLabel(proPlan: ProPlanInfo) {
    if (proPlan.formattedPrice && proPlan.intervalLabel) {
        return `${proPlan.formattedPrice}/${proPlan.intervalLabel}`;
    }

    if (proPlan.formattedPrice) {
        return proPlan.formattedPrice;
    }

    return "—";
}

export function BillingPageClient({
    plan,
    hasCustomer,
    proPlan,
    subscription,
    justUpgraded = false,
}: BillingPageClientProps) {
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const checkoutStatus = searchParams.get("checkout");
    const checkoutDisabled = isPending || !proPlan.configured;

    function handleUpgrade() {
        setError(null);
        startTransition(async () => {
            const result = await createProCheckoutSessionAction();
            if (result?.url) {
                window.location.assign(result.url);
                return;
            }
            if (result?.error) setError(result.error);
        });
    }

    function handleManage() {
        setError(null);
        startTransition(async () => {
            const result = await createBillingPortalSessionAction();
            if (result?.url) {
                window.location.assign(result.url);
                return;
            }
            if (result?.error) setError(result.error);
        });
    }

    return (
        <div className="w-full px-6 py-8 tablet-up:px-8">
            <div className="space-y-6">
                <div>
                    <h1 className="font-display text-2xl text-app-text">
                        Billing
                    </h1>
                    <p className="mt-1 text-sm text-app-text-muted">
                        Starter Is Free For Personal Projects. Pro Unlocks
                        Commercial Use, Public Publishing, And Higher Agent
                        Limits.
                    </p>
                </div>

                {justUpgraded && plan === "pro" ? (
                    <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                        Welcome To Pro — Your Subscription Is Active.
                    </p>
                ) : null}

                {checkoutStatus === "invalid" ? (
                    <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                        We Couldn&apos;t Verify That Checkout. Complete Payment
                        Through Upgrade To Pro, Or Contact Support If You Were
                        Already Charged.
                    </p>
                ) : null}

                {checkoutStatus === "cancel" ? (
                    <p className="rounded-xl border border-app-border bg-app-surface px-4 py-3 text-sm text-app-text-muted">
                        Checkout Was Canceled. You Can Upgrade Anytime.
                    </p>
                ) : null}

                {error ? (
                    <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                        {error}
                    </p>
                ) : null}

                {!proPlan.configured && proPlan.configError ? (
                    <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                        {proPlan.configError}
                        {proPlan.configError.includes("STRIPE_PRO") ? (
                            <>
                                {" "}
                                Use{" "}
                                <code className="text-amber-50">
                                    STRIPE_PRO_PRICE_ID=price_...
                                </code>{" "}
                                Or{" "}
                                <code className="text-amber-50">
                                    STRIPE_PRO_PRODUCT_ID=prod_...
                                </code>{" "}
                                In <code className="text-amber-50">.env</code>,
                                Then Restart The Dev Server.
                            </>
                        ) : null}
                    </p>
                ) : null}

                <section className="rounded-2xl border border-app-border bg-app-surface px-6">
                    <div className="border-b border-app-border-subtle py-5">
                        <h2 className="font-display text-lg text-app-text">
                            Current plan
                        </h2>
                        <p className="mt-1 text-sm text-app-text-muted">
                            Compare What&apos;s Included On Starter vs Pro.
                        </p>
                    </div>

                    {subscription ? (
                        <div
                            className={cn(
                                "mt-5 rounded-xl border px-4 py-3.5",
                                subscription.bannerClassName,
                            )}
                        >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="text-sm font-medium text-app-text">
                                    Subscription
                                </p>
                                <span
                                    className={cn(
                                        "rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide",
                                        subscription.badgeClassName,
                                    )}
                                >
                                    {subscription.badgeLabel}
                                </span>
                            </div>
                            <p
                                className={cn(
                                    "mt-1.5 text-sm leading-relaxed",
                                    subscription.bannerTextClassName,
                                )}
                            >
                                {subscription.summary}
                            </p>
                        </div>
                    ) : null}

                    <div className="grid gap-4 py-5 tablet-up:grid-cols-2">
                        <div
                            className={cn(
                                "rounded-xl border px-4 py-4",
                                plan === "free"
                                    ? "border-app-accent/50 bg-app-accent/5"
                                    : "border-app-border-subtle",
                            )}
                        >
                            <p className="text-sm font-medium text-app-text">
                                Starter
                            </p>
                            <p className="mt-1 text-2xl font-semibold text-app-text">
                                $0
                            </p>
                            <ul className="mt-3 space-y-1.5 text-xs text-app-text-muted">
                                {FREE_PLAN_FEATURES.map((feature) => (
                                    <li key={feature}>• {feature}</li>
                                ))}
                            </ul>
                        </div>

                        <div
                            className={cn(
                                "rounded-xl border px-4 py-4",
                                plan === "pro"
                                    ? "border-app-accent/50 bg-app-accent/5"
                                    : "border-app-border-subtle",
                            )}
                        >
                            <div className="flex items-center justify-between gap-2">
                                <p className="text-sm font-medium text-app-text">
                                    Pro
                                </p>
                                {proPlan.mode ? (
                                    <span
                                        className={cn(
                                            "rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                                            proPlan.mode === "live"
                                                ? "bg-emerald-500/15 text-emerald-300"
                                                : "bg-app-surface-active text-app-text-muted",
                                        )}
                                    >
                                        {proPlan.mode === "live"
                                            ? "Live"
                                            : "Test"}
                                    </span>
                                ) : null}
                            </div>
                            <p className="mt-1 text-2xl font-semibold text-app-text">
                                {proPriceLabel(proPlan)}
                            </p>
                            <ul className="mt-3 space-y-1.5 text-xs text-app-text-muted">
                                {PRO_PLAN_FEATURES.map((feature) => (
                                    <li key={feature}>• {feature}</li>
                                ))}
                            </ul>
                            {plan === "pro" && subscription?.summary ? (
                                <p className="mt-3 text-xs text-app-text-muted">
                                    {subscription.summary}
                                </p>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-app-border-subtle py-5">
                        <p className="text-xs text-app-text-muted">
                            {isPending
                                ? "Connecting To Stripe…"
                                : subscription?.variant === "canceling"
                                  ? "You Can Reactivate In Manage Subscription"
                                  : plan === "pro"
                                    ? subscription?.variant === "active"
                                        ? "Your Pro Subscription Is Active"
                                        : "Manage Your Subscription In Stripe"
                                    : proPlan.configured
                                      ? "Secure Checkout Powered By Stripe"
                                      : "Configure Stripe To Enable Checkout"}
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                            {plan === "free" ? (
                                <button
                                    type="button"
                                    onClick={handleUpgrade}
                                    disabled={checkoutDisabled}
                                    className={cn(
                                        "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all",
                                        "bg-linear-to-r from-replit-orange to-[#ff6b35]",
                                        "shadow-[0_2px_12px_rgba(255,60,0,0.35)]",
                                        "hover:brightness-110 hover:shadow-[0_4px_20px_rgba(255,60,0,0.45)]",
                                        "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
                                    )}
                                >
                                    {isPending ? (
                                        <>
                                            <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Redirecting…
                                        </>
                                    ) : (
                                        <>
                                            Upgrade To Pro
                                            <svg
                                                className="h-4 w-4 opacity-90"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M5 12h14M13 6l6 6-6 6"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            ) : null}

                            {plan === "pro" && hasCustomer ? (
                                <button
                                    type="button"
                                    onClick={handleManage}
                                    disabled={isPending}
                                    className="rounded-xl border border-app-border bg-app-surface px-5 py-2.5 text-sm font-medium text-app-text transition-colors hover:bg-app-surface-hover disabled:opacity-50"
                                >
                                    {isPending
                                        ? "Opening…"
                                        : subscription?.cancelAtPeriodEnd
                                          ? "Manage Or Reactivate"
                                          : "Manage Subscription"}
                                </button>
                            ) : null}

                            {plan === "free" ? (
                                <Link
                                    href="/app"
                                    className="text-xs text-app-text-muted transition-colors hover:text-app-text"
                                >
                                    Back To App
                                </Link>
                            ) : null}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
