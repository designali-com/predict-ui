import * as React from "react"
import {
  ChevronLeftIcon,
  CircleDashedIcon,
  ClockIcon,
  GripIcon,
  UsersIcon,
} from "lucide-react"

import {
  AppButton as Button,
  AppGlassBar,
  AppGlassCircle,
  AppTabs,
  AppTabsList,
  AppTabsTrigger,
} from "@workspace/ui/predict/app/app-glass"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"
import { PredictMark } from "@workspace/ui/predict/logo"

import { DesktopScreen } from "../desktop-screen"

/** Brand mark (left), centred greeting and avatar (right) along the top edge. */
function DesktopGreetingHeader() {
  return (
    <>
      <AppGlassCircle
        tone="primary"
        aria-label="PREDICT"
        className="absolute top-[43px] left-[47px]"
      >
        <PredictMark className="h-[20px] w-[18px]" />
      </AppGlassCircle>

      <div className="absolute top-[51px] left-1/2 flex -translate-x-1/2 flex-col items-center whitespace-nowrap">
        <p className="font-display text-base leading-[19px]">Good morning,</p>
        <h1 className="mt-[7px] font-display text-[36px] leading-[43px] font-normal">
          Arjun Vaidya
        </h1>
      </div>

      <div className="absolute top-[43px] left-[1811px] size-[60px] overflow-hidden rounded-full border border-foreground bg-secondary">
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
  "h-[31px] flex-none px-5 text-sm leading-5 text-foreground/60 hover:text-foreground data-active:bg-primary data-active:text-primary-foreground data-active:hover:text-primary-foreground data-active:hover:dark:text-primary-foreground"

/** Progress line with the back button on the left and the Visit centre | Home collection tabs. */
function DesktopBookingBar({ tab = "center" }: { tab?: "center" | "home" }) {
  return (
    <>
      <div aria-hidden className="absolute top-[198px] left-0 h-0.5 w-[959px] bg-primary" />
      <button
        type="button"
        aria-label="Back"
        className="absolute top-[183px] left-[59px] flex size-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
      >
        <ChevronLeftIcon className="size-4" strokeWidth={1} />
      </button>

      <AppTabs
        defaultValue={tab}
        className="absolute top-[177px] left-1/2 -translate-x-1/2 items-center gap-0"
      >
        <AppTabsList
          variant="line"
          className="h-auto gap-1 border-input bg-card px-1 py-[5px] group-data-horizontal/tabs:h-auto"
        >
          <AppTabsTrigger value="center" className={tabTrigger}>
            Visit centre
          </AppTabsTrigger>
          <AppTabsTrigger value="home" className={tabTrigger}>
            Home collection
          </AppTabsTrigger>
        </AppTabsList>
      </AppTabs>
    </>
  )
}

/** Desktop floating nav: menu · [Today | twin | people] · PREDICT assistant. */
function DesktopBottomNav() {
  return (
    <nav className="absolute top-[979px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 px-px">
      <AppGlassCircle aria-label="Menu">
        <GripIcon className="size-6" strokeWidth={2} />
      </AppGlassCircle>

      <AppGlassBar className="flex h-[60px] w-[237px] items-center justify-center gap-[5px] rounded-[30px] py-2.5 pr-3.5 pl-3">
        <Button variant="app" className="h-12 gap-1 px-[18px] text-base leading-6">
          Today
          <ClockIcon
            className="size-5 fill-primary-foreground stroke-primary"
            strokeWidth={2}
          />
        </Button>
        <Button variant="ghost" aria-label="Twin" className="h-10 px-4 text-foreground">
          <CircleDashedIcon className="size-5" strokeWidth={1.5} />
        </Button>
        <Button variant="ghost" aria-label="People" className="h-10 px-4 text-foreground">
          <UsersIcon className="size-5" strokeWidth={1.5} />
        </Button>
      </AppGlassBar>

      <AppGlassCircle aria-label="PREDICT assistant">
        <PredictMark className="h-[20px] w-[18px]" />
      </AppGlassCircle>
    </nav>
  )
}

/**
 * Shared chrome of the desktop "Book blood test" flow: greeting header,
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
