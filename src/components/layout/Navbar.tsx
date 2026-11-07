
"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
];

function Logo() {
    return (
        <Link href="/" className="flex shrink-0 items-center">
            <Image
                src="/images/logo.png"
                alt="Hireloop"
                width={120}
                height={40}
                priority
                className="h-auto w-[100px] object-contain sm:w-[110px]"
            />
        </Link>
    );
}

export default function Navbar() {
    return (
        <header className="w-full bg-[#222222] px-4 py-[18px] sm:px-6 lg:px-9">
            <nav className="mx-auto flex h-[48px] max-w-[1200px] items-center justify-between rounded-[13px] bg-[#1D1D1D] px-4 sm:px-6 lg:px-4">

                {/* Logo */}
                <Logo />

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-5 md:flex lg:gap-7">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="whitespace-nowrap text-[11px] font-normal text-[#E5E5E5] transition-colors hover:text-white lg:text-[12px]"
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Divider */}
                    <div className="h-[17px] w-px bg-[#383838]" />

                    {/* Sign In */}
                    <Link
                        href="/signin"
                        className="whitespace-nowrap text-[12px] font-medium text-[#7665FF] transition-colors hover:text-[#9A8DFF]"
                    >
                        Sign In
                    </Link>

                    {/* Get Started */}
                    <Link
                        href="/signup"
                        className="inline-flex h-[35px] items-center justify-center rounded-[9px] bg-[#6251FF] px-4 text-[12px] font-medium text-white shadow-[0_2px_10px_rgba(98,81,255,0.2)] transition-colors hover:bg-[#7465FF] lg:px-[17px]"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-9 text-white hover:bg-white/10 hover:text-white"
                                    aria-label="Open navigation menu"
                                />
                            }
                        >
                            <Menu className="size-5" />
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="border-[#353535] bg-[#1D1D1D] text-white"
                        >
                            <SheetHeader>
                                <SheetTitle className="text-left text-white">
                                    <Logo />
                                </SheetTitle>

                                <SheetDescription className="text-left text-gray-400">
                                    Explore Hireloop
                                </SheetDescription>
                            </SheetHeader>

                            <div className="mt-8 flex flex-col gap-2 px-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="rounded-lg px-3 py-3 text-sm text-gray-200 transition-colors hover:bg-white/10 hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                {/* Divider */}
                                <div className="my-3 h-px bg-[#383838]" />

                                {/* Sign In */}
                                <Link
                                    href="/signin"
                                    className="rounded-lg px-3 py-3 text-sm font-medium text-[#887AFF] hover:bg-white/10"
                                >
                                    Sign In
                                </Link>

                                {/* Get Started */}
                                <Link
                                    href="/signup"
                                    className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#6251FF] text-white transition-colors hover:bg-[#7465FF]"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}