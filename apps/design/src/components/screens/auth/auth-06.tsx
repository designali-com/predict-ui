import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import {
  At,
  AuthHeading,
  AuthMark,
  MaskIcon,
  primaryButtonClass,
  secondaryButtonClass,
} from "./auth-parts"

export const title = "Welcome"

// Figma: iPhone 18 Pro - 122 (1733:1947)
export default function Auth06() {
  return (
    <Screen className="bg-card">
      <AppGlow variant="blob" />
      <AuthMark />

      <At top={460}>
        <AuthHeading>Welcome</AuthHeading>
      </At>
      <At top={512} className="text-base leading-[19px] whitespace-nowrap">
        Your journey starts here
      </At>

      <At top={579}>
        <Button variant="app" className={primaryButtonClass}>
          Continue with phone
          <MaskIcon src="/screens/auth/phone.svg" className="size-[13px]" />
        </Button>
      </At>
      <At top={639}>
        <Button variant="app-secondary" className={secondaryButtonClass}>
          Continue with Apple
          <MaskIcon src="/screens/shared/apple.svg" className="size-3.5" />
        </Button>
      </At>

      <At top={722} className="flex gap-1.5 text-base leading-[19px] whitespace-nowrap text-white">
        Already have an account?
        <a href="#" className="underline">
          Log in
        </a>
      </At>
    </Screen>
  )
}
