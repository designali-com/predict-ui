"use client"

import Link from "next/link"

import { GlassButton } from "@workspace/ui/components/liquid-glass/glass-button"

export function GlassButtonLink() {
  return (
    <GlassButton
      asChild
      material="tinted"
      className="bg-primary text-primary-foreground"
    >
      <Link href="/biomarkers">Browse biomarkers</Link>
    </GlassButton>
  )
}
