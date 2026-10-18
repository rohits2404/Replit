import type { Metadata } from "next";
import "./globals.css";
import { RootProviders } from "@/components/root-providers";

export const metadata: Metadata = {
    title: "Replit - Build Apps And Sites With AI",
    description:
        "Turn Ideas Into Apps In Minutes. Replit Agent Writes Production-Ready Code, Evolves It, And Stays Out Of Your Way.",
    openGraph: {
        title: "Replit - Build Apps And Sites With AI",
        description: "Turn Ideas Into Apps In Minutes - No Coding Needed.",
        type: "website",
    },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className="h-full antialiased">
            <body className="min-h-full flex flex-col">
                <RootProviders>{children}</RootProviders>
            </body>
        </html>
    );
}
