"use client"

import * as React from "react"
import {
  ArrowUpRightIcon,
  CircleDashedIcon,
  ClockIcon,
  GripIcon,
  PlayIcon,
  PlusIcon,
  UploadIcon,
  UsersIcon,
} from "lucide-react"
import { cn } from "cn"

import {
  AppButton as Button,
  AppGlassBar,
  AppGlassCircle,
} from "@workspace/ui/predict/app/app-glass"
import {
  AppCard,
  AppCardDescription,
  AppCardHeader,
  AppCardTitle,
} from "@workspace/ui/predict/app/app-card"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"
import { PredictMark } from "@workspace/ui/predict/logo"

import { DesktopScreen } from "../desktop-screen"

export const title = "Home · add a wearable"

type Tab = "today" | "twin" | "people"

/** Bottom navigation: menu · [Today | twin | people] · PREDICT assistant. */
function DesktopNav() {
  const [active, setActive] = React.useState<Tab>("today")
  const tabs = [
    { id: "today" as const, label: "Today", Icon: ClockIcon },
    { id: "twin" as const, label: "Twin", Icon: CircleDashedIcon },
    { id: "people" as const, label: "People", Icon: UsersIcon },
  ]

  return (
    <nav className="absolute top-[979px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-1">
      <AppGlassCircle aria-label="Menu">
        <GripIcon className="size-6" strokeWidth={2} />
      </AppGlassCircle>

      <AppGlassBar className="flex h-[60px] w-[237px] items-center justify-center gap-[5px] py-2.5 pr-3.5 pl-3">
        {tabs.map(({ id, label, Icon }) => {
          const on = active === id
          return (
            <Button
              key={id}
              variant={on ? "app" : "ghost"}
              aria-label={label}
              aria-pressed={on}
              onClick={() => setActive(id)}
              className={cn("rounded-full text-base", on ? "h-12 gap-1 px-[18px]" : "h-10 px-4")}
            >
              {on && label}
              <Icon
                className={cn("size-5", on && "fill-primary-foreground stroke-primary")}
                strokeWidth={on ? 2 : 1}
              />
            </Button>
          )
        })}
      </AppGlassBar>

      <AppGlassCircle aria-label="PREDICT assistant">
        <PredictMark className="h-[20.166px] w-[18px]" />
      </AppGlassCircle>
    </nav>
  )
}

function SmallCard({
  heading,
  description,
  action,
  icon,
  className,
}: {
  heading: string
  description: string
  action: string
  icon: React.ReactNode
  className?: string
}) {
  return (
    <AppCard className={cn("absolute top-[265px] h-44 w-[264px] items-center", className)}>
      <AppCardHeader className="h-[46px] w-full">
        <div>
          <AppCardTitle className="leading-5">{heading}</AppCardTitle>
          <AppCardDescription className="truncate">{description}</AppCardDescription>
        </div>
      </AppCardHeader>
      <Button variant="app" size="lg" className="w-[204px] gap-1 text-base">
        {icon}
        {action}
      </Button>
    </AppCard>
  )
}

