"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    Bookmark,
    Check,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Clock,
    Code,
    Megaphone,
    Palette,
    Search,
    ShieldCheck,
    Zap,
    type LucideIcon,
} from "lucide-react";

import type { JobDoc } from "@/lib/api/jobs";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

const JOB_CATEGORIES = [
    { value: "engineering-tech", label: "Engineering & Tech" },
    { value: "design-creative", label: "Design & Creative" },
    { value: "marketing-sales", label: "Marketing & Sales" },
    { value: "finance-legal", label: "Finance & Legal" },
    { value: "operations-hr", label: "Operations & HR" },
    { value: "customer-support", label: "Customer Support" },
];

const SORT_OPTIONS = [
    { value: "", label: "Most Recent" },
    { value: "oldest", label: "Oldest First" },
    { value: "salary", label: "Highest Salary" },
];

const PAGE_SIZE = 6;

const iconByCategory: Record<string, LucideIcon> = {
    "engineering-tech": Code,
    "design-creative": Palette,
    "marketing-sales": Megaphone,
};

const fallbackIcon = ShieldCheck;

const unitByFrequency: Record<string, string> = {
    "per-hour": "hr",
    "per-day": "day",
    "per-week": "week",
    "per-month": "month",
    "per-year": "yr",
};

const formatSalary = (min: number, max: number, frequency: string | null) => {
    if (!min && !max) return null;

    if (frequency === "per-year") {
        return `$${Math.round(min / 1000)}k – $${Math.round(max / 1000)}k`;
    }

    const unit = unitByFrequency[frequency ?? "per-hour"] ?? "hr";
    return `$${min} – $${max}/${unit}`;
};

const formatCount = (count: number) => {
    if (count >= 1000) {
        const k = Math.round((count / 1000) * 10) / 10;
        return `${k}k`;
    }
    return String(count);
};

// One checkbox row in a filter section (single select within its group)
function FilterOption({
    label,
    count,
    selected,
    onClick,
}: {
    label: string;
    count: number;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={onClick}
            className="group flex w-full items-center gap-[7px] py-1 text-left"
        >
            <span
                className={`flex size-[14px] shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
                    selected
                        ? "border-white bg-white"
                        : "border-[#242429] bg-[#1a1a1f] group-hover:border-[#3a3a41]"
                }`}
            >
                {selected && (
                    <Check
                        className="size-2.5 text-[#010103]"
                        strokeWidth={3}
                        aria-hidden
                    />
                )}
            </span>

            <span className="text-[12px] leading-none text-[#9797a2] transition-colors group-hover:text-[#c9c9d1]">
                {label}
            </span>

            <span className="ml-auto text-[11px] leading-none text-[#63636c]">
                {formatCount(count)}
            </span>
        </button>
    );
}

