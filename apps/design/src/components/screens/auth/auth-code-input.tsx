"use client"

import * as React from "react"

import { At } from "./auth-parts"

/** Six 48px round code cells, centred on the canvas (y 413). */
export function CodeInput({ label }: { label: string }) {
  const LENGTH = 6
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
    <At top={413} className="flex" role="group" aria-label={label}>
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
          maxLength={2}
          placeholder="0"
          aria-label={`Digit ${i + 1}`}
          className="size-12 rounded-full border border-border bg-card text-center text-sm leading-5 text-foreground outline-none placeholder:text-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20"
        />
      ))}
    </At>
  )
}
