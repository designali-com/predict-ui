import { PredictMark } from "@workspace/ui/predict/logo"

import { Screen } from "../screen"

export const title = "Launch"

// Figma: iPhone 18 Pro - 120 (1733:1924)
export default function Auth01() {
  return (
    <Screen className="bg-card">
      <PredictMark
        aria-label="PREDICT"
        className="absolute top-[378px] left-[148px] h-[119px] w-[106px] text-primary"
      />
    </Screen>
  )
}
