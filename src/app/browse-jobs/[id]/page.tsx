import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { getJobById } from "@/lib/actions/jobs";
import JobDetailsView from "@/app/components/JobDetailsView";
import type { JobDoc } from "@/lib/api/jobs";

type Params = Promise<{ id: string }>;

async function JobDetailsContent({ params }: { params: Params }) {
    const { id } = await params;
    const result = await getJobById(id);

    if (!result.success || !result.data) {
        return (
            <main className="mx-auto w-full max-w-[1296px] px-4 py-12 sm:px-6 lg:px-[45px]">
                <div className="rounded-[8px] border border-[#1e1e22] bg-[#141418] p-8 text-center">
                    <h1 className="text-[18px] font-semibold text-[#ededef]">
                        Job not found
                    </h1>
                    <p className="mt-2 text-[13px] text-[#6e6e78]">
                        This job posting may have been removed or is no longer available.
                    </p>
                    <Link
                        href="/browse-jobs"
                        className="mt-5 inline-flex h-9 items-center justify-center rounded-[8px] bg-white px-4 text-[13px] font-medium text-[#111114] transition-colors hover:bg-[#e9e9ea]"
                    >
                        Back to Browse Jobs
                    </Link>
                </div>
            </main>
        );
    }

    return <JobDetailsView job={result.data as JobDoc} />;
}

function JobDetailsFallback() {
    return (
        <div className="mx-auto w-full max-w-[1296px] px-4 pt-2 sm:px-6 lg:px-[45px]">
            <div className="h-[104px] animate-pulse rounded-[8px] border border-[#1e1e22] bg-[#141418]" />

            <div className="mt-4 flex flex-col gap-4 lg:flex-row">
                <div className="min-w-0 flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div className="h-[92px] animate-pulse rounded-[8px] border border-[#1e1e22] bg-[#141418]" />
                        <div className="h-[92px] animate-pulse rounded-[8px] border border-[#1e1e22] bg-[#141418]" />
                        <div className="h-[92px] animate-pulse rounded-[8px] border border-[#1e1e22] bg-[#141418]" />
                        <div className="h-[92px] animate-pulse rounded-[8px] border border-[#1e1e22] bg-[#141418]" />
                    </div>
                    <div className="h-[480px] animate-pulse rounded-[8px] border border-[#1e1e22] bg-[#141418]" />
                </div>
                <div className="h-[340px] w-full shrink-0 animate-pulse rounded-[8px] border border-[#1e1e22] bg-[#141418] lg:w-[300px]" />
            </div>
        </div>
    );
}

export default function JobDetailsPage({ params }: { params: Params }) {
    return (
        <div className="min-h-screen bg-[#08080a]">
            <Navbar />

            <Suspense fallback={<JobDetailsFallback />}>
                <JobDetailsContent params={params} />
            </Suspense>
        </div>
    );
}