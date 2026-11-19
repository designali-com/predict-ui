"use client"

import * as React from "react"

import { ChoiceButton, ChronicConditionsQuestion, OnboardingDesktopShell } from "./shared"

export const title = "Select conditions"

/**
 * Condition chips in four staggered rows, positioned as in Figma inside a
 * 575px band centred on the column. `x` is the left offset in px. Labels
 * repeat across rows, so selection is keyed by label.
 */
const rows: { top: number; chips: { label: string; x: number }[] }[] = [
  {
    top: 0,
    chips: [
      { label: "Thyroid Disorder", x: 0 },
      { label: "Diabetes", x: 139 },
      { label: "Prediabetes", x: 237 },
      { label: "Obesity", x: 352 },
      { label: "High Cholesterol", x: 444 },
    ],
  },
  {
    top: 41,
    chips: [
      { label: "High Blood Pressure", x: 52 },
      { label: "High Cholesterol", x: 212 },
      { label: "Thyroid Disorder", x: 352 },
    ],
  },
  {
    top: 82,
    chips: [
      { label: "Heart Disease", x: 9 },
      { label: "Heart Disease", x: 136 },
      { label: "Coronary Artery Disease", x: 265 },
      { label: "PCOS / PCOD", x: 446 },
    ],
  },
  {
    top: 123,
    chips: [
      { label: "Thyroid Disorder", x: 56 },
      { label: "Diabetes", x: 195 },
      { label: "Prediabetes", x: 293 },
      { label: "Obesity", x: 408 },
    ],
  },
]

// Figma: Slide 16:9 - 13 (1817:5358)
export default function OnboardingDesktop04() {
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
    <OnboardingDesktopShell step={3} className="pt-[123px]">
      <ChronicConditionsQuestion answer={answer} onAnswer={setAnswer} />

      <p className="mt-[43px] w-[289px] text-xs text-app-foreground">
        Select all conditions you&apos;ve been diagnosed with:
      </p>

      {/* 575px band, wider than the column; self-center overflows it evenly on both sides */}
      <div role="group" aria-label="Conditions" className="relative mt-[21px] h-[155px] w-[575px] self-center">
        {rows.map((row) =>
          row.chips.map((chip) => {
            const selected = conditions.has(chip.label)
            return (
              <ChoiceButton
                key={`${row.top}-${chip.x}`}
                aria-pressed={selected}
                selected={selected}
                size="sm"
                onClick={() => toggle(chip.label)}
                style={{ top: row.top, left: chip.x }}
                className="absolute text-xs"
              >
                {chip.label}
              </ChoiceButton>
            )
          })
        )}
      </div>
    </OnboardingDesktopShell>
  )
}
