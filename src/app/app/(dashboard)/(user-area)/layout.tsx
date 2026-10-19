import { UserAreaLayout } from "@/components/app/shell/user-area-layout";
import React from "react";

const AppDashboardUserAreaLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <UserAreaLayout>{children}</UserAreaLayout>;
};

export default AppDashboardUserAreaLayout;
