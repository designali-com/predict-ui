import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import { AuthMark } from "./auth-parts"

export const title = "Signing in"

// Figma: iPhone 18 Pro - 136 (1733:3143)
export default function Auth09() {
  return (
    <Screen className="bg-card">
      <AppGlow variant="blob" />
      <AuthMark top={401} />
    </Screen>
  )
}
