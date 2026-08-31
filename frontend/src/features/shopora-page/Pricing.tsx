"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { BillingCycle, PLANS } from "@/src/lib/constants/pricing";
import { NumberTicker } from "@/src/components/ui/number-ticker";

export default function Pricing() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const plans = PLANS[billing];

  return (
    <section className="w-full px-6 mb-40">
      <div className="mx-auto max-w-5xl">
        <div className="px-8">
          <h4 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight text-black lg:text-5xl lg:leading-tight dark:text-white">
            A plan for every stage of your store
          </h4>

          <p className="mx-auto my-4 max-w-2xl text-center text-sm font-normal text-neutral-500 lg:text-base dark:text-neutral-300">
            Start free, upgrade when you&apos;re ready to grow, and customize
            when your business outgrows the template.
          </p>
        </div>

        <div className="flex justify-center mb-14">
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                billing === "monthly"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("annual")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                billing === "annual"
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Annual
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  billing === "annual"
                    ? "bg-emerald-500 text-white"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`relative rounded-2xl bg-white p-8 flex flex-col h-full ${
                plan.popular
                  ? "border-2 border-neutral-900 shadow-lg md:-translate-y-3"
                  : "border border-neutral-200"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-8 bg-neutral-900 text-white text-xs font-medium px-3 py-1 rounded-full">
                  Popular
                </span>
              )}

              <h3 className="text-lg font-semibold text-neutral-900">
                {plan.name}
              </h3>
              <p className="mt-1 text-sm text-neutral-500 min-h-10">
                {plan.tagline}
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                {plan.price === null ? (
                  <span className="text-5xl font-semibold tracking-tight text-neutral-900">
                    Custom
                  </span>
                ) : (
                  <>
                    <span className="text-5xl font-semibold tracking-tight text-neutral-900">
                      $
                    </span>
                    <NumberTicker
                      value={plan.price}
                      className="text-5xl font-semibold tracking-tight text-neutral-900"
                    />
                  </>
                )}
                {plan.price !== null && (
                  <span className="text-neutral-400 text-sm">
                    {plan.priceSuffix}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 mt-1 h-4">
                {plan.key === "pro" && billing === "annual"
                  ? "billed annually"
                  : "\u00A0"}
              </p>

              <button
                type="button"
                className={`mt-6 w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${
                  plan.popular
                    ? "bg-neutral-900 text-white hover:bg-neutral-800"
                    : "border border-neutral-200 text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                {plan.cta}
              </button>

              <ul className="mt-8 space-y-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-neutral-700"
                  >
                    <Check
                      className="w-4 h-4 mt-0.5 shrink-0 text-neutral-900"
                      strokeWidth={2.5}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {plan.extraFeatures && (
                <>
                  <div className="my-6 border-t border-neutral-100" />
                  <ul className="space-y-3">
                    {plan.extraFeatures.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-neutral-700"
                      >
                        <Check
                          className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600"
                          strokeWidth={2.5}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
