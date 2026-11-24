"use client"

import * as React from "react"

import { ChoiceButton, OnboardingDesktopShell } from "./shared"

export const title = "Gender"

const options = ["Male", "Female", "Other"]

// Figma: Slide 16:9 - 11 (1817:5299)
export default function OnboardingDesktop02() {
  const [gender, setGender] = React.useState<string | null>(null)

  return (
    <OnboardingDesktopShell step={1} className="items-center pt-[165px]">
      <h1 className="text-2xl leading-[29px] font-medium tracking-tight text-foreground">
        Gender
      </h1>

      <div role="radiogroup" aria-label="Gender" className="mt-[18px] flex w-full flex-col gap-2.5">
        {options.map((option) => (
          <ChoiceButton
            key={option}
            role="radio"
            aria-checked={gender === option}
            selected={gender === option}
            size="lg"
            onClick={() => setGender(option)}
            className="w-full text-sm"
          >
            {option}
          </ChoiceButton>
        ))}
      </div>
    </OnboardingDesktopShell>
  )
}
