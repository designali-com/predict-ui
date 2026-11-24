"use client"

import { ChevronLeftIcon, EqualIcon, MessageCircleMoreIcon, PlusIcon, SearchIcon } from "lucide-react"

import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"

import { Screen } from "../screen"
import { AssistantBottomNav, AssistantModeTabs, IconCircleButton } from "./shared-b"

export const title = "Assistant chats"

const chats = [
  { id: "vitamin-d", title: "Vitamin D follow-up", time: "7:30 pm" },
  { id: "sleep-hrv", title: "Sleep & HRV check-in", time: "7:30 pm" },
  { id: "cholesterol", title: "Cholesterol panel review", time: "7:30 pm" },
]

// Figma: iPhone 18 Pro - 175 (1871:2216)
export default function Home11() {
  return (
    <Screen>
      <IconCircleButton aria-label="Menu" className="top-[55px] left-[27px]">
        <EqualIcon strokeWidth={1.5} />
      </IconCircleButton>
      <AssistantModeTabs defaultMode="chat" />
      <IconCircleButton aria-label="Back" className="top-[55px] left-[328px]">
        <ChevronLeftIcon className="size-6" strokeWidth={1.5} />
      </IconCircleButton>

      <label className="absolute top-[119px] left-[31px] flex h-12 w-[289px] items-center gap-1 rounded-full border border-border px-6 text-sm leading-5 text-foreground shadow-button-soft">
        <SearchIcon className="size-[17px] shrink-0 opacity-60" strokeWidth={1.5} />
        <input
          type="search"
          placeholder="Search chats"
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-foreground/40"
        />
      </label>
      <Button
        variant="app-secondary"
        size="icon-lg"
        aria-label="New chat"
        className="absolute top-[119px] left-[328px]"
      >
        <PlusIcon className="size-6" strokeWidth={1.5} />
      </Button>

      <ul className="absolute top-[178px] left-[31px] flex w-[345px] flex-col gap-[11px]">
        {chats.map((chat) => (
          <li key={chat.id}>
            <button
              type="button"
              className="flex h-[65px] w-full items-center gap-[11px] rounded-[24px] bg-card pr-[18px] pl-3.5 text-left text-foreground shadow-[inset_0_-1px_8px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_-1px_8px_rgba(255,255,255,0.2)]"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                <MessageCircleMoreIcon className="size-5" strokeWidth={1.25} />
              </span>
              <span className="flex-1 text-base leading-5">{chat.title}</span>
              <span className="text-xs leading-5">{chat.time}</span>
            </button>
          </li>
        ))}
      </ul>

      <AssistantBottomNav />
    </Screen>
  )
}
