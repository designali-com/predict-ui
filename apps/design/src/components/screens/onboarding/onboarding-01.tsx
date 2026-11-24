
"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"

import { Screen } from "../screen"
import {
  headingClass,
  OnboardingActions,
  OnboardingProgress,
} from "./parts"

export const title = "Date of birth"

const formatDate = (value?: Date) =>
  value?.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

// Figma: iPhone 18 Pro - 155 (1737:6689)
export default function Onboarding01() {
  const [dob, setDob] = React.useState<Date | undefined>()
  const [open, setOpen] = React.useState(false)

  const handleDateSelect = (date?: Date) => {
    if (date) {
      setDob(date)
      setOpen(false)
    }
  }

  return (
    <Screen>
      <AppGlow variant="blob" />

      <OnboardingProgress done={0} />

      <h1
        className={cn(
          "absolute top-[174px] left-1/2 -translate-x-1/2 whitespace-nowrap",
          headingClass
        )}
      >
        Date of birth
      </h1>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <button
              type="button"
              className="absolute top-[221px] left-14 flex h-12 w-[290px] items-center justify-between rounded-full border border-border px-6 text-sm leading-5 text-foreground"
            />
          }
        >
          <span className={dob ? undefined : "opacity-40"}>
            {formatDate(dob) ?? "Pick a date"}
          </span>

          <CalendarIcon className="size-[21px] shrink-0" />
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-2"
          align="center"
           
        >
          <Calendar
            mode="single"
            selected={dob}
            onSelect={handleDateSelect}
            captionLayout="dropdown"
            startMonth={new Date(1920, 0)}
            endMonth={new Date()}
            disabled={(date) => date > new Date()}
            defaultMonth={dob ?? new Date(2000, 0)}
          />
        </PopoverContent>
      </Popover>

      <OnboardingActions />
    </Screen>
  )
}
