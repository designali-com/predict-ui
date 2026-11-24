"use client"

import * as React from "react"

import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"
import { Logo } from "@workspace/ui/predict/logo"

import { DesktopScreen } from "../desktop-screen"

export const title = "Verify OTP"

const LENGTH = 6

/** Violet pill header with the PREDICT wordmark and a "Get started" action. */
function AuthHeader() {
  return (
    <header className="absolute top-[43px] left-[47px] flex h-[60px] w-[1816px] items-center justify-between rounded-full bg-primary pr-1.5 pl-[30px]">
      <Logo aria-label="PREDICT" className="h-[22px] w-[142px] text-primary-foreground" />
      <Button variant="app-secondary" size="lg" className="px-6 text-sm">
        Get started
      </Button>
    </header>
  )
}

// Figma: Slide 16:9 - 7 (1817:4758)
export default function AuthDesktop06() {
  const [digits, setDigits] = React.useState<string[]>(() => Array(LENGTH).fill(""))
  const refs = React.useRef<(HTMLInputElement | null)[]>([])

  const update = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1)
    setDigits((prev) => prev.map((d, i) => (i === index ? digit : d)))
    if (digit && index < LENGTH - 1) refs.current[index + 1]?.focus()
  }

  const onKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus()
    }
  }

  return (
    <DesktopScreen className="items-center">
      <AppGlow variant="fade" className="h-[289px] mix-blend-multiply dark:mix-blend-normal" />
      <AuthHeader />

      <div className="relative mt-[259px] flex w-[290px] flex-col items-center text-center">
        <h1 className="font-display text-[40px] leading-[52px] font-normal">Enter OTP</h1>
        <p className="text-base">
          We sent a code to
          <br />
          you@example.com
        </p>

        <div className="mt-[64px] flex" role="group" aria-label="One-time password">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el
              }}
              value={digit}
              onChange={(e) => update(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              maxLength={1}
              placeholder="0"
              aria-label={`Digit ${i + 1}`}
              className="size-12 rounded-full border border-border bg-card text-center text-sm text-foreground outline-none placeholder:text-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
            />
          ))}
        </div>

        <div className="mt-[118px] flex flex-col gap-3">
          <Button variant="app" size="lg" className="w-[290px] px-7 text-base">
            Submit
          </Button>
          <Button variant="app-secondary" size="lg" className="w-[290px] px-6 text-sm">
            Use a different number
          </Button>
        </div>

        <a href="#" className="mt-[35px] text-base underline">
          Resend code
        </a>
      </div>
    </DesktopScreen>
  )
}
