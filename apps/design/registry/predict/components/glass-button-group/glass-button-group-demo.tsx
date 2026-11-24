"use client"

import { EllipsisIcon } from "lucide-react"

import {
  GlassButtonGroup,
  GlassButtonGroupItem,
  GlassButtonGroupSeparator,
} from "@workspace/ui/components/liquid-glass/glass-button-group"

export function GlassButtonGroupDemo() {
  return (
    <GlassButtonGroup
      aria-label="Report"
      className="bg-primary text-primary-foreground"
    >
      <GlassButtonGroupItem>Download</GlassButtonGroupItem>
      <GlassButtonGroupItem>Share</GlassButtonGroupItem>
      <GlassButtonGroupSeparator />
      <GlassButtonGroupItem aria-label="More report actions">
        <EllipsisIcon />
      </GlassButtonGroupItem>
    </GlassButtonGroup>
  )
}
