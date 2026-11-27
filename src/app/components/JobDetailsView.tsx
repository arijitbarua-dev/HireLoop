"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    BadgeCheck,
    Banknote,
    BarChart3,
    Bookmark,
    Check,
    CircleDollarSign,
    Clock,
    Code,
    Code2,
    Laptop,
    Layers,
    Loader2,
    MapPin,
    Megaphone,
    Palette,
    PenTool,
    ShieldCheck,
    Terminal,
    Umbrella,
    type LucideIcon,
} from "lucide-react";

import { useSession } from "@/lib/auth-client";
import { applyToJob, checkJobApplication } from "@/lib/actions/applications";
import type { JobDoc } from "@/lib/api/jobs";

const iconByCategory: Record<string, LucideIcon> = {
    "engineering-tech": Code,
    "design-creative": Palette,
    "marketing-sales": Megaphone,
};

const categoryLabelMap: Record<string, string> = {
    "engineering-tech": "Engineering & Tech",
    "design-creative": "Design & Creative",
    "marketing-sales": "Marketing & Sales",
    "finance-legal": "Finance & Legal",
    "operations-hr": "Operations & HR",
    "customer-support": "Customer Support",
};

const unitByFrequency: Record<string, string> = {
    "per-hour": "hr",
    "per-day": "day",
    "per-week": "week",
    "per-month": "month",
    "per-year": "yr",
};

const formatSalary = (min: number, max: number, frequency: string | null) => {
    if (!min && !max) return "Competitive";

    if (frequency === "per-year") {
        return `$${Math.round(min / 1000)}k – $${Math.round(max / 1000)}k`;
    }

    const unit = unitByFrequency[frequency ?? "per-hour"] ?? "hr";
    return `$${min} – $${max}/${unit}`;
};

const parseBullets = (text: string): string[] => {
    if (!text) return [];
    const lines = text
        .split(/\r?\n/)
        .map((line) => line.replace(/^[\s•\-*]+/, "").trim())
        .filter(Boolean);

    if (lines.length > 1) return lines;

    // Split single-paragraph text into sentences when it contains multiple sentences
    const sentences = text
        .split(/(?<=[.!?])\s+/)
        .map((s) => s.trim())
        .filter(Boolean);

    return sentences.length > 0 ? sentences : [text.trim()];
};

const deriveExperience = (title: string): string => {
    const lower = title.toLowerCase();
    if (lower.includes("senior") || lower.includes("lead") || lower.includes("principal")) {
        return "5+ Years";
    }
    if (lower.includes("junior") || lower.includes("intern") || lower.includes("entry")) {
        return "0–2 Years";
    }
    return "2–4 Years";
};

const getSkillTags = (category: string | null): { label: string; Icon: LucideIcon }[] => {
    switch (category) {
        case "design-creative":
            return [
                { label: "Figma Expertise", Icon: Code2 },
                { label: "System Thinking", Icon: Layers },
                { label: "UI/UX Design", Icon: PenTool },
                { label: "Basic Frontend", Icon: Terminal },
            ];
        case "marketing-sales":
            return [
                { label: "Growth Strategy", Icon: BarChart3 },
                { label: "Campaign Analytics", Icon: Layers },
                { label: "Content Systems", Icon: PenTool },
                { label: "CRM Workflows", Icon: Terminal },
            ];
        default:
            return [
                { label: "System Architecture", Icon: Layers },
                { label: "TypeScript & React", Icon: Code2 },
                { label: "API Design", Icon: Terminal },
                { label: "Product Craft", Icon: PenTool },
            ];
    }
};

const BENEFITS = [
    { label: "Full Health & Dental", Icon: ShieldCheck },
    { label: "Competitive 401k", Icon: CircleDollarSign },
    { label: "Latest Hardware Stipend", Icon: Laptop },
    { label: "Unlimited PTO", Icon: Umbrella },
];

