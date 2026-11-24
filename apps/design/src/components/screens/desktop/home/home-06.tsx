import { DesktopScreen } from "../desktop-screen"
import { BottomGlow, HomeHeader } from "./shared"
import { AssistantTabs, HomeNav, VoiceOrb } from "./shared-c"

export const title = "Voice assistant"

// Figma: Slide 16:9 - 25 (1855:2468)
export default function HomeDesktop06() {
  return (
    <DesktopScreen>
      <BottomGlow />
      <HomeHeader />
      <AssistantTabs defaultValue="voice" />
      <VoiceOrb />
      <HomeNav defaultTab="today" tone="secondary" highlight="assistant" />
    </DesktopScreen>
  )
}
