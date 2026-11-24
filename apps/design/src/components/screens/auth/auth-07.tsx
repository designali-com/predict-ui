import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import { Input } from "@workspace/ui/components/input"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"
import { At, AuthHeading, AuthMark, primaryButtonClass } from "./auth-parts"

export const title = "Create account"

const fields = [
  { name: "name", placeholder: "Name", type: "text", autoComplete: "name", top: 353 },
  { name: "email", placeholder: "Email", type: "email", autoComplete: "email", top: 410 },
  { name: "phone", placeholder: "Phone number", type: "tel", autoComplete: "tel", top: 467 },
  { name: "password", placeholder: "Password", type: "password", autoComplete: "new-password", top: 523 },
]

// Figma: iPhone 18 Pro - 123 (1733:1964)
export default function Auth07() {
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
        <At top={579}>
          <Button type="button" variant="app" className={primaryButtonClass}>
            Create account
          </Button>
        </At>
      </form>

      <At top={722} className="flex gap-1.5 text-base leading-[19px] whitespace-nowrap text-white">
        Already have an account?
        <a href="#" className="underline">
          Log in
        </a>
      </At>

      <At top={795} className="w-[290px] text-center text-base leading-[19px] text-white">
        By continuing, you agree to our
        <br />
        <a href="#" className="underline">
          Terms of service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy policy.
        </a>
      </At>
    </Screen>
  )
}
