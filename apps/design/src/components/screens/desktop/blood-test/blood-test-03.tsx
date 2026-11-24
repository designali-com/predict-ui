import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react"

import { AppCard, AppCardDescription, AppCardTitle } from "@workspace/ui/predict/app/app-card"

import { BloodTestDesktopLayout } from "./shared"

export const title = "Blood test booked"

const links = [
  { title: "Track your order", description: "Get a clearer picture of your health." },
  { title: "Booking details", description: "Get a clearer picture of your health." },
]

// Figma: Slide 16:9 - 18 (1818:8331)
export default function BloodTestDesktop03() {
  return (
    <BloodTestDesktopLayout>
      <AppCard className="absolute top-[289px] left-1/2 h-[433px] w-[381px] -translate-x-1/2 items-center">
        <div className="flex h-[66px] w-[321px] flex-col items-center text-center">
          <AppCardTitle>Your blood test is booked</AppCardTitle>
          <AppCardDescription className="w-60">
            Get a clearer picture of your health with accurate blood testing and regular health
            monitoring.
          </AppCardDescription>
        </div>

        <div className="flex h-[141px] w-full items-center justify-center">
          <BadgeCheckIcon
            aria-label="Booking confirmed"
            className="size-[104px] fill-primary stroke-primary-foreground [&>path:first-child]:stroke-transparent"
            strokeWidth={0.92}
          />
        </div>

        {links.map((link) => (
          <button
            key={link.title}
            type="button"
            className="flex w-full items-center justify-between text-left"
          >
            <span className="flex flex-col">
              <span className="font-display text-[21px] leading-6">{link.title}</span>
              <span className="mt-3 text-[10px] leading-[14px]">{link.description}</span>
            </span>
            <ChevronRightIcon className="size-6 shrink-0" strokeWidth={1} />
          </button>
        ))}
      </AppCard>
    </BloodTestDesktopLayout>
  )
}
