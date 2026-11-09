"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Lock, Mail, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const formData = new FormData(event.currentTarget);
        const name = String(formData.get("name") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");
        const confirmPassword = String(formData.get("confirmPassword") ?? "");

        if (!name || !email || !password) {
            setError("Please fill in all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setLoading(true);

        try {
            const { data, error: authError } = await authClient.signUp.email({
                name,
                email,
                password,
                callbackURL: "/signin",
            });

            if (authError) {
                setError(authError.message || "Failed to create account. Please try again.");
                setLoading(false);
                return;
            }

            // Successfully registered and account created in MongoDB
            router.push("/signin");
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
                        Create your account
                    </h1>
                    <p className="mx-auto mt-2.5 max-w-[320px] text-[14px] leading-relaxed text-[#9B9B9B]">
                        Join Hireloop and discover opportunities that match
                        your skills — it&apos;s free to get started.
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
                        {/* Name */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="signup-name"
                                className="text-[13px] font-medium text-[#E5E5E5]"
                            >
                                Full name
                            </label>
                            <div className="relative">
                                <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#6B6B6B]" />
                                <Input
                                    // Form-filling browser extensions mutate inputs
                                    // before hydration; ignore attribute diffs here.
                                    suppressHydrationWarning
                                    id="signup-name"
                                    name="name"
                                    type="text"
                                    placeholder="Jane Doe"
                                    autoComplete="name"
                                    required
                                    className="h-11 rounded-[10px] border-[#383838] bg-[#161616] pl-10 pr-3.5 text-[14px] text-white placeholder:text-[#6B6B6B] focus-visible:border-[#6251FF] focus-visible:ring-[#6251FF]/30"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="signup-email"
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
                                    id="signup-email"
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
                            <label
                                htmlFor="signup-password"
                                className="text-[13px] font-medium text-[#E5E5E5]"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#6B6B6B]" />
                                <Input
                                    // Form-filling browser extensions mutate inputs
                                    // before hydration; ignore attribute diffs here.
                                    suppressHydrationWarning
                                    id="signup-password"
                                    name="password"
                                    type="password"
                                    placeholder="at least 8 characters"
                                    autoComplete="new-password"
                                    required
                                    minLength={8}
                                    className="h-11 rounded-[10px] border-[#383838] bg-[#161616] pl-10 pr-3.5 text-[14px] text-white placeholder:text-[#6B6B6B] focus-visible:border-[#6251FF] focus-visible:ring-[#6251FF]/30"
                                />
                            </div>
                        </div>

                        {/* Confirm password */}
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="signup-confirm-password"
                                className="text-[13px] font-medium text-[#E5E5E5]"
                            >
                                Confirm password
                            </label>
                            <div className="relative">
                                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#6B6B6B]" />
                                <Input
                                    // Form-filling browser extensions mutate inputs
                                    // before hydration; ignore attribute diffs here.
                                    suppressHydrationWarning
                                    id="signup-confirm-password"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Re-enter your password"
                                    autoComplete="new-password"
                                    required
                                    minLength={8}
                                    className="h-11 rounded-[10px] border-[#383838] bg-[#161616] pl-10 pr-3.5 text-[14px] text-white placeholder:text-[#6B6B6B] focus-visible:border-[#6251FF] focus-visible:ring-[#6251FF]/30"
                                />
                            </div>
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
                                    Creating account...
                                </span>
                            ) : (
                                "Create Account"
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
                        Already have an account?{" "}
                        <Link
                            href="/signin"
                            className="font-medium text-[#7665FF] transition-colors hover:text-[#9A8DFF]"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