function JobCard({ job }: { job: JobDoc }) {
    const [saved, setSaved] = useState(false);

    const Icon = iconByCategory[job.jobCategory ?? ""] ?? fallbackIcon;
    const salary = formatSalary(job.minSalary, job.maxSalary, job.frequency);
    const hotJob = (job.applicants ?? 0) >= 5;
    const easyApply = !hotJob && job.status !== "Expired";

    return (
        <article className="relative flex gap-[14px] rounded-[8px] border border-[#1b1b1e] bg-[#141418] p-4">
            {/* Stretched link: clicking anywhere on the card opens the details page */}
            <Link
                href={`/browse-jobs/${job._id}`}
                className="absolute inset-0 rounded-[8px]"
                aria-label={`View ${job.jobTitle} details`}
            />

            <div className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-[#222228]">
                <Icon className="size-5 text-[#7e8889]" aria-hidden />
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="truncate text-[15px] font-semibold leading-tight text-[#ededef]">
                            {job.jobTitle}
                        </h3>
                        <p className="mt-1.5 truncate text-[12px] text-[#6e6e78]">
                            {job.companyName} • {job.jobLocation}
                            {job.remoteAllowed ? " (Remote)" : ""}
                        </p>
                    </div>

                    <button
                        type="button"
                        aria-label={saved ? "Remove saved job" : "Save job"}
                        aria-pressed={saved}
                        onClick={() => setSaved((value) => !value)}
                        className={`relative z-10 mt-0.5 shrink-0 transition-colors ${
                            saved
                                ? "text-[#fcba45]"
                                : "text-[#7f8183] hover:text-[#c9c9d1]"
                        }`}
                    >
                        <Bookmark
                            className="size-4"
                            fill={saved ? "currentColor" : "none"}
                            aria-hidden
                        />
                    </button>
                </div>

                <div className="mt-[18px] flex flex-wrap items-center gap-2">
                    {salary && (
                        <span className="inline-flex h-5 items-center rounded-full border border-[#26262a] bg-[#1a1a1f] px-2.5 text-[11px] leading-none text-[#e0e0e2]">
                            {salary}
                        </span>
                    )}

                    <span className="inline-flex h-5 items-center gap-1.5 rounded-full border border-[#1e1e22] bg-[#1a1a1f] px-2.5 text-[11px] leading-none text-[#d2d2d5]">
                        <Clock className="size-3" aria-hidden />
                        {job.jobType}
                    </span>

                    {hotJob && (
                        <span className="inline-flex h-5 items-center rounded-full border border-[#3a2f1e] bg-[#2a2217] px-2.5 text-[11px] leading-none text-[#e8960c]">
                            Hot Job
                        </span>
                    )}

                    {easyApply && (
                        <span className="inline-flex h-5 items-center gap-1 rounded-full bg-[#15261f] px-2.5 text-[11px] leading-none text-[#22c55e]">
                            <Zap className="size-3" aria-hidden />
                            Easy Apply
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}

export default function BrowseJobsView({
    jobs,
    typeCounts,
    categoryCounts,
    remoteCount,
}: {
    jobs: JobDoc[];
    typeCounts: Record<string, number>;
    categoryCounts: Record<string, number>;
    remoteCount: number;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const search = searchParams.get("search") ?? "";
    const activeType = searchParams.get("jobType") ?? "";
    const activeCategory = searchParams.get("category") ?? "";
    const remoteOnly = searchParams.get("remoteAllowed") === "true";
    const sort = searchParams.get("sort") ?? "";

    const [searchInput, setSearchInput] = useState(search);
    const [page, setPage] = useState(1);

    // Keep the input in sync when the URL changes (back/forward, link)
    useEffect(() => {
        setSearchInput(search);
    }, [search]);

    // Start over at page 1 whenever the query changes
    useEffect(() => {
        setPage(1);
    }, [search, activeType, activeCategory, remoteOnly, sort]);

    // URL params are the single source of truth for search/filter/sort
    const navigate = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());

        for (const [key, value] of Object.entries(updates)) {
            if (value === null || value === "") params.delete(key);
            else params.set(key, value);
        }

        const qs = params.toString();
        router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    };

    const pageCount = Math.max(1, Math.ceil(jobs.length / PAGE_SIZE));
    const currentPage = Math.min(page, pageCount);
    const visibleJobs = jobs.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const pageItems: (number | string)[] = [];
    if (pageCount <= 7) {
        for (let i = 1; i <= pageCount; i++) pageItems.push(i);
    } else {
        pageItems.push(1);
        if (currentPage > 4) pageItems.push("…");
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(pageCount - 1, currentPage + 1);
        for (let i = start; i <= end; i++) pageItems.push(i);
        if (currentPage < pageCount - 3) pageItems.push("…");
        pageItems.push(pageCount);
    }

    return (
        <>
            {/* Search band */}
            <div className="mx-auto w-full max-w-[1296px] px-4 sm:px-6 lg:px-[45px]">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        navigate({ search: searchInput.trim() || null });
                    }}
                    className="flex flex-col gap-3 rounded-[8px] border border-[#1e1e22] bg-[#141418] p-4 sm:flex-row sm:items-center sm:gap-4"
                >
                    <div className="relative min-w-0 flex-1">
                        <Search
                            className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#8e9192]"
                            aria-hidden
                        />
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(event) => setSearchInput(event.target.value)}
                            placeholder="Search by job title, keywords..."
                            aria-label="Search jobs"
                            className="h-[38px] w-full rounded-[8px] border border-[#242429] bg-[#1a1a1f] pl-[29px] pr-3 text-[13px] text-[#ededef] outline-none transition-colors placeholder:text-[#8f8f99] focus:border-[#5c53fe]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="h-[38px] shrink-0 rounded-[8px] bg-white px-4 text-[13px] font-medium text-[#2f3131] transition-colors hover:bg-[#e9e9ea] sm:w-[91px] sm:px-0"
                    >
                        Search Jobs
                    </button>
                </form>
            </div>

            {/* Filters + results */}
            <main className="mx-auto mt-[15px] flex w-full max-w-[1296px] flex-col gap-[19px] px-4 pb-10 sm:px-6 lg:flex-row lg:px-[45px]">
                {/* Filter panel — single select */}
                <aside className="shrink-0 rounded-[8px] border border-[#1e1e22] bg-[#141418] p-4 lg:w-[189px]">
                    <h2 className="text-[16px] font-semibold leading-none text-[#ededef]">
                        Filters
                    </h2>

                    <h3 className="mt-[22px] text-[13px] font-medium leading-none text-[#ededef]">
                        Job Type
                    </h3>

                    <div
                        role="radiogroup"
                        aria-label="Job Type"
                        className="mt-[13px] flex flex-col"
                    >
                        {JOB_TYPES.map((type) => (
                            <FilterOption
                                key={type}
                                label={type}
                                count={typeCounts[type] ?? 0}
                                selected={activeType === type}
                                onClick={() =>
                                    navigate({
                                        jobType:
                                            activeType === type ? null : type,
                                    })
                                }
                            />
                        ))}
                    </div>

                    <h3 className="mt-[22px] text-[13px] font-medium leading-none text-[#ededef]">
                        Job Category
                    </h3>

                    <div
                        role="radiogroup"
                        aria-label="Job Category"
                        className="mt-[13px] flex flex-col"
                    >
                        {JOB_CATEGORIES.map((category) => (
                            <FilterOption
                                key={category.value}
                                label={category.label}
                                count={categoryCounts[category.value] ?? 0}
                                selected={activeCategory === category.value}
                                onClick={() =>
                                    navigate({
                                        category:
                                            activeCategory === category.value
                                                ? null
                                                : category.value,
                                    })
                                }
                            />
                        ))}
                    </div>

                    <h3 className="mt-[22px] text-[13px] font-medium leading-none text-[#ededef]">
                        Work Arrangement
                    </h3>

                    <div
                        role="radiogroup"
                        aria-label="Work Arrangement"
                        className="mt-[13px] flex flex-col"
                    >
                        <FilterOption
                            label="Remote Only"
                            count={remoteCount}
                            selected={remoteOnly}
                            onClick={() =>
                                navigate({
                                    remoteAllowed: remoteOnly ? null : "true",
                                })
                            }
                        />
                    </div>
                </aside>

                {/* Results column */}
                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex h-6 flex-wrap items-center justify-between gap-3">
                        <h1 className="text-[15px] font-semibold text-[#ededef] sm:text-[16px]">
                            Found{" "}
                            {jobs.length.toLocaleString("en-US")} Professional Jobs
                        </h1>

                        <div className="flex items-center gap-2">
                            <span className="text-[12px] text-[#686871]">
                                Sort by:
                            </span>

                            <div className="relative">
                                <select
                                    value={sort}
                                    onChange={(event) =>
                                        navigate({
                                            sort: event.target.value || null,
                                        })
                                    }
                                    aria-label="Sort jobs"
                                    className="h-6 cursor-pointer appearance-none rounded-[6px] border border-[#18181b] bg-[#0c0c0f] pl-2 pr-6 text-[12px] text-[#ededef] outline-none transition-colors focus:border-[#2e2e33]"
                                >
                                    {SORT_OPTIONS.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                            className="bg-[#141418] text-[#ededef]"
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>

                                <ChevronDown
                                    className="pointer-events-none absolute right-1.5 top-1/2 size-3 -translate-y-1/2 text-[#a7a7a9]"
                                    aria-hidden
                                />
                            </div>
                        </div>
                    </div>

                    {jobs.length === 0 ? (
                        <div className="mt-[15px] rounded-[8px] border border-[#1b1b1e] bg-[#141418] px-6 py-12 text-center">
                            <p className="text-[15px] font-semibold text-[#ededef]">
                                No jobs found
                            </p>
                            <p className="mt-2 text-[13px] text-[#6e6e78]">
                                Try a different search or clear your filters.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="mt-[15px] flex flex-col gap-2.5">
                                {visibleJobs.map((job) => (
                                    <JobCard key={job._id} job={job} />
                                ))}
                            </div>

                            {pageCount > 1 && (
                                <nav
                                    aria-label="Pagination"
                                    className="mt-7 flex items-center justify-center gap-0.5 text-[13px]"
                                >
                                    <button
                                        type="button"
                                        aria-label="Previous page"
                                        disabled={currentPage <= 1}
                                        onClick={() =>
                                            setPage(Math.max(1, currentPage - 1))
                                        }
                                        className="flex size-5 items-center justify-center text-[#c4c7c8] transition-colors hover:text-white disabled:opacity-40"
                                    >
                                        <ChevronLeft
                                            className="size-4"
                                            aria-hidden
                                        />
                                    </button>

                                    {pageItems.map((item, index) =>
                                        typeof item === "number" ? (
                                            <button
                                                key={`${item}-${index}`}
                                                type="button"
                                                aria-current={
                                                    item === currentPage
                                                        ? "page"
                                                        : undefined
                                                }
                                                onClick={() => setPage(item)}
                                                className={`flex size-5 items-center justify-center rounded-md transition-colors ${
                                                    item === currentPage
                                                        ? "text-white"
                                                        : "text-[#83838d] hover:text-white"
                                                }`}
                                            >
                                                {item}
                                            </button>
                                        ) : (
                                            <span
                                                key={`${item}-${index}`}
                                                className="flex size-5 items-center justify-center text-[#83838d]"
                                            >
                                                {item}
                                            </span>
                                        )
                                    )}

                                    <button
                                        type="button"
                                        aria-label="Next page"
                                        disabled={currentPage >= pageCount}
                                        onClick={() =>
                                            setPage(
                                                Math.min(
                                                    pageCount,
                                                    currentPage + 1
                                                )
                                            )
                                        }
                                        className="flex size-5 items-center justify-center text-[#c4c7c8] transition-colors hover:text-white disabled:opacity-40"
                                    >
                                        <ChevronRight
                                            className="size-4"
                                            aria-hidden
                                        />
                                    </button>
                                </nav>
                            )}
                        </>
                    )}
                </div>
            </main>
        </>
    );
}