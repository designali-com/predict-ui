import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import { CodeInput } from "../auth/auth-code-input"
import {
  At,
  AuthHeading,
  AuthMark,
  primaryButtonClass,
  secondaryButtonClass,
} from "../auth/auth-parts"

export const title = "Verify email OTP"

// Figma: iPhone 18 Pro - 182 (1996:4781)
export default function DoctorAuth03() {
  return (
    <Screen className="bg-card">
      <AppGlow variant="blob" />
      <AuthMark />

      <At top={228}>
        <AuthHeading>Enter OTP</AuthHeading>
      </At>
      <At top={280} className="text-center text-base leading-[19px] whitespace-nowrap">
        We have sent you an email at
        <br />
        doctor@predict.fit
      </At>

      <CodeInput label="One-time password" />

      <At top={550}>
        <Button variant="app" className={primaryButtonClass}>
          Submit
        </Button>
      </At>
      <At top={610}>
        <Button variant="app-secondary" className={secondaryButtonClass}>
          Use different email
        </Button>
      </At>

      <At top={693} className="text-base leading-[19px] whitespace-nowrap text-white">
        <button type="button" className="underline">
          resend otp?
        </button>
      </At>
    </Screen>
  )
}
