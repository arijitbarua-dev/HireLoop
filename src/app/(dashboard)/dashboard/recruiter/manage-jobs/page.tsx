'use client'

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Archive,
    ChevronRight,
    Code,
    EllipsisVertical,
    Eye,
    Globe,
    Megaphone,
    Palette,
    Pencil,
    Plus,
    Server,
    ShieldCheck,
    Trash2,
    Users,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

type JobStatus = "Active" | "Expired";

type Job = {
    id: number;
    title: string;
    dept: string;
    icon: LucideIcon;
    iconStyles: string;
    company: string;
    location: string;
    type: string;
    compensation: string;
    candidates: number;
    status: JobStatus;
    deadline: string;
    posted: string;
};

const jobs: Job[] = [
    {
        id: 1,
        title: "Frontend Developer",
        dept: "Engineering",
        icon: Code,
        iconStyles: "border-[#315d91] bg-[#152b43]/60 text-[#60a5fa]",
        company: "InfiPixel Network",
        location: "Remote (New York, USA)",
        type: "Full-time",
        compensation: "€25 – €40 / hr",
        candidates: 24,
        status: "Active",
        deadline: "May 30, 2025",
        posted: "Posted 4d ago",
    },
    {
        id: 2,
        title: "Senior Product Designer",
        dept: "Design",
        icon: Palette,
        iconStyles: "border-[#8a5b10] bg-[#422d0b]/60 text-[#fbbf24]",
        company: "HirePulse Labs",
        location: "London, UK (Hybrid)",
        type: "Full-time",
        compensation: "€80K – €115K / yr",
        candidates: 19,
        status: "Active",
        deadline: "Jun 14, 2025",
        posted: "Posted 1w ago",
    },
    {
        id: 3,
        title: "DevOps Specialist",
        dept: "Infrastructure",
        icon: Server,
        iconStyles: "border-[#2f6f68] bg-[#12332f]/60 text-[#5eead4]",
        company: "HirePulse Platform",
        location: "Berlin, Germany",
        type: "Full-time",
        compensation: "€65K – €120K / yr",
        candidates: 32,
        status: "Active",
        deadline: "Jun 30, 2025",
        posted: "Posted 2w ago",
    },
    {
        id: 4,
        title: "Product Marketing Lead",
        dept: "Marketing",
        icon: Megaphone,
        iconStyles: "border-[#5141a1] bg-[#292052]/50 text-[#a99aff]",
        company: "HirePulse Network",
        location: "Remote (EU/US)",
        type: "Full-time",
        compensation: "€80K – €105K / yr",
        candidates: 27,
        status: "Active",
        deadline: "Jul 15, 2025",
        posted: "Posted 5d ago",
    },
    {
        id: 5,
        title: "QA Automation Engineer",
        dept: "Quality",
        icon: ShieldCheck,
        iconStyles: "border-[#3f3f46] bg-[#27272a]/60 text-[#a1a1aa]",
        company: "HirePulse Platform",
        location: "Dublin, Ireland (Hybrid)",
        type: "Part-time",
        compensation: "€35 – €50 / hr",
        candidates: 8,
        status: "Expired",
        deadline: "May 01, 2025",
        posted: "Posted 2mo ago",
    },
];

const statusStyles: Record<JobStatus, string> = {
    Active:
        "border-[#1f6b45] bg-[#12271c]/60 text-[#4ade80]",
    Expired:
        "border-[#3f3f46] bg-[#27272a]/60 text-[#a1a1aa]",
};

