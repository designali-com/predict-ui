"use client"

import { DownloadIcon, PencilIcon, ShareIcon, Trash2Icon } from "lucide-react"

import {
  GlassDropdownMenu,
  GlassDropdownMenuContent,
  GlassDropdownMenuItem,
  GlassDropdownMenuSeparator,
  GlassDropdownMenuTrigger,
} from "@workspace/ui/components/liquid-glass/glass-dropdown-menu"

export function GlassDropdownMenuDemo() {
  return (
    <GlassDropdownMenu>
      <GlassDropdownMenuTrigger>Report options</GlassDropdownMenuTrigger>
      <GlassDropdownMenuContent>
        <GlassDropdownMenuItem>
          <PencilIcon />
          Rename
        </GlassDropdownMenuItem>
        <GlassDropdownMenuItem>
          <DownloadIcon />
          Download PDF
        </GlassDropdownMenuItem>
        <GlassDropdownMenuItem>
          <ShareIcon />
          Share with doctor
        </GlassDropdownMenuItem>
        <GlassDropdownMenuSeparator />
        <GlassDropdownMenuItem destructive>
          <Trash2Icon />
          Delete
        </GlassDropdownMenuItem>
      </GlassDropdownMenuContent>
    </GlassDropdownMenu>
  )
}
