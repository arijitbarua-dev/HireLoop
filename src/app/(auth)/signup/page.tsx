"use client";

import { Suspense, use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Briefcase, Info, Loader2, Lock, Mail, ShieldCheck, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { oauthErrorMessage } from "@/lib/oauth-errors";

const ROLES = [
    { value: "seeker", label: "Seeker", icon: User },
    { value: "recruiter", label: "Recruiter", icon: Briefcase },
    { value: "admin", label: "Admin", icon: ShieldCheck },
] as const;

type Role = (typeof ROLES)[number]["value"];

// Reading searchParams is uncached runtime data, so the streamed
// content sits behind a Suspense boundary to keep a prerenderable
// static shell for the page.
function AuthFallback() {
    return (
        <section className="relative isolate flex flex-1 items-center justify-center overflow-hidden bg-[#050507] px-4 py-14 sm:py-20">
            <Loader2 className="size-5 animate-spin text-[#6251FF]" />
        </section>
    );
}

export default function SignupPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    return (
        <Suspense fallback={<AuthFallback />}>
            <SignupContent searchParams={searchParams} />
        </Suspense>
    );
}

function SignupContent({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const router = useRouter();
    const params = use(searchParams);
    const fromGoogleSignin = params.google === "signup";
    const oauthError = typeof params.error === "string" ? params.error : null;
    const [error, setError] = useState<string | null>(
        oauthError && oauthError !== "signup_disabled"
            ? oauthErrorMessage(oauthError)
            : null
    );
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [role, setRole] = useState<Role>("seeker");

    // The sign-in page sends brand-new Google users here (and Google
    // sign-up errors land here) so they can pick an account type and
    // complete registration.
    const notice =
        fromGoogleSignin || oauthError === "signup_disabled"
            ? "Your Google account doesn't have a Hireloop account yet. Choose an account type and continue with Google to finish signing up."
            : null;

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
                role,
                callbackURL: "/signin",
            });

            if (authError) {
                setError(authError.message || "Failed to create account. Please try again.");
                setLoading(false);
                return;
            }

            // Successfully registered. better-auth auto-creates a session
            // on signup — clear it so the user lands signed out on the
            // sign-in page and must sign in explicitly.
            await authClient.signOut();
            router.push("/signin");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "An unexpected error occurred.";
            setError(message);
            setLoading(false);
        }
    };

    // Google signup redirects to Google, so no callback handling needed
    // here. requestSignUp is required because implicit sign-up is
    // disabled for Google sign-ins started elsewhere (e.g. the sign-in
    // page), and the selected account type rides the OAuth state to the
    // server, where the user record is created with it.
    const handleGoogleSignup = async () => {
        setError(null);
        setGoogleLoading(true);

        try {
            const { error: authError } = await authClient.signIn.social({
                provider: "google",
                requestSignUp: true,
                additionalData: { role },
                callbackURL: "/",
                errorCallbackURL: "/signup",
            });

            if (authError) {
                setError(
                    authError.message ||
                        "Failed to sign up with Google. Please try again."
                );
                setGoogleLoading(false);
            }
        } catch (err: unknown) {
            const message =
                err instanceof Error
                    ? err.message
                    : "An unexpected error occurred.";
            setError(message);
            setGoogleLoading(false);
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
                    {notice && (
                        <div className="mb-5 flex items-center gap-2 rounded-[10px] border border-[#6251FF]/25 bg-[#6251FF]/10 p-3 text-[13px] text-[#B4A8FF]">
                            <Info className="size-4 shrink-0" />
                            <span>{notice}</span>
                        </div>
                    )}

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
                        {/* Account type */}
                        <div className="flex flex-col gap-2">
                            <span className="text-[13px] font-medium text-[#E5E5E5]">
                                Account type
                            </span>
                            <div className="grid grid-cols-3 gap-2.5">
                                {ROLES.map((option) => (
                                    <label
                                        key={option.value}
                                        className="relative flex cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value={option.value}
                                            checked={role === option.value}
                                            onChange={() => setRole(option.value)}
                                            className="peer sr-only"
                                        />
                                        <div className="flex w-full flex-col items-center gap-1.5 rounded-[10px] border border-[#383838] bg-[#161616] px-2 py-3 text-center text-[#9B9B9B] transition-colors hover:border-[#4A4A4A] peer-checked:border-[#6251FF] peer-checked:bg-[#6251FF]/10 peer-checked:text-white">
                                            <option.icon className="size-4" />
                                            <span className="text-[13px] font-medium">
                                                {option.label}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                        
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

                    {/* Google */}
                    <button
                        type="button"
                        onClick={handleGoogleSignup}
                        disabled={googleLoading}
                        className="flex h-11 w-full items-center justify-center gap-2.5 rounded-[10px] border border-[#383838] bg-[#161616] text-[14px] font-medium text-white transition-colors hover:border-[#4A4A4A] hover:bg-[#202020] disabled:opacity-60"
                    >
                        {googleLoading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="size-4 animate-spin" />
                                Redirecting...
                            </span>
                        ) : (
                            <>
                                <FcGoogle className="size-[18px]" />
                                Sign up with Google
                            </>
                        )}
                    </button>

                    <p className="mt-6 text-center text-[13px] text-[#9B9B9B]">
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