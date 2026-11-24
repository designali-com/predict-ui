import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { AppCard } from "@workspace/ui/predict/app/app-card"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { DesktopScreen } from "../desktop-screen"

export const title = "Is this you?"

// Figma: Slide 16:9 - 8 (1817:5133)
export default function RegisteredDesktop01() {
  return (
    <DesktopScreen className="items-center">
      <AppGlow variant="fade" className="h-[289px]" />

      <div className="relative mt-[232px] flex w-[290px] flex-col items-center">
        <h1 className="w-[248px] text-center font-display text-[40px] leading-[1.1] font-normal">
          Is this you?
        </h1>
        <p className="mt-[11px] text-base leading-[19px]">From your lab booking.</p>

        <AppCard className="mt-[43px] h-[274px] w-[247px] items-center">
          <div className="relative size-[133px] shrink-0 overflow-hidden rounded-full border-[2.2px] border-foreground bg-secondary">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/screens/shared/avatar.png"
              alt="Arjun Vaidya"
              className="absolute top-[-46.55px] left-[-37.73px] h-[343.6px] w-[192.94px] max-w-none"
            />
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="font-display text-2xl leading-7">Arjun Vaidya</p>
            <p className="text-sm leading-4">Apollo Diagnostics · 12 Nov</p>
          </div>
        </AppCard>

        <div className="mt-[42px] flex flex-col gap-3">
          <Button variant="app" size="lg" className="w-[290px] text-base">
            Yes, that&apos;s me
          </Button>
          <Button variant="app-secondary" size="lg" className="w-[290px] px-6 text-sm">
            Edit details
          </Button>
        </div>
      </div>
    </DesktopScreen>
  )
}
