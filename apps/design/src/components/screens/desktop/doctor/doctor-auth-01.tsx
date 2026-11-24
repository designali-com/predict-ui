"use client"

import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { Input } from "@workspace/ui/components/input"

import { AuthDesktopLayout } from "../auth/auth-01"

export const title = "Doctor log in"

// Figma: Slide 16:9 - 48 (1993:4546)
export default function DoctorAuth01() {
  return (
    <AuthDesktopLayout top={228}>
      <h1 className="font-display text-[40px] leading-[52px] font-normal">Get started</h1>
      <p className="text-base">Your journey starts here</p>

      <form className="mt-[75px] flex w-full flex-col" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-2.5">
          <Input
            name="email"
            type="email"
            autoComplete="email"
            size="lg"
            placeholder="Email"
            aria-label="Email"
            className="border-border bg-card text-sm text-foreground placeholder:text-foreground/40"
          />
          <Input
            name="password"
            type="password"
            autoComplete="current-password"
            size="lg"
            placeholder="Password"
            aria-label="Password"
            className="border-border bg-card text-sm text-foreground placeholder:text-foreground/40"
          />
        </div>
        <Button type="submit" variant="app" size="lg" className="mt-[74px] w-full px-7 text-base">
          Login
        </Button>
      </form>

      <p className="mt-[193px] text-base">
        By continuing, you agree to our
        <br />
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy.
        </a>
      </p>
    </AuthDesktopLayout>
  )
}
