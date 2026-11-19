import * as React from "react"
import {
  ChevronLeftIcon,
  CircleDashedIcon,
  ClockIcon,
  GripIcon,
  UsersIcon,
} from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"
import { PredictMark } from "@workspace/ui/predict/logo"

import { DesktopScreen } from "../desktop-screen"

const circle =
  "flex size-[60px] shrink-0 items-center justify-center rounded-full bg-app-field text-app-foreground"

/** Brand mark (left), centred greeting and avatar (right) along the top edge. */
function DesktopGreetingHeader() {
  return (
    <>
      <button
        type="button"
        aria-label="PREDICT"
        className="absolute top-[43px] left-[47px] flex size-[60px] items-center justify-center rounded-full bg-app-brand text-app-brand-foreground"
      >
        <PredictMark className="h-[20px] w-[18px]" />
      </button>

      <div className="absolute top-[51px] left-1/2 flex -translate-x-1/2 flex-col items-center whitespace-nowrap">
        <p className="font-display text-base leading-[19px]">Good Morning,</p>
        <h1 className="mt-[7px] font-display text-[36px] leading-[43px] font-normal">
          Arjun Vaidya
        </h1>
      </div>

      <div className="absolute top-[43px] left-[1811px] size-[60px] overflow-hidden rounded-full border border-app-foreground bg-app-pill">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/screens/shared/avatar.png"
          alt="Arjun Vaidya"
          className="size-full object-cover object-top"
        />
      </div>
    </>
  )
}

const tabTrigger =
  "h-[31px] flex-none px-5 text-sm leading-5 text-app-foreground/60 hover:text-app-foreground data-active:bg-app-brand data-active:text-app-brand-foreground data-active:hover:text-app-brand-foreground data-active:hover:dark:text-app-brand-foreground"

/** Progress line with the back button on the left and the Visit Center | Home Collection tabs. */
function DesktopBookingBar({ tab = "center" }: { tab?: "center" | "home" }) {
  return (
    <>
      <div aria-hidden className="absolute top-[198px] left-0 h-0.5 w-[959px] bg-app-accent" />
      <button
        type="button"
        aria-label="Back"
        className="absolute top-[183px] left-[59px] flex size-8 items-center justify-center rounded-full bg-app-pill text-app-pill-foreground"
      >
        <ChevronLeftIcon className="size-4" strokeWidth={1} />
      </button>

      <Tabs
        defaultValue={tab}
        className="absolute top-[177px] left-1/2 -translate-x-1/2 items-center gap-0"
      >
        <TabsList
          variant="line"
          className="h-auto gap-1 border-app-track bg-app-field px-1 py-[5px] group-data-horizontal/tabs:h-auto"
        >
          <TabsTrigger value="center" className={tabTrigger}>
            Visit Center
          </TabsTrigger>
          <TabsTrigger value="home" className={tabTrigger}>
            Home Collection
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  )
}

/** Desktop floating nav: menu · [Today | twin | people] · PREDICT assistant. */
function DesktopBottomNav() {
  return (
    <nav className="absolute top-[979px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 px-px">
      <button type="button" aria-label="Menu" className={circle}>
        <GripIcon className="size-6" strokeWidth={2} />
      </button>

      <div className="flex h-[60px] w-[237px] items-center justify-center gap-[5px] rounded-[30px] bg-app-field py-2.5 pr-3.5 pl-3">
        <Button variant="app" className="h-12 gap-1 px-[18px] text-base leading-6">
          Today
          <ClockIcon
            className="size-5 fill-app-brand-foreground stroke-app-brand"
            strokeWidth={2}
          />
        </Button>
        <Button variant="ghost" aria-label="Twin" className="h-10 px-4 text-app-foreground">
          <CircleDashedIcon className="size-5" strokeWidth={1.5} />
        </Button>
        <Button variant="ghost" aria-label="People" className="h-10 px-4 text-app-foreground">
          <UsersIcon className="size-5" strokeWidth={1.5} />
        </Button>
      </div>

      <button type="button" aria-label="PREDICT assistant" className={circle}>
        <PredictMark className="h-[20px] w-[18px]" />
      </button>
    </nav>
  )
}

/**
 * Shared chrome of the desktop "Book Blood Test" flow: greeting header,
 * booking bar with tabs, violet bottom fade and floating nav. Screen content
 * goes in `children` (absolutely positioned on the 1920 × 1080 canvas).
 */
export function BloodTestDesktopLayout({
  tab = "center",
  children,
}: {
  tab?: "center" | "home"
  children: React.ReactNode
}) {
  return (
    <DesktopScreen>
      <AppGlow variant="fade" className="h-[289px]" />
      <DesktopGreetingHeader />
      <DesktopBookingBar tab={tab} />
      {children}
      <DesktopBottomNav />
    </DesktopScreen>
  )
}
