"use client"

import * as React from "react"
import {
  CameraIcon,
  CircleDashedIcon,
  ClockIcon,
  GripIcon,
  MessageCirclePlusIcon,
  MicIcon,
} from "lucide-react"
import { cn } from "cn"

import {
  AppButton as Button,
  AppGlassBar,
  AppGlassCircle,
  AppLens,
  AppLensHighlight,
} from "@workspace/ui/predict/app/app-glass"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"
import { PredictMark } from "@workspace/ui/predict/logo"

/** 48px round outlined icon button used in the assistant screens' top bar. */
export function IconCircleButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant="outlineglass"
      size="icon-lg"
      className={cn("absolute [&_svg:not([class*='size-'])]:size-5", className)}
      {...props}
    />
  )
}

export type AssistantMode = "chat" | "voice" | "camera"

const modes: { id: AssistantMode; label: string; Icon: typeof MicIcon }[] = [
  { id: "chat", label: "Chat", Icon: MessageCirclePlusIcon },
  { id: "voice", label: "Voice", Icon: MicIcon },
  { id: "camera", label: "Camera", Icon: CameraIcon },
]

/** Chat · Voice · Camera switch at the top of the assistant screens. */
export function AssistantModeTabs({
  defaultMode = "chat",
  className,
}: {
  defaultMode?: AssistantMode
  className?: string
}) {
  const [mode, setMode] = React.useState<AssistantMode>(defaultMode)

  return (
    <div
      role="tablist"
      data-glass-host=""
      className={cn(
        "absolute isolate top-[59px] left-[142px] flex h-10 w-[111px] items-center justify-center gap-1 rounded-full border border-border bg-card p-[3px]",
        className
      )}
    >
      <AppLens value={mode} />
      {modes.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-label={label}
          aria-selected={mode === id}
          onClick={() => setMode(id)}
          className={cn(
            "relative flex size-[31px] items-center justify-center rounded-full text-foreground transition-colors",
            mode === id && "text-primary-foreground [[data-glass-traveling]_&]:text-foreground!"
          )}
        >
          {mode === id && <AppLensHighlight />}
          <Icon className="relative z-20 size-[17px]" strokeWidth={1.5} />
        </button>
      ))}
    </div>
  )
}

/**
 * The iridescent assistant orb with the PREDICT mark on top. The PNG has a white
 * backdrop, so it is darken-blended in light mode and inverted + lightened in dark.
 */
export function AssistantOrb({
  top,
  flipped = false,
}: {
  /** Top edge of the 302 × 260 orb. */
  top: number
  flipped?: boolean
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute left-12 h-[260px] w-[302px]" style={{ top }}>
      <div
        className={cn(
          "absolute inset-0 overflow-hidden mix-blend-darken dark:mix-blend-lighten dark:hue-rotate-180 dark:invert",
          flipped && "rotate-180"
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/screens/home/home-09-orb.png"
          alt=""
          className="absolute top-[-20.38%] left-[-27.48%] h-[136.15%] w-[156.29%] max-w-none"
        />
      </div>
      <PredictMark className="absolute top-[101px] left-[130px] h-[47px] w-[42px] text-primary dark:text-primary-foreground" />
    </div>
  )
}

/**
 * Bottom navigation as drawn while the PREDICT assistant is open:
 * menu · [Today | Twin] · assistant (active), over the violet fade.
 */
export function AssistantBottomNav() {
  const [tab, setTab] = React.useState<"today" | "twin">("today")

  return (
    <>
      <AppGlow variant="fade" />
      <nav className="absolute bottom-5 left-1/2 z-10 flex w-[311px] -translate-x-1/2 items-center justify-between gap-1">
        <AppGlassCircle aria-label="Menu">
          <GripIcon className="size-6" strokeWidth={2} />
        </AppGlassCircle>

        <AppGlassBar className="flex h-[60px] w-[181px] items-center justify-center gap-[5px] pr-3.5 pl-3">
          <Button
            variant={tab === "today" ? "app-secondary" : "ghost"}
            onClick={() => setTab("today")}
            aria-label="Today"
            className={cn("h-12 gap-1 rounded-full text-base", tab === "today" ? "px-[18px]" : "w-12 px-0")}
          >
            {tab === "today" && "Today"}
            <ClockIcon
              className={cn("size-5", tab === "today" && "fill-foreground stroke-secondary")}
              strokeWidth={2}
            />
          </Button>
          <Button
            variant={tab === "twin" ? "app-secondary" : "ghost"}
            onClick={() => setTab("twin")}
            aria-label="Twin"
            className={cn("h-12 gap-1 rounded-full text-base", tab === "twin" ? "px-[18px]" : "w-12 px-0")}
          >
            {tab === "twin" && "Twin"}
            <CircleDashedIcon className="size-5" />
          </Button>
        </AppGlassBar>

        <AppGlassBar className="flex size-[60px] shrink-0 items-center justify-center text-foreground">
          <Button variant="app" size="icon-lg" aria-label="PREDICT assistant" aria-pressed>
            <PredictMark className="h-5 w-[18px]" />
          </Button>
        </AppGlassBar>
      </nav>
    </>
  )
}
