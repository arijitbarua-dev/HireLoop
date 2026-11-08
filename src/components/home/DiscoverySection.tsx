
import {
    ArrowRight,
    MapPin,
    Layers3,
    Euro,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        description:
            "Showcase your commitment to diversity and inclusion by highlighting initiatives",
        location: "New York, USA",
        type: "Hybrid",
        salary: "€25–€40/hour",
    },
    {
        id: 2,
        title: "Frontend Developer",
        description:
            "Showcase your commitment to diversity and inclusion by highlighting initiatives",
        location: "New York, USA",
        type: "Hybrid",
        salary: "€25–€40/hour",
    },
    {
        id: 3,
        title: "Frontend Developer",
        description:
            "Showcase your commitment to diversity and inclusion by highlighting initiatives",
        location: "New York, USA",
        type: "Hybrid",
        salary: "€25–€40/hour",
    },
    {
        id: 4,
        title: "Frontend Developer",
        description:
            "Showcase your commitment to diversity and inclusion by highlighting initiatives",
        location: "New York, USA",
        type: "Hybrid",
        salary: "€25–€40/hour",
    },
    {
        id: 5,
        title: "Frontend Developer",
        description:
            "Showcase your commitment to diversity and inclusion by highlighting initiatives",
        location: "New York, USA",
        type: "Hybrid",
        salary: "€25–€40/hour",
    },
    {
        id: 6,
        title: "Frontend Developer",
        description:
            "Showcase your commitment to diversity and inclusion by highlighting initiatives",
        location: "New York, USA",
        type: "Hybrid",
        salary: "€25–€40/hour",
    },
];

export default function JobDiscovery() {
    return (
        <section
            id="discovery"
            className="w-full border-b border-white/10 bg-black px-5 py-20 sm:px-8 lg:px-10 lg:py-24"
        >
            <div className="mx-auto max-w-[1120px]">

                {/* Section Heading */}
                <div className="mx-auto mb-10 max-w-xl text-center sm:mb-12">

                    <div className="mb-4 flex items-center justify-center gap-2">
                        <span className="h-1 w-1 bg-[#7657ff]" />

                        <span className="font-mono text-[11px] uppercase tracking-wide text-white/65">
                            Smart Job Discovery
                        </span>

                        <span className="h-1 w-1 bg-[#7657ff]" />
                    </div>

                    <h2 className="text-[30px] font-medium leading-[1.12] tracking-[-1.3px] text-white sm:text-[36px] lg:text-[40px]">
                        The roles you'd never
                        <br />
                        find by searching
                    </h2>
                </div>

                {/* Job Cards Grid */}
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

                    {jobs.map((job) => (
                        <Card
                            key={job.id}
                            className="group min-h-[198px] rounded-[14px] border-none bg-[#171717] p-0 text-white shadow-none ring-0 outline-none transition-colors duration-300 hover:bg-[#1d1d1d]"
                        >
                            <CardContent className="flex h-full flex-col p-[13px]">

                                {/* Job Title */}
                                <h3 className="mb-2 text-[17px] font-medium leading-tight tracking-[-0.5px]">
                                    {job.title}
                                </h3>

                                {/* Job Description */}
                                <p className="max-w-[290px] text-[10px] leading-[1.7] text-white/45">
                                    {job.description}
                                </p>

                                {/* Job Metadata */}
                                <div className="mt-4 flex flex-wrap items-center gap-1.5">

                                    <Badge
                                        variant="secondary"
                                        className="h-[21px] gap-1.5 rounded-full border-0 bg-[#242424] px-2 text-[9px] font-normal text-white hover:bg-[#242424]"
                                    >
                                        <MapPin className="h-[10px] w-[10px] fill-[#e6a5f6] text-[#e6a5f6]" />
                                        {job.location}
                                    </Badge>

                                    <Badge
                                        variant="secondary"
                                        className="h-[21px] gap-1.5 rounded-full border-0 bg-[#242424] px-2 text-[9px] font-normal text-white hover:bg-[#242424]"
                                    >
                                        <Layers3 className="h-[10px] w-[10px] fill-[#e6a5f6] text-[#e6a5f6]" />
                                        {job.type}
                                    </Badge>

                                    <Badge
                                        variant="secondary"
                                        className="h-[21px] gap-1.5 rounded-full border-0 bg-[#242424] px-2 text-[9px] font-normal text-white hover:bg-[#242424]"
                                    >
                                        <Euro className="h-[10px] w-[10px] text-[#e6a5f6]" />
                                        {job.salary}
                                    </Badge>

                                </div>

                                {/* Apply Now */}
                                <a
                                    href={`/jobs/${job.id}`}
                                    className="mt-auto flex w-fit items-center gap-1.5 pt-5 pl-3 text-[10px] font-medium text-white transition-colors hover:text-[#c6adff]"
                                >
                                    Apply Now

                                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                                </a>

                            </CardContent>
                        </Card>
                    ))}

                </div>

                {/* View All Jobs */}
                <div className="mt-6 flex justify-center">
                    <Button
                        className="h-9 rounded-md bg-white px-4 text-black hover:bg-white/90"
                    >
                        View all jobs
                    </Button>
                </div>

            </div>
        </section>
    );
}