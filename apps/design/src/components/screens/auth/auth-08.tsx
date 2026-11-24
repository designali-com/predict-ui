import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import { CodeInput } from "./auth-code-input"
import { At, AuthHeading, AuthMark, primaryButtonClass, secondaryButtonClass } from "./auth-parts"

export const title = "Verify email"

// Figma: iPhone 18 Pro - 126 (1733:2028)
export default function Auth08() {
  return (
    <Screen className="bg-card">
      <AppGlow variant="blob" />
      <AuthMark />

      <At top={259}>
        <AuthHeading>Verify</AuthHeading>
      </At>
      <At top={311} className="text-center text-base leading-[19px] whitespace-nowrap">
        We sent a code to
        <br />
        you@example.com
      </At>

      <CodeInput label="One-time code" />

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
        <button type="button" className="underline">
          Resend code
        </button>
      </At>
    </Screen>
  )
}
