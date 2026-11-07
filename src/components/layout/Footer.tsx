
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaPinterestP, FaLinkedinIn } from "react-icons/fa";

const footerLinks = [
    {
        title: "Product",
        links: [
            { label: "Job discovery", href: "/jobs" },
            { label: "Worker AI", href: "/worker-ai" },
            { label: "Companies", href: "/companies" },
            { label: "Salary data", href: "/salary-data" },
        ],
    },
    {
        title: "Navigations",
        links: [
            { label: "Help center", href: "/help-center" },
            { label: "Career library", href: "/career-library" },
            { label: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Brand Guideline", href: "/brand-guideline" },
            { label: "Newsroom", href: "/newsroom" },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="relative w-full overflow-hidden bg-black text-white">

            {/* Subtle Background Grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
          `,
                    backgroundSize: "42px 42px",
                    maskImage:
                        "linear-gradient(to bottom, black, transparent 75%)",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, black, transparent 75%)",
                }}
            />

            <div className="relative mx-auto max-w-[1200px] px-6 pb-7 pt-12 sm:px-8 lg:px-9 lg:pt-14">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.8fr_0.55fr_0.55fr_0.55fr] lg:gap-10">

                    {/* Brand Section */}
                    <div className="flex flex-col items-start">

                        <Link href="/" className="inline-flex items-center">
                            <Image
                                src="/images/logo.png"
                                alt="Hireloop"
                                width={120}
                                height={40}
                                className="h-auto w-[100px] object-contain"
                            />
                        </Link>

                        <p className="mt-5 max-w-[280px] text-[11px] leading-[21px] text-[#777777]">
                            The AI-native career platform. Built for
                            people who take their work seriously.
                        </p>
                    </div>

                    {/* Footer Link Columns */}
                    {footerLinks.map((column) => (
                        <div key={column.title} className="flex flex-col items-start">
                            <h3 className="mb-5 text-[12px] font-medium text-[#6554FF]">
                                {column.title}
                            </h3>

                            <ul className="flex flex-col gap-[11px]">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-[11px] text-[#777777] transition-colors duration-200 hover:text-white"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>

                {/* Bottom Footer */}
                <div className="mt-12 flex flex-col gap-6 sm:mt-14 lg:mt-12 lg:flex-row lg:items-center lg:justify-between">

                    {/* Social Icons */}
                    <div className="flex items-center gap-2">
                        <Link
                            href="https://facebook.com"
                            target="_blank"
                            aria-label="Facebook"
                            className="flex size-[27px] items-center justify-center rounded-[5px] bg-[#171717] text-[#A0A0A0] transition-colors hover:bg-[#1877F2] hover:text-white"
                        >
                            <FaFacebookF size={16} />
                        </Link>

                        <Link
                            href="https://pinterest.com"
                            target="_blank"
                            aria-label="Pinterest"
                            className="flex size-[27px] items-center justify-center rounded-[5px] bg-[#29276D] text-[#B7AFFF] transition-colors hover:bg-[#E60023] hover:text-white"
                        >
                            <FaPinterestP size={16} />
                        </Link>

                        <Link
                            href="https://linkedin.com"
                            target="_blank"
                            aria-label="LinkedIn"
                            className="flex size-[27px] items-center justify-center rounded-[5px] bg-[#171717] text-[#A0A0A0] transition-colors hover:bg-[#0A66C2] hover:text-white"
                        >
                            <FaLinkedinIn size={16} />
                        </Link>
                    </div>

                    {/* Copyright & Legal Links */}
                    <div className="flex flex-col gap-3 text-[10px] text-[#666666] sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">

                        <p>
                            Copyright 2024 —Programming Hero
                        </p>

                        <div className="flex flex-wrap items-center gap-1">
                            <Link
                                href="/terms"
                                className="transition-colors hover:text-white"
                            >
                                Terms & Policy
                            </Link>

                            <span>-</span>

                            <Link
                                href="/privacy"
                                className="transition-colors hover:text-white"
                            >
                                Privacy Guideline
                            </Link>
                        </div>

                    </div>

                </div>
            </div>
        </footer>
    );
}