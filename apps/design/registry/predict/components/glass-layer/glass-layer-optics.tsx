"use client"

import { useId, useMemo, useState } from "react"

import { GlassLayer } from "@workspace/ui/components/liquid-glass/glass-layer"
import { Slider } from "@workspace/ui/components/slider"

export function GlassLayerOptics() {
  const id = useId()
  const [refraction, setRefraction] = useState(1)
  const [blur, setBlur] = useState(0)
  const optics = useMemo(() => ({ refraction }), [refraction])

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-chart-2">
        <span
          aria-hidden
          className="absolute text-7xl font-semibold text-primary"
        >
          PREDICT
        </span>
        <div data-glass-host="" className="h-28 w-56 rounded-3xl">
          <GlassLayer tint={0.1} blur={blur} swell={false} optics={optics} />
        </div>
      </div>
      <div className="grid gap-4 text-sm">
        <div className="grid gap-2">
          <span id={`${id}-refraction`} className="tabular-nums">
            Refraction: {refraction}
          </span>
          <Slider
            aria-labelledby={`${id}-refraction`}
            value={[refraction]}
            min={0}
            max={3}
            step={0.1}
            onValueChange={(next) =>
              setRefraction(Array.isArray(next) ? (next[0] ?? 0) : Number(next))
            }
          />
        </div>
        <div className="grid gap-2">
          <span id={`${id}-blur`} className="tabular-nums">
            Blur: {blur} px
          </span>
          <Slider
            aria-labelledby={`${id}-blur`}
            value={[blur]}
            min={0}
            max={16}
            step={1}
            onValueChange={(next) =>
              setBlur(Array.isArray(next) ? (next[0] ?? 0) : Number(next))
            }
          />
        </div>
      </div>
    </div>
  )
}
