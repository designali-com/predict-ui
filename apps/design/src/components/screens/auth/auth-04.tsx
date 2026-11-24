import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import { CodeInput } from "./auth-code-input"
import { At, AuthHeading, AuthMark, primaryButtonClass, secondaryButtonClass } from "./auth-parts"

export const title = "Verify OTP"

// Figma: iPhone 18 Pro - 125 (1733:2003)
export default function Auth04() {
  return (
    <Screen className="bg-card">
      <AppGlow variant="blob" />
      <AuthMark />

      <At top={259}>
        <AuthHeading>Enter OTP</AuthHeading>
      </At>
      <At top={311} className="text-center text-base leading-[19px] whitespace-nowrap">
        We sent a code to
        <br />
        +91 95679 48473
      </At>

      <CodeInput label="One-time password" />

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
