"use client"

import * as React from "react"

import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import {
  ConditionsQuestion,
  OnboardingActions,
  OnboardingBack,
  OnboardingProgress,
  YesNo,
} from "./parts"

export const title = "Chronic conditions"

// Figma: iPhone 18 Pro - 157 (1737:6783)
export default function Onboarding03() {
  const [answer, setAnswer] = React.useState<"yes" | "no" | null>(null)

  return (
    <Screen>
      <AppGlow variant="blob" />

      <OnboardingBack />
      {/* Step progress, step 2 of 3 */}
      <OnboardingProgress done={2} />

      <ConditionsQuestion />
      <YesNo value={answer} onChange={setAnswer} />

      <OnboardingActions />
    </Screen>
  )
}
