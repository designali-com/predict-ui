import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"

import { AuthDesktopLayout } from "./auth-01"

export const title = "Enter phone number"

// Figma: Slide 16:9 - 3 (1817:4528)
export default function AuthDesktop02() {
  return (
    <AuthDesktopLayout top={224}>
      <h1 className="w-[248px] font-display text-[40px] leading-[1.1] font-normal">What&apos;s your number?</h1>
      <p className="mt-1.5 text-base">The one you gave at your blood test.</p>

      <Input
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        size="lg"
        placeholder="Phone number"
        aria-label="Phone number"
        className="mt-[77px] w-[290px] border-app-border bg-app-field text-sm text-app-foreground placeholder:text-app-foreground/40"
      />

      <div className="mt-[118px] flex flex-col gap-3">
        <Button variant="app" size="lg" className="w-[290px] px-7 text-base">
          Submit
        </Button>
        <Button variant="app-secondary" size="lg" className="w-[290px] px-6 text-sm">
          Use different number
        </Button>
      </div>

      <a href="#" className="mt-[35px] text-base underline">
        resend otp?
      </a>
    </AuthDesktopLayout>
  )
}
