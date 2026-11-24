"use client"

import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

const ScreenContainerContext =
  React.createContext<React.RefObject<HTMLDivElement | null> | null>(null)

/** Ref to the current screen element — use as a portal container so overlays stay inside the phone. */
export function useScreenContainer() {
  return React.useContext(ScreenContainerContext)
}

interface ScreenProps extends React.ComponentProps<"div"> {
  children: React.ReactNode
}

export function Screen({ className, children, ...props }: ScreenProps) {
  const screenRef = React.useRef<HTMLDivElement>(null)

  return (
    <ScreenContainerContext.Provider value={screenRef}>
      <div
        ref={screenRef}
        data-slot="app-screen"
        className={cn(
          "relative isolate flex h-[874px] w-full flex-col overflow-hidden bg-background font-sans text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ScreenContainerContext.Provider>
  )
}
