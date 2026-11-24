"use client"

import {
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  EqualIcon,
  MicIcon,
  PlusIcon,
} from "lucide-react"
import { cn } from "cn"

import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { PredictMark } from "@workspace/ui/predict/logo"

import { Screen } from "../screen"
import { AssistantBottomNav, AssistantModeTabs, IconCircleButton } from "./shared-b"

export const title = "Assistant conversation"

type Message = { id: string; from: "bot" | "user"; text: string; time: string; top: number }

const messages: Message[] = [
  { id: "m1", from: "bot", text: "Sugar reading before breakfast: 148 mg/dL, higher than usual", time: "2:10 pm", top: 220 },
  { id: "m2", from: "bot", text: "Please check with Dr. Iyer", time: "2:10 pm", top: 307 },
  { id: "m3", from: "user", text: "Can we do pizza after the walk on Sunday?", time: "2:10 pm", top: 374 },
  { id: "m4", from: "bot", text: "Sugar reading before breakfast: 148 mg/dL, higher than usual", time: "2:10 pm", top: 476 },
  { id: "m5", from: "bot", text: "Please check with Dr. Iyer", time: "2:10 pm", top: 563 },
]

function BotAvatar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground",
        className
      )}
    >
      <PredictMark className="h-[45%] w-auto" />
    </span>
  )
}

// Figma: iPhone 18 Pro - 176 (1871:2314)
export default function Home12() {
  return (
    <Screen>
      <IconCircleButton aria-label="Menu" className="top-[55px] left-[27px]">
        <EqualIcon strokeWidth={1.5} />
      </IconCircleButton>
      <AssistantModeTabs defaultMode="chat" />
      <IconCircleButton aria-label="Back" className="top-[55px] left-[328px]">
        <ChevronLeftIcon className="size-6" strokeWidth={1.5} />
      </IconCircleButton>

      {/* Conversation header */}
      <div className="absolute top-[118px] left-[31px] flex h-[65px] w-[345px] items-center gap-[11px] rounded-[24px] bg-card pr-[19px] pl-3.5 text-foreground shadow-[inset_0_-1px_8px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_-1px_8px_rgba(255,255,255,0.2)]">
        <BotAvatar className="size-10" />
        <p className="flex-1 text-base leading-5">Vitamin D follow-up</p>
        <button type="button" aria-label="Conversation options" className="text-primary dark:text-primary-foreground">
          <EllipsisVerticalIcon className="size-6" strokeWidth={2} />
        </button>
      </div>

      {/* Thread */}
      <ol aria-label="Messages" className="text-foreground">
        {messages.map((m) =>
          m.from === "bot" ? (
            <li
              key={m.id}
              className="absolute left-[31px] flex w-[346px] items-start gap-3"
              style={{ top: m.top }}
            >
              <BotAvatar className="mt-0.5 size-5" />
              <p className="w-[229px] text-base leading-5">{m.text}</p>
              <time
                className={cn(
                  "ml-auto text-xs leading-5 opacity-60",
                  m.text.length > 40 && "mt-[21px]"
                )}
              >
                {m.time}
              </time>
            </li>
          ) : (
            <li
              key={m.id}
              className="absolute left-[31px] flex w-[346px] items-start gap-[15px]"
              style={{ top: m.top }}
            >
              <time className="mt-[21px] text-xs leading-5 opacity-60">{m.time}</time>
              <p className="ml-auto w-[195px] text-right text-base leading-5">{m.text}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/screens/home/home-12-user.png"
                alt="You"
                width={20}
                height={20}
                className="size-5 shrink-0 rounded-full"
              />
            </li>
          )
        )}
      </ol>

      {/* Composer */}
      <Button
        variant="app-secondary"
        size="icon-lg"
        aria-label="Add attachment"
        className="absolute top-[730px] left-[27px]"
      >
        <PlusIcon className="size-6" strokeWidth={1.5} />
      </Button>
      <input
        aria-label="Message"
        placeholder="Message"
        className="absolute top-[730px] left-[84px] h-12 w-[236px] rounded-full bg-muted px-6 text-sm leading-5 text-foreground shadow-[inset_0_-1px_8px_rgba(0,0,0,0.1)] outline-none placeholder:text-foreground/40"
      />
      <Button
        variant="app-secondary"
        size="icon-lg"
        aria-label="Voice message"
        className="absolute top-[730px] left-[328px]"
      >
        <MicIcon className="size-[18px]" strokeWidth={1.5} />
      </Button>

      <AssistantBottomNav />
    </Screen>
  )
}
