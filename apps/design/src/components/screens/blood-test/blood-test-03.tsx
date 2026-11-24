import { ChevronLeftIcon, ChevronRightIcon, FileTextIcon } from "lucide-react"

import {
  AppButton as Button,
  AppTabs,
  AppTabsList,
  AppTabsTrigger,
} from "@workspace/ui/predict/app/app-glass"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  AppCard,
  AppCardDescription,
  AppCardTitle,
} from "@workspace/ui/predict/app/app-card"
import { AppBottomNav } from "@workspace/ui/predict/app/app-bottom-nav"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"

import { Screen } from "../screen"

const cities = ["City - Delhi", "City - Mumbai", "City - Bengaluru"]
const centers = ["South Extension I", "Greater Kailash II", "Connaught Place"]

const selectTrigger =
  "h-12 w-[321px] rounded-full border-border bg-card/50 px-6 text-sm leading-5 text-foreground data-[size=default]:h-12 [&>svg]:size-6! [&>svg]:text-foreground!"

export const title = "Blood test · visit centre"

// Figma: iPhone 18 Pro - 161 (1739:7412)
export default function BloodTest03() {
  return (
    <Screen>
      <header className="flex items-center justify-between pt-[51px] pr-[47px] pl-10">
        <button type="button" aria-label="Back" className="flex size-6 items-center justify-center">
          <ChevronLeftIcon className="size-6" strokeWidth={1.5} />
        </button>
        <div className="size-[60px] shrink-0 overflow-hidden rounded-full border border-foreground bg-secondary">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/screens/shared/avatar.png"
            alt="Arjun Vaidya"
            className="size-full object-cover object-top"
          />
        </div>
      </header>

      <AppTabs defaultValue="center" className="mt-[38px] items-center gap-0">
        <AppTabsList
          variant="line"
          className="h-auto gap-1 border-border bg-card px-1 py-[5px] group-data-horizontal/tabs:h-auto"
        >
          <AppTabsTrigger
            value="center"
            className="h-[31px] flex-none px-5 text-sm leading-5 text-foreground/60 data-active:bg-primary data-active:text-primary-foreground"
          >
            Visit centre
          </AppTabsTrigger>
          <AppTabsTrigger
            value="home"
            className="h-[31px] flex-none px-5 text-sm leading-5 text-foreground/60 data-active:bg-primary data-active:text-primary-foreground"
          >
            Home collection
          </AppTabsTrigger>
        </AppTabsList>
      </AppTabs>

      <div className="mt-[13px] flex flex-col gap-[13px] px-[10.5px]">
        <AppCard className="items-center gap-3">
          <div className="h-[66px] w-full">
            <AppCardTitle>Your blood test</AppCardTitle>
            <AppCardDescription className="mt-2 max-w-none">
              Get a clearer picture of your health with accurate blood testing and regular
              health monitoring.
            </AppCardDescription>
          </div>

          <Select defaultValue={cities[0]}>
            <SelectTrigger className={selectTrigger}>
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
            <SelectTrigger className={selectTrigger}>
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
              <span className="text-[36px]">₹10,599</span>
              <span className="text-sm line-through">₹18,899</span>
            </div>
            <span className="flex h-[23px] w-[66px] items-center justify-center rounded-[40px] bg-secondary text-xs leading-6">
              50% OFF
            </span>
          </div>

          <Button variant="app" size="lg" className="w-[321px] text-base">
            Book a test
          </Button>
          <Button variant="app-secondary" size="lg" className="w-[321px] text-sm">
            Request a callback
          </Button>
        </AppCard>

        <AppCard>
          <button type="button" className="flex h-[46px] w-full items-center justify-between text-left">
            <span className="flex items-center gap-1.5">
              <FileTextIcon className="size-10" strokeWidth={1} />
              <span className="flex flex-col">
                <span className="font-display text-[21px] leading-6">View sample report</span>
                <span className="mt-2 text-[10px] leading-[14px]">Blood_Test_Report.pdf</span>
              </span>
            </span>
            <ChevronRightIcon className="size-6" strokeWidth={1.5} />
          </button>
        </AppCard>
      </div>

      <AppGlow variant="fade" />
      <AppBottomNav />
    </Screen>
  )
}
