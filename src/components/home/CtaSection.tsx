
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="relative isolate flex min-h-[331px] w-full items-center justify-center overflow-hidden bg-[#030305] text-white">

      {/* Full-size Globe Background */}
      <img
        src="/images/cta-bg.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 -z-10 h-auto w-full object-contain object-top"
      />

      {/* Purple Glow Inside Globe */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full"
        style={{
          background: `
            radial-gradient(
              ellipse 35% 65% at 50% 35%,
              rgba(105, 80, 255, 0.24) 0%,
              rgba(85, 65, 220, 0.15) 35%,
              rgba(65, 50, 180, 0.07) 60%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-[#030305]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[760px] flex-col items-center px-6 pb-[26px] pt-[72px] text-center">

        {/* Heading */}
        <h2 className="text-[clamp(27px,4vw,34px)] font-medium leading-[1.24] tracking-[-1.5px] text-white">
          Your next role is
          <br className="hidden sm:block" />
          already looking for you
        </h2>

        {/* Description */}
        <p className="mb-[26px] mt-3 max-w-[500px] text-[11px] font-normal leading-relaxed tracking-[-0.1px] text-white/60">
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-[9px]">

          <Link href="/signup">
            <Button className="h-[33px] rounded-[7px] border border-white bg-white px-[13px] text-[10px] font-medium text-black shadow-none transition-colors hover:bg-neutral-200 hover:text-black">
              Create a free account
            </Button>
          </Link>

          <Link href="/pricing">
            <Button
              variant="outline"
              className="h-[33px] rounded-[7px] border border-white/15 bg-[#100e18]/80 px-[13px] text-[10px] font-normal text-white shadow-none transition-colors hover:border-white/30 hover:bg-[#413764]/50 hover:text-white"
            >
              View pricing
            </Button>
          </Link>

        </div>
      </div>
    </section>
  );
}