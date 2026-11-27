"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Award,
    Bell,
    Bookmark,
    Calendar,
    Mail,
    Megaphone,
    Plus,
    RefreshCw,
    Search,
    Send,
} from "lucide-react";

import { useSession } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const STATS = [
    {
        title: "Saved Jobs",
        value: "12",
        icon: Bookmark,
        iconColor: "text-[#d4d4d8]",
    },
    {
        title: "Applications Submitted",
        value: "24",
        icon: Send,
        iconColor: "text-[#d4d4d8]",
    },
    {
        title: "Interviews Scheduled",
        value: "3",
        icon: Calendar,
        iconColor: "text-[#f59e0b]",
    },
    {
        title: "Offers Received",
        value: "1",
        icon: Award,
        iconColor: "text-[#22c55e]",
    },
];

type ActivityItem = {
    id: string;
    type: "status" | "alert" | "message";
    time: string;
    group: number;
    prefix?: string;
    highlight?: string;
    company?: string;
    statusText?: string;
    role?: string;
    sender?: string;
};

const ACTIVITIES: ActivityItem[] = [
    {
        id: "1",
        type: "status",
        prefix: "Application for",
        role: "Senior Product Designer",
        company: "TechFlow",
        statusText: "'Under Review'",
        time: "2 hours ago",
        group: 1,
    },
    {
        id: "2",
        type: "alert",
        role: "Lead Frontend Engineer",
        company: "FinGrid",
        time: "5 hours ago",
        group: 1,
    },
    {
        id: "3",
        type: "message",
        sender: "Sarah Jenkins (Hiring Manager at CloudOps)",
        time: "1 day ago",
        group: 1,
    },
    {
        id: "4",
        type: "status",
        prefix: "Application for",
        role: "Senior Product Designer",
        company: "TechFlow",
        statusText: "'Under Review'",
        time: "2 hours ago",
        group: 2,
    },
    {
        id: "5",
        type: "alert",
        role: "Lead Frontend Engineer",
        company: "FinGrid",
        time: "5 hours ago",
        group: 2,
    },
    {
        id: "6",
        type: "message",
        sender: "Sarah Jenkins (Hiring Manager at CloudOps)",
        time: "1 day ago",
        group: 2,
    },
];

function ActivityRow({ item }: { item: ActivityItem }) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-[#1f1f24] bg-[#141418] px-4 py-3.5 transition-colors hover:border-[#2a2a31]">
            <div className="flex min-w-0 items-center gap-3.5">
                {item.type === "status" && (
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1f1f25]">
                        <RefreshCw className="size-4 text-[#d4d4d8]" aria-hidden />
                    </div>
                )}

                {item.type === "alert" && (
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#15261f]">
                        <Megaphone className="size-4 text-[#22c55e]" aria-hidden />
                    </div>
                )}

                {item.type === "message" && (
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#1f1f25]">
                        <Mail className="size-4 text-[#d4d4d8]" aria-hidden />
                    </div>
                )}

                <p className="truncate text-[13px] text-[#9797a2]">
                    {item.type === "status" && (
                        <>
                            {item.prefix}{" "}
                            <span className="font-medium text-[#ededef]">{item.role}</span>{" "}
                            at <span className="text-[#ededef]">{item.company}</span>{" "}
                            updated to{" "}
                            <span className="font-medium text-[#f59e0b]">
                                {item.statusText}
                            </span>
                        </>
                    )}

                    {item.type === "alert" && (
                        <>
                            New Job Alert:{" "}
                            <span className="font-medium text-[#ededef]">{item.role}</span>{" "}
                            at <span className="text-[#ededef]">{item.company}</span>{" "}
                            matches your profile.
                        </>
                    )}

                    {item.type === "message" && (
                        <>
                            You have a{" "}
                            <span className="font-medium text-[#ededef]">new message</span>{" "}
                            from <span className="text-[#ededef]">{item.sender}</span>.
                        </>
                    )}
                </p>
            </div>

            <span className="shrink-0 text-[12px] text-[#6e6e78]">{item.time}</span>
        </div>
    );
}

const SeekerDashboardPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [searchQuery, setSearchQuery] = useState("");

    const userName = session?.user?.name || "Seeker";
    const userImage = session?.user?.image || "";

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = searchQuery.trim();
        router.push(
            trimmed
                ? `/browse-jobs?search=${encodeURIComponent(trimmed)}`
                : "/browse-jobs"
        );
    };

    const firstGroup = ACTIVITIES.filter((a) => a.group === 1);
    const secondGroup = ACTIVITIES.filter((a) => a.group === 2);

    return (
        <div className="relative min-h-[calc(100vh-88px)] space-y-6 pb-20">
            {/* Top Search + Notification/Avatar Bar */}
            <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1d1d22] pb-4">
                <form onSubmit={handleSearch} className="relative w-full max-w-[290px]">
                    <Search
                        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#6e6e78]"
                        aria-hidden
                    />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for opportunities..."
                        aria-label="Search for opportunities"
                        className="h-9 w-full rounded-lg border border-[#242429] bg-[#141418] pl-9 pr-3 text-[13px] text-[#ededef] outline-none transition-colors placeholder:text-[#6e6e78] focus:border-[#3e3e46]"
                    />
                </form>

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        aria-label="Messages"
                        className="relative text-[#9797a2] transition-colors hover:text-[#ededef]"
                    >
                        <Mail className="size-[18px]" aria-hidden />
                        <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-[#ef4444]" />
                    </button>

                    <button
                        type="button"
                        aria-label="Notifications"
                        className="relative text-[#9797a2] transition-colors hover:text-[#ededef]"
                    >
                        <Bell className="size-[18px]" aria-hidden />
                        <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-[#22c55e]" />
                    </button>

                    <Avatar className="size-8 border border-[#27272a]">
                        <AvatarImage src={userImage} alt={userName} />
                        <AvatarFallback className="bg-[#25252b] text-[11px] font-medium text-[#ededef]">
                            {userName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </header>

            {/* 4 Stat Cards */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {STATS.map((stat) => (
                    <div
                        key={stat.title}
                        className="rounded-xl border border-[#1f1f24] bg-[#141418] p-5"
                    >
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[12px] font-medium text-[#8e8e98]">
                                {stat.title}
                            </span>
                            <stat.icon
                                className={`size-4 shrink-0 ${stat.iconColor}`}
                                aria-hidden
                            />
                        </div>

                        <p className="mt-5 text-[28px] font-semibold leading-none tracking-tight text-[#ededef]">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </section>

            {/* Recent Activity */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-[18px] font-semibold tracking-tight text-[#ededef]">
                        Recent Activity
                    </h1>

                    <Link
                        href="/dashboard/seeker/applications"
                        className="text-[12px] font-medium text-[#8e8e98] transition-colors hover:text-[#ededef]"
                    >
                        View All Activity
                    </Link>
                </div>

                <div className="space-y-2.5">
                    {firstGroup.map((item) => (
                        <ActivityRow key={item.id} item={item} />
                    ))}
                </div>

                <div className="space-y-2.5 pt-2">
                    {secondGroup.map((item) => (
                        <ActivityRow key={item.id} item={item} />
                    ))}
                </div>
            </section>

            {/* Floating Action Button */}
            <Link
                href="/browse-jobs"
                aria-label="Browse opportunities"
                className="fixed bottom-6 right-6 flex size-12 items-center justify-center rounded-full bg-white text-[#09090b] shadow-lg transition hover:bg-[#e4e4e7]"
            >
                <Plus className="size-5" aria-hidden />
            </Link>
        </div>
    );
};

export default SeekerDashboardPage;