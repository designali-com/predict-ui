import { ComponentShowcase } from "@/src/components/design/component-showcase"
import { GlassButton } from '@workspace/ui/components/liquid-glass/glass-button'
import { Play } from "lucide-react"

const COLS = 13
const ROWS = 7

/** 1 around the middle of the grid, falling to 0 at its edge. */
const fade = (col: number, row: number) => {
  const distance = Math.hypot((col - (COLS - 1) / 2) / (COLS / 2), (row - (ROWS - 1) / 2) / (ROWS / 2))
  return Math.min(1, Math.max(0, (1 - distance) / 0.45))
}

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-7xl border-x">
      
      <ComponentShowcase /> 
    </div>
  )
}
