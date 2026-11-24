"use client"

import { ArrowLeftIcon } from "lucide-react"

import {
  GlassButtonGroup,
  GlassButtonGroupItem,
} from "@workspace/ui/components/liquid-glass/glass-button-group"

const look = "bg-secondary text-secondary-foreground"

export function GlassButtonGroupNested() {
  return (
    <GlassButtonGroup aria-label="Message">
      <GlassButtonGroup aria-label="Navigation" className={look}>
        <GlassButtonGroupItem aria-label="Back">
          <ArrowLeftIcon />
        </GlassButtonGroupItem>
      </GlassButtonGroup>
      <GlassButtonGroup aria-label="Actions" className={look}>
        <GlassButtonGroupItem>Archive</GlassButtonGroupItem>
        <GlassButtonGroupItem>Report</GlassButtonGroupItem>
      </GlassButtonGroup>
    </GlassButtonGroup>
  )
}
