import { MessageSquareTextIcon, PhoneOffIcon } from "lucide-react"

import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"

import { DesktopScreen } from "../desktop-screen"
import { BottomGlow, HomeHeader } from "./shared"
import { AssistantTabs, HomeNav, VoiceOrb } from "./shared-c"

export const title = "Voice assistant listening"

// Figma: Slide 16:9 - 24 (1855:2284)
export default function HomeDesktop07() {
  return (
    <DesktopScreen>
      <BottomGlow />
      <HomeHeader />
      <AssistantTabs defaultValue="voice" />
      <VoiceOrb />

      <p
        role="status"
        className="absolute top-[699px] left-[calc(50%-0.5px)] flex h-5 w-[67px] -translate-x-1/2 items-center gap-[5px] text-sm leading-5 text-secondary-foreground"
      >
        <span className="size-[5px] shrink-0 rounded-full bg-foreground" />
        Listening
      </p>

      <div className="absolute top-[844px] left-[calc(50%-0.5px)] flex w-[113px] -translate-x-1/2 items-center justify-between">
        <Button variant="secondary" size="lg" aria-label="Show transcript" className="w-[50px] px-0">
          <MessageSquareTextIcon className="size-5" strokeWidth={1.5} />
        </Button>
        <Button variant="destructive" size="icon-lg" aria-label="End voice chat" className="bg-destructive/80">
          <PhoneOffIcon className="size-5" strokeWidth={1.5} />
        </Button>
      </div>

      <HomeNav defaultTab="today" tone="secondary" highlight="assistant" />
    </DesktopScreen>
  )
}
