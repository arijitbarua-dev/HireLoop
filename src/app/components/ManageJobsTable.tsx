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
    Code,
    EllipsisVertical,
    Eye,
    Globe,
    Megaphone,
    Palette,
    Pencil,
    ShieldCheck,
    Trash2,
    Users,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export type JobStatus = "Active" | "Expired";

export type JobRow = {
    id: string;
    title: string;
    dept: string;
    category: string;
    company: string;
    location: string;
    type: string;
    compensation: string;
    candidates: number;
    status: JobStatus;
    deadline: string;
    posted: string;
};

const iconByCategory: Record<string, { icon: LucideIcon; styles: string }> = {
    "engineering-tech": {
        icon: Code,
        styles: "border-[#315d91] bg-[#152b43]/60 text-[#60a5fa]",
    },
    "design-creative": {
        icon: Palette,
        styles: "border-[#8a5b10] bg-[#422d0b]/60 text-[#fbbf24]",
    },
    "marketing-sales": {
        icon: Megaphone,
        styles: "border-[#5141a1] bg-[#292052]/50 text-[#a99aff]",
    },
};

const fallbackIcon = {
    icon: ShieldCheck as LucideIcon,
    styles: "border-[#3f3f46] bg-[#27272a]/60 text-[#a1a1aa]",
};

const statusStyles: Record<JobStatus, string> = {
    Active:
        "border-[#1f6b45] bg-[#12271c]/60 text-[#4ade80]",
    Expired:
        "border-[#3f3f46] bg-[#27272a]/60 text-[#a1a1aa]",
};

const ManageJobsTable = ({ jobs }: { jobs: JobRow[] }) => {
    return (
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
                        {jobs.length === 0 && (
                            <TableRow className="border-0 hover:bg-transparent">
                                <TableCell
                                    colSpan={8}
                                    className="px-5 py-16 text-center"
                                >
                                    <p className="text-xs font-medium text-[#a1a1aa]">
                                        No job posts yet
                                    </p>

                                    <p className="mt-1 text-[10px] text-[#71717a]">
                                        Publish your first listing to see it
                                        here.
                                    </p>
                                </TableCell>
                            </TableRow>
                        )}

                        {jobs.map((job) => {
                            const { icon: JobIcon, styles } =
                                iconByCategory[job.category] ?? fallbackIcon;

                            return (
                                <TableRow
                                    key={job.id}
                                    className="border-b border-[#27272a] last:border-0 hover:bg-[#1b1b1f]"
                                >

                                    {/* Job Title & Dept */}
                                    <TableCell className="px-5 py-3">
                                        <div className="flex items-center gap-2.5">
                                            <div
                                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${styles}`}
                                            >
                                                <JobIcon className="size-3.5" />
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
                                                render={
                                                    <Link
                                                        href="/dashboard/recruiter/manage-jobs/updated-job-post"
                                                        aria-label={`Update ${job.title}`}
                                                    />
                                                }
                                                nativeButton={false}
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

                                                    <DropdownMenuItem className="gap-2 text-xs focus:bg-[#2a2a30] focus:text-white">
                                                        <Users className="size-3.5" />
                                                        View Applicants
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem className="gap-2 text-xs focus:bg-[#2a2a30] focus:text-white">
                                                        <Archive className="size-3.5" />
                                                        Archive
                                                    </DropdownMenuItem>

                                                    <DropdownMenuSeparator className="bg-[#2a2a2e]" />
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>

                </Table>
            </div>
        </section>
    );
};

export default ManageJobsTable;
