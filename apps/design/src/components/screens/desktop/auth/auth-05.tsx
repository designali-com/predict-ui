import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { Input } from "@workspace/ui/components/input"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"
import { Logo } from "@workspace/ui/predict/logo"

import { DesktopScreen } from "../desktop-screen"

export const title = "Create account"

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

const fields = [
  { name: "name", placeholder: "Name", type: "text", autoComplete: "name" },
  { name: "email", placeholder: "Email", type: "email", autoComplete: "email" },
  { name: "phone", placeholder: "Phone number", type: "tel", autoComplete: "tel" },
  { name: "password", placeholder: "Password", type: "password", autoComplete: "new-password" },
]

// Figma: Slide 16:9 - 6 (1817:4713)
export default function AuthDesktop05() {
  return (
    <DesktopScreen className="items-center">
      <AppGlow variant="fade" className="h-[289px] mix-blend-multiply dark:mix-blend-normal" />
      <AuthHeader />

      <div className="relative mt-[228px] flex w-[290px] flex-col items-center text-center">
        <h1 className="font-display text-[40px] leading-[52px] font-normal">Get started</h1>
        <p className="text-base">Your journey starts here</p>

        <form className="mt-[54px] flex w-full flex-col gap-[9px]">
          {fields.map((field) => (
            <Input
              key={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              size="lg"
              placeholder={field.placeholder}
              aria-label={field.placeholder}
              className="border-border bg-card text-sm text-foreground placeholder:text-foreground/40"
            />
          ))}
          <Button type="submit" variant="app" size="lg" className="mt-px w-full px-7 text-base">
            Create account
          </Button>
        </form>

        <p className="mt-[95px] text-base">
          Already have an account?{" "}
          <a href="#" className="ml-1 underline">
            Log in
          </a>
        </p>

        <p className="mt-[54px] text-base">
          By continuing, you agree to our
          <br />
          <a href="#" className="underline">
            Terms of service
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy policy.
          </a>
        </p>
      </div>
    </DesktopScreen>
  )
}
