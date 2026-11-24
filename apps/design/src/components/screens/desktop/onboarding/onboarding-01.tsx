"use client"

import * as React from "react"

import { ASSETS, MaskIcon, OnboardingDesktopShell } from "./shared"

export const title = "Date of birth"

const formatDate = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

// Figma: Slide 16:9 - 10 (1817:5250)
export default function OnboardingDesktop01() {
  const [dob, setDob] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <OnboardingDesktopShell step={0} showBack={false} className="items-center pt-[165px]">
      <h1 className="text-2xl leading-[29px] font-medium tracking-tight text-foreground">
        Date of birth
      </h1>

      <label className="relative mt-[18px] flex h-12 w-full cursor-pointer items-center justify-between rounded-full border border-border px-6 text-sm leading-5 text-foreground">
        <span className={dob ? undefined : "opacity-40"}>{dob ? formatDate(dob) : "Pick a date"}</span>
        <MaskIcon src={`${ASSETS}/onboarding-calendar.svg`} className="size-[21px]" />
        <input
          ref={inputRef}
          type="date"
          aria-label="Date of birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          onClick={() => inputRef.current?.showPicker?.()}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </label>
    </OnboardingDesktopShell>
  )
}
