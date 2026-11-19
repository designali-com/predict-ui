"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { Switch } from "@workspace/ui/components/switch"
import { AppCard } from "@workspace/ui/predict/app/app-card"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { DesktopScreen } from "../desktop-screen"

export const title = "Your choices"

const choices = [
  { id: "ai-read", label: "Predict AI can read my record", defaultOn: true },
  { id: "whatsapp", label: "WhatsApp reminders", defaultOn: false },
  { id: "research", label: "Research, name removed", defaultOn: false },
  { id: "keep-reports", label: "Keep my reports and guide me", defaultOn: true },
]

// Figma: Slide 16:9 - 9 (1817:5188)
export default function RegisteredDesktop02() {
  const [enabled, setEnabled] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(choices.map((c) => [c.id, c.defaultOn]))
  )

  return (
    <DesktopScreen className="items-center">
      <AppGlow variant="fade" className="h-[289px]" />

      <div className="relative mt-[232px] flex w-[313px] flex-col items-center">
        <h1 className="text-center font-display text-[40px] leading-[1.1] font-normal">
          Your choices
        </h1>
        <p className="mt-[11px] w-[313px] text-center text-base leading-[19px]">
          Change any time in You.
        </p>

        <AppCard className="mt-10 h-[280px] w-[245px] justify-between gap-0">
          {choices.map((choice) => (
            <label key={choice.id} className="flex min-h-[26px] items-center justify-between gap-3">
              <span className="w-[109px] text-xs leading-[14px]">{choice.label}</span>
              <Switch
                checked={enabled[choice.id]}
                onCheckedChange={(checked) =>
                  setEnabled((prev) => ({ ...prev, [choice.id]: checked }))
                }
                className="data-checked:bg-app-brand data-unchecked:bg-app-track"
              />
            </label>
          ))}
        </AppCard>

        <Button variant="app" size="lg" className="mt-[39px] w-[290px] text-base">
          Agree and continue
        </Button>
        {/* White on white in Figma (styled for the mobile glow); kept as designed. */}
        <button
          type="button"
          className="mt-3 flex h-12 w-[290px] items-center justify-center text-sm leading-5 text-white underline"
        >
          Read the full notice
        </button>
      </div>
    </DesktopScreen>
  )
}
