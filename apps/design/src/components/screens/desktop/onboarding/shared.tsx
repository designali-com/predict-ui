import * as React from "react"
import { ChevronLeftIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { DesktopScreen } from "../desktop-screen"

/**
 * Shared frame of the desktop onboarding steps (Figma Slide 16:9 - 10…13):
 * bottom violet fade, back chevron, 3-step progress, a 290px centred
 * content column and the Continue / Skip pair.
 */
export function OnboardingDesktopShell({
  step,
  showBack = true,
  className,
  children,
}: {
  /** Number of completed progress segments (0–3). */
  step: number
  showBack?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <DesktopScreen>
      <AppGlow variant="fade" className="h-[289px] mix-blend-multiply dark:mix-blend-normal" />

      {showBack && (
        <button
          type="button"
          aria-label="Back"
          className="absolute top-[60px] left-[calc(50%-161px)] text-app-foreground"
        >
          <ChevronLeftIcon className="size-6" strokeWidth={1.5} />
        </button>
      )}

      <div
        role="progressbar"
        aria-label="Onboarding progress"
        aria-valuemin={0}
        aria-valuemax={3}
        aria-valuenow={step}
        className="absolute top-[69px] left-1/2 flex w-[215px] -translate-x-1/2 gap-[7px]"
      >
        {[67, 67, 66].map((width, i) => (
          <span
            key={i}
            style={{ width }}
            className={cn("h-1.5 rounded-[3px]", i < step ? "bg-app-brand" : "bg-app-pill")}
          />
        ))}
      </div>

      <div className={cn("relative mx-auto flex w-[290px] flex-col", className)}>{children}</div>

      <div className="absolute top-[684px] left-1/2 flex w-[290px] -translate-x-1/2 flex-col gap-2">
        <Button variant="app" size="lg" className="w-full text-base">
          Continue
        </Button>
        <Button variant="app-secondary" size="lg" className="w-full text-sm">
          Skip
        </Button>
      </div>
    </DesktopScreen>
  )
}

/** Outlined pill used for single/multi choice answers; filled lavender when selected. */
export function ChoiceButton({
  selected,
  className,
  ...props
}: React.ComponentProps<typeof Button> & { selected?: boolean }) {
  return (
    <Button
      variant="outline"
      className={cn(
        "border-app-border text-app-foreground hover:bg-app-pill/40",
        selected && "border-app-accent bg-app-pill hover:bg-app-pill",
        className
      )}
      {...props}
    />
  )
}

/** Two-line chronic-conditions question shared by steps 3 and 4. */
export function ChronicConditionsQuestion({
  answer,
  onAnswer,
}: {
  answer: "yes" | "no" | null
  onAnswer: (value: "yes" | "no") => void
}) {
  return (
    <>
      <h1 className="w-[318px] font-display text-2xl leading-[29px] font-normal text-app-foreground">
        Have you been diagnosed with any chronic conditions?
      </h1>
      <p className="mt-[19px] w-[289px] text-base leading-[22px] text-app-foreground">
        For example: Diabetes, Obesity, Anxiety, Depression, Hypertension, Asthma, etc.
      </p>

      <div role="radiogroup" aria-label="Diagnosed" className="mt-[55px] flex gap-[7px]">
        {(["yes", "no"] as const).map((value) => (
          <ChoiceButton
            key={value}
            role="radio"
            aria-checked={answer === value}
            selected={answer === value}
            size="lg"
            onClick={() => onAnswer(value)}
            className="flex-1 text-sm capitalize"
          >
            {value}
          </ChoiceButton>
        ))}
      </div>
    </>
  )
}
