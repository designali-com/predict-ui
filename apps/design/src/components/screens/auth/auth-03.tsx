import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { Input } from "@workspace/ui/components/input"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import { At, AuthHeading, AuthMark, primaryButtonClass, secondaryButtonClass } from "./auth-parts"

export const title = "Enter phone number"

// Figma: iPhone 18 Pro - 124 (1733:1984)
export default function Auth03() {
  return (
    <Screen className="bg-card">
      <AppGlow variant="blob" />
      <AuthMark />

      <At top={223}>
        <AuthHeading className="w-[248px] leading-[1.1] whitespace-normal">
          What&apos;s your number?
        </AuthHeading>
      </At>
      <At top={317} className="text-base leading-[19px] whitespace-nowrap">
        The one you gave at your blood test.
      </At>

      <At top={413}>
        <Input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          size="lg"
          placeholder="Phone number"
          aria-label="Phone number"
          className="w-[290px] border-border bg-card leading-5 text-foreground placeholder:text-foreground/40"
        />
      </At>

      <At top={579}>
        <Button variant="app" className={primaryButtonClass}>
          Submit
        </Button>
      </At>
      <At top={639}>
        <Button variant="app-secondary" className={secondaryButtonClass}>
          Use a different number
        </Button>
      </At>

      <At top={722} className="text-base leading-[19px] whitespace-nowrap text-white">
        <a href="#" className="underline">
          Resend code
        </a>
      </At>
    </Screen>
  )
}
