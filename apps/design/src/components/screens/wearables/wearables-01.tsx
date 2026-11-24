
"use client"

import * as React from "react"
import {
  ArrowUpRightIcon,
  BadgeCheckIcon,
  PlayIcon,
  PlusIcon,
  WatchIcon,
  XIcon,
} from "lucide-react"

import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@workspace/ui/components/drawer"

import {
  AppCard,
  AppCardDescription,
  AppCardHeader,
  AppCardTitle,
} from "@workspace/ui/predict/app/app-card"

import { AppBottomNav } from "@workspace/ui/predict/app/app-bottom-nav"
import { AppGlow } from "@workspace/ui/predict/app/app-glow"
import { AppGreeting } from "@workspace/ui/predict/app/app-greeting"

import { Screen, useScreenContainer } from "../screen"

const perks = [
  "Earliest collection in 60 minutes",
  "Reports within 6 hours",
  "Reports verified by doctors",
]

export const title = "Home · add a wearable"

export default function Wearables01() {
  return (
    <Screen>
      <Wearables01Content />
    </Screen>
  )
}

function Wearables01Content() {
  const screenContainer = useScreenContainer()

  return (
    <> 
      <AppGreeting
        name="Arjun Vaidya"
        avatarSrc="/screens/shared/avatar.png"
        container={screenContainer}
      />

      <div className="mt-[41px] flex flex-col gap-3 px-[10.5px]">
        {/* Blood Test Card */}
        <AppCard className="h-[315px]">
          <AppCardHeader>
            <div>
              <AppCardTitle>Book your blood test</AppCardTitle>
              <AppCardDescription>
                Get a clearer picture of your health with accurate blood
                testing and regular health monitoring.
              </AppCardDescription>
            </div>
          </AppCardHeader>

          <ul className="flex flex-col gap-1.5">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex h-7 items-center gap-1.5 text-xs leading-[14px]"
              >
                <BadgeCheckIcon className="size-6 shrink-0" />
                {perk}
              </li>
            ))}
          </ul>

          <Button variant="app" size="lg" className="w-full text-base">
            Book a test
          </Button>
        </AppCard>

        {/* Wearable Card */}
        <AppCard className="h-[176px]">
          <AppCardHeader>
            <div>
              <AppCardTitle>Add a wearable</AppCardTitle>
              <AppCardDescription>
                Start your 14 nights while you wait
              </AppCardDescription>
            </div>
          </AppCardHeader>

          <Drawer>
            <DrawerTrigger
              render={
                <Button
                  variant="app"
                  size="lg"
                  className="w-full text-base"
                />
              }
            >
              <PlusIcon className="size-[18px]" />
              Connect
            </DrawerTrigger>

            <DrawerContent container={screenContainer} className="rounded-t-[28px]">
              <DrawerHeader className="px-5 pt-6">
                <DrawerTitle className="text-lg">
                  Connect your wearable
                </DrawerTitle>

                <DrawerDescription>
                  Connect a device to start tracking your sleep and
                  health data.
                </DrawerDescription>
              </DrawerHeader>

              <div className="flex flex-col gap-3 p-5">
                <button
                  type="button"
                  className="flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors hover:bg-muted"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-muted">
                    <WatchIcon className="size-5" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Apple Health
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Sync data from your Apple Watch
                    </p>
                  </div>

                  <ArrowUpRightIcon className="size-5" />
                </button>

                <button
                  type="button"
                  className="flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors hover:bg-muted"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-muted">
                    <WatchIcon className="size-5" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Other wearables
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Connect another supported device
                    </p>
                  </div>

                  <ArrowUpRightIcon className="size-5" />
                </button>
              </div>

              <div className="mt-auto p-5 pt-0">
                <DrawerClose
                  render={
                    <Button
                      variant="outline"
                      className="w-full"
                    />
                  }
                >
                  Cancel
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </AppCard>

        {/* Product Video Card */}
        <AppCard className="h-[297px] items-center px-2.5 pt-[30px] pb-2.5">
          <AppCardHeader className="w-[321px]">
            <AppCardTitle>Watch our product</AppCardTitle>
            <ArrowUpRightIcon className="size-6" />
          </AppCardHeader>

          <div className="relative h-[209px] w-[362px] overflow-hidden rounded-[30px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/screens/shared/product-video.png"
              alt="PREDICT product video"
              className="size-full object-cover"
            />

            <button
              type="button"
              aria-label="Play video"
              className="absolute inset-0 m-auto flex size-[78px] items-center justify-center text-white"
            >
              <PlayIcon className="size-8 fill-white" />
            </button>
          </div>
        </AppCard>
      </div>

      <AppGlow variant="fade" />
      <AppBottomNav />
    </>
  )
}
