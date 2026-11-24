"use client"

import { BioClock } from "@workspace/ui/predict/bio-clock"

export function BioClockCustom() {
  return (
    <div className="mx-auto flex flex-wrap items-center justify-center gap-3">
      <BioClock bioAge={41.2} chronologicalAge={45} />
    </div>
  )
}