export default function JobDetailsView({ job }: { job: JobDoc }) {
    const router = useRouter();
    const { data: session, isPending: isSessionPending } = useSession();

    const [saved, setSaved] = useState(false);
    const [applied, setApplied] = useState(false);
    const [applying, setApplying] = useState(false);
    const [applyError, setApplyError] = useState<string | null>(null);

    useEffect(() => {
        if (!session?.user) return;
        let cancelled = false;

        checkJobApplication(job._id, session.user.id, session.user.email).then(
            (res) => {
                if (!cancelled && res.applied) {
                    setApplied(true);
                }
            }
        );

        return () => {
            cancelled = true;
        };
    }, [job._id, session?.user]);

    const handleApply = async () => {
        if (isSessionPending || applying || applied) return;

        if (!session?.user) {
            router.push("/signin");
            return;
        }

        setApplying(true);
        setApplyError(null);

        const res = await applyToJob({
            jobId: job._id,
            userId: session.user.id,
            userEmail: session.user.email,
            userName: session.user.name,
        });

        setApplying(false);

        if (res.success || res.status === 409) {
            setApplied(true);
            return;
        }

        setApplyError(res.error ?? "Failed to submit application");
    };

    const CategoryIcon = iconByCategory[job.jobCategory ?? ""] ?? ShieldCheck;
    const salary = formatSalary(job.minSalary, job.maxSalary, job.frequency);
    const locationText = job.remoteAllowed
        ? `${job.jobLocation} (Remote)`
        : job.jobLocation;
    const experienceText = deriveExperience(job.jobTitle);
    const industryLabel =
        categoryLabelMap[job.jobCategory ?? ""] ?? "SaaS / Technology";

    const responsibilities = parseBullets(job.responsibilities);
    const qualifications = parseBullets(job.qualifications);
    const skillTags = getSkillTags(job.jobCategory);

    return (
        <main className="mx-auto w-full max-w-[1296px] px-4 pb-12 pt-2 sm:px-6 lg:px-[45px]">
            {/* Top Job Header Card */}
            <section className="flex flex-col gap-4 rounded-[8px] border border-[#1e1e22] bg-[#141418] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex min-w-0 items-center gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-[8px] border border-[#242429] bg-[#1a1a1f] sm:size-14">
                        <CategoryIcon className="size-6 text-[#9797a2]" aria-hidden />
                    </div>

                    <div className="min-w-0">
                        <h1 className="truncate text-[20px] font-semibold leading-tight text-[#ededef] sm:text-[22px]">
                            {job.jobTitle}
                        </h1>

                        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[13px]">
                            <span className="text-[#9797a2]">{job.companyName}</span>
                            <span className="text-[#52525b]" aria-hidden>
                                •
                            </span>
                            <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#22c55e]">
                                <BadgeCheck className="size-3.5" aria-hidden />
                                Verified Employer
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-2 sm:items-end">
                    <div className="flex shrink-0 items-center gap-2.5">
                        <button
                            type="button"
                            aria-label={saved ? "Remove saved job" : "Save job"}
                            aria-pressed={saved}
                            onClick={() => setSaved((prev) => !prev)}
                            className={`flex size-9 items-center justify-center rounded-[8px] border transition-colors ${
                                saved
                                    ? "border-[#3a2f1e] bg-[#2a2217] text-[#fcba45]"
                                    : "border-[#242429] bg-[#1a1a1f] text-[#9797a2] hover:border-[#3a3a41] hover:text-[#ededef]"
                            }`}
                        >
                            <Bookmark
                                className="size-4"
                                fill={saved ? "currentColor" : "none"}
                                aria-hidden
                            />
                        </button>

                        <button
                            type="button"
                            onClick={handleApply}
                            disabled={applied || applying || isSessionPending}
                            className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-[8px] px-4 text-[13px] font-medium transition-colors disabled:cursor-not-allowed ${
                                applied
                                    ? "border border-[#1f3b2c] bg-[#15261f] text-[#22c55e]"
                                    : "bg-white text-[#111114] hover:bg-[#e9e9ea] disabled:opacity-60"
                            }`}
                        >
                            {applying ? (
                                <>
                                    <Loader2 className="size-3.5 animate-spin" aria-hidden />
                                    Applying...
                                </>
                            ) : applied ? (
                                <>
                                    <Check className="size-3.5" aria-hidden />
                                    Applied
                                </>
                            ) : (
                                "Apply Now"
                            )}
                        </button>
                    </div>

                    {applyError && (
                        <p className="text-[12px] text-red-400" role="alert">
                            {applyError}
                        </p>
                    )}
                </div>
            </section>

            {/* Two-column body */}
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start">
                {/* Left Column */}
                <div className="min-w-0 flex-1 space-y-4">
                    {/* 4 Metric Cards */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div className="rounded-[8px] border border-[#1e1e22] bg-[#141418] p-4">
                            <Banknote className="size-4 text-[#7f8183]" aria-hidden />
                            <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-[#6e6e78]">
                                SALARY RANGE
                            </p>
                            <p className="mt-1 truncate text-[13px] font-semibold text-[#ededef]">
                                {salary}
                            </p>
                        </div>

                        <div className="rounded-[8px] border border-[#1e1e22] bg-[#141418] p-4">
                            <MapPin className="size-4 text-[#7f8183]" aria-hidden />
                            <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-[#6e6e78]">
                                LOCATION
                            </p>
                            <p className="mt-1 truncate text-[13px] font-semibold text-[#ededef]">
                                {locationText}
                            </p>
                        </div>

                        <div className="rounded-[8px] border border-[#1e1e22] bg-[#141418] p-4">
                            <Clock className="size-4 text-[#7f8183]" aria-hidden />
                            <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-[#6e6e78]">
                                JOB TYPE
                            </p>
                            <p className="mt-1 truncate text-[13px] font-semibold text-[#ededef]">
                                {job.jobType}
                            </p>
                        </div>

                        <div className="rounded-[8px] border border-[#1e1e22] bg-[#141418] p-4">
                            <BarChart3 className="size-4 text-[#7f8183]" aria-hidden />
                            <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-[#6e6e78]">
                                EXPERIENCE
                            </p>
                            <p className="mt-1 truncate text-[13px] font-semibold text-[#ededef]">
                                {experienceText}
                            </p>
                        </div>
                    </div>

                    {/* Main Details Card */}
                    <section className="rounded-[8px] border border-[#1e1e22] bg-[#141418] p-5 sm:p-6">
                        {/* Job Description */}
                        <div>
                            <h2 className="text-[15px] font-semibold text-[#ededef]">
                                Job Description
                            </h2>
                            <p className="mt-3 text-[13px] leading-relaxed text-[#9797a2]">
                                At {job.companyName}, we are building next-generation products
                                and looking for a {job.jobTitle} ({job.jobType}) in{" "}
                                {locationText}. You will be a key member of our team, working
                                closely with engineering and product leadership to shape core
                                experiences and deliver high-impact solutions.
                            </p>
                        </div>

                        {/* Responsibilities */}
                        <div className="mt-6 border-t border-[#1e1e22] pt-6">
                            <h2 className="text-[15px] font-semibold text-[#ededef]">
                                Responsibilities
                            </h2>
                            <ul className="mt-3 space-y-2.5 text-[13px] leading-relaxed text-[#9797a2]">
                                {responsibilities.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5">
                                        <span
                                            className="mt-2 size-1 shrink-0 rounded-full bg-[#6e6e78]"
                                            aria-hidden
                                        />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Requirements */}
                        <div className="mt-6 border-t border-[#1e1e22] pt-6">
                            <h2 className="text-[15px] font-semibold text-[#ededef]">
                                Requirements
                            </h2>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {skillTags.map(({ label, Icon }) => (
                                    <span
                                        key={label}
                                        className="inline-flex items-center gap-1.5 rounded-[6px] border border-[#242429] bg-[#1a1a1f] px-2.5 py-1 text-[11px] font-medium text-[#c9c9d1]"
                                    >
                                        <Icon className="size-3 text-[#8f8f99]" aria-hidden />
                                        {label}
                                    </span>
                                ))}
                            </div>

                            <ul className="mt-4 space-y-2.5 text-[13px] leading-relaxed text-[#9797a2]">
                                {qualifications.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5">
                                        <span
                                            className="mt-2 size-1 shrink-0 rounded-full bg-[#6e6e78]"
                                            aria-hidden
                                        />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Benefits */}
                        <div className="mt-6 border-t border-[#1e1e22] pt-6">
                            <h2 className="text-[15px] font-semibold text-[#ededef]">
                                Benefits
                            </h2>

                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {BENEFITS.map(({ label, Icon }) => (
                                    <div key={label} className="flex items-center gap-3">
                                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#242429] bg-[#1a1a1f]">
                                            <Icon
                                                className="size-4 text-[#c9c9d1]"
                                                aria-hidden
                                            />
                                        </div>
                                        <span className="text-[13px] font-medium text-[#ededef]">
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Company Overview */}
                <aside className="w-full shrink-0 rounded-[8px] border border-[#1e1e22] bg-[#141418] p-5 lg:w-[300px]">
                    <h2 className="text-[15px] font-semibold text-[#ededef]">
                        Company Overview
                    </h2>

                    {/* Atmospheric office/workspace preview */}
                    <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-[8px] border border-[#242429] bg-gradient-to-b from-[#171d22] via-[#0f1317] to-[#090a0d]">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(120,160,180,0.16),transparent_65%)]" />
                        <div className="relative flex h-full flex-col items-center justify-center p-4">
                            <div className="h-20 w-36 rounded-[6px] border border-[#2a323b] bg-[#0b0e12]/90 shadow-lg">
                                <div className="flex h-full flex-col items-center justify-center gap-1.5 px-3">
                                    <div className="h-1.5 w-16 rounded-full bg-[#2a333d]" />
                                    <div className="h-1.5 w-24 rounded-full bg-[#1d242b]" />
                                    <div className="mt-1 h-4 w-10 rounded-[3px] border border-[#2a333d] bg-[#13181e]" />
                                </div>
                            </div>
                            <div className="h-2 w-10 bg-[#1e242b]" />
                            <div className="h-1 w-16 rounded-full bg-[#2a313a]" />
                        </div>
                    </div>

                    <div className="mt-4 space-y-3 border-b border-[#1e1e22] pb-4">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-medium uppercase tracking-wider text-[#6e6e78]">
                                SIZE
                            </span>
                            <span className="text-[12px] font-medium text-[#ededef]">
                                250 - 500 Employees
                            </span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-medium uppercase tracking-wider text-[#6e6e78]">
                                INDUSTRY
                            </span>
                            <span className="text-right text-[12px] font-medium text-[#ededef]">
                                {industryLabel}
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            const slug = job.companyName
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "");
                            window.open(`https://${slug}.com`, "_blank", "noopener,noreferrer");
                        }}
                        className="mt-4 flex h-9 w-full items-center justify-center rounded-[8px] border border-[#242429] bg-[#1a1a1f] text-[12px] font-medium text-[#ededef] transition-colors hover:border-[#3a3a41] hover:bg-[#222228]"
                    >
                        Visit Website
                    </button>
                </aside>
            </div>
        </main>
    );
}