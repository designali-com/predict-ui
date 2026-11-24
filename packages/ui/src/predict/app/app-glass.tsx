"use client"

import * as React from "react"
import { cn } from "cn"

import { Button } from "@workspace/ui/components/button"
import {
  GlassLayer,
  type GlassOptics,
} from "@workspace/ui/components/liquid-glass/glass-layer"
import { GlassLens } from "@workspace/ui/components/liquid-glass/glass-lens"
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

/**
 * True inside a scaled-down preview. Glass that measures the page (the clear
 * material and the travelling lens) does not account for CSS `zoom`, so there
 * it falls back to the plain CSS look.
 */
const AppScaledContext = React.createContext(false)

function AppScaledProvider({
  scaled,
  children,
}: {
  scaled: boolean
  children: React.ReactNode
}) {
  return (
    <AppScaledContext.Provider value={scaled}>
      {children}
    </AppScaledContext.Provider>
  )
}

const SCREEN = "[data-slot=app-screen],[data-slot=desktop-screen]"

const filledVariants = new Set([
  "default",
  "brand",
  "app",
  "secondary",
  "lavender",
  "app-secondary",
  "destructive",
  "invert",
])

const softVariants = new Set(["secondary", "lavender", "app-secondary"])

/** Pale fills read as grey under the full inner shading. */
const softOptics: GlassOptics = { inner: 0.35, fresnel: 0.6 }

/** The kit's `Button`, with filled variants drawn as tinted liquid glass. */
function AppButton({
  variant = "default",
  children,
  ...props
}: React.ComponentProps<typeof Button>) {
  const scaled = React.useContext(AppScaledContext)
  const filled = filledVariants.has(variant ?? "default")
  const clear = variant === "outlineglass"

  if (!filled && !clear) {
    return (
      <Button variant={variant} {...props}>
        {children}
      </Button>
    )
  }

  return (
    <Button variant={variant} data-glass-host="" {...props}>
      {filled ? (
        <GlassLayer
          material="tinted"
          optics={
            softVariants.has(variant ?? "default") ? softOptics : undefined
          }
        />
      ) : (
        <GlassLayer tint={0.35} backdrop={SCREEN} disabled={scaled} />
      )}
      {children}
    </Button>
  )
}

const surfaceOptics: GlassOptics = {
  borderColor: "#ffffff",
  borderAlpha: 0.6,
  frostMix: 1,
  inner: 0.2,
  fresnel: 0.4,
  shadow: 0.5,
  dark: { tint: 0.7, borderAlpha: 0.2 },
}

const surfaceTint =
  "[--glass-tint:white] dark:[--glass-tint:oklch(0.24_0.03_297)]"

/** Frosted glass bar for floating navigation. */
function AppGlassBar({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const scaled = React.useContext(AppScaledContext)
  return (
    <div
      data-slot="app-glass-bar"
      data-glass-host=""
      className={cn("rounded-full glass", surfaceTint, className)}
      {...props}
    >
      <GlassLayer
        tint={0.86}
        blur={5}
        swell={false}
        backdrop={SCREEN}
        optics={surfaceOptics}
        disabled={scaled}
      />
      {children}
    </div>
  )
}

/**
 * Round glass button, 60px unless `className` says otherwise. `surface` is the
 * frosted glass of the floating navigation, `primary` the brand colour.
 */
function AppGlassCircle({
  tone = "surface",
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & { tone?: "surface" | "primary" }) {
  const scaled = React.useContext(AppScaledContext)
  return (
    <button
      type="button"
      data-slot="app-glass-circle"
      data-glass-host=""
      className={cn(
        "flex size-[60px] shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring",
        tone === "primary"
          ? "bg-primary text-primary-foreground"
          : cn("glass text-foreground", surfaceTint),
        className
      )}
      {...props}
    >
      {tone === "primary" ? (
        <GlassLayer material="tinted" />
      ) : (
        <GlassLayer
          tint={0.86}
          blur={5}
          backdrop={SCREEN}
          optics={surfaceOptics}
          disabled={scaled}
        />
      )}
      {children}
    </button>
  )
}

const AppTabsContext = React.createContext<unknown>(null)

/** `Tabs` whose selection travels as a glass lens. Same parts and props as `Tabs`. */
function AppTabs({
  defaultValue,
  value: valueProp,
  onValueChange,
  ...props
}: React.ComponentProps<typeof Tabs>) {
  const [internal, setInternal] = React.useState(defaultValue ?? null)
  const value = valueProp !== undefined ? valueProp : internal
  return (
    <AppTabsContext.Provider value={value}>
      <Tabs
        value={value}
        onValueChange={(next, details) => {
          setInternal(next)
          onValueChange?.(next, details)
        }}
        {...props}
      />
    </AppTabsContext.Provider>
  )
}

function AppTabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsList>) {
  const value = React.useContext(AppTabsContext)
  return (
    <TabsList
      data-glass-host=""
      className={cn("relative isolate", className)}
      {...props}
    >
      <AppLens value={value as string | number | null} />
      {children}
    </TabsList>
  )
}

/** The travelling lens, for tabs that are not `AppTabs`. Pair it with `AppLensHighlight`. */
function AppLens({ value }: { value: string | number | null }) {
  const scaled = React.useContext(AppScaledContext)
  return <GlassLens value={value} disabled={scaled} />
}

/** The flat pill the lens leaves from and settles into. */
function AppLensHighlight({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      data-glass-highlight=""
      className={cn(
        "absolute inset-0 rounded-full bg-primary shadow-button [[data-glass-moving]_&]:opacity-0",
        className
      )}
    />
  )
}

function AppTabsTrigger({
  value,
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsTrigger>) {
  const selected = React.useContext(AppTabsContext) === value
  return (
    <TabsTrigger
      value={value}
      className={cn(
        className,
        "data-active:bg-transparent data-active:shadow-none data-active:hover:text-primary-foreground data-active:hover:dark:text-primary-foreground [[data-glass-traveling]_&]:text-foreground!"
      )}
      {...props}
    >
      {selected && <AppLensHighlight />}
      <span className="relative z-20 inline-flex items-center gap-[inherit]">
        {children}
      </span>
    </TabsTrigger>
  )
}

export {
  AppButton,
  AppGlassBar,
  AppGlassCircle,
  AppLens,
  AppLensHighlight,
  AppScaledProvider,
  AppTabs,
  AppTabsList,
  AppTabsTrigger,
}
