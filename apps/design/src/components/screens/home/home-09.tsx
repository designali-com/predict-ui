"use client"

import { EqualIcon, MessageCirclePlusIcon, MicIcon, SquareDashedIcon } from "lucide-react"

import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"

import { Screen } from "../screen"
import { AssistantBottomNav, AssistantOrb, IconCircleButton } from "./shared-b"

export const title = "Assistant"

// Figma: iPhone 18 Pro - 173 (1871:2049)
export default function Home09() {
  return (
    <Screen>
      <IconCircleButton aria-label="Menu" className="top-[57px] left-12">
        <EqualIcon strokeWidth={1.5} />
      </IconCircleButton>
      <IconCircleButton aria-label="Focus" className="top-[57px] left-[302px]">
        <SquareDashedIcon strokeWidth={1.5} />
      </IconCircleButton>

      <AssistantOrb top={237} />

      <div className="absolute top-[482px] left-1/2 flex w-[260px] -translate-x-1/2 gap-2">
        <Button variant="app" size="lg" className="h-12 w-[127px] bg-primary/80 px-7 text-base">
          Chat
          <MessageCirclePlusIcon className="size-[18px]" strokeWidth={1.5} />
        </Button>
        <Button variant="app-secondary" size="lg" className="h-12 w-[125px] px-6 text-sm">
          Voice
          <MicIcon className="size-[18px]" strokeWidth={1.5} />
        </Button>
      </div>

      <Button
        variant="outline"
        size="lg"
        className="absolute top-[541px] left-[71px] h-12 w-[260px] text-sm text-foreground/40"
      >
        Log your food
      </Button>

      <AssistantBottomNav />
    </Screen>
  )
}
