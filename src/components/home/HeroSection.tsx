
"use client";

import Image from "next/image";
import {
    Search,
    MapPin,
    BriefcaseBusiness,
    BarChart3,
    UserSearch,
    Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const stats = [
    {
        icon: BriefcaseBusiness,
        value: "50K",
        label: "Active Jobs",
    },
    {
        icon: BarChart3,
        value: "12K",
        label: "Companies",
    },
    {
        icon: UserSearch,
        value: "2M",
        label: "Job Seekers",
    },
    {
        icon: Star,
        value: "97%",
        label: "Satisfaction Rate",
    },
];

const trending = [
    "Product Designer",
    "AI Engineering",
    "Dev-ops Engineer",
];

export default function HeroSection() {
    return (
        <section className="relative isolate min-h-screen overflow-hidden bg-[#050507] pb-10 text-white sm:pb-16 lg:pb-20">

            {/* Background lighting */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.04] to-transparent" />

                <div className="absolute left-1/2 top-[32%] h-[300px] w-[90%] -translate-x-1/2 rounded-full bg-blue-600/[0.07] blur-[120px] sm:h-[400px] sm:w-[600px] sm:blur-[140px]" />
            </div>

            {/* Hero content */}
            <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-12 text-center sm:px-6 sm:pt-16 md:pt-20 lg:pt-16">

                {/* Jobs badge */}
                <div className="mb-5 flex w-full max-w-[480px] items-center justify-center gap-2 sm:mb-6 sm:gap-3">

                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-white/30" />

                    <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-[#121215]/90 px-2.5 py-1.5 shadow-[0_0_20px_rgba(255,255,255,0.04)] backdrop-blur-md sm:gap-2 sm:px-3.5">

                        <span
                            className="select-none text-xs leading-none sm:text-sm"
                            role="img"
                            aria-label="briefcase"
                        >
                            💼
                        </span>

                        <span className="text-[10px] font-bold tracking-tight text-white sm:text-xs">
                            50,000+
                        </span>

                        <span className="text-[9px] font-medium uppercase tracking-wider text-white/50 sm:text-[11px]">
                            NEW JOBS THIS MONTH
                        </span>
                    </div>

                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/15 to-white/30" />
                </div>

                {/* Heading */}
                <h1 className="max-w-3xl text-[30px] font-semibold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-[54px]">
                    Find Your Dream Job Today
                </h1>

                {/* Description */}
                <p className="mt-3 max-w-xl text-xs leading-6 text-white/55 sm:mt-3.5 sm:text-sm md:text-base">
                    HireLoop connects top talent with world-class companies.
                    Browse thousands of curated opportunities and land your
                    next role — faster.
                </p>

                {/* Search bar */}
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="mt-6 flex w-full max-w-[620px] flex-col gap-2 rounded-2xl border border-white/10 bg-[#121215]/95 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md sm:mt-7 sm:flex-row sm:items-center sm:gap-0"
                >
                    <div className="flex min-w-0 flex-1 items-center gap-2.5 px-2 sm:px-3">
                        <Search className="h-4 w-4 shrink-0 text-white/40" />

                        <Input
                            placeholder="Job title, skill or company"
                            aria-label="Job title, skill or company"
                            className="h-9 min-w-0 border-0 bg-transparent px-0 text-xs text-white shadow-none placeholder:text-white/40 focus-visible:ring-0 sm:text-sm"
                        />
                    </div>

                    <div className="hidden h-5 w-px bg-white/10 sm:block" />

                    <div className="flex min-w-0 flex-1 items-center gap-2.5 px-2 sm:px-3">
                        <MapPin className="h-4 w-4 shrink-0 text-white/40" />

                        <Input
                            placeholder="Location or Remote"
                            aria-label="Location or Remote"
                            className="h-9 min-w-0 border-0 bg-transparent px-0 text-xs text-white shadow-none placeholder:text-white/40 focus-visible:ring-0 sm:text-sm"
                        />
                    </div>

                    <Button
                        type="submit"
                        size="icon"
                        aria-label="Search jobs"
                        className="h-9 w-full shrink-0 rounded-xl bg-[#5c50f0] text-white shadow-[0_0_15px_rgba(92,80,240,0.35)] transition-colors hover:bg-[#4d41e2] sm:h-9 sm:w-9"
                    >
                        <Search className="h-4 w-4" />
                    </Button>
                </form>

                {/* Trending positions */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 px-2">

                    <span className="mr-1 text-[10px] text-white/45 sm:text-[11px]">
                        Trending Position
                    </span>

                    {trending.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className="rounded-full border border-white/10 bg-[#121215]/80 px-2.5 py-1 text-[10px] text-white/75 transition-colors hover:border-white/20 hover:text-white sm:px-3 sm:text-[11px]"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Globe section */}
            <div className="relative mx-auto mt-8 w-full max-w-[1150px] px-3 sm:mt-10 sm:px-6">

                {/* Background stars */}
                <div className="pointer-events-none absolute inset-0 -top-10 overflow-hidden">
                    <div className="absolute left-[10%] top-[12%] h-1 w-1 rounded-full bg-white/40 blur-[0.5px]" />
                    <div className="absolute left-[18%] top-[24%] h-1 w-1 rounded-full bg-blue-300/35" />
                    <div className="absolute left-[26%] top-[8%] h-1.5 w-1.5 rounded-full bg-white/50 blur-[0.5px]" />
                    <div className="absolute left-[6%] top-[40%] h-1 w-1 rounded-full bg-white/25" />
                    <div className="absolute right-[12%] top-[14%] h-1 w-1 rounded-full bg-white/40" />
                    <div className="absolute right-[20%] top-[22%] h-1.5 w-1.5 rounded-full bg-blue-200/50 blur-[0.5px]" />
                    <div className="absolute right-[28%] top-[10%] h-1 w-1 rounded-full bg-white/35" />
                    <div className="absolute right-[7%] top-[42%] h-1 w-1 rounded-full bg-white/25" />
                </div>

                {/* Globe wrapper */}
                <div className="relative mx-auto w-full max-w-[1100px] aspect-auto sm:aspect-[4/3] md:aspect-[1440/850] lg:aspect-[1440/620]">

                    {/* Globe visual area */}
                    <div className="relative w-full aspect-[1440/850] sm:absolute sm:inset-0 sm:aspect-auto">

                        {/* Blue atmospheric glow */}
                        <div className="pointer-events-none absolute left-1/2 top-[6%] h-[180px] w-[90%] -translate-x-1/2 rounded-full bg-[#2e54ff]/30 blur-[70px] sm:h-[260px] sm:w-[82%] sm:blur-[90px] md:h-[300px]" />

                        <div className="pointer-events-none absolute left-1/2 top-0 h-[120px] w-[65%] -translate-x-1/2 rounded-full bg-[#4169e1]/25 blur-[60px] sm:h-[150px] sm:w-[55%] sm:blur-[70px]" />

                        {/* Globe image */}
                        <Image
                            src="/images/globe-blue.png"
                            alt="Glowing globe representing a global job network"
                            fill
                            priority
                            unoptimized
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1100px"
                            className="object-contain object-top mix-blend-screen"
                        />

                        {/* Globe text */}
                        <div className="absolute left-1/2 top-[35%] z-10 w-full -translate-x-1/2 px-3 text-center sm:top-[34%] sm:px-4 md:top-[36%] lg:top-[39%]">

                            <p className="mx-auto max-w-lg text-[14px] font-light leading-relaxed tracking-tight text-white/95 sm:text-xl md:text-2xl lg:text-[27px]">
                                Assisting over{" "}
                                <span className="font-semibold text-white">
                                    15,000
                                </span>{" "}
                                job seekers
                                <br />
                                find their dream positions.
                            </p>
                        </div>
                    </div>

                    {/* Statistics cards */}
                    <div className="relative mt-5 grid grid-cols-2 gap-2 sm:absolute sm:inset-x-0 sm:bottom-0 sm:mt-0 sm:gap-3 md:grid-cols-4 md:gap-3 lg:gap-4">

                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.label}
                                    className="flex min-h-[90px] flex-col justify-between rounded-xl border border-white/[0.08] bg-[#0c0c0e]/95 p-3 shadow-[0_12px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 sm:min-h-[110px] sm:rounded-2xl sm:p-4 md:min-h-[115px] lg:min-h-[125px] lg:p-5"
                                >
                                    <Icon className="h-3.5 w-3.5 text-white/70 sm:h-4 sm:w-4" />

                                    <div>
                                        <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
                                            {stat.value}
                                        </p>

                                        <p className="mt-1 text-[10px] text-white/55 sm:mt-1.5 sm:text-xs">
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}