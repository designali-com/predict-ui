"use client"

import { EllipsisIcon } from "lucide-react"

import {
  GlassButtonGroup,
  GlassButtonGroupItem,
  GlassButtonGroupSeparator,
} from "@workspace/ui/components/liquid-glass/glass-button-group"
import {
  GlassDropdownMenu,
  GlassDropdownMenuContent,
  GlassDropdownMenuItem,
  GlassDropdownMenuTrigger,
} from "@workspace/ui/components/liquid-glass/glass-dropdown-menu"

export function GlassDropdownMenuGroup() {
  return (
    <GlassDropdownMenu>
      <GlassButtonGroup
        aria-label="Reminder"
        className="bg-primary text-primary-foreground"
      >
        <GlassButtonGroupItem>Snooze</GlassButtonGroupItem>
        <GlassButtonGroupSeparator />
        <GlassDropdownMenuTrigger asChild>
          <GlassButtonGroupItem aria-label="More reminder options">
            <EllipsisIcon />
          </GlassButtonGroupItem>
        </GlassDropdownMenuTrigger>
      </GlassButtonGroup>
      <GlassDropdownMenuContent className="text-primary-foreground">
        <GlassDropdownMenuItem>In an hour</GlassDropdownMenuItem>
        <GlassDropdownMenuItem>Tomorrow</GlassDropdownMenuItem>
        <GlassDropdownMenuItem>Next week</GlassDropdownMenuItem>
      </GlassDropdownMenuContent>
    </GlassDropdownMenu>
  )
}
