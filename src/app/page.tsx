import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { getCachedSession } from "@/lib/auth/cached";
import React from "react";

const Home = async () => {
    const session = await getCachedSession();

    const initialUser = session?.user
        ? { name: session.user.name, email: session.user.email }
        : null;

    return (
        <>
            <Navbar initialUser={initialUser} />
            <main className="min-h-[50vh]">Home</main>
            <Footer />
        </>
    );
};

export default Home;
