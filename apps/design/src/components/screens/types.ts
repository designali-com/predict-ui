import type * as React from "react"

/** One screen from the Figma "App Design" page: Section 8 (app) or Section 9 (desktop). */
export interface ScreenEntry {
  /** URL-safe id, unique across all groups. */
  slug: string
  title: string
  /** Source frame in Figma, e.g. "1733:1930". */
  nodeId: string
  /** Renders the screen contents: 402 × 874 for app, 1920 × 1080 for desktop. */
  component: React.ComponentType
  /** Defaults to "app". */
  platform?: ScreenPlatform
}

export type ScreenPlatform = "app" | "desktop"

export const screenSizes: Record<ScreenPlatform, { width: number; height: number }> = {
  app: { width: 402, height: 874 },
  desktop: { width: 1920, height: 1080 },
}

export interface ScreenGroup {
  slug: string
  title: string
  screens: ScreenEntry[]
}

export const FIGMA_FILE_URL = "https://www.figma.com/design/gAnjUgpK63tTzC9AgOyGma/Predict"

export function figmaNodeUrl(nodeId: string) {
  return `${FIGMA_FILE_URL}?node-id=${nodeId.replace(":", "-")}`
}

interface ScreenModule {
  title: string
  default: React.ComponentType
}

/** Builds a registry entry from a screen module (`export const title` + default component). */
export function screen(slug: string, nodeId: string, mod: ScreenModule): ScreenEntry {
  return { slug, nodeId, title: mod.title, component: mod.default }
}

/** Same as `screen`, for a 1920 × 1080 desktop screen. */
export function desktopScreen(slug: string, nodeId: string, mod: ScreenModule): ScreenEntry {
  return { ...screen(slug, nodeId, mod), platform: "desktop" }
}
