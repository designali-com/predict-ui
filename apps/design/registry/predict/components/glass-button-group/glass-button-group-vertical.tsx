"use client"

import { MinusIcon, PlusIcon } from "lucide-react"

import {
  GlassButtonGroup,
  GlassButtonGroupItem,
  GlassButtonGroupSeparator,
} from "@workspace/ui/components/liquid-glass/glass-button-group"

export function GlassButtonGroupVertical() {
  return (
    <GlassButtonGroup
      aria-label="Zoom"
      orientation="vertical"
      size="lg"
      className="bg-primary text-primary-foreground"
    >
      <GlassButtonGroupItem aria-label="Zoom in" className="px-0">
        <PlusIcon />
      </GlassButtonGroupItem>
      <GlassButtonGroupSeparator />
      <GlassButtonGroupItem aria-label="Zoom out" className="px-0">
        <MinusIcon />
      </GlassButtonGroupItem>
    </GlassButtonGroup>
  )
}
