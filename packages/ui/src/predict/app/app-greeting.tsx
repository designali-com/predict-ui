
"use client"

import * as React from "react"
import { cn } from "cn"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"

interface AppGreetingProps extends React.ComponentProps<"header"> {
  greeting?: string
  name: string
  avatarSrc?: string
  /** Portal target for the profile drawer (element or ref). */
  container?: React.ComponentProps<typeof DrawerContent>["container"]
}

function AppGreeting({
  greeting = "Good morning,",
  name,
  avatarSrc,
  container,
  className,
  ...props
}: AppGreetingProps) {
  return (
    <Drawer>
      <header
        data-slot="app-greeting"
        className={cn(
          "flex items-start justify-between px-[47px] pt-[51px]",
          className
        )}
        {...props}
      >
        <div className="text-foreground">
          <p className="text-base leading-[17px]">{greeting}</p>

          <h1 className="font-display text-[32px] leading-[38px] font-normal">
            {name}
          </h1>
        </div>

        <DrawerTrigger
          render={
            <button
              type="button"
              aria-label="Open profile"
              className="size-[60px] shrink-0 overflow-hidden rounded-full border border-foreground bg-secondary"
            />
          }
        >
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={name}
              className="size-full object-cover object-top"
            />
          ) : null}
        </DrawerTrigger>
      </header>

      <DrawerContent
        container={container}
        className="rounded-t-[30px]"
      >
        <DrawerHeader className="px-5 py-6 text-left">
          <DrawerTitle className="text-lg">
            Profile
          </DrawerTitle>

          <DrawerDescription>
            Manage your profile and account details.
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-5 pb-8">
          <div className="flex items-center gap-4 rounded-xl bg-secondary p-4">
            <div className="size-14 shrink-0 overflow-hidden rounded-full border border-foreground bg-background">
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={name}
                  className="size-full object-cover object-top"
                />
              ) : null}
            </div>

            <div className="min-w-0">
              <p className="font-medium text-foreground">{name}</p>
              <p className="text-sm text-muted-foreground">
                Your profile
              </p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export { AppGreeting }
