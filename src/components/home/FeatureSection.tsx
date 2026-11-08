
import {
  Search,
  ChartNoAxesCombined,
  ChartNoAxesColumnIncreasing,
  Bookmark,
  WandSparkles,
  FileText,
  Hexagon,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Find your ideal job with advanced filters.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Salary Insights",
    description:
      "Get real salary data to negotiate confidently.",
  },
  {
    icon: ChartNoAxesColumnIncreasing,
    title: "Top Companies",
    description:
      "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description:
      "Manage apps & favorites on your dashboard.",
  },
  {
    icon: WandSparkles,
    title: "One-Click Apply",
    description:
      "Simplify your job applications for an easier process!",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description:
      "Create professional resumes with modern templates.",
  },
  {
    icon: Hexagon,
    title: "Skill-Based Matching",
    description:
      "Discover jobs that match your skills and experience.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth Resources",
    description:
      "Boost your career with quick interview tips.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#141414] px-5 py-20 sm:px-8 md:py-24">
      <div className="mx-auto max-w-[1140px]">

        {/* Section Header */}
        <div className="mb-9 text-center md:mb-10">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-[5px] w-[5px] bg-[#7557ff]" />

            <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#c4c4c4]">
              Features
            </span>

            <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#c4c4c4]">
              Job
            </span>

            <span className="h-[5px] w-[5px] bg-[#7557ff]" />
          </div>

          <h2 className="mx-auto max-w-[480px] text-[26px] font-medium leading-[1.12] tracking-[-1.1px] text-white sm:text-[30px] md:text-[32px]">
            Everything you need
            <br />
            to succeed
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-x-7 gap-y-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-7">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group flex items-start gap-3"
              >
                {/* Icon Box */}
                <div className="flex size-11 shrink-0 items-center justify-center rounded-[5px] border border-[#292929] bg-[#101010] transition-all duration-300 group-hover:border-[#7557ff]/50 group-hover:bg-[#7557ff]/10">
                  <Icon
                    size={17}
                    strokeWidth={1.7}
                    className="text-[#e9b8fa] transition-colors duration-300 group-hover:text-[#a78bfa]"
                  />
                </div>

                {/* Feature Content */}
                <div className="min-w-0 pt-[1px]">
                  <h3 className="mb-[5px] text-[10px] font-medium leading-[1.4] text-white sm:text-[11px]">
                    {feature.title}
                  </h3>

                  <p className="max-w-[155px] text-[9px] font-normal leading-[1.65] text-[#a3a3a3] sm:text-[10px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}