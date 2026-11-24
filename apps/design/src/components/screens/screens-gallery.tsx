"use client"

import * as React from "react"
import Link from "next/link"

import { Badge } from "@workspace/ui/components/badge"
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

import { PhoneFrame, type ScreenTheme } from "./phone-frame"
import { desktopScreenGroups } from "./desktop/registry"
import { screenGroups } from "./registry"
import type { ScreenPlatform } from "./types"

const platforms: {
  value: ScreenPlatform
  label: string
  heading: string
  description: string
  groups: typeof screenGroups
  scales: { value: string; label: string }[]
  defaultScale: string
}[] = [
  {
    value: "app",
    label: "App",
    heading: "App screens",
    description: "Every phone screen from the PREDICT app design",
    groups: screenGroups,
    scales: [
      { value: "0.4", label: "40%" },
      { value: "0.6", label: "60%" },
      { value: "1", label: "100%" },
    ],
    defaultScale: "0.6",
  },
  {
    value: "desktop",
    label: "Desktop",
    heading: "Desktop screens",
    description: "Every desktop screen from the PREDICT web design",
    groups: desktopScreenGroups,
    scales: [
      { value: "0.25", label: "25%" },
      { value: "0.4", label: "40%" },
      { value: "0.6", label: "60%" },
    ],
    defaultScale: "0.4",
  },
]

type ThemeMode = ScreenTheme | "both"

const themes: { value: ThemeMode; label: string }[] = [
  { value: "system", label: "Auto" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "both", label: "Side by side" },
]

export function ScreensGallery() {
  const [platformValue, setPlatformValue] = React.useState<ScreenPlatform>("app")
  const platform = platforms.find((item) => item.value === platformValue) ?? platforms[0]!
  const [scale, setScale] = React.useState(platform.defaultScale)
  const [theme, setTheme] = React.useState<ThemeMode>("system")
  const groups = platform.groups.filter((group) => group.screens.length > 0)

  // `?platform=desktop` (or a `#desktop-…` anchor) opens the Desktop tab.
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("platform") === "desktop" || window.location.hash.startsWith("#desktop")) {
      selectPlatform("desktop")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function selectPlatform(value: ScreenPlatform) {
    const next = platforms.find((item) => item.value === value) ?? platforms[0]!
    setPlatformValue(next.value)
    setScale(next.defaultScale)
    const url = new URL(window.location.href)
    if (next.value === "app") url.searchParams.delete("platform")
    else url.searchParams.set("platform", next.value)
    window.history.replaceState(null, "", url)
  }
  const total = groups.reduce((sum, group) => sum + group.screens.length, 0)

  return (
    <div className="mx-auto max-w-7xl border-x">
      <section className="flex flex-col gap-6 border-b px-4 py-12 md:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-heading-40 md:text-heading-48">{platform.heading}</h1>
          <p className="max-w-xl text-sm">
            {platform.description} ({total} screens), built with the components in{" "}
            <code>@workspace/ui</code>.
          </p>
        </div>

        <Tabs
          value={platform.value}
          onValueChange={(value) => selectPlatform(value as ScreenPlatform)}
        >
          <TabsList aria-label="Platform">
            {platforms.map((item) => (
              <TabsTrigger key={item.value} value={item.value} className="px-6 py-2 text-sm">
                {item.label}
                <span className="opacity-60 tabular-nums">
                  {item.groups.reduce((sum, group) => sum + group.screens.length, 0)}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap gap-2">
            {groups.map((group) => (
              <Link key={group.slug} href={`#${group.slug}`}>
                <Badge variant="outline" className="gap-1.5">
                  {group.title}
                  <span className="text-muted-foreground">{group.screens.length}</span>
                </Badge>
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <Tabs value={theme} onValueChange={(value) => setTheme(value as ThemeMode)}>
              <TabsList aria-label="Screen theme">
                {themes.map((item) => (
                  <TabsTrigger key={item.value} value={item.value} className="px-4 py-2 text-xs">
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs> 
          </div>
        </div>
      </section>

      {groups.length === 0 ? (
        <p className="px-4 py-16 text-center text-sm text-muted-foreground md:px-8">
          No {platform.label.toLowerCase()} screens yet.
        </p>
      ) : null}

      {groups.map((group) => (
        <section key={group.slug} id={group.slug} className="scroll-mt-20 border-b">
          <header className="flex items-center gap-3 px-4 pt-10 md:px-8">
            <span className="h-6 w-1 rounded-full bg-primary" />
            <h2 className="text-heading-20 font-medium">{group.title}</h2>
            <span className="text-xs text-muted-foreground">
              {group.screens.length} {group.screens.length === 1 ? "screen" : "screens"}
            </span>
          </header>
          <div className="flex gap-6 overflow-x-auto px-4 pt-6 pb-10 md:px-8">
            {group.screens.map((screen) =>
              theme === "both" ? (
                <div key={screen.slug} id={screen.slug} className="flex shrink-0 scroll-mt-32 gap-3">
                  <PhoneFrame screen={screen} scale={Number(scale)} theme="light" label="Light" />
                  <PhoneFrame screen={screen} scale={Number(scale)} theme="dark" label="Dark" />
                </div>
              ) : (
                <PhoneFrame
                  key={screen.slug}
                  id={screen.slug}
                  className="scroll-mt-32"
                  screen={screen}
                  scale={Number(scale)}
                  theme={theme}
                />
              )
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
