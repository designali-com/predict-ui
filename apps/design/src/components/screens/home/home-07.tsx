"use client"

import * as React from "react"

import { AppBottomNav } from "@workspace/ui/predict/app/app-bottom-nav"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import {
  HeartIllustration,
  HomeCard,
  HomeCardHeader,
  HomeHeader,
  HomeResultRow,
  Reading,
  SystemTabs,
} from "./shared-a"

export const title = "Twin · Heart"

// Figma: iPhone 18 Pro - 171 (1871:1906)
export default function Home07() {
  return (
    <Screen>
      <AppGlow variant="fade" />
      <HomeHeader />

      <SystemTabs order={["immune", "heart", "bones", "brain"]} className="top-[145px]" />

      <HomeCard className="top-[198px] h-[576px]">
        <HomeCardHeader title="Heart and blood vessels" caption="2 results here are above range." />
        <HeartIllustration />
        <HomeResultRow
          title="Blood sugar"
          caption="1 result near the limit"
          value={<Reading value="18" unit="ng/mL" />}
        />
        <HomeResultRow
          title="Vitamins and minerals"
          caption="1 result below range"
          value={<Reading value="3.4" unit="mg/L" />}
        />
      </HomeCard>

      <AppBottomNav active="explore" />
    </Screen>
  )
}
