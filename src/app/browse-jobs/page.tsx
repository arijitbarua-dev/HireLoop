import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import { getJobs } from "@/lib/actions/jobs";
import BrowseJobsView from "../components/BrowseJobsView";
import type { JobDoc } from "@/lib/api/jobs";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// Reads the URL, fetches the matching jobs + facet counts for the filter panel
async function BrowseJobsContent({ searchParams }: { searchParams: SearchParams }) {
    const search = await searchParams;
    const urlSearch = new URLSearchParams(search as Record<string, string>);
    const query = urlSearch.toString();
    console.log("Search Params:", query);

    const jobs = await getJobs(query);
    const allJobs = await getJobs("");

    const jobList: JobDoc[] =
        jobs.success && Array.isArray(jobs.data) ? jobs.data : [];
    const allList: JobDoc[] =
        allJobs.success && Array.isArray(allJobs.data) ? allJobs.data : [];

    // How many jobs exist for each type/category/arrangement (shown next to
    // the filter options, computed over the unfiltered set)
    const typeCounts: Record<string, number> = {};
    const categoryCounts: Record<string, number> = {};
    let remoteCount = 0;

    for (const doc of allList) {
        const type = doc.jobType || "Other";
        typeCounts[type] = (typeCounts[type] ?? 0) + 1;

        const category = doc.jobCategory || "Other";
        categoryCounts[category] = (categoryCounts[category] ?? 0) + 1;

        if (doc.remoteAllowed) remoteCount += 1;
    }

    return (
        <BrowseJobsView
            jobs={jobList}
            typeCounts={typeCounts}
            categoryCounts={categoryCounts}
            remoteCount={remoteCount}
        />
    );
}

function BrowseJobsFallback() {
    return (
        <div className="mx-auto w-full max-w-[1296px] px-4 sm:px-6 lg:px-[45px]">
            <div className="h-[70px] animate-pulse rounded-[8px] border border-[#1e1e22] bg-[#141418]" />

            <div className="mt-[15px] flex flex-col gap-[19px] lg:flex-row">
                <div className="h-[430px] shrink-0 animate-pulse rounded-[8px] border border-[#1e1e22] bg-[#141418] lg:w-[189px]" />

                <div className="min-w-0 flex-1 space-y-2.5">
                    <div className="h-6 w-56 animate-pulse rounded bg-[#141418]" />
                    <div className="h-[116px] animate-pulse rounded-[8px] border border-[#1b1b1e] bg-[#141418]" />
                    <div className="h-[116px] animate-pulse rounded-[8px] border border-[#1b1b1e] bg-[#141418]" />
                </div>
            </div>
        </div>
    );
}

export default function BrowseJobsPage({ searchParams }: { searchParams: SearchParams }) {
    return (
        <div className="min-h-screen bg-[#08080a]">
            <Navbar />

            {/* Uncached, searchParams-driven reads stream behind this boundary */}
            <Suspense fallback={<BrowseJobsFallback />}>
                <BrowseJobsContent searchParams={searchParams} />
            </Suspense>
        </div>
    );
}