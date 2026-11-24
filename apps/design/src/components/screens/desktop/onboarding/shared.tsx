import * as React from "react"
import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { cn } from "@workspace/ui/lib/utils"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { DesktopScreen } from "../desktop-screen"

/**
 * Shared frame of the desktop onboarding steps (Figma Slide 16:9 - 10…13):
 * bottom violet fade, back chevron, 3-step progress, a 290px centred
 * content column and the Continue / Skip pair.
 */
export const ASSETS = "/screens/desktop/onboarding"

/**
 * Renders a Figma SVG icon as a mask filled with the current text colour, so
 * the black-stroked export follows the theme (the SVG's own opacity is kept).
 */
export function MaskIcon({ src, className }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block shrink-0 bg-current", className)}
      style={{
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    />
  )
}

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
    <DesktopScreen className="bg-card">
      <AppGlow variant="fade" className="h-[289px] mix-blend-multiply dark:mix-blend-normal" />

      {showBack && (
        <button
          type="button"
          aria-label="Back"
          className="absolute top-[60px] left-[calc(50%-161px)] text-foreground"
        >
          {/* Figma's chevron is drawn pointing up and rotated −90° */}
          <MaskIcon src={`${ASSETS}/onboarding-back.svg`} className="size-6 -rotate-90" />
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
            className={cn("h-1.5 rounded-[3px]", i < step ? "bg-primary" : "bg-secondary")}
          />
        ))}
      </div>

      <div
        className={cn(
          "absolute inset-y-0 left-1/2 flex w-[290px] -translate-x-1/2 flex-col",
          className
        )}
      >
        {children}
      </div>

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
        "border-border text-foreground hover:bg-secondary/40",
        selected && "border-primary bg-secondary hover:bg-secondary",
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
      {/* Figma: heading at y 123, body at y 200, answers at y 299 (frame top 60) */}
      <h1 className="absolute top-[123px] left-[-4px] w-[330px] text-2xl leading-[29px] font-medium tracking-tight whitespace-nowrap text-foreground">
        Have you been diagnosed
        <br />
        with any chronic conditions?
      </h1>
      <p className="absolute top-[200px] left-[-4px] w-[300px] text-base leading-[22px] text-foreground">
        For example: diabetes, obesity, anxiety, depression, hypertension or asthma.
      </p>

      <div
        role="radiogroup"
        aria-label="Diagnosed"
        className="absolute top-[299px] left-0 flex w-full gap-[7px]"
      >
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
