"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function SigninPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");
        const remember = formData.get("remember") === "on";

        if (!email || !password) {
            setError("Please fill in both email and password.");
            return;
        }

        setLoading(true);

        try {
            const { data, error: authError } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
                rememberMe: remember,
            });

            if (authError) {
                setError(authError.message || "Invalid email or password.");
                setLoading(false);
                return;
            }

            // Successfully signed in
            router.push("/");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "An unexpected error occurred.";
            setError(message);
            setLoading(false);
        }
    };

    return (
        <section className="relative isolate flex flex-1 items-center justify-center overflow-hidden bg-[#050507] px-4 py-14 sm:py-20">
            {/* Background lighting */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.04] to-transparent" />
                <div className="absolute left-1/2 top-[30%] h-[300px] w-[90%] -translate-x-1/2 rounded-full bg-[#6251FF]/[0.12] blur-[120px] sm:h-[400px] sm:w-[560px] sm:blur-[140px]" />
            </div>

            <div className="relative z-10 flex w-full max-w-[420px] flex-col items-center">
                {/* Logo */}
                <Link href="/" className="mb-8 flex items-center">
                    <Image
                        src="/images/logo.png"
                        alt="Hireloop"
                        width={140}
                        height={44}
                        priority
                        className="h-auto w-[120px] object-contain sm:w-[130px]"
                    />
                </Link>

                {/* Heading */}
                <div className="text-center">
                    <h1 className="text-[24px] font-semibold tracking-tight text-white sm:text-[26px]">
                        Welcome back
                    </h1>
                    <p className="mx-auto mt-2.5 max-w-[300px] text-[14px] leading-relaxed text-[#9B9B9B]">
                        Sign in to your Hireloop account to pick up right
                        where you left off.
                    </p>
                </div>

                {/* Card */}
                <div className="mt-8 w-full rounded-[16px] border border-[#2B2B2B] bg-[#1D1D1D]/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-8">
                    {error && (
                        <div className="mb-5 flex items-center gap-2 rounded-[10px] border border-red-500/20 bg-red-500/10 p-3 text-[13px] text-red-400">
                            <AlertCircle className="size-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                    >
                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="signin-email"
                                className="text-[13px] font-medium text-[#E5E5E5]"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#6B6B6B]" />
                                <Input
                                    // Form-filling browser extensions mutate inputs
                                    // before hydration; ignore attribute diffs here.
                                    suppressHydrationWarning
                                    id="signin-email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                    className="h-11 rounded-[10px] border-[#383838] bg-[#161616] pl-10 pr-3.5 text-[14px] text-white placeholder:text-[#6B6B6B] focus-visible:border-[#6251FF] focus-visible:ring-[#6251FF]/30"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="signin-password"
                                    className="text-[13px] font-medium text-[#E5E5E5]"
                                >
                                    Password
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-[12px] text-[#7665FF] transition-colors hover:text-[#9A8DFF]"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#6B6B6B]" />
                                <Input
                                    // Form-filling browser extensions mutate inputs
                                    // before hydration; ignore attribute diffs here.
                                    suppressHydrationWarning
                                    id="signin-password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    className="h-11 rounded-[10px] border-[#383838] bg-[#161616] pl-10 pr-3.5 text-[14px] text-white placeholder:text-[#6B6B6B] focus-visible:border-[#6251FF] focus-visible:ring-[#6251FF]/30"
                                />
                            </div>
                        </div>

                        {/* Remember me + submit */}
                        <div className="mt-1 flex items-center justify-between">
                            <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-[#9B9B9B]">
                                <input
                                    name="remember"
                                    type="checkbox"
                                    defaultChecked
                                    className="size-4 cursor-pointer rounded border-[#383838] bg-[#161616] accent-[#6251FF]"
                                />
                                Remember me
                            </label>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            disabled={loading}
                            className="h-11 w-full rounded-[10px] bg-[#6251FF] text-[14px] font-medium text-white shadow-[0_2px_14px_rgba(98,81,255,0.35)] hover:bg-[#7465FF] disabled:opacity-60"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="size-4 animate-spin" />
                                    Signing in...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#383838]" />
                        <span className="text-[11px] uppercase tracking-wide text-[#6B6B6B]">
                            or
                        </span>
                        <div className="h-px flex-1 bg-[#383838]" />
                    </div>

                    <p className="text-center text-[13px] text-[#9B9B9B]">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-medium text-[#7665FF] transition-colors hover:text-[#9A8DFF]"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
