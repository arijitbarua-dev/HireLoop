
'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import {
    Bookmark,
    Briefcase,
    Building2,
    CreditCard,
    FileText,
    LayoutDashboard,
    LogOut,
    Settings,
    Users,
    Wallet,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

type Role = "seeker" | "recruiter" | "admin";

type MenuItem = {
    id: string;
    name: string;
    url: string;
    icon: LucideIcon;
};

const menuItemsByRole: Record<Role, MenuItem[]> = {
    seeker: [
        { id: "dashboard", name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
        { id: "jobs", name: "Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
        { id: "saved-jobs", name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
        { id: "applications", name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
        { id: "billing", name: "Billing", url: "/dashboard/seeker/billing", icon: CreditCard },
        { id: "settings", name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
    ],

    recruiter: [
        { id: "dashboard", name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
        { id: "manage-jobs", name: "Manage Jobs", url: "/dashboard/recruiter/manage-jobs", icon: Briefcase },
        { id: "applications", name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
        { id: "settings", name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
    ],

    admin: [
        { id: "dashboard", name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
        { id: "users", name: "Users", url: "/dashboard/admin/users", icon: Users },
        { id: "companies", name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
        { id: "jobs", name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
        { id: "payments", name: "Payments", url: "/dashboard/admin/payments", icon: Wallet },
        { id: "settings", name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
    ],
};

export function DashboardSidebar() {
    const { data: session, isPending } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    const user = session?.user;

    const role = (user?.role || "seeker") as Role;

    const menuItems = menuItemsByRole[role] ?? menuItemsByRole.seeker;

    const userName = user?.name || "User";
    const userImage = user?.image || "";
    const userRole = role.charAt(0).toUpperCase() + role.slice(1);

    const handleSignOut = async () => {
        await authClient.signOut();
        router.replace("/signin");
        router.refresh();
    };

    return (
        <Sidebar
            collapsible="icon"
            className="border-r border-[#222225] bg-[#09090b]"
        >
            {/* Logo */}
            <SidebarHeader className="px-4 py-5">
                <Link href={`/dashboard/${role}`} className="flex items-center">
                    <Image
                        src="/images/logo.png"
                        alt="HireLoop"
                        width={120}
                        height={36}
                        priority
                        className="h-8 w-auto object-contain"
                    />
                </Link>

                {/* User Profile */}
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#27272a] bg-[#151518] p-2.5 group-data-[collapsible=icon]:hidden">
                    <Avatar className="h-9 w-9 shrink-0">
                        <AvatarImage src={userImage} alt={userName} />
                        <AvatarFallback className="bg-[#29292e] text-xs text-white">
                            {userName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-white">
                            {isPending ? "Loading..." : userName}
                        </p>

                        <p className="mt-0.5 text-[10px] text-[#92929b]">
                            {userRole}
                        </p>

                        <span className="mt-1 inline-flex rounded-full border border-[#493b9a] bg-[#27205b]/50 px-2 py-0.5 text-[9px] font-medium text-[#a99aff]">
                            Premium account
                        </span>
                    </div>
                </div>
            </SidebarHeader>

            {/* Navigation */}
            <SidebarContent className="px-2 pt-1">
                <SidebarGroup className="p-0">
                    <SidebarMenu className="gap-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.url ||
                                (item.id !== "dashboard" && pathname.startsWith(`${item.url}/`));

                            return (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        render={<Link href={item.url} />}
                                        isActive={isActive}
                                        tooltip={item.name}
                                        className="h-9 text-xs text-[#a1a1aa] hover:bg-[#222226] hover:text-white data-[active=true]:bg-[#25252b] data-[active=true]:text-white"
                                    >
                                        <item.icon className="size-4 shrink-0" />
                                        <span>{item.name}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="px-2 pb-4">
                <SidebarGroup className="p-0">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={handleSignOut}
                                tooltip="Sign Out"
                                className="h-9 text-xs text-[#a1a1aa] hover:bg-[#222226] hover:text-white"
                            >
                                <LogOut className="size-4 shrink-0" />
                                <span>Sign Out</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
    );
}