// Figma: Slide 16:9 - 14 (1817:5497)
export default function WearablesDesktop01() {
  const [fileName, setFileName] = React.useState<string | null>(null)

  return (
    <DesktopScreen>
      <AppGlow variant="fade" className="h-[289px]" />

      {/* Header: assistant · greeting · avatar */}
      <AppGlassCircle
        tone="primary"
        aria-label="PREDICT assistant"
        className="absolute top-[43px] left-[47px]"
      >
        <PredictMark className="h-[20.166px] w-[18px]" />
      </AppGlassCircle>
      <header className="absolute top-[51px] left-1/2 -translate-x-1/2 text-center font-display">
        <p className="text-base leading-[19px]">Good morning,</p>
        <h1 className="mt-[7px] text-4xl leading-[43px] font-normal whitespace-nowrap">
          Arjun Vaidya
        </h1>
      </header>
      <div className="absolute top-[43px] left-[1811px] size-[60px] overflow-hidden rounded-full border border-foreground bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/screens/shared/avatar.png"
          alt="Arjun Vaidya"
          className="absolute top-[-21px] left-[-17.02px] h-[155px] w-[87.04px] max-w-none"
        />
      </div>

      {/* Timeline + date */}
      <div aria-hidden className="absolute top-[199px] left-0 h-0.5 w-[959px] bg-primary" />
      <div className="absolute top-[183px] left-[calc(50%+1px)] flex h-8 -translate-x-1/2 items-center rounded-full bg-secondary px-5 text-[10.5px] leading-[21px] whitespace-nowrap text-secondary-foreground">
        Sunday, 27 December 2026
      </div>

      {/* Upload your blood report */}
      <AppCard className="absolute top-[265px] left-[47px] h-[484px] w-[401px] items-center px-[30px] py-5">
        <div aria-hidden className="h-[7px] w-[149px] shrink-0 rounded-[3.5px] bg-primary/50" />
        <div className="flex h-[60px] flex-col items-center text-center">
          <AppCardTitle className="leading-5">Upload your blood report</AppCardTitle>
          <AppCardDescription className="w-[243px]">
            Get a clearer picture of your health with accurate blood testing and regular health
            monitoring.
          </AppCardDescription>
        </div>
        <label className="flex h-[242px] w-full shrink-0 cursor-pointer flex-col items-center justify-center gap-[17px] rounded-[30px] border border-dashed border-primary bg-card/50">
          <input
            type="file"
            accept="application/pdf"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
          <UploadIcon className="size-[49px]" strokeWidth={1} />
          <span className="w-[243px] text-center text-[10px] leading-[14px]">
            {fileName ?? "Upload or drop your PDF report here"}
          </span>
        </label>
        <Button variant="app" size="lg" className="w-[321px] text-base">
          Continue
        </Button>
      </AppCard>

      <SmallCard
        heading="Add a wearable"
        description="Start your 14 nights while you wait"
        action="Connect"
        icon={<PlusIcon className="size-[18px]" strokeWidth={1} />}
        className="left-[479px]"
      />

      {/* Watch our product */}
      <AppCard className="absolute top-[265px] left-[769px] h-[315px] w-[381px] items-center px-2.5 pt-[30px] pb-2.5">
        <AppCardHeader className="h-6 w-[321px]">
          <AppCardTitle>Watch our product</AppCardTitle>
          <ArrowUpRightIcon className="size-6" strokeWidth={1} />
        </AppCardHeader>
        <div className="relative h-[227px] w-[362px] shrink-0 overflow-hidden rounded-[30px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/screens/shared/product-video.png"
            alt="PREDICT product video"
            className="absolute top-0 left-[-13.26%] h-[113.66%] w-[126.51%] max-w-none"
          />
          <button
            type="button"
            aria-label="Play video"
            className="absolute inset-0 m-auto flex size-[65px] items-center justify-center rounded-full bg-white/40 text-white"
          >
            <PlayIcon className="size-[26px] translate-x-0.5 fill-white" strokeWidth={0} />
          </button>
        </div>
      </AppCard>

      {/* Book your blood test */}
      <AppCard className="absolute top-[265px] left-[1188px] w-[381px] items-center">
        <AppCardHeader className="h-[66px] w-full">
          <div>
            <AppCardTitle className="leading-5">Book your blood test</AppCardTitle>
            <AppCardDescription>
              Get a clearer picture of your health with accurate blood testing and regular health
              monitoring.
            </AppCardDescription>
          </div>
        </AppCardHeader>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/screens/blood-test/bt-02-blood-draw.png"
          alt="Phlebotomist drawing blood at home"
          className="aspect-[736/414] w-full rounded-[30px] object-cover"
        />
        <div className="flex w-[321px] flex-col gap-5">
          <div className="flex items-center">
            <div className="flex h-8 w-[204px] items-end gap-1.5 leading-6">
              <p className="text-4xl leading-6 whitespace-nowrap">₹10,599</p>
              <p className="h-[18px] text-sm leading-6 line-through">₹18,899</p>
            </div>
            <p className="flex h-8 w-[116px] items-end justify-end text-[13px] leading-6">
              for one person
            </p>
          </div>
          <p className="h-8 text-[10px] leading-[14px]">
            Take control of your health with a comprehensive full body check-up designed for early
            detection and complete peace of mind.
          </p>
        </div>
        <Button variant="app" size="lg" className="w-full text-base">
          Book a test
        </Button>
      </AppCard>

      <SmallCard
        heading="Upload your report"
        description="Get a clearer picture of your health with accurate"
        action="Upload"
        icon={<UploadIcon className="size-[17px]" strokeWidth={1} />}
        className="left-[1607px]"
      />

      <DesktopNav />
    </DesktopScreen>
  )
}
