
"use client";

import { useState } from "react";
import {
  Crown,
  ChartNoAxesCombined,
  Zap,
  Plus,
  ArrowRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Starter",
    icon: Crown,
    monthlyPrice: 0,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    icon: ChartNoAxesCombined,
    monthlyPrice: 17,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    icon: Zap,
    monthlyPrice: 99,
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    highlighted: false,
  },
];

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="w-full overflow-hidden bg-black px-5 py-20 sm:px-8 md:py-24">
      <div className="mx-auto max-w-[1120px]">

        {/* Heading */}
        <div className="mb-9 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="h-[5px] w-[5px] bg-[#7255ff]" />

            <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#b8b8b8]">
              Pricing
            </span>

            <span className="h-[5px] w-[5px] bg-[#7255ff]" />
          </div>

          <h2 className="mx-auto max-w-[480px] text-[27px] font-medium leading-[1.12] tracking-[-1.2px] text-white sm:text-[32px] md:text-[36px]">
            Pay for the leverage,
            <br />
            not the listings
          </h2>
        </div>

        {/* Billing Toggle */}
        <div className="mb-[13px] flex justify-center">
          <div className="flex items-center gap-1 rounded-full border border-[#292929] bg-[#242424] p-1">

            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-3 py-[6px] text-[10px] font-medium transition-all ${
                billing === "monthly"
                  ? "bg-white text-black"
                  : "text-white hover:text-gray-300"
              }`}
            >
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={`flex items-center gap-1.5 rounded-full px-2 py-[6px] text-[10px] font-medium transition-all ${
                billing === "yearly"
                  ? "bg-white text-black"
                  : "text-white hover:text-gray-300"
              }`}
            >
              Yearly

              <Badge className="h-[15px] rounded-full border-0 bg-[#e000d4] px-1.5 text-[9px] font-medium text-white hover:bg-[#e000d4]">
                25%
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto grid w-full max-w-[720px] grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-3">

          {plans.map((plan) => {
            const Icon = plan.icon;

            const price =
              billing === "yearly"
                ? plan.monthlyPrice * 0.75
                : plan.monthlyPrice;

            return (
              <Card
                key={plan.name}
                className={`
                  !flex !h-[246px] !min-h-[246px] !w-full
                  !flex-col !gap-0 !overflow-hidden
                  !rounded-[15px] !border !p-0 !shadow-none
                  ${
                    plan.highlighted
                      ? "!border-[#303030] !bg-gradient-to-b !from-[#202020] !to-[#111111]"
                      : "!border-[#242424] !bg-black"
                  }
                `}
              >

                {/* Card Header */}
                <CardHeader className="!shrink-0 !gap-0 !px-3 !pt-3 !pb-0">

                  <div className="flex items-center justify-between gap-2">

                    <div className="flex min-w-0 items-center gap-2">

                      <div className="flex size-[23px] shrink-0 items-center justify-center rounded-[5px] border border-[#292929] bg-[#090909]">
                        <Icon
                          size={13}
                          strokeWidth={1.8}
                          className="text-[#edb9f8]"
                        />
                      </div>

                      <h3 className="text-[13px] font-normal text-white">
                        {plan.name}
                      </h3>
                    </div>

                    <div className="flex shrink-0 items-baseline gap-1">
                      <span className="text-[24px] font-semibold leading-none tracking-[-1px] text-white">
                        ${Number.isInteger(price) ? price : price.toFixed(2)}
                      </span>

                      <span className="text-[8px] text-[#c2c2c2]">
                        /month
                      </span>
                    </div>
                  </div>
                </CardHeader>

                {/* Card Content */}
                <CardContent className="!flex-1 !px-3 !pt-5 !pb-2">

                  <p className="mb-2 text-[10px] font-normal text-white">
                    Start building your insights hub:
                  </p>

                  <ul className="space-y-[7px]">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2"
                      >
                        <span className="flex size-[13px] shrink-0 items-center justify-center rounded-[4px] bg-[#292929]">
                          <Plus
                            size={10}
                            strokeWidth={1.8}
                            className="text-white"
                          />
                        </span>

                        <span className="text-[9px] font-normal leading-4 text-[#a5a5a5]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                {/* Card Footer */}
                <CardFooter className="!mt-auto !shrink-0 !px-3 !pt-2 !pb-3">

                  <Button
                    type="button"
                    className={`group !h-[31px] !w-full !justify-between !rounded-[7px] !px-3 text-[9px] font-medium transition-all ${
                      plan.highlighted
                        ? "!bg-white !text-black hover:!bg-[#e8e8e8]"
                        : "!bg-[#292929] !text-white hover:!bg-[#383838]"
                    }`}
                  >
                    Choose This Plan

                    <ArrowRight
                      size={13}
                      strokeWidth={1.6}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Button>

                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}