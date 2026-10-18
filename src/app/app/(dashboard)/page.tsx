import { AppHome } from "@/components/app/home/app-home";
import { getCachedSession } from "@/lib/auth/cached";
import React from "react";

const AppDashboardPage = async () => {
    const session = await getCachedSession();

    return (
        <AppHome
            user={{
                name: session?.user?.name,
                email: session?.user?.email,
                image: session?.user?.image,
            }}
        />
    );
};

export default AppDashboardPage;
