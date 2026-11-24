"use client"

import { Trash2Icon } from "lucide-react"

import { GlassSlideToConfirm } from "@workspace/ui/components/liquid-glass/glass-slide-to-confirm"

const wait = () => new Promise((resolve) => setTimeout(resolve, 1500))

export function GlassSlideToConfirmBare() {
  return (
    <GlassSlideToConfirm
      className="max-w-xs"
      fill={false}
      hint={false}
      icon={<Trash2Icon />}
      fillClassName="bg-destructive text-white"
      pendingLabel="Deleting"
      successLabel="Deleted"
      resetAfter={2500}
      onConfirm={wait}
    >
      Slide to delete report
    </GlassSlideToConfirm>
  )
}
