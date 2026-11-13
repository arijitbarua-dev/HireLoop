'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/toast";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    ArrowRight,
    Calendar,
    ChevronRight,
    Globe,
    MapPin,
} from "lucide-react";
import { createJob } from "@/lib/actions/jobs";

const JOB_TYPES = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
] as const;

const JOB_CATEGORIES = [
    { value: "engineering-tech", label: "Engineering & Tech" },
    { value: "design-creative", label: "Design & Creative" },
    { value: "marketing-sales", label: "Marketing & Sales" },
    { value: "finance-legal", label: "Finance & Legal" },
    { value: "operations-hr", label: "Operations & HR" },
    { value: "customer-support", label: "Customer Support" },
] as const;

const FREQUENCIES = [
    { value: "per-hour", label: "per hour" },
    { value: "per-day", label: "per day" },
    { value: "per-week", label: "per week" },
    { value: "per-month", label: "per month" },
    { value: "per-year", label: "per year" },
] as const;

const AddJobPage = () => {
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const [jobTitle, setJobTitle] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [jobCategory, setJobCategory] = useState<string | null>(
        "engineering-tech"
    );
    const [jobType, setJobType] = useState<string>("Full-time");
    const [remoteAllowed, setRemoteAllowed] = useState(true);
    const [jobLocation, setJobLocation] = useState("");
    const [deadline, setDeadline] = useState("");
    const [minSalary, setMinSalary] = useState("");
    const [maxSalary, setMaxSalary] = useState("");
    const [frequency, setFrequency] = useState<string | null>("per-hour");
    const [responsibilities, setResponsibilities] = useState("");
    const [qualifications, setQualifications] = useState("");

    const handlePublish = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setFormError(null);
        setIsSubmitting(true);

        const result = await createJob({
            jobTitle,
            companyName,
            jobCategory,
            jobType,
            remoteAllowed,
            jobLocation,
            deadline,
            minSalary,
            maxSalary,
            frequency,
            responsibilities,
            qualifications,
        });

        setIsSubmitting(false);

        if (!result.success) {
            const message = result.error || "Failed to publish job. Please try again.";

            setFormError(message);
            toast.add({
                type: "error",
                title: "Failed to publish job",
                description: message,
            });
            return;
        }

        // Job stored in MongoDB — back to listings
        router.push("/dashboard/recruiter/manage-jobs");
        toast.add({
            type: "success",
            title: "Job created!",
            description: `${jobTitle} has been published successfully.`,
        });
        router.refresh();
    };

    return (
        <div className="min-w-0 space-y-5 pb-10">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[11px]">
                <Link
                    href="/dashboard/recruiter/manage-jobs"
                    className="text-[#85858f] transition hover:text-[#d4d4d8]"
                >
                    Manage Jobs
                </Link>

                <ChevronRight className="size-3 text-[#52525b]" />

                <span className="text-[#d4d4d8]">
                    Create New Listing
                </span>
            </nav>

            {/* Page Header */}
            <form
                onSubmit={handlePublish}
                className="space-y-5"
            >

                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                        <h1 className="text-xl font-semibold tracking-tight text-[#e4e4e7] sm:text-2xl">
                            Post a New Job
                        </h1>

                        <p className="mt-1 text-xs text-[#85858f] sm:text-[13px]">
                            Fill in the position specifications to attract
                            qualified talent across our network.
                        </p>
                    </div>
                </div>

                {/* 1. Basic Information */}
                <section className="rounded-xl border border-[#232327] bg-[#131316] p-4 sm:p-5">
                    <div className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-[#6d5ae0]" />

                        <h2 className="text-sm font-medium text-[#e4e4e7]">
                            1. Basic Information
                        </h2>
                    </div>

                    <div className="mt-4 space-y-4">

                        {/* Job Title */}
                        <div className="space-y-1.5">
                            <Label
                                htmlFor="job-title"
                                className="text-xs text-[#a1a1aa]"
                            >
                                Job Title{" "}
                                <span className="text-[#71717a]">*</span>
                            </Label>

                            <Input
                                id="job-title"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                placeholder="Frontend Developer"
                                required
                                className="h-9 rounded-lg border-[#2a2a2e] bg-[#0f0f11] text-xs text-[#e4e4e7] placeholder:text-[#6b6b74] focus-visible:border-[#6d5ae0] focus-visible:ring-[#6d5ae0]/30"
                            />
                        </div>

                        {/* Company Name + Job Category */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label
                                    htmlFor="company-name"
                                    className="text-xs text-[#a1a1aa]"
                                >
                                    Company Name{" "}
                                    <span className="text-[#71717a]">*</span>
                                </Label>

                                <Input
                                    id="company-name"
                                    value={companyName}
                                    onChange={(e) =>
                                        setCompanyName(e.target.value)
                                    }
                                    placeholder="InfiPixel Network"
                                    required
                                    className="h-9 rounded-lg border-[#2a2a2e] bg-[#0f0f11] text-xs text-[#e4e4e7] placeholder:text-[#6b6b74] focus-visible:border-[#6d5ae0] focus-visible:ring-[#6d5ae0]/30"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label
                                    htmlFor="job-category"
                                    className="text-xs text-[#a1a1aa]"
                                >
                                    Job Category{" "}
                                    <span className="text-[#71717a]">*</span>
                                </Label>

                                <Select
                                    items={[...JOB_CATEGORIES]}
                                    value={jobCategory}
                                    onValueChange={(value) =>
                                        setJobCategory(value)
                                    }
                                >
                                    <SelectTrigger
                                        id="job-category"
                                        className="h-9 w-full rounded-lg border-[#2a2a2e] bg-[#0f0f11] text-xs text-[#e4e4e7] data-placeholder:text-[#6b6b74] focus-visible:border-[#6d5ae0] focus-visible:ring-[#6d5ae0]/30"
                                    >
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>

                                    <SelectContent className="border border-[#2a2a2e] bg-[#1a1a1f] text-xs text-[#e4e4e7] ring-[#2a2a2e]">
                                        {JOB_CATEGORIES.map((category) => (
                                            <SelectItem
                                                key={category.value}
                                                value={category.value}
                                                className="text-xs focus:bg-[#2a2a30] focus:text-white"
                                            >
                                                {category.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Job Type */}
                        <div className="space-y-1.5">
                            <Label className="text-xs text-[#a1a1aa]">
                                Job Type{" "}
                                <span className="text-[#71717a]">*</span>
                            </Label>

                            <div
                                role="radiogroup"
                                aria-label="Job Type"
                                className="grid grid-cols-2 gap-3 sm:grid-cols-4"
                            >
                                {JOB_TYPES.map((type) => {
                                    const isActive = jobType === type;

                                    return (
                                        <Button
                                            key={type}
                                            type="button"
                                            role="radio"
                                            aria-checked={isActive}
                                            onClick={() => setJobType(type)}
                                            className={`h-9 rounded-lg text-xs font-medium transition-colors ${isActive
                                                ? "border border-[#6d5ae0] bg-[#6d5ae0]/10 text-white hover:bg-[#6d5ae0]/20"
                                                : "border border-[#2a2a2e] bg-[#0f0f11] text-[#a1a1aa] hover:border-[#3f3f46] hover:text-[#e4e4e7]"
                                                }`}
                                        >
                                            {type}
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Location, Compensation & Timeline */}
                <section className="rounded-xl border border-[#232327] bg-[#131316] p-4 sm:p-5">
                    <div className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-[#6d5ae0]" />

                        <h2 className="text-sm font-medium text-[#e4e4e7]">
                            2. Location, Compensation &amp; Timeline
                        </h2>
                    </div>

                    <div className="mt-4 space-y-4">

                        {/* Remote Work Toggle */}
                        <div className="flex flex-col gap-3 rounded-lg border border-[#2a2a2e] bg-[#0f0f11] p-3.5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex min-w-0 items-start gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#2a2a2e] bg-[#1a1a1f]">
                                    <Globe className="size-4 text-[#d4d4d8]" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-[#e4e4e7]">
                                        Remote Work Allowed (Remote)
                                    </p>

                                    <p className="mt-0.5 text-[11px] text-[#85858f]">
                                        Enables applications for
                                        distributed/remote positions
                                    </p>
                                </div>
                            </div>

                            <Switch
                                id="remoteAllowed"
                                checked={remoteAllowed}
                                onCheckedChange={setRemoteAllowed}
                                aria-label="Allow remote work"
                                className="
                                    shrink-0
                                    border border-[#45454d]
                                    bg-[#303036]
                                    data-checked:border-[#6252ff]
                                    data-checked:bg-[#6252ff]
                                    data-unchecked:border-[#45454d]
                                    data-unchecked:bg-[#303036]
                                    [&_[data-slot=switch-thumb]]:bg-white
                                    [&_[data-slot=switch-thumb]]:shadow-md
                                "
                            />
                        </div>

                        {/* Job Location + Application Deadline */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="job-location"
                                        className="text-xs text-[#a1a1aa]"
                                    >
                                        Job Location
                                    </Label>

                                    <span className="text-[9px] text-[#71717a]">
                                        Required
                                    </span>
                                </div>

                                <div className="relative">
                                    <MapPin className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-[#6b6b74]" />

                                    <Input
                                        id="job-location"
                                        value={jobLocation}
                                        onChange={(e) =>
                                            setJobLocation(e.target.value)
                                        }
                                        placeholder="New York, USA"
                                        required
                                        className="h-9 rounded-lg border-[#2a2a2e] bg-[#0f0f11] pr-2.5 pl-8 text-xs text-[#e4e4e7] placeholder:text-[#6b6b74] focus-visible:border-[#6d5ae0] focus-visible:ring-[#6d5ae0]/30"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label
                                    htmlFor="deadline"
                                    className="text-xs text-[#a1a1aa]"
                                >
                                    Application Deadline
                                </Label>

                                <div className="relative">
                                    <Calendar className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-[#6b6b74]" />

                                    <Input
                                        id="deadline"
                                        type="date"
                                        value={deadline}
                                        onChange={(e) =>
                                            setDeadline(e.target.value)
                                        }
                                        className="h-9 rounded-lg border-[#2a2a2e] bg-[#0f0f11] pr-2.5 pl-8 text-xs text-[#e4e4e7] [color-scheme:dark] focus-visible:border-[#6d5ae0] focus-visible:ring-[#6d5ae0]/30 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Salary Range + Frequency */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="space-y-1.5">
                                <Label
                                    htmlFor="min-salary"
                                    className="text-xs text-[#a1a1aa]"
                                >
                                    Min Salary / Rate
                                </Label>

                                <div className="relative">
                                    <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-xs text-[#6b6b74]">
                                        €
                                    </span>

                                    <Input
                                        id="min-salary"
                                        type="number"
                                        min={0}
                                        value={minSalary}
                                        onChange={(e) =>
                                            setMinSalary(e.target.value)
                                        }
                                        placeholder="25"
                                        className="h-9 rounded-lg border-[#2a2a2e] bg-[#0f0f11] pr-2.5 pl-7 text-xs text-[#e4e4e7] placeholder:text-[#6b6b74] focus-visible:border-[#6d5ae0] focus-visible:ring-[#6d5ae0]/30"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label
                                    htmlFor="max-salary"
                                    className="text-xs text-[#a1a1aa]"
                                >
                                    Max Salary / Rate
                                </Label>

                                <div className="relative">
                                    <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-xs text-[#6b6b74]">
                                        €
                                    </span>

                                    <Input
                                        id="max-salary"
                                        type="number"
                                        min={0}
                                        value={maxSalary}
                                        onChange={(e) =>
                                            setMaxSalary(e.target.value)
                                        }
                                        placeholder="40"
                                        className="h-9 rounded-lg border-[#2a2a2e] bg-[#0f0f11] pr-2.5 pl-7 text-xs text-[#e4e4e7] placeholder:text-[#6b6b74] focus-visible:border-[#6d5ae0] focus-visible:ring-[#6d5ae0]/30"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label
                                    htmlFor="frequency"
                                    className="text-xs text-[#a1a1aa]"
                                >
                                    Frequency
                                </Label>

                                <Select
                                    items={[...FREQUENCIES]}
                                    value={frequency}
                                    onValueChange={(value) =>
                                        setFrequency(value)
                                    }
                                >
                                    <SelectTrigger
                                        id="frequency"
                                        className="h-9 w-full rounded-lg border-[#2a2a2e] bg-[#0f0f11] text-xs text-[#e4e4e7] data-placeholder:text-[#6b6b74] focus-visible:border-[#6d5ae0] focus-visible:ring-[#6d5ae0]/30"
                                    >
                                        <SelectValue placeholder="Select frequency" />
                                    </SelectTrigger>

                                    <SelectContent className="border border-[#2a2a2e] bg-[#1a1a1f] text-xs text-[#e4e4e7] ring-[#2a2a2e]">
                                        {FREQUENCIES.map((item) => (
                                            <SelectItem
                                                key={item.value}
                                                value={item.value}
                                                className="text-xs focus:bg-[#2a2a30] focus:text-white"
                                            >
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Responsibilities & Requirements */}
                <section className="rounded-xl border border-[#232327] bg-[#131316] p-4 sm:p-5">
                    <div className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-[#6d5ae0]" />

                        <h2 className="text-sm font-medium text-[#e4e4e7]">
                            3. Responsibilities &amp; Requirements
                        </h2>
                    </div>

                    <div className="mt-4 space-y-4">

                        {/* Key Responsibilities */}
                        <div className="space-y-1.5">
                            <Label
                                htmlFor="responsibilities"
                                className="text-xs text-[#a1a1aa]"
                            >
                                Key Responsibilities{" "}
                                <span className="text-[#71717a]">*</span>
                            </Label>

                            <Textarea
                                id="responsibilities"
                                rows={4}
                                value={responsibilities}
                                onChange={(e) =>
                                    setResponsibilities(e.target.value)
                                }
                                placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences..."
                                required
                                className="rounded-lg border-[#2a2a2e] bg-[#0f0f11] text-xs text-[#e4e4e7] placeholder:text-[#6b6b74] focus-visible:border-[#6d5ae0] focus-visible:ring-[#6d5ae0]/30"
                            />
                        </div>

                        {/* Qualifications & Requirements */}
                        <div className="space-y-1.5">
                            <Label
                                htmlFor="qualifications"
                                className="text-xs text-[#a1a1aa]"
                            >
                                Qualifications &amp; Requirements{" "}
                                <span className="text-[#71717a]">*</span>
                            </Label>

                            <Textarea
                                id="qualifications"
                                rows={4}
                                value={qualifications}
                                onChange={(e) =>
                                    setQualifications(e.target.value)
                                }
                                placeholder={"• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers"}
                                required
                                className="rounded-lg border-[#2a2a2e] bg-[#0f0f11] text-xs text-[#e4e4e7] placeholder:text-[#6b6b74] focus-visible:border-[#6d5ae0] focus-visible:ring-[#6d5ae0]/30"
                            />
                        </div>
                    </div>
                </section>

                <section>
                    {formError && (
                        <p className="mb-3 rounded-lg border border-[#872e2e] bg-[#421b1b]/60 px-3 py-2 text-xs text-[#f87171]">
                            {formError}
                        </p>
                    )}

                    <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full shrink-0 bg-[#6d5ae0] text-white hover:bg-[#5b48d6] sm:w-auto"
                        data-icon="inline-end"
                    >
                        {isSubmitting ? "Publishing..." : "Publish Job"}
                        <ArrowRight data-icon="inline-end" className="size-4" />
                    </Button>
                </section>

            </form>
        </div>
    );
};

export default AddJobPage;