"use client"

import * as React from "react"

import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { cn } from "@workspace/ui/lib/utils"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import {
  choiceClass,
  headingClass,
  OnboardingActions,
  OnboardingBack,
  OnboardingProgress,
} from "./parts"

export const title = "Gender"

const options = ["Male", "Female", "Other"]

// Figma: iPhone 18 Pro - 158 (1737:6816)
export default function Onboarding02() {
  const [gender, setGender] = React.useState<string | null>(null)

  return (
    <Screen>
      <AppGlow variant="blob" />

      <OnboardingBack />
      {/* Step progress, step 1 of 3 */}
      <OnboardingProgress done={1} />

      <h1 className={cn("absolute top-[174px] left-1/2 -translate-x-1/2 whitespace-nowrap", headingClass)}>
        Gender
      </h1>

      <div
        role="radiogroup"
        aria-label="Gender"
        className="absolute top-[221px] left-14 flex w-[290px] flex-col gap-2.5"
      >
        {options.map((option) => (
          <Button
            key={option}
            role="radio"
            aria-checked={gender === option}
            variant="outline"
            onClick={() => setGender(option)}
            className={cn("w-full", choiceClass(gender === option))}
          >
            {option}
          </Button>
        ))}
      </div>

      <OnboardingActions />
    </Screen>
  )
}
