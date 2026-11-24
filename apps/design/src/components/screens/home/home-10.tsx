"use client"

import * as React from "react"
import { EqualIcon, MessageSquareTextIcon, MicIcon, PhoneOffIcon, SquareDashedIcon } from "lucide-react"

import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"

import { Screen } from "../screen"
import {
  AssistantBottomNav,
  AssistantModeTabs,
  AssistantOrb,
  IconCircleButton,
} from "./shared-b"

export const title = "Assistant voice"

// Figma: iPhone 18 Pro - 174 (1871:2123)
export default function Home10() {
  const [listening, setListening] = React.useState(true)

  return (
    <Screen>
      <IconCircleButton aria-label="Menu" className="top-[57px] left-12">
        <EqualIcon strokeWidth={1.5} />
      </IconCircleButton>
      <AssistantModeTabs defaultMode="voice" />
      <IconCircleButton aria-label="Focus" className="top-[57px] left-[302px]">
        <SquareDashedIcon strokeWidth={1.5} />
      </IconCircleButton>

      <AssistantOrb top={160} flipped />

      <p className="absolute top-[427px] left-1/2 flex -translate-x-1/2 items-center gap-1.5 text-sm leading-5 whitespace-nowrap text-foreground">
        <span aria-hidden className="size-[5px] rounded-full bg-primary dark:bg-primary-foreground" />
        {listening ? "Listening" : "Paused"}
      </p>

      <Button
        variant="app-secondary"
        aria-label="Show transcript"
        className="absolute top-[672px] left-[67px] h-12 w-[50px] px-0"
      >
        <MessageSquareTextIcon className="size-5" strokeWidth={1.5} />
      </Button>

      <Button
        variant="app"
        aria-label={listening ? "Pause listening" : "Start listening"}
        aria-pressed={listening}
        onClick={() => setListening((v) => !v)}
        className="absolute top-[636px] left-1/2 size-28 -translate-x-1/2 bg-primary/80"
      >
        <MicIcon className="size-[54px]" strokeWidth={1} />
      </Button>

      <Button
        variant="destructive"
        size="icon-lg"
        aria-label="End call"
        className="absolute top-[672px] left-[285px] bg-destructive/80"
      >
        <PhoneOffIcon className="size-5" strokeWidth={1.5} />
      </Button>

      <AssistantBottomNav />
    </Screen>
  )
}
