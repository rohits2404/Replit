import { BillingPage } from "@/components/app/dashboard/billing-page";
import React from "react";

type PageProps = {
    searchParams: Promise<{
        checkout?: string;
        session_id?: string;
        upgraded?: string;
    }>;
};

const AppDashboardUserAreaBillingPage = ({ searchParams }: PageProps) => {
    return <BillingPage searchParams={searchParams} />;
};

export default AppDashboardUserAreaBillingPage;
