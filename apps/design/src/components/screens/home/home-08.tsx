"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { AppBottomNav } from "@workspace/ui/predict/app/app-bottom-nav"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"

export const title = "Twin results"

const results = [
  { id: "r1", name: "Blood sugar", note: "1 result near the limit" },
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `r${i + 2}`,
    name: "Blood sugar",
    note: "1 result near the limit",
    value: "18",
    unit: "ng/mL",
  })),
] as { id: string; name: string; note: string; value?: string; unit?: string }[]

// Figma: iPhone 18 Pro - 172 (1871:1997)
export default function Home08() {
  return (
    <Screen>
      <button
        type="button"
        aria-label="Back"
        className="absolute top-[69px] left-[40px] flex size-6 items-center justify-center text-foreground"
      >
        <ChevronLeftIcon className="size-6" strokeWidth={1.5} />
      </button>

      <div className="absolute top-[51px] left-[295px] size-[60px] overflow-hidden rounded-full bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/screens/shared/avatar.png"
          alt="Arjun Vaidya"
          className="absolute top-[-21px] left-[-17px] h-[155px] w-[87px] max-w-none"
        />
      </div>

      <section className="absolute top-[137px] left-1/2 flex h-[576px] w-[381px] -translate-x-1/2 flex-col gap-6 overflow-hidden rounded-[40px] bg-secondary/20 p-[30px] shadow-[inset_0_0_30px_0_color-mix(in_oklch,var(--primary)_20%,transparent)]">
        {results.map((r) => (
          <button
            key={r.id}
            type="button"
            className="flex w-full items-start justify-between text-left text-foreground"
          >
            <div className="flex flex-col gap-3">
              <p className="h-5 text-[21px] leading-6">{r.name}</p>
              <p className="h-2.5 text-[10px] leading-2">{r.note}</p>
            </div>
            {r.value && (
              <div className="flex h-[42px] w-[100px] flex-col items-end justify-between">
                <ChevronRightIcon className="size-6" strokeWidth={1.5} />
                <p className="text-right text-[10px] leading-2">
                  {r.value} <span className="italic">{r.unit}</span>
                </p>
              </div>
            )}
          </button>
        ))}
      </section>

      <AppGlow variant="fade" />
      <AppBottomNav active="explore" />
    </Screen>
  )
}
