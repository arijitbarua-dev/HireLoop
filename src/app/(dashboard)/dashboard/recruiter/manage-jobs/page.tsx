import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { getJob, type JobDoc } from "@/lib/api/jobs";
import ManageJobsTable, { type JobRow } from "@/app/components/ManageJobsTable";

const categoryLabels: Record<string, string> = {
    "engineering-tech": "Engineering",
    "design-creative": "Design",
    "marketing-sales": "Marketing",
    "finance-legal": "Finance",
    "operations-hr": "Operations",
    "customer-support": "Support",
};

const unitByFrequency: Record<string, string> = {
    "per-hour": "hr",
    "per-day": "day",
    "per-week": "week",
    "per-month": "month",
    "per-year": "yr",
};

const formatCompensation = (
    min: number,
    max: number,
    frequency: string | null
) => {
    if (!min && !max) return "—";

    if (frequency === "per-year") {
        return `€${Math.round(min / 1000)}K – €${Math.round(max / 1000)}K / yr`;
    }

    const unit = unitByFrequency[frequency ?? "per-hour"] ?? "hr";
    return `€${min} – €${max} / ${unit}`;
};

const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);

    if (Number.isNaN(date.getTime())) return "—";

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
};

const formatPosted = (postedAt: string) => {
    const posted = new Date(postedAt).getTime();

    if (Number.isNaN(posted)) return "";

    const diffDays = Math.max(
        0,
        Math.floor((Date.now() - posted) / (1000 * 60 * 60 * 24))
    );

    if (diffDays === 0) return "Posted today";
    if (diffDays < 7) return `Posted ${diffDays}d ago`;
    if (diffDays < 30) return `Posted ${Math.floor(diffDays / 7)}w ago`;
    return `Posted ${Math.floor(diffDays / 30)}mo ago`;
};

const toRow = (doc: JobDoc): JobRow => ({
    id: doc._id,
    title: doc.jobTitle,
    dept: categoryLabels[doc.jobCategory ?? ""] ?? doc.jobCategory ?? "General",
    category: doc.jobCategory ?? "",
    company: doc.companyName,
    location: doc.remoteAllowed && !/^remote/i.test(doc.jobLocation)
        ? `Remote (${doc.jobLocation})`
        : doc.jobLocation,
    type: doc.jobType,
    compensation: formatCompensation(
        doc.minSalary,
        doc.maxSalary,
        doc.frequency
    ),
    candidates: doc.applicants ?? 0,
    status: doc.status === "Expired" ? "Expired" : "Active",
    deadline: formatDeadline(doc.deadline),
    posted: formatPosted(doc.postedAt),
});

// Streams the job listings so the page shell renders instantly
const JobsSection = async () => {
    const docs = await getJob();
    const jobs = docs.map(toRow);

    return <ManageJobsTable jobs={jobs} />;
};

const TableSkeleton = () => (
    <section className="overflow-hidden rounded-xl border border-[#262629] bg-[#151518]">
        <div className="h-10 border-b border-[#27272a] bg-[#1c1c20]" />

        {[0, 1, 2, 3].map((row) => (
            <div
                key={row}
                className="flex items-center gap-4 border-b border-[#27272a] px-5 py-4 last:border-0"
            >
                <div className="h-8 w-8 animate-pulse rounded-lg bg-[#25252a]" />

                <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/4 animate-pulse rounded bg-[#25252a]" />
                    <div className="h-2.5 w-1/3 animate-pulse rounded bg-[#25252a]" />
                </div>
            </div>
        ))}
    </section>
);

const ManageJobsPage = () => {
    return (
        <div className="relative min-h-[calc(100vh-88px)] space-y-5 pb-20">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[11px]">
                <Link
                    href="/dashboard/recruiter/manage-jobs"
                    className="text-[#85858f] transition hover:text-[#d4d4d8]"
                >
                    Manage Jobs
                </Link>
            </nav>

            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                    <h1 className="text-xl font-semibold tracking-tight text-[#e4e4e7] sm:text-2xl">
                        Manage Job Posts
                    </h1>

                    <p className="mt-1 text-xs text-[#85858f] sm:text-[13px]">
                        Review live listings, monitor applicants, and update
                        job details across your organization.
                    </p>
                </div>

                <Link
                    href="/dashboard/recruiter/manage-jobs/add-job"
                    aria-label="Create new job post"
                    className="inline-flex h-9 w-full shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#6d5ae0] px-2.5 text-sm font-medium text-white transition-colors hover:bg-[#5b48d6] sm:w-auto"
                >
                    <Plus className="size-4" />
                    New Job Post
                </Link>
            </div>

            {/* Jobs Table */}
            <Suspense fallback={<TableSkeleton />}>
                <JobsSection />
            </Suspense>

        </div>
    );
};

export default ManageJobsPage;