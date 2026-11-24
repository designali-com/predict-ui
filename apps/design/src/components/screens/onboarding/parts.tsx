import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { cn } from "@workspace/ui/lib/utils"

/**
 * Figma icon (public/screens/onboarding/*.svg, drawn in black) used as a mask
 * and filled with the theme foreground, so it works in light and dark.
 */
export function MaskIcon({ src, className }: { src: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("block shrink-0 bg-foreground", className)}
      style={{ mask: `url(${src}) center / contain no-repeat` }}
    />
  )
}

/** Back chevron at Figma (40, 69). */
export function OnboardingBack() {
  return (
    <button type="button" aria-label="Back" className="absolute top-[69px] left-10 size-6">
      <MaskIcon src="/screens/onboarding/chevron.svg" className="size-6 -rotate-90" />
    </button>
  )
}

/** Three-step progress bar at Figma (93, 78); `done` bars are filled. */
export function OnboardingProgress({ done }: { done: number }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={3}
      aria-valuenow={done}
      aria-label="Onboarding progress"
      className="absolute top-[78px] left-[93px] flex h-1.5 w-[215px] gap-[7px]"
    >
      {[67, 67, 66].map((width, i) => (
        <span
          key={i}
          style={{ width }}
          className={cn("h-1.5 rounded-[3px]", i < done ? "bg-primary" : "bg-secondary")}
        />
      ))}
    </div>
  )
}

/** Continue + Skip pair, Figma tops 693 and 749. */
export function OnboardingActions() {
  return (
    <div className="absolute top-[693px] left-14 flex w-[290px] flex-col gap-2">
      <Button variant="app" size="lg" className="w-full text-base leading-6 font-normal">
        Continue
      </Button>
      <Button variant="app-secondary" size="lg" className="w-full text-sm leading-5 font-normal">
        Skip
      </Button>
    </div>
  )
}

/** Glyseric 24 heading, rendered in Inter per the brand rules. */
export const headingClass = "text-2xl leading-8 font-medium tracking-tight text-foreground"

/** Outline pill used for the answer choices (Figma: 1px hairline, 48 tall). */
export const choiceClass = (selected: boolean) =>
  cn(
    "h-12 border-border px-6 text-sm leading-5 font-normal text-foreground",
    selected && "border-primary bg-secondary hover:bg-secondary"
  )

export function YesNo({
  value,
  onChange,
}: {
  value: "yes" | "no" | null
  onChange: (value: "yes" | "no") => void
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Diagnosed"
      className="absolute top-[308px] left-14 flex w-[290px] gap-[7px]"
    >
      {(["yes", "no"] as const).map((option) => (
        <Button
          key={option}
          role="radio"
          aria-checked={value === option}
          variant="outline"
          onClick={() => onChange(option)}
          className={cn("flex-1 capitalize", choiceClass(value === option))}
        >
          {option}
        </Button>
      ))}
    </div>
  )
}

/** Shared question block for the chronic-conditions steps (Figma tops 132 / 209). */
export function ConditionsQuestion() {
  return (
    <>
      <h1 className={cn("absolute top-[132px] left-14 whitespace-nowrap", headingClass)}>
        Have you been diagnosed
        <br />
        with any chronic conditions?
      </h1>
      <p className="absolute top-[209px] left-14 w-[290px] text-base leading-[22px] text-foreground">
        For example: diabetes, obesity, anxiety, depression, hypertension or asthma.
      </p>
    </>
  )
}
