"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Bell,
    Briefcase,
    ChevronLeft,
    ChevronRight,
    Code2,
    Download,
    Mail,
    Megaphone,
    Palette,
    Search,
    type LucideIcon,
} from "lucide-react";

import { useSession } from "@/lib/auth-client";
import {
    getSeekerApplications,
    type SeekerApplication,
    type SeekerStats,
} from "@/lib/actions/jobs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DEFAULT_STATS: SeekerStats = {
    savedJobs: 0,
    totalApplied: 0,
    shortlisted: 0,
    interviews: 0,
    offers: 0,
    successRate: 0,
};

const PAGE_SIZE = 5;

const iconByCategory: Record<string, LucideIcon> = {
    "engineering-tech": Code2,
    "design-creative": Palette,
    "marketing-sales": Megaphone,
};

const STATUS_STYLES: Record<string, string> = {
    Applied: "border-[#2c2c34] bg-[#1f1f25] text-[#9797a2]",
    Pending: "border-[#2c2c34] bg-[#1f1f25] text-[#9797a2]",
    Review: "border-[#664611] bg-[#2a1f0d] text-[#f59e0b]",
    "Under Review": "border-[#664611] bg-[#2a1f0d] text-[#f59e0b]",
    Shortlisted: "border-[#1e3a5f] bg-[#132238] text-[#60a5fa]",
    Interview: "border-[#5141a1] bg-[#292052]/50 text-[#a99aff]",
    Interviewing: "border-[#5141a1] bg-[#292052]/50 text-[#a99aff]",
    Rejected: "border-[#5c1d1d] bg-[#2a1212] text-[#f87171]",
    Offered: "border-[#194a2e] bg-[#10291b] text-[#22c55e]",
};

function formatRelativeTime(isoDate: string): string {
    const time = new Date(isoDate).getTime();
    if (Number.isNaN(time)) return "Recently";

    const diffSeconds = Math.max(0, Math.floor((Date.now() - time) / 1000));
    if (diffSeconds < 60) return "Just now";
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
    const diffWeeks = Math.floor(diffDays / 7);
    return `${diffWeeks} ${diffWeeks === 1 ? "week" : "weeks"} ago`;
}

