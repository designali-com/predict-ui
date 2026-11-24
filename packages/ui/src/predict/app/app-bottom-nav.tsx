"use client"

import * as React from "react"
import {
  CircleDashedIcon,
  ClockIcon,
  DropletIcon,
  GripIcon,
  UploadIcon,
  UserIcon,
  WatchIcon,
} from "lucide-react"
import { cn } from "cn"
 
import {
  AppGlassBar, 
  AppGlassMenu,
  AppTabs,
  AppTabsList,
  AppTabsTrigger,
  type AppMenuItem,
} from "@workspace/ui/predict/app/app-glass"
import { PredictMark } from "@workspace/ui/predict/logo"

type AppTab = "today" | "explore"

interface AppBottomNavProps extends React.ComponentProps<"nav"> {
  /** Selected tab. Without `onTabChange` it is only the initial one. */
  active?: AppTab
  onTabChange?: (tab: AppTab) => void
  /** Entries of the menu that opens above the menu button. */
  menuItems?: AppMenuItem[]
  /** Entries of the menu that opens above the assistant button. */
  assistantItems?: AppMenuItem[]
}

const defaultMenuItems: AppMenuItem[] = [
  { label: "Book a test", icon: <DropletIcon /> },
  { label: "Upload report", icon: <UploadIcon /> },
  { label: "Wearables", icon: <WatchIcon /> },
  { label: "Profile", icon: <UserIcon /> },
]

const aiMenuItems: AppMenuItem[] = [
  { label: "Book a test", icon: <DropletIcon /> },
  { label: "Upload report", icon: <UploadIcon /> },
  { label: "Wearables", icon: <WatchIcon /> },
  { label: "Profile", icon: <UserIcon /> },
]

/** Fixed sizes: the selected tab is always 119px, the other one 48px. */
const tabClass = (selected: boolean) =>
  cn("h-12 flex-none px-0 transition-colors", selected ? "w-[119px]" : "w-12")

/**
 * Floating bottom navigation of the PREDICT mobile app:
 * menu · [Today | Twin] · PREDICT assistant. The selected tab turns secondary
 * while either menu is open.
 */
function AppBottomNav({
  active: activeProp,
  onTabChange,
  menuItems = defaultMenuItems,
  assistantItems = aiMenuItems,
  className,
  ...props
}: AppBottomNavProps) {
  const [internal, setInternal] = React.useState<AppTab>(activeProp ?? "today")
  const [menu, setMenu] = React.useState<"main" | "assistant" | null>(null)
  const active = onTabChange && activeProp ? activeProp : internal
  const tone = menu ? "secondary" : "primary"
  const toggle = (name: "main" | "assistant") => (open: boolean) =>
    setMenu((current) => (open ? name : current === name ? null : current))

  return (
    <nav
      data-slot="app-bottom-nav"
      className={cn(
        "absolute bottom-5 left-1/2 z-10 flex w-[311px] -translate-x-1/2 items-center justify-between",
        className
      )}
      {...props}
    >
      <AppGlassMenu
        label="Menu"
        items={menuItems}
        open={menu === "main"}
        onOpenChange={toggle("main")}
      >
        <GripIcon className="size-6 fill-primary" strokeWidth={2} />
      </AppGlassMenu>

      <AppGlassBar className="h-[60px] w-[183px] shrink-0 p-1.5">
        <AppTabs
          value={active}
          onValueChange={(next) => {
            setInternal(next as AppTab)
            onTabChange?.(next as AppTab)
          }}
        >
          <AppTabsList
            aria-label="Main"
            className="w-full gap-1 border-0 bg-transparent p-0 group-data-horizontal/tabs:h-12"
          >
            <AppTabsTrigger
              value="today"
              tone={tone}
              className={tabClass(active === "today")}
            >
              {active === "today" ? (
                <>
                  Today
                  <ClockIcon className="size-5 shrink-0" strokeWidth={2} />
                </>
              ) : (
                <ClockIcon className="size-5 shrink-0" strokeWidth={2} />
              )}
            </AppTabsTrigger>

            <AppTabsTrigger
              value="explore"
              tone={tone}
              className={tabClass(active === "explore")}
            >
              {active === "explore" ? (
                <>
                  Twin
                  <CircleDashedIcon className="size-5 shrink-0" />
                </>
              ) : (
                <CircleDashedIcon className="size-5 shrink-0" />
              )}
            </AppTabsTrigger>
          </AppTabsList>
        </AppTabs>
      </AppGlassBar>

      <AppGlassMenu
        label="PREDICT assistant"
        items={assistantItems}
        align="end"
        open={menu === "assistant"}
        onOpenChange={toggle("assistant")}
      >
        <PredictMark className="h-[20px]" />
      </AppGlassMenu>
    </nav>
  )
}

export { AppBottomNav, type AppTab }
