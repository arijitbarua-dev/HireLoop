
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LogOut, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";

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

function UserAvatar({ image, name }: { image?: string | null; name: string }) {
    if (image) {
        // Google profile photos come from arbitrary hosts, so a plain img
        // (not next/image) avoids remotePatterns config.
        // eslint-disable-next-line @next/next/no-img-element
        return (
            <img
                src={image}
                alt={name}
                referrerPolicy="no-referrer"
                className="size-8 shrink-0 rounded-full border border-[#383838] object-cover"
            />
        );
    }

    return (
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#6251FF] text-[12px] font-semibold text-white">
            {name.trim().charAt(0).toUpperCase() || "U"}
        </span>
    );
}

export default function Navbar() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut();
        router.replace("/");
        router.refresh();
    };

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

                    {isPending ? (
                        // Placeholder while the session resolves to avoid
                        // a flash of signed-out state.
                        <div className="h-[35px] w-[150px] animate-pulse rounded-[9px] bg-white/5" />
                    ) : user ? (
                        <>
                            {/* Signed in: avatar + name + sign out */}
                            <div className="flex items-center gap-3">
                                <div className="flex min-w-0 items-center gap-2.5">
                                    <UserAvatar
                                        image={user.image}
                                        name={user.name}
                                    />
                                    <span className="max-w-[140px] truncate whitespace-nowrap text-[12px] font-medium text-[#E5E5E5]">
                                        {user.name}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleSignOut}
                                    title="Sign out"
                                    aria-label="Sign out"
                                    className="flex size-8 items-center justify-center rounded-full text-[#9B9B9B] transition-colors hover:bg-white/10 hover:text-white"
                                >
                                    <LogOut className="size-4" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
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

                                {isPending ? null : user ? (
                                    // Signed in: account info + sign out
                                    <>
                                        <div className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-3">
                                            <UserAvatar
                                                image={user.image}
                                                name={user.name}
                                            />
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium text-white">
                                                    {user.name}
                                                </p>
                                                <p className="truncate text-xs text-[#9B9B9B]">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleSignOut}
                                            className="mt-2 rounded-lg px-3 py-3 text-left text-sm font-medium text-[#9B9B9B] transition-colors hover:bg-white/10 hover:text-white"
                                        >
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
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
                                    </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </header>
    );
}