export const ApplicationPage = () => {
    const { data: session, isPending: isSessionPending } = useSession();
    const [searchQuery, setSearchQuery] = useState("");
    const [tab, setTab] = useState<"active" | "archived">("active");
    const [currentPage, setCurrentPage] = useState(1);

    const [applications, setApplications] = useState<SeekerApplication[]>([]);
    const [stats, setStats] = useState<SeekerStats>(DEFAULT_STATS);
    const [fetched, setFetched] = useState(false);

    const userName = session?.user?.name || "Seeker";
    const userImage = session?.user?.image || "";
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;

    const loading = isSessionPending || ((Boolean(userId) || Boolean(userEmail)) && !fetched);

    useEffect(() => {
        if (isSessionPending || (!userId && !userEmail)) return;

        let cancelled = false;
        getSeekerApplications(userId, userEmail).then((res) => {
            if (cancelled) return;
            if (res.success && res.data) {
                setApplications(res.data.applications);
                setStats(res.data.stats);
            }
            setFetched(true);
        });

        return () => {
            cancelled = true;
        };
    }, [isSessionPending, userId, userEmail]);

    const filtered = applications.filter((item) => {
        const isArchived = Boolean(item.archived) || item.status === "Rejected";
        const matchesTab = tab === "archived" ? isArchived : !isArchived;
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
            !q ||
            item.jobTitle.toLowerCase().includes(q) ||
            item.companyName.toLowerCase().includes(q) ||
            item.status.toLowerCase().includes(q);
        return matchesTab && matchesSearch;
    });

    const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(currentPage, pageCount);
    const startIdx = (safePage - 1) * PAGE_SIZE;
    const visibleApps = filtered.slice(startIdx, startIdx + PAGE_SIZE);

    const statCards = [
        { label: "Total Applied", value: String(stats.totalApplied), valueClass: "text-[#ededef]" },
        { label: "Shortlisted", value: String(stats.shortlisted), valueClass: "text-[#ededef]" },
        { label: "Interviews", value: String(stats.interviews), valueClass: "text-[#f59e0b]" },
        { label: "Success Rate", value: `${stats.successRate}%`, valueClass: "text-[#22c55e]" },
    ];

    return (
        <div className="space-y-6 pb-10">
            {/* Top Search + Notification/Avatar Bar */}
            <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1d1d22] pb-4">
                <div className="relative w-full max-w-[290px]">
                    <Search
                        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#6e6e78]"
                        aria-hidden
                    />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Search applications..."
                        aria-label="Search applications"
                        className="h-9 w-full rounded-lg border border-[#242429] bg-[#141418] pl-9 pr-3 text-[13px] text-[#ededef] outline-none transition-colors placeholder:text-[#6e6e78] focus:border-[#3e3e46]"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        aria-label="Notifications"
                        className="text-[#9797a2] transition-colors hover:text-[#ededef]"
                    >
                        <Bell className="size-[18px]" aria-hidden />
                    </button>

                    <button
                        type="button"
                        aria-label="Messages"
                        className="text-[#9797a2] transition-colors hover:text-[#ededef]"
                    >
                        <Mail className="size-[18px]" aria-hidden />
                    </button>

                    <Avatar className="size-8 border border-[#27272a]">
                        <AvatarImage src={userImage} alt={userName} />
                        <AvatarFallback className="bg-[#25252b] text-[11px] font-medium text-[#ededef]">
                            {userName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </header>

            {/* Page Title + Active/Archived + Export PDF */}
            <section className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-[22px] font-semibold tracking-tight text-[#ededef]">
                        My Applications
                    </h1>
                    <p className="mt-1 text-[12px] text-[#8e8e98]">
                        Track your job applications and interview progress in real-time.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div
                        role="tablist"
                        aria-label="Application status filter"
                        className="inline-flex rounded-lg border border-[#242429] bg-[#141418] p-1"
                    >
                        <button
                            type="button"
                            role="tab"
                            aria-selected={tab === "active"}
                            onClick={() => {
                                setTab("active");
                                setCurrentPage(1);
                            }}
                            className={`rounded-md px-3.5 py-1 text-[12px] font-medium transition-colors ${
                                tab === "active"
                                    ? "bg-[#222228] text-[#ededef]"
                                    : "text-[#8e8e98] hover:text-[#ededef]"
                            }`}
                        >
                            Active
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected={tab === "archived"}
                            onClick={() => {
                                setTab("archived");
                                setCurrentPage(1);
                            }}
                            className={`rounded-md px-3.5 py-1 text-[12px] font-medium transition-colors ${
                                tab === "archived"
                                    ? "bg-[#222228] text-[#ededef]"
                                    : "text-[#8e8e98] hover:text-[#ededef]"
                            }`}
                        >
                            Archived
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => window.print()}
                        className="inline-flex h-9 items-center gap-2 rounded-lg bg-white px-3.5 text-[12px] font-medium text-[#09090b] transition-colors hover:bg-[#e4e4e7]"
                    >
                        <Download className="size-3.5" aria-hidden />
                        Export PDF
                    </button>
                </div>
            </section>

            {/* 4 Stat Cards */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {statCards.map((stat) => (
                    <div
                        key={stat.label}
                        className="rounded-xl border border-[#1f1f24] bg-[#141418] p-5"
                    >
                        <p className="text-[12px] font-medium text-[#8e8e98]">
                            {stat.label}
                        </p>
                        <p
                            className={`mt-2.5 text-[28px] font-semibold leading-none tracking-tight ${stat.valueClass}`}
                        >
                            {loading ? "—" : stat.value}
                        </p>
                    </div>
                ))}
            </section>

            {/* Applications Table */}
            <section className="overflow-hidden rounded-xl border border-[#1f1f24] bg-[#141418]">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[680px] text-left">
                        <thead>
                            <tr className="border-b border-[#1f1f24] text-[11px] font-medium text-[#6e6e78]">
                                <th className="px-5 py-3.5 font-medium">Job Title</th>
                                <th className="px-5 py-3.5 font-medium">Company</th>
                                <th className="px-5 py-3.5 font-medium">Applied</th>
                                <th className="px-5 py-3.5 font-medium">Status</th>
                                <th className="px-5 py-3.5 text-right font-medium">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#1f1f24]">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-5 py-10 text-center text-[13px] text-[#6e6e78]"
                                    >
                                        Loading applications...
                                    </td>
                                </tr>
                            ) : visibleApps.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-5 py-10 text-center text-[13px] text-[#6e6e78]"
                                    >
                                        No applications found.
                                    </td>
                                </tr>
                            ) : (
                                visibleApps.map((app) => {
                                    const Icon =
                                        iconByCategory[app.jobCategory ?? ""] ?? Briefcase;
                                    const displayStatus =
                                        app.status === "Pending" ? "Applied" : app.status;
                                    const statusClass =
                                        STATUS_STYLES[app.status] ?? STATUS_STYLES.Applied;

                                    return (
                                        <tr
                                            key={app._id}
                                            className="transition-colors hover:bg-[#18181d]"
                                        >
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-3.5">
                                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#222228]">
                                                        <Icon
                                                            className="size-4 text-[#d4d4d8]"
                                                            aria-hidden
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-[13px] font-medium text-[#ededef]">
                                                            {app.jobTitle}
                                                        </p>
                                                        <p className="mt-0.5 text-[11px] text-[#6e6e78]">
                                                            {app.jobType} •{" "}
                                                            {app.remoteAllowed
                                                                ? "Remote"
                                                                : app.jobLocation}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-3.5 text-[13px] text-[#c9c9d1]">
                                                {app.companyName}
                                            </td>

                                            <td className="px-5 py-3.5 text-[12px] text-[#8e8e98]">
                                                {formatRelativeTime(app.appliedAt)}
                                            </td>

                                            <td className="px-5 py-3.5">
                                                <span
                                                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusClass}`}
                                                >
                                                    {displayStatus}
                                                </span>
                                            </td>

                                            <td className="px-5 py-3.5 text-right">
                                                <Link
                                                    href={`/browse-jobs/${app.jobId}`}
                                                    className="text-[12px] font-medium text-[#c9c9d1] transition-colors hover:text-white"
                                                >
                                                    Details
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1f1f24] px-5 py-3.5">
                    <p className="text-[12px] text-[#6e6e78]">
                        Showing{" "}
                        {filtered.length === 0
                            ? 0
                            : `${startIdx + 1}-${startIdx + visibleApps.length}`}{" "}
                        of {filtered.length} applications
                    </p>

                    <nav aria-label="Pagination" className="flex items-center gap-1.5">
                        <button
                            type="button"
                            aria-label="Previous page"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={safePage <= 1}
                            className="flex size-7 items-center justify-center rounded-md border border-[#242429] bg-[#1a1a1f] text-[#8e8e98] transition-colors hover:text-white disabled:opacity-40"
                        >
                            <ChevronLeft className="size-3.5" aria-hidden />
                        </button>

                        {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                            (page) => (
                                <button
                                    key={page}
                                    type="button"
                                    aria-current={safePage === page ? "page" : undefined}
                                    onClick={() => setCurrentPage(page)}
                                    className={`flex size-7 items-center justify-center rounded-md text-[12px] font-medium transition-colors ${
                                        safePage === page
                                            ? "bg-white font-semibold text-[#09090b]"
                                            : "border border-[#242429] bg-[#1a1a1f] text-[#8e8e98] hover:text-white"
                                    }`}
                                >
                                    {page}
                                </button>
                            )
                        )}

                        <button
                            type="button"
                            aria-label="Next page"
                            onClick={() =>
                                setCurrentPage((p) => Math.min(pageCount, p + 1))
                            }
                            disabled={safePage >= pageCount}
                            className="flex size-7 items-center justify-center rounded-md border border-[#242429] bg-[#1a1a1f] text-[#8e8e98] transition-colors hover:text-white disabled:opacity-40"
                        >
                            <ChevronRight className="size-3.5" aria-hidden />
                        </button>
                    </nav>
                </div>
            </section>
        </div>
    );
};

export default ApplicationPage;