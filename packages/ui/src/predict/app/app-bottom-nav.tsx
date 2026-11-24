"use client"

import * as React from "react"
import { CircleDashedIcon, ClockIcon, GripIcon } from "lucide-react"
import { cn } from "cn"

import {
  AppButton as Button,
  AppGlassBar,
  AppGlassCircle,
} from "@workspace/ui/predict/app/app-glass"
import { PredictMark } from "@workspace/ui/predict/logo"

type AppTab = "today" | "explore"

interface AppBottomNavProps extends React.ComponentProps<"nav"> {
  active?: AppTab
  onTabChange?: (tab: AppTab) => void
}

/**
 * Floating bottom navigation of the PREDICT mobile app:
 * menu · [Today | explore] · PREDICT assistant.
 */
function AppBottomNav({
  active: activeProp,
  onTabChange,
  className,
  ...props
}: AppBottomNavProps) {
  const [internal, setInternal] = React.useState<AppTab>("today")
  const active = activeProp ?? internal
  const select = (tab: AppTab) => {
    setInternal(tab)
    onTabChange?.(tab)
  }

  return (
    <nav
      data-slot="app-bottom-nav"
      className={cn(
        "absolute bottom-5 gap-1 left-1/2 z-10 flex w-[311px] -translate-x-1/2 items-center justify-between",
        className
      )}
      {...props}
    >
      <AppGlassCircle aria-label="Menu">
        <GripIcon className="size-6" strokeWidth={2} />
      </AppGlassCircle>


      <AppGlassBar className="flex h-[60px] w-full items-center justify-center p-1.5">
        <div className="inline-flex h-full items-center justify-center gap-1">
          <Button
            variant={active === "today" ? "app" : "ghost"}
            onClick={() => select("today")}
            aria-label="Today"
            className={cn(
              "h-12 w-30 rounded-full transition-all duration-200",
              active === "today" ? "px-5 gap-2" : "w-12 px-0"
            )}
          >
            {active === "today" && "Today"}
            <ClockIcon
              className={cn(
                "size-5 shrink-0",
                active === "today" &&
                "fill-primary-foreground stroke-primary"
              )}
              strokeWidth={2}
            />
          </Button>

          <Button
            variant={active === "explore" ? "app" : "ghost"}
            onClick={() => select("explore")}
            aria-label="Twin"
            className={cn(
              "h-12  w-30 rounded-full transition-all duration-200",
              active === "explore" ? "px-5 gap-2" : "w-12 px-0"
            )}
          >
            {active === "explore" && "Twin"}
            <CircleDashedIcon className="size-5 shrink-0" />
          </Button>
        </div>
      </AppGlassBar>


      <AppGlassCircle aria-label="PREDICT assistant">
        <PredictMark className="h-[20px]" />
      </AppGlassCircle>
    </nav>
  )
}

export { AppBottomNav, type AppTab }