const ManageJobsPage = () => {
    return (
        <div className="relative min-h-[calc(100vh-88px)] space-y-5 pb-20">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[11px]">
                <Link
                    href="/dashboard/recruiter"
                    className="text-[#85858f] transition hover:text-[#d4d4d8]"
                >
                    Manage Jobs
                </Link>

                <ChevronRight className="size-3 text-[#52525b]" />

                <span className="text-[#d4d4d8]">
                    Job Listings &amp; Postings
                </span>
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

                <Button
                    render={
                        <Link
                            href="/dashboard/recruiter/manage-jobs/add-job"
                            aria-label="Create new job post"
                        />
                    }
                    nativeButton={false}
                    size="lg"
                    className="w-full shrink-0 bg-[#6d5ae0] text-white hover:bg-[#5b48d6] sm:w-auto"
                >
                    <Plus className="size-4" />
                    New Job Post
                </Button>
            </div>

            {/* Jobs Table */}
            <section className="overflow-hidden rounded-xl border border-[#262629] bg-[#151518]">

                <div className="overflow-x-auto">
                    <Table className="w-full min-w-[960px] border-collapse text-left">

                        <TableHeader>
                            <TableRow className="border-b border-[#27272a] bg-[#1c1c20] hover:bg-[#1c1c20]">
                                <TableHead className="w-[18%] px-5 py-3 text-[9px] font-medium uppercase tracking-wider text-[#85858f]">
                                    Job Title &amp; Dept
                                </TableHead>

                                <TableHead className="w-[15%] px-4 py-3 text-[9px] font-medium uppercase tracking-wider text-[#85858f]">
                                    Company &amp; Location
                                </TableHead>

                                <TableHead className="w-[8%] px-4 py-3 text-[9px] font-medium uppercase tracking-wider text-[#85858f]">
                                    Type
                                </TableHead>

                                <TableHead className="w-[13%] px-4 py-3 text-[9px] font-medium uppercase tracking-wider text-[#85858f]">
                                    Compensation
                                </TableHead>

                                <TableHead className="w-[12%] px-4 py-3 text-[9px] font-medium uppercase tracking-wider text-[#85858f]">
                                    Applicants
                                </TableHead>

                                <TableHead className="w-[9%] px-4 py-3 text-[9px] font-medium uppercase tracking-wider text-[#85858f]">
                                    Status
                                </TableHead>

                                <TableHead className="w-[11%] px-4 py-3 text-[9px] font-medium uppercase tracking-wider text-[#85858f]">
                                    Deadline
                                </TableHead>

                                <TableHead className="px-4 py-3 text-right text-[9px] font-medium uppercase tracking-wider text-[#85858f]">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {jobs.map((job) => (
                                <TableRow
                                    key={job.id}
                                    className="border-b border-[#27272a] last:border-0 hover:bg-[#1b1b1f]"
                                >

                                    {/* Job Title & Dept */}
                                    <TableCell className="px-5 py-3">
                                        <div className="flex items-center gap-2.5">
                                            <div
                                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${job.iconStyles}`}
                                            >
                                                <job.icon className="size-3.5" />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate text-[11px] font-medium text-[#e4e4e7]">
                                                    {job.title}
                                                </p>

                                                <p className="mt-0.5 text-[10px] text-[#85858f]">
                                                    {job.dept}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Company & Location */}
                                    <TableCell className="px-4 py-3">
                                        <p className="text-[11px] font-medium text-[#e4e4e7]">
                                            {job.company}
                                        </p>

                                        <p className="mt-0.5 flex items-center gap-1 text-[10px] text-[#85858f]">
                                            <Globe className="size-3 shrink-0" />
                                            {job.location}
                                        </p>
                                    </TableCell>

                                    {/* Type */}
                                    <TableCell className="px-4 py-3">
                                        <Badge
                                            variant="outline"
                                            className="rounded-full border-[#3f3f46] bg-[#27272a]/60 px-2 py-0.5 text-[9px] font-medium text-[#a1a1aa]"
                                        >
                                            {job.type}
                                        </Badge>
                                    </TableCell>

                                    {/* Compensation */}
                                    <TableCell className="whitespace-nowrap px-4 py-3 text-[10px] text-[#a1a1aa]">
                                        {job.compensation}
                                    </TableCell>

                                    {/* Applicants */}
                                    <TableCell className="px-4 py-3">
                                        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#60a5fa]">
                                            <Users className="size-3.5 shrink-0" />
                                            {job.candidates} Candidates
                                        </span>
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell className="px-4 py-3">
                                        <Badge
                                            variant="outline"
                                            className={`gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium ${statusStyles[job.status]}`}
                                        >
                                            <span
                                                className={`size-1.5 rounded-full ${
                                                    job.status === "Active"
                                                        ? "bg-[#4ade80]"
                                                        : "bg-[#71717a]"
                                                }`}
                                            />
                                            {job.status}
                                        </Badge>
                                    </TableCell>

                                    {/* Deadline */}
                                    <TableCell className="px-4 py-3">
                                        <p className="text-[10px] text-[#d4d4d8]">
                                            {job.deadline}
                                        </p>

                                        <p className="mt-0.5 text-[9px] text-[#71717a]">
                                            {job.posted}
                                        </p>
                                    </TableCell>

                                    {/* Actions */}
                                    <TableCell className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-1.5">
                                            <Button
                                                size="sm"
                                                className="h-7 gap-1 rounded-lg bg-[#6d5ae0] px-2.5 text-[10px] text-white hover:bg-[#5b48d6]"
                                            >
                                                <Pencil className="size-3" />
                                                Update
                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="icon-sm"
                                                aria-label={`Delete ${job.title}`}
                                                className="text-[#85858f] hover:bg-[#421b1b]/60 hover:text-[#f87171]"
                                            >
                                                <Trash2 className="size-3.5" />
                                            </Button>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger
                                                    render={
                                                        <Button
                                                            variant="ghost"
                                                            size="icon-sm"
                                                            aria-label={`More options for ${job.title}`}
                                                            className="text-[#85858f] hover:bg-[#222226] hover:text-white"
                                                        />
                                                    }
                                                >
                                                    <EllipsisVertical className="size-3.5" />
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent
                                                    align="end"
                                                    className="w-40 border border-[#2a2a2e] bg-[#1a1a1f] text-[#e4e4e7] ring-[#2a2a2e]"
                                                >
                                                    <DropdownMenuItem className="gap-2 text-xs focus:bg-[#2a2a30] focus:text-white">
                                                        <Eye className="size-3.5" />
                                                        View Job
                                                    </DropdownMenuItem>

                                                    {/* <DropdownMenuItem className="gap-2 text-xs focus:bg-[#2a2a30] focus:text-white">
                                                        <Pencil className="size-3.5" />
                                                        Edit Job
                                                    </DropdownMenuItem> */}

                                                    <DropdownMenuItem className="gap-2 text-xs focus:bg-[#2a2a30] focus:text-white">
                                                        <Users className="size-3.5" />
                                                        View Applicants
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem className="gap-2 text-xs focus:bg-[#2a2a30] focus:text-white">
                                                        <Archive className="size-3.5" />
                                                        Archive
                                                    </DropdownMenuItem>

                                                    <DropdownMenuSeparator className="bg-[#2a2a2e]" />

                                                    {/* <DropdownMenuItem
                                                        variant="destructive"
                                                        className="gap-2 text-xs focus:bg-[#421b1b]/60 focus:text-[#f87171]"
                                                    >
                                                        <Trash2 className="size-3.5" />
                                                        Delete Job
                                                    </DropdownMenuItem> */}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </div>
            </section>

        </div>
    );
};

export default ManageJobsPage;