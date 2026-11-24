"use client"

import * as React from "react"
import { MenuTrigger } from "@ui-sdk/react/menu"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@ui-sdk/react/popover"
import type { VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { Button, buttonVariants } from "@workspace/ui/components/button"
import {
  GlassDropdownMenu,
  GlassDropdownMenuContent,
  GlassDropdownMenuItem,
} from "@workspace/ui/components/liquid-glass/glass-dropdown-menu"
import {
  GlassLayer,
  type GlassOptics,
} from "@workspace/ui/components/liquid-glass/glass-layer"
import { GlassLens } from "@workspace/ui/components/liquid-glass/glass-lens"
import {
  GlassPopupAnchor,
  GlassPopupContext,
  GlassPopupSurface,
  useGlassPopup,
} from "@workspace/ui/components/liquid-glass/glass-popup"
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
  dark: { tint: 0.5, borderAlpha: 0.25 },
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
        tint={0.5}
        blur={3}
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
          tint={0.5}
          blur={3}
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

/** Tinted glass that fills its positioned parent, in that parent's corners. */
function AppGlassFill({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      data-glass-host=""
      className={cn("absolute! inset-0 -z-10 rounded-full", className)}
    >
      <GlassLayer material="tinted" swell={false} />
    </span>
  )
}

type AppTabTone = "primary" | "secondary"

/**
 * The pill the lens leaves from and settles into. The lens reads the outer
 * colour, so the glass is drawn on a child.
 */
function AppLensHighlight({
  tone = "primary",
  className,
}: {
  tone?: AppTabTone
  className?: string
}) {
  const fill = tone === "primary" ? "bg-primary" : "bg-secondary"
  return (
    <span
      aria-hidden
      data-glass-highlight=""
      className={cn(
        "absolute inset-0 isolate rounded-full [[data-glass-moving]_&]:opacity-0",
        fill,
        className
      )}
    >
      <AppGlassFill className={fill} />
    </span>
  )
}

function AppTabsTrigger({
  value,
  tone = "primary",
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsTrigger> & {
  /** Colour of the selected pill. */
  tone?: AppTabTone
}) {
  const selected = React.useContext(AppTabsContext) === value
  return (
    <TabsTrigger
      value={value}
      className={cn(
        className,
        "data-active:bg-transparent data-active:shadow-none [[data-glass-traveling]_&]:text-foreground!",
        tone === "primary"
          ? "data-active:hover:text-primary-foreground data-active:hover:dark:text-primary-foreground"
          : "data-active:text-secondary-foreground data-active:hover:text-secondary-foreground data-active:hover:dark:text-secondary-foreground"
      )}
      {...props}
    >
      {selected && <AppLensHighlight tone={tone} />}
      <span className="relative z-20 inline-flex items-center gap-[inherit]">
        {children}
      </span>
    </TabsTrigger>
  )
}

interface AppMenuItem {
  label: string
  icon?: React.ReactNode
  onSelect?: () => void
  destructive?: boolean
}

/** Round glass button of the floating navigation that opens a menu above itself. */
function AppGlassMenu({
  label,
  items,
  align = "start",
  open,
  onOpenChange,
  children,
}: {
  label: string
  items: AppMenuItem[]
  /** Edge of the button the menu lines up with. */
  align?: "start" | "end"
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  return (
    <GlassDropdownMenu open={open} onOpenChange={onOpenChange} modal={false}>
      <AppGlassMenuTrigger label={label} open={open}>
        {children}
      </AppGlassMenuTrigger>
      <GlassDropdownMenuContent
        side="top"
        align={align}
        className="w-72 text-foreground"
      >
        {items.map((item) => (
          <GlassDropdownMenuItem
            key={item.label}
            destructive={item.destructive}
            onSelect={() => item.onSelect?.()}
          >
            {item.icon}
            {item.label}
          </GlassDropdownMenuItem>
        ))}
      </GlassDropdownMenuContent>
    </GlassDropdownMenu>
  )
}

function AppGlassMenuTrigger({
  label,
  open,
  children,
}: {
  label: string
  open: boolean
  children: React.ReactNode
}) {
  const popup = React.useContext(GlassPopupContext)
  return (
    <MenuTrigger
      aria-label={label}
      data-glass-host=""
      data-glass-backdrop={SCREEN}
      className={cn(
        "flex size-[60px] shrink-0 cursor-pointer items-center justify-center rounded-full glass text-foreground outline-none select-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      {popup && <GlassPopupAnchor popup={popup} />}
      <span
        className={cn(
          "relative isolate flex size-12 items-center justify-center rounded-full transition-colors duration-200",
          open && "text-primary-foreground"
        )}
      >
        {open && <AppGlassFill className="bg-primary" />}
        {children}
      </span>
    </MenuTrigger>
  )
}

/** A popover that swells out of its button as one body of glass. */
function AppPopover({
  children,
  ...props
}: React.ComponentProps<typeof Popover>) {
  const popup = useGlassPopup({ matchWidth: true })
  return (
    <Popover {...props}>
      <GlassPopupContext.Provider value={popup}>
        {children}
      </GlassPopupContext.Provider>
    </Popover>
  )
}

function AppPopoverTrigger({
  variant = "app",
  size,
  className,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof PopoverTrigger>,
  "children" | "className" | "render"
> &
  VariantProps<typeof buttonVariants> & {
    children?: React.ReactNode
    className?: string
  }) {
  const popup = React.useContext(GlassPopupContext)
  return (
    <PopoverTrigger
      data-glass-host=""
      // The popup's glass takes the button's own colour.
      data-glass-fill=""
      data-glass-glow="off"
      data-glass-backdrop={SCREEN}
      className={cn(
        buttonVariants({ variant, size }),
        // The glass reads this fill as it opens; a transition would hand it a half-way colour.
        "cursor-pointer transition-none",
        className
      )}
      {...props}
    >
      {popup && <GlassPopupAnchor popup={popup} />}
      <span className="inline-flex items-center gap-[inherit]">{children}</span>
    </PopoverTrigger>
  )
}

/** The popup. It opens above its button; its children arrive one after another. */
function AppPopoverContent({
  className,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof PopoverContent>,
  "children" | "className" | "render"
> & {
  children?: React.ReactNode
  className?: string
}) {
  const popup = React.useContext(GlassPopupContext)
  return (
    <PopoverContent
      data-glass-popup=""
      data-glass-skip=""
      side="top"
      sideOffset={12}
      className={cn(
        "rounded-[28px] p-2 text-primary-foreground outline-none data-glass-off:bg-primary",
        className
      )}
      {...props}
    >
      {popup && <GlassPopupSurface popup={popup} />}
      <div data-glass-list="" className="flex flex-col gap-1">
        {React.Children.toArray(children).map((child, i) => (
          <div
            key={React.isValidElement(child) ? child.key : i}
            data-glass-item=""
            style={{ "--glass-i": i } as React.CSSProperties}
          >
            {child}
          </div>
        ))}
      </div>
    </PopoverContent>
  )
}

function AppPopoverTitle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof PopoverTitle>, "className"> & {
  className?: string
}) {
  return (
    <PopoverTitle
      className={cn("px-3 pt-3 text-lg font-medium text-inherit", className)}
      {...props}
    />
  )
}

function AppPopoverDescription({
  className,
  ...props
}: Omit<React.ComponentProps<typeof PopoverDescription>, "className"> & {
  className?: string
}) {
  return (
    <PopoverDescription
      className={cn("px-3 pb-2 text-xs text-inherit", className)}
      {...props}
    />
  )
}

/** A row of the popup. Pressing it closes the popup. */
function AppPopoverItem({
  className,
  ...props
}: Omit<React.ComponentProps<typeof PopoverClose>, "className"> & {
  className?: string
}) {
  return (
    <PopoverClose
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-[20px] p-3 text-left transition-colors outline-none hover:bg-current/10 focus-visible:ring-2 focus-visible:ring-current",
        className
      )}
      {...props}
    />
  )
}

export {
  AppButton,
  AppGlassBar,
  AppGlassCircle,
  AppGlassMenu,
  AppLens,
  AppLensHighlight,
  AppPopover,
  AppPopoverContent,
  AppPopoverDescription,
  AppPopoverItem,
  AppPopoverTitle,
  AppPopoverTrigger,
  AppScaledProvider,
  AppTabs,
  AppTabsList,
  AppTabsTrigger,
  type AppMenuItem,
}
