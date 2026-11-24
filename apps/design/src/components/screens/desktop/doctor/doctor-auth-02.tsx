"use client"

import * as React from "react"

import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"

import { AuthDesktopLayout } from "../auth/auth-01"

export const title = "Doctor verify OTP"

const LENGTH = 6

// Figma: Slide 16:9 - 52 (1993:4665)
export default function DoctorAuth02() {
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
    <AuthDesktopLayout top={228}>
      <h1 className="font-display text-[40px] leading-[52px] font-normal">Enter OTP</h1>
      <p className="text-base">
        We sent you an email at
        <br />
        doctor@predict.fit
      </p>

      <div className="mt-[95px] flex" role="group" aria-label="One-time password">
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

      <div className="mt-[89px] flex flex-col gap-3">
        <Button variant="app" size="lg" className="w-[290px] px-7 text-base">
          Submit
        </Button>
        <Button variant="app-secondary" size="lg" className="w-[290px] px-6 text-sm">
          Use different email
        </Button>
      </div>
    </AuthDesktopLayout>
  )
}
