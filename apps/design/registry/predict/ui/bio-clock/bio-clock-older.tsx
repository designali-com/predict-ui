"use client"

import { BioClock } from "@workspace/ui/predict/bio-clock"

export function BioClockOlder() {
  return (
    <div className="mx-auto flex flex-wrap items-center justify-center gap-3">
      <BioClock bioAge={51.4} chronologicalAge={47} />
    </div>
  )
}
