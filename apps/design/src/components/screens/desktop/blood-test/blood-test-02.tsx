import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"

import { HomeCollectionCard } from "../../blood-test/blood-test-04"
import { BloodTestDesktopLayout } from "./shared"

export const title = "Blood test checkout"

// Figma: Slide 16:9 - 17 (1818:8137)
export default function BloodTestDesktop02() {
  return (
    <BloodTestDesktopLayout>
      <HomeCollectionCard
        className="absolute top-[272px] left-1/2 w-[381px] -translate-x-1/2"
        actions={
          <div className="flex items-center gap-1.5">
            <Button variant="app-secondary" size="lg" className="w-40 px-0 text-sm leading-5">
              Pay using CRED UPI
            </Button>
            <Button variant="app" size="lg" className="w-40 px-0 text-base">
              Book a test
            </Button>
          </div>
        }
      />
    </BloodTestDesktopLayout>
  )
}
