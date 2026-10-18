import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function CtaSection() {
    return (
        <section className="py-30">
            <Container className="flex flex-col items-center gap-10 text-center">
                <h2 className="font-display text-[42px] font-normal leading-10.5 tracking-[-1.68px] text-text-cta-heading">
                    What Are You Waiting For?
                </h2>
                <Button
                    href="/signup"
                    size="lg"
                    className="h-20 w-full max-w-cta-button font-display text-2xl font-normal"
                >
                    Get Started Free
                </Button>
            </Container>
        </section>
    );
}
