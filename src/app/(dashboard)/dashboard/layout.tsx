
import { DashboardSidebar } from "@/app/components/DashboardSidebar";

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";

const DashboardLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />

            <SidebarInset className="min-w-0 bg-[#0e0e10]">
                {/* Top Header */}
                <header className="flex h-11 shrink-0 items-center gap-3 border-b border-[#242427] bg-[#0e0e10] px-4">
                    <SidebarTrigger className="text-[#a1a1aa] hover:text-white" />
                    <Separator
                        orientation="vertical"
                        className="h-4 bg-[#333338]"
                    />
                </header>

                <main className="min-w-0 flex-1 overflow-x-hidden p-4 md:p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default DashboardLayout;