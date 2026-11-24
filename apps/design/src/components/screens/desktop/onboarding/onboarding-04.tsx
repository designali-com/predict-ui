"use client"

import * as React from "react"

import { ChoiceButton, ChronicConditionsQuestion, OnboardingDesktopShell } from "./shared"

export const title = "Select conditions"

/**
 * Condition chips in four staggered rows, positioned as in Figma inside a
 * 575px band centred on the column. `x` is the left offset in px. Each
 * label appears once, so selection is keyed by label.
 */
const rows: { top: number; chips: { label: string; x: number }[] }[] = [
  {
    top: 0,
    chips: [
      { label: "Thyroid disorder", x: 0 },
      { label: "Diabetes", x: 139 },
      { label: "Prediabetes", x: 237 },
      { label: "Obesity", x: 352 },
      { label: "High cholesterol", x: 444 },
    ],
  },
  {
    top: 41,
    chips: [
      { label: "High blood pressure", x: 52 },
      { label: "Kidney disease", x: 212 },
      { label: "Fatty liver", x: 352 },
    ],
  },
  {
    top: 82,
    chips: [
      { label: "Heart disease", x: 9 },
      { label: "Osteoporosis", x: 136 },
      { label: "Coronary artery disease", x: 265 },
      { label: "PCOS / PCOD", x: 446 },
    ],
  },
  {
    top: 123,
    chips: [
      { label: "Sleep apnoea", x: 56 },
      { label: "Asthma", x: 195 },
      { label: "Depression", x: 293 },
      { label: "Anxiety", x: 408 },
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
    <OnboardingDesktopShell step={3}>
      <ChronicConditionsQuestion answer={answer} onAnswer={setAnswer} />

      <p className="absolute top-[390px] left-[-4px] w-[300px] text-xs text-foreground">
        Select all conditions you&apos;ve been diagnosed with:
      </p>

      {/* 575px band, wider than the column, centred on it (Figma y 425) */}
      <div role="group" aria-label="Conditions" className="absolute top-[425px] left-1/2 h-[155px] w-[575px] -translate-x-1/2">
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
