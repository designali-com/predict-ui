import { AppCardTitle } from "@workspace/ui/predict/app/app-card"

import { DesktopScreen } from "../desktop-screen"
import { BottomGlow, DashCard, DashCardHeader, DateStrip, DesktopNav, HomeHeader } from "./shared"

// Kept local: a plain value imported from a "use client" module is a client
// reference in this server component, not the string.
const ASSETS = "/screens/desktop/home"

export const title = "Biological age"

function AgeCard({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <DashCard className={className}>
      <AppCardTitle className="h-5 w-full whitespace-nowrap">{label}</AppCardTitle>
      <p className="h-[35px] w-full font-display text-5xl leading-6">{value}</p>
    </DashCard>
  )
}

/** Biological-age clock: segmented ring, dotted dial, three hands and readout. */
function AgeClock() {
  return (
    <div className="absolute top-[326px] left-[calc(50%+0.38px)] h-[501px] w-[474.125px] -translate-x-1/2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${ASSETS}/home-02-clock-face.png`}
        alt=""
        width={306.63}
        height={291.703}
        className="absolute top-[81.03px] left-[84.27px] h-[291.703px] w-[306.63px] max-w-none opacity-20"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${ASSETS}/home-02-clock-ring.svg`}
        alt=""
        className="absolute top-0 left-0 h-[448.03px] w-[474.128px] max-w-none"
      />

      {/* Minute hand (pointing left) */}
      <div className="absolute top-[233.19px] left-[20.07px] flex h-[1.359px] w-[221.589px] items-center justify-center">
        <div className="relative h-0 w-[221.593px] flex-none rotate-[179.65deg]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${ASSETS}/home-02-clock-hand-minute.svg`}
            alt=""
            className="absolute top-[-6.8px] left-0 h-[6.8px] w-full max-w-none"
          />
        </div>
      </div>
      {/* Hour hand (pointing up) */}
      <div className="absolute top-[148.9px] left-[233.51px] flex h-[88.364px] w-[10.876px] items-center justify-center">
        <div className="relative h-0 w-[89.031px] flex-none rotate-[-97.02deg]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${ASSETS}/home-02-clock-hand-hour.svg`}
            alt=""
            className="absolute top-[-13.59px] left-0 h-[13.59px] w-full max-w-none"
          />
        </div>
      </div>
      {/* Dashed hand (pointing bottom-right) */}
      <div className="absolute top-[230.47px] left-[237.58px] flex h-[108.755px] w-[149.539px] items-center justify-center">
        <div className="relative h-0 w-[184.904px] flex-none rotate-[-143.97deg]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${ASSETS}/home-02-clock-hand-second.png`}
            alt=""
            width={184.904}
            height={6.797}
            className="absolute top-[-6.8px] left-0 h-[6.8px] w-full max-w-none"
          />
        </div>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${ASSETS}/home-02-clock-hub.png`}
        alt=""
        width={38.064}
        height={38.064}
        className="absolute top-[215.32px] left-[218.55px] size-[38.064px] max-w-none"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${ASSETS}/home-02-clock-dots.svg`}
        alt=""
        className="absolute top-[50.34px] left-[53.37px] size-[368.41px] max-w-none"
      />

      <p className="absolute top-[329.71px] left-[236.68px] -translate-x-1/2 text-[21.751px] whitespace-nowrap">38/44</p>
      <div className="absolute top-[360.98px] left-[calc(50%+0.52px)] flex -translate-x-1/2 items-center justify-center rounded-full bg-app-brand px-[10.43px] py-[6.258px]">
        <p className="text-[10.663px] font-medium whitespace-nowrap text-app-brand-foreground">-7 YEARS</p>
      </div>
      <p className="absolute top-[449.34px] left-[237.42px] -translate-x-1/2 text-[43.502px] whitespace-nowrap">76.8%</p>
    </div>
  )
}

// Figma: Slide 16:9 - 19 (1818:8516)
export default function HomeDesktop02() {
  return (
    <DesktopScreen>
      <BottomGlow />

      <HomeHeader />
      <DateStrip />

      <AgeCard label="Chronological age" value="38" className="top-[351px] left-[47px] w-[255px]" />
      <AgeCard label="Biological age" value="44" className="top-[351px] left-[331px] w-[264px]" />

      <DashCard className="top-[519px] left-[48px] h-[398px] w-[547px] gap-0">
        <DashCardHeader title="My Appointments" link />
      </DashCard>

      <AgeClock />

      <p className="absolute top-[871px] left-[calc(50%-8px)] w-[410px] -translate-x-1/2 text-center text-xl">
        Your biological age is 7 years older than your actual age - 38 against 44.
      </p>

      <DashCard className="top-[354px] left-[1327px] h-[558px] w-[547px] gap-0">
        <DashCardHeader title="My Appointments" link />
      </DashCard>

      <DesktopNav defaultTab="twin" />
    </DesktopScreen>
  )
}
