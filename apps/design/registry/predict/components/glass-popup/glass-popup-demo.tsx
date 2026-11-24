"use client"

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@ui-sdk/react/popover"

import {
  GlassPopupAnchor,
  GlassPopupSurface,
  useGlassPopup,
} from "@workspace/ui/components/liquid-glass/glass-popup"

export function GlassPopupDemo() {
  const popup = useGlassPopup()

  return (
    <Popover>
      <PopoverTrigger
        data-glass-host=""
        className="inline-flex h-10 cursor-pointer items-center rounded-full border border-black/10 bg-white/60 px-5 text-sm font-semibold text-neutral-900 outline-none focus-visible:ring-2 focus-visible:ring-ring data-[glass-tone=dark]:text-white data-[glass-tone=light]:text-neutral-900 dark:border-white/15 dark:bg-white/10 dark:text-white"
      >
        <GlassPopupAnchor popup={popup} />
        <span>What is ApoB?</span>
      </PopoverTrigger>
      <PopoverContent
        data-glass-popup=""
        data-glass-skip=""
        sideOffset={12}
        className="w-64 rounded-3xl p-5 text-neutral-900 outline-none data-[glass-tone=dark]:text-white data-[glass-tone=light]:text-neutral-900 dark:text-white"
      >
        <GlassPopupSurface popup={popup} />
        <div data-glass-list="" className="flex flex-col gap-1">
          <PopoverTitle data-glass-item="" className="text-base font-semibold">
            Apolipoprotein B
          </PopoverTitle>
          <PopoverDescription
            data-glass-item=""
            className="text-sm text-inherit"
          >
            Counts the particles that carry cholesterol into artery walls.
          </PopoverDescription>
        </div>
      </PopoverContent>
    </Popover>
  )
}
