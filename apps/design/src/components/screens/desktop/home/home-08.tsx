import type * as React from "react"
import { CheckIcon, CornerDownRightIcon, EllipsisVerticalIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"

import { DesktopScreen } from "../desktop-screen"
import { BottomGlow, DashCardHeader, HomeHeader } from "./shared"
import { AssistantTabs, AvatarStack, ChatRow, HomeNav, PanelCard, PhotoAvatar, RowTitle } from "./shared-c"

// Kept local: a plain value imported from a "use client" module is a client
// reference in this server component, not the string.
const ASSETS = "/screens/desktop/home"

export const title = "Family chat"

const photos = {
  santosh: { src: `${ASSETS}/home-05-chat-avatar-1.png`, alt: "Santosh" },
  meera: { src: `${ASSETS}/home-05-chat-avatar-2.png`, alt: "Meera" },
  ankit: { src: `${ASSETS}/home-05-chat-avatar-3.png`, alt: "Ankit" },
}

const familyStack = <AvatarStack photos={[photos.santosh, photos.meera, photos.ankit]} more={2} />

const chats = [
  { name: "Santosh", time: "Yesterday", photo: photos.santosh },
  { name: "Meera", time: "Monday", photo: photos.meera },
  { name: "Meera", time: "Monday", photo: photos.meera },
  { name: "Meera", time: "Monday", photo: photos.meera },
  { name: "Ankit", time: "Monday", photo: photos.meera },
  { name: "Rahul", time: "Monday", photo: photos.meera },
]

/** Quoted message inside a reply bubble. */
function Quote({ author, text, className }: { author: string; text: string; className?: string }) {
  return (
    <div className="flex w-full items-start gap-1.5">
      <CornerDownRightIcon className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.5} />
      <div className="flex flex-col gap-0.5">
        <p className="text-xs leading-4 font-medium">{author}</p>
        <p className={cn("overflow-hidden text-xs leading-4 text-foreground/80", className)}>{text}</p>
      </div>
    </div>
  )
}

/** Incoming message: initials avatar, author name, bubble and time. */
function Incoming({
  author,
  initials,
  tint,
  time,
  bubbleWidth,
  children,
}: {
  author: string
  initials: string
  tint: string
  time: string
  bubbleWidth: number
  children: React.ReactNode
}) {
  return (
    <div className="grid shrink-0 grid-cols-[28px_378px] gap-x-2 gap-y-1 pt-5">
      <p className="col-2 px-1 text-xs leading-4 font-medium text-muted-foreground">{author}</p>
      <span
        className={cn(
          "flex size-7 items-center justify-center rounded-full text-[10px] leading-[15px] font-medium",
          tint
        )}
      >
        {initials}
      </span>
      <div className="flex flex-col gap-1">
        <div
          className="flex flex-col gap-2 rounded-tl-lg rounded-tr-2xl rounded-b-2xl bg-foreground/4 px-3.5 py-2.5 text-sm leading-[21.7px]"
          style={{ width: bubbleWidth }}
        >
          {children}
        </div>
        <p className="px-1 pt-0.5 text-[10px] leading-[15px] text-muted-foreground">{time}</p>
      </div>
    </div>
  )
}

function FamilyThread() {
  return (
    <div className="relative min-h-px w-full flex-1 overflow-hidden">
      <div className="absolute top-0 left-4 flex h-[455px] w-[816px] flex-col justify-end overflow-hidden">
        <Incoming author="Alex Morgan" initials="AM" tint="bg-sky-100 text-sky-800" time="10:48" bubbleWidth={292}>
          <p>
            Quick walkthrough at 2? <span className="font-medium">@You</span> would love your take on the final flow.
          </p>
        </Incoming>

        {/* Outgoing reply */}
        <div className="flex shrink-0 flex-col items-end gap-1 pt-5">
          <div className="flex w-[328px] flex-col gap-2 rounded-tl-2xl rounded-tr-lg rounded-b-2xl bg-secondary px-3.5 py-2.5 text-sm leading-[21.7px] text-secondary-foreground">
            <Quote
              author="Alex Morgan"
              text="Quick walkthrough at 2? @You would love your take on the final flow."
              className="h-8 w-[280px]"
            />
            <p>Sounds good — see you then.</p>
          </div>
          <button
            type="button"
            aria-label="Add 👍 reaction, 1 person"
            className="mx-0.5 flex h-6 items-center gap-1 rounded-full border border-foreground/10 bg-card px-2 text-xs leading-4 font-medium shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          >
            <span aria-hidden>👍</span>1
          </button>
          <p className="flex items-center gap-1.5 px-1 pt-0.5 text-[10px] leading-[15px] text-muted-foreground">
            10:49
            <CheckIcon className="size-3" strokeWidth={1.5} aria-label="Sent" />
          </p>
        </div>

        <Incoming author="Maya Chen" initials="MC" tint="bg-orange-100 text-orange-800" time="10:50" bubbleWidth={223}>
          <p className="whitespace-nowrap">Perfect. I’ll bring the coffee ☕</p>
        </Incoming>

        <Incoming author="Jordan Lee" initials="JL" tint="bg-violet-100 text-violet-800" time="10:51" bubbleWidth={251}>
          <Quote author="Sam Rivera" text="Sounds good — see you then." className="h-4 whitespace-nowrap" />
          <p className="whitespace-nowrap">See you at two. I’ll bring the notes.</p>
        </Incoming>
      </div>
    </div>
  )
}

// Figma: Slide 16:9 - 23 (1855:2194)
export default function HomeDesktop08() {
  return (
    <DesktopScreen>
      <BottomGlow />
      <HomeHeader />
      <AssistantTabs defaultValue="chat" />

      {/* My chats */}
      <PanelCard className="top-[269px] left-[47px] h-[677px] w-[429px]">
        <DashCardHeader title="My chats" link />
        <ChatRow name="My family" time="9:30 PM" avatar={familyStack} />
        {chats.map((c, i) => (
          <ChatRow key={i} name={c.name} time={c.time} avatar={<PhotoAvatar {...c.photo} />} />
        ))}
      </PanelCard>

      {/* Family thread */}
      <PanelCard className="top-[269px] left-[506px] h-[677px] w-[908px]">
        <div className="flex w-full items-center justify-between border-b border-foreground/20 pb-4">
          <div className="flex h-8 items-center gap-3">
            {familyStack}
            <RowTitle>My family</RowTitle>
          </div>
          <button type="button" aria-label="Chat options">
            <EllipsisVerticalIcon className="size-6" strokeWidth={1.5} />
          </button>
        </div>

        <FamilyThread />

        <div role="group" aria-label="Message composer" className="flex w-full shrink-0 items-center justify-between rounded-[40px] border border-foreground/10 bg-card px-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
          <input
            aria-label="Message the group"
            placeholder="Message the group…"
            className="h-[63px] w-[412px] bg-transparent pt-[7px] pl-7 text-sm leading-5 outline-none placeholder:text-muted-foreground/70"
          />
          <Button size="lg" className="w-[93px] px-7 text-base font-normal">
            Send
          </Button>
        </div>
      </PanelCard>

      {/* My history */}
      <PanelCard className="top-[269px] left-[1442px] h-[677px] w-[429px] justify-start">
        <DashCardHeader title="My history" link />
      </PanelCard>

      <HomeNav defaultTab="today" tone="secondary" highlight="assistant" className="top-[967px] left-[calc(50%+0.5px)]" />
    </DesktopScreen>
  )
}
