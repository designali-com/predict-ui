import { BadgeCheckIcon, ChevronRightIcon, FileTextIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { AppCard, AppCardDescription, AppCardTitle } from "@workspace/ui/predict/app/app-card"

import { BloodTestDesktopLayout } from "./shared"

export const title = "Book blood test"

const cities = ["City - Delhi", "City - Mumbai", "City - Bengaluru"]
const centers = ["South Extension I", "Greater Kailash II", "Connaught Place"]

const profiles = [
  "Included in Complete blood count",
  "Included in Anaemia profile",
  "Included in Liver profile",
  "Included in Kidney profile",
  "Included in Cholesterol",
]

const selectTrigger =
  "h-12 w-[321px] rounded-full border-app-border bg-app-field/50 px-6 text-sm leading-5 text-app-foreground data-[size=default]:h-12 [&>svg]:size-6! [&>svg]:text-app-foreground!"

function CardHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="h-[66px] w-full">
      <AppCardTitle className="whitespace-nowrap">{title}</AppCardTitle>
      <AppCardDescription>{description}</AppCardDescription>
    </div>
  )
}

// Figma: Slide 16:9 - 16 (1818:7765)
export default function BloodTestDesktop01() {
  return (
    <BloodTestDesktopLayout>
      <AppCard className="absolute top-[272px] left-[47px] h-[509px] w-[693px] items-center">
        <CardHeading
          title="Book Your Blood Test"
          description="Get a clearer picture of your health with accurate blood testing and regular health monitoring."
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/screens/blood-test/bt-02-blood-draw.png"
          alt="Phlebotomist collecting a blood sample at home"
          className="aspect-[736/414] w-full rounded-[30px] object-cover"
        />
      </AppCard>

      <AppCard className="absolute top-[272px] left-[767px] h-[509px] w-[381px] items-center gap-3">
        <div className="h-[66px] w-full">
          <AppCardTitle>Your Blood Test</AppCardTitle>
          <AppCardDescription className="max-w-none">
            Get a clearer picture of your health with accurate blood testing and regular health
            monitoring.
          </AppCardDescription>
        </div>

        <Select defaultValue={cities[0]}>
          <SelectTrigger aria-label="City" className={selectTrigger}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select defaultValue={centers[0]}>
          <SelectTrigger aria-label="Center" className={selectTrigger}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {centers.map((center) => (
              <SelectItem key={center} value={center}>
                {center}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex h-20 w-[321px] items-center justify-between">
          <div className="flex h-8 items-end gap-1.5 leading-6">
            <span className="text-[36px] whitespace-nowrap">₹10,599</span>
            <span className="h-[18px] text-sm line-through">₹18,899</span>
          </div>
          <span className="flex h-[23px] w-[66px] items-center justify-center self-end rounded-[40px] bg-app-pill text-xs leading-6 text-app-pill-foreground">
            50% OFF
          </span>
        </div>

        <p className="h-8 w-[321px] text-[10px] leading-[14px]">
          Take control of your health with a comprehensive Full Body Check-Up designed for early
          detection and complete peace of mind.
        </p>

        <Button variant="app" size="lg" className="w-[321px] text-base">
          Book Now
        </Button>
        <Button variant="app-secondary" size="lg" className="w-[321px] text-sm">
          Request a callback
        </Button>
      </AppCard>

      <AppCard className="absolute top-[272px] left-[1179px] h-[509px] w-[695px]">
        <CardHeading
          title="What’s included in your checkup?"
          description="Explore the 72 parameters grouped by health profile."
        />

        <ul className="flex flex-col gap-1.5">
          {profiles.map((item) => (
            <li key={item} className="flex h-7 items-center gap-1.5 text-xs leading-[14px]">
              <BadgeCheckIcon className="size-6 shrink-0" strokeWidth={1} />
              {item}
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="flex h-[46px] w-full items-center justify-between text-left"
        >
          <span className="flex items-center gap-1.5">
            <FileTextIcon className="size-10 shrink-0" strokeWidth={1} />
            <span className="flex flex-col">
              <span className="font-display text-[21px] leading-6">View sample report</span>
              <span className="mt-2 text-[10px] leading-[14px]">Blood_Test_Report.pdf</span>
            </span>
          </span>
          <ChevronRightIcon className="size-6 shrink-0" strokeWidth={1} />
        </button>
      </AppCard>
    </BloodTestDesktopLayout>
  )
}
