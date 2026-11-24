"use client"

import * as React from "react"

import { ChronicConditionsQuestion, OnboardingDesktopShell } from "./shared"

export const title = "Chronic conditions"

// Figma: Slide 16:9 - 12 (1817:5338)
export default function OnboardingDesktop03() {
  const [answer, setAnswer] = React.useState<"yes" | "no" | null>(null)

  return (
    <OnboardingDesktopShell step={2}>
      <ChronicConditionsQuestion answer={answer} onAnswer={setAnswer} />
    </OnboardingDesktopShell>
  )
}
