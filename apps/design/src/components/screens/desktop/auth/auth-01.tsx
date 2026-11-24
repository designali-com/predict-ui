import * as React from "react"
import { PhoneIcon } from "lucide-react"

import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"
import { Logo } from "@workspace/ui/predict/logo"

import { DesktopScreen } from "../desktop-screen"

export const title = "Welcome"

/**
 * Shared chrome of the desktop auth screens 01–03: the brand pill nav bar with
 * the PREDICT wordmark + "Get started", and the violet fade along the bottom.
 * Children are the centred 290px-wide form column, starting at `top`.
 */
export function AuthDesktopLayout({ top, children }: { top: number; children: React.ReactNode }) {
  return (
    <DesktopScreen>
      <AppGlow variant="fade" className="h-[289px]" />

      <header className="absolute top-[43px] left-[47px] h-[60px] w-[1816px] rounded-full bg-primary text-primary-foreground">
        <Logo
          aria-label="PREDICT"
          preserveAspectRatio="none"
          className="absolute top-[17px] left-[30px] h-[22px] w-[142px]"
        />
        <Button variant="app-secondary" size="lg" className="absolute top-1.5 left-[1688px] px-6 text-sm">
          Get started
        </Button>
      </header>

      <main
        className="absolute left-1/2 flex w-[290px] -translate-x-1/2 flex-col items-center text-center"
        style={{ top }}
      >
        {children}
      </main>
    </DesktopScreen>
  )
}

// Figma: Slide 16:9 - 2 (1815:4073)
export default function AuthDesktop01() {
  return (
    <AuthDesktopLayout top={364}>
      <h1 className="font-display text-[40px] leading-[52px] font-normal">Welcome</h1>
      <p className="text-base">Your journey starts here</p>

      <div className="mt-12 flex flex-col gap-3">
        <Button variant="app" size="lg" className="w-[290px] px-7 text-base">
          Continue with phone
          <PhoneIcon className="size-[13px] fill-current stroke-0" />
        </Button>
        <Button variant="app-secondary" size="lg" className="w-[290px] px-6 text-sm">
          Continue with Google
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/screens/shared/apple.svg" alt="" className="size-3.5 dark:invert" />
        </Button>
      </div>

      <p className="mt-[35px] text-base">
        Don’t have an account?{" "}
        <a href="#" className="underline">
          Sign up
        </a>
      </p>
    </AuthDesktopLayout>
  )
}
