"use client"

import * as React from "react"

import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { cn } from "@workspace/ui/lib/utils"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import {
  ConditionsQuestion,
  OnboardingActions,
  OnboardingBack,
  OnboardingProgress,
  YesNo,
} from "./parts"

export const title = "Select conditions"

/**
 * Condition chips laid out as in Figma: four staggered rows (9px gaps) that
 * bleed off both edges of the screen (clipped by <Screen>). `x` is the Figma
 * left offset of each row's first chip. Figma repeats placeholder labels, so
 * each row lists distinct conditions instead.
 */
const rows: { top: number; x: number; chips: string[] }[] = [
  {
    top: 434,
    x: -83,
    chips: ["Thyroid disorder", "Diabetes", "Prediabetes", "Obesity", "High cholesterol"],
  },
  { top: 475, x: -31, chips: ["High blood pressure", "Kidney disease", "Fatty liver"] },
  {
    top: 516,
    x: -74,
    chips: ["Heart disease", "Osteoporosis", "Coronary artery disease", "PCOS / PCOD"],
  },
  {
    top: 557,
    x: -27,
    chips: ["Sleep apnoea", "Asthma", "Depression", "Anxiety", "Migraine"],
  },
]

// Figma: iPhone 18 Pro - 156 (1737:6746)
export default function Onboarding04() {
  const [answer, setAnswer] = React.useState<"yes" | "no" | null>(null)
  const [conditions, setConditions] = React.useState<Set<string>>(() => new Set())

  const toggle = (label: string) =>
    setConditions((prev) => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })

  return (
    <Screen>
      <AppGlow variant="blob" />

      <OnboardingBack />
      {/* Step progress, step 3 of 3 */}
      <OnboardingProgress done={3} />

      <ConditionsQuestion />
      <YesNo value={answer} onChange={setAnswer} />

      <p className="absolute top-[399px] left-14 w-[289px] text-xs leading-[14px] text-foreground">
        Select all conditions you&apos;ve been diagnosed with:
      </p>

      <div role="group" aria-label="Conditions">
        {rows.map((row) => (
          <div
            key={row.top}
            style={{ top: row.top, left: row.x }}
            className="absolute flex gap-[9px]"
          >
            {row.chips.map((label) => {
              const selected = conditions.has(label)
              return (
                <Button
                  key={label}
                  aria-pressed={selected}
                  variant="outline"
                  size="sm"
                  onClick={() => toggle(label)}
                  className={cn(
                    "h-8 border-border px-5 text-xs leading-5 font-normal text-foreground",
                    selected && "border-primary bg-secondary hover:bg-secondary"
                  )}
                >
                  {label}
                </Button>
              )
            })}
          </div>
        ))}
      </div>

      <OnboardingActions />
    </Screen>
  )
}
