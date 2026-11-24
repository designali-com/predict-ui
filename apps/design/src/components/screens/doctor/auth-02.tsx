import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { Input } from "@workspace/ui/components/input"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import { At, AuthHeading, AuthMark, primaryButtonClass } from "../auth/auth-parts"

export const title = "Doctor log in"

const fields = [
  { name: "email", placeholder: "Email", type: "email", autoComplete: "email", top: 374 },
  { name: "password", placeholder: "Password", type: "password", autoComplete: "current-password", top: 432 },
]

// Figma: iPhone 18 Pro - 178 (1996:4712)
export default function DoctorAuth02() {
  return (
    <Screen className="bg-card">
      <AppGlow variant="blob" />
      <AuthMark />

      <At top={228}>
        <AuthHeading>Get started</AuthHeading>
      </At>
      <At top={280} className="text-base leading-[19px] whitespace-nowrap">
        Your journey starts here
      </At>

      <form>
        {fields.map(({ top, ...field }) => (
          <At key={field.name} top={top}>
            <Input
              size="lg"
              aria-label={field.placeholder}
              {...field}
              className="w-[290px] border-border bg-card leading-5 text-foreground placeholder:text-foreground/40"
            />
          </At>
        ))}
        <At top={554}>
          <Button type="button" variant="app" className={primaryButtonClass}>
            Login
          </Button>
        </At>
      </form>

      <At top={795} className="w-[290px] text-center text-base leading-[19px] text-white">
        By continuing, you agree to our
        <br />
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy.
        </a>
      </At>
    </Screen>
  )
}
