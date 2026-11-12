
'use client'

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
    FileText,
    Users,
    Zap,
    CircleCheck,
    Plus,
} from "lucide-react";

const stats = [
    {
        title: "Total Job Posts",
        value: "48",
        icon: FileText,
    },
    {
        title: "Total Applicants",
        value: "1,284",
        icon: Users,
    },
    {
        title: "Active Jobs",
        value: "18",
        icon: Zap,
    },
    {
        title: "Jobs Closed",
        value: "32",
        icon: CircleCheck,
    },
];

const applications = [
    {
        id: 1,
        name: "Julianne Moore",
        role: "Senior Product Designer",
        date: "Oct 24, 2023",
        experience: "6 years",
        status: "Interviewing",
        avatar: "https://i.pravatar.cc/100?img=47",
    },
    {
        id: 2,
        name: "Robert Downey",
        role: "Backend Engineer",
        date: "Oct 23, 2023",
        experience: "4 years",
        status: "New",
        avatar: "https://i.pravatar.cc/100?img=12",
    },
    {
        id: 3,
        name: "Emma Stone",
        role: "Marketing Lead",
        date: "Oct 22, 2023",
        experience: "8 years",
        status: "Reviewing",
        avatar: "https://i.pravatar.cc/100?img=44",
    },
    {
        id: 4,
        name: "Chris Pratt",
        role: "Product Manager",
        date: "Oct 21, 2023",
        experience: "5 years",
        status: "Rejected",
        avatar: "https://i.pravatar.cc/100?img=11",
    },
];

const statusStyles: Record<string, string> = {
    Interviewing:
        "border-[#5141a1] bg-[#292052]/50 text-[#a99aff]",

    New:
        "border-[#315d91] bg-[#152b43]/60 text-[#60a5fa]",

    Reviewing:
        "border-[#8a5b10] bg-[#422d0b]/60 text-[#fbbf24]",

    Rejected:
        "border-[#872e2e] bg-[#421b1b]/60 text-[#f87171]",
};

const RecruiterDashboardPage = () => {
    const { data: session } = useSession();

    const userName = session?.user?.name || "Recruiter";

    return (
        <div className="relative min-h-[calc(100vh-88px)] space-y-5 pb-20">

            {/* Welcome */}
            <section>
                <h1 className="text-lg font-semibold tracking-tight text-[#e4e4e7]">
                    Welcome back, {userName}
                </h1>
            </section>

            {/* Statistics */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                    <Card
                        key={stat.title}
                        className="rounded-xl border-[#262629] bg-[#151518] shadow-none"
                    >
                        <CardContent className="p-4">
                            <div className="mb-4 flex h-7 w-7 items-center justify-center rounded-lg bg-[#25252a]">
                                <stat.icon className="h-4 w-4 text-[#dedee3]" />
                            </div>

                            <p className="text-[11px] font-medium text-[#92929b]">
                                {stat.title}
                            </p>

                            <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#e4e4e7]">
                                {stat.value}
                            </h2>
                        </CardContent>
                    </Card>
                ))}
            </section>

            {/* Recent Applications */}
            <section className="space-y-4">

                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-[#e4e4e7]">
                        Recent Applications
                    </h2>

                    <Link
                        href="/dashboard/recruiter/applications"
                        className="text-[11px] font-medium text-[#d4d4d8] transition hover:text-white"
                    >
                        View all
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-[#262629] bg-[#151518]">

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px] border-collapse text-left">

                            <thead>
                                <tr className="border-b border-[#27272a] bg-[#1c1c20] text-[9px] uppercase tracking-wider text-[#85858f]">
                                    <th className="w-[24%] px-5 py-3 font-medium">
                                        Candidate Name
                                    </th>

                                    <th className="w-[20%] px-4 py-3 font-medium">
                                        Role
                                    </th>

                                    <th className="w-[16%] px-4 py-3 font-medium">
                                        Date Applied
                                    </th>

                                    <th className="w-[12%] px-4 py-3 font-medium">
                                        Experience
                                    </th>

                                    <th className="px-4 py-3 font-medium">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {applications.map((application) => (
                                    <tr
                                        key={application.id}
                                        className="border-b border-[#27272a] last:border-0 transition hover:bg-[#1b1b1f]"
                                    >
                                        {/* Candidate */}
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-2.5">
                                                <Avatar className="h-7 w-7 shrink-0">
                                                    <AvatarImage
                                                        src={application.avatar}
                                                        alt={application.name}
                                                    />

                                                    <AvatarFallback className="bg-[#303036] text-[9px] text-white">
                                                        {application.name.slice(0, 2)}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <span className="whitespace-nowrap text-[11px] font-medium text-[#e4e4e7]">
                                                    {application.name}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td className="whitespace-nowrap px-4 py-3 text-[10px] text-[#a1a1aa]">
                                            {application.role}
                                        </td>

                                        {/* Date */}
                                        <td className="whitespace-nowrap px-4 py-3 text-[10px] text-[#a1a1aa]">
                                            {application.date}
                                        </td>

                                        {/* Experience */}
                                        <td className="whitespace-nowrap px-4 py-3 text-[10px] text-[#a1a1aa]">
                                            {application.experience}
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-3">
                                            <Badge
                                                variant="outline"
                                                className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-medium ${statusStyles[application.status]}`}
                                            >
                                                {application.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </section>

            {/* Floating Add Job Button */}
            <Button
                render={
                    <Link
                        href="/dashboard/recruiter/manage-jobs"
                        aria-label="Add new job"
                    />
                }
                nativeButton={false}
                size="icon"
                className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-white text-black shadow-lg hover:bg-[#e4e4e7]"
            >
                <Plus className="h-6 w-6" />
            </Button>

        </div>
    );
};

export default RecruiterDashboardPage;