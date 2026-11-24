"use client"

import {
  GlassDropdownMenu,
  GlassDropdownMenuContent,
  GlassDropdownMenuItem,
  GlassDropdownMenuTrigger,
} from "@workspace/ui/components/liquid-glass/glass-dropdown-menu"

const alignments = ["start", "center", "end"] as const

export function GlassDropdownMenuAlign() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {alignments.map((align) => (
        <GlassDropdownMenu key={align}>
          <GlassDropdownMenuTrigger>Align {align}</GlassDropdownMenuTrigger>
          <GlassDropdownMenuContent align={align}>
            <GlassDropdownMenuItem>Profile</GlassDropdownMenuItem>
            <GlassDropdownMenuItem>Settings</GlassDropdownMenuItem>
            <GlassDropdownMenuItem disabled>Billing</GlassDropdownMenuItem>
          </GlassDropdownMenuContent>
        </GlassDropdownMenu>
      ))}
    </div>
  )
}
