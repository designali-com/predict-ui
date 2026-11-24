"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@workspace/ui/lib/utils"

/*
 * The age clock, from the Figma "App Design" file (iPhone 18 Pro - 45).
 * Drawn on a 290 × 290 grid, the size of the dial in Figma: seven brand arcs
 * with a gap at the bottom for the badge and readout, a ring of ticks, and one
 * hand that points at the biological age on the scale.
 */

const VIEW = 290
const C = VIEW / 2

/** The scale runs clockwise from the bottom-left (-135°) to the bottom-right (+135°). */
const SWEEP_START = -135
const SWEEP = 270

const ARC_RADIUS = 132.5
const ARC_WIDTH = 25
const ARC_SPAN = 32
/** One arc every 45°, except straight down, where the badge sits. */
const ARC_CENTRES = [-135, -90, -45, 0, 45, 90, 135]

const TICK_INNER = 80
const TICK_OUTER = 112
const TICK_STEP = 3.75
/** No ticks within this many degrees of straight down. */
const TICK_GAP = 26

const HAND_LENGTH = 118
const HAND_TAIL = 24

const sizeMap = {
  sm: 220,
  default: 290,
  lg: 400,
  xl: 520,
} as const

export interface BioClockProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Biological age. The hand points at it, and it is the large readout. */
  bioAge?: number
  /** Calendar (chronological) age, shown right of the centre. */
  chronologicalAge?: number
  /** Badge text. Defaults to the gap between the two ages, such as `−6 years`. */
  yearsValue?: string
  /** The large readout under the dial. Defaults to `bioAge` to one decimal. */
  value?: React.ReactNode
  /** Ages at the two ends of the scale. */
  range?: [number, number]
  /** Width and height in pixels, or a named size. */
  size?: keyof typeof sizeMap | number
}

/** Polar to cartesian, with 0° at twelve o'clock and angles growing clockwise. */
function point(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180
  // Rounded so server and client render identical attributes (trig drifts in the last digit).
  const round = (n: number) => Math.round(n * 1000) / 1000
  return [round(C + radius * Math.sin(rad)), round(C - radius * Math.cos(rad))] as const
}

function arcPath(centre: number) {
  const [x1, y1] = point(centre - ARC_SPAN / 2, ARC_RADIUS)
  const [x2, y2] = point(centre + ARC_SPAN / 2, ARC_RADIUS)
  return `M ${x1} ${y1} A ${ARC_RADIUS} ${ARC_RADIUS} 0 0 1 ${x2} ${y2}`
}

function formatGap(years: number) {
  const whole = Math.round(Math.abs(years))
  if (whole === 0) return "Same as calendar"
  const sign = years > 0 ? "+" : "−"
  return `${sign}${whole} ${whole === 1 ? "year" : "years"}`
}

const ticks = Array.from({ length: Math.round(360 / TICK_STEP) }, (_, i) => i * TICK_STEP).filter(
  (angle) => Math.abs(angle - 180) > TICK_GAP
)

export const BioClock = React.forwardRef<HTMLDivElement, BioClockProps>(
  (
    {
      className,
      bioAge = 37.6,
      chronologicalAge = 44,
      yearsValue,
      value,
      range = [20, 80],
      size = "default",
      style,
      ...props
    },
    ref
  ) => {
    const reduceMotion = useReducedMotion()
    const pixels = typeof size === "number" ? size : sizeMap[size]

    const [min, max] = range
    const ratio = Math.min(1, Math.max(0, (bioAge - min) / (max - min || 1)))
    const handAngle = SWEEP_START + ratio * SWEEP

    const gap = bioAge - chronologicalAge
    const badge = yearsValue ?? formatGap(gap)
    const readout = value ?? (Math.round(bioAge * 10) / 10).toFixed(1)
    // Inter caps at 7.8px run about 5px a character; 8px padding either side.
    const badgeWidth = Math.max(44, badge.length * 5.2 + 16)

    const label = `Biological age ${readout}, calendar age ${chronologicalAge}. ${badge}.`

    return (
      <div
        ref={ref}
        data-slot="bio-clock"
        role="img"
        aria-label={label}
        className={cn("relative aspect-square max-w-full text-foreground", className)}
        style={{ width: pixels, ...style }}
        {...props}
      >
        <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="block size-full overflow-visible" aria-hidden>
          {/* Brand arcs */}
          <g fill="none" stroke="var(--primary)" strokeWidth={ARC_WIDTH} strokeLinecap="round">
            {ARC_CENTRES.map((centre) => (
              <path key={centre} d={arcPath(centre)} />
            ))}
          </g>

          {/* Tick ring */}
          <g stroke="currentColor" strokeWidth={0.75} opacity={0.5}>
            {ticks.map((angle) => {
              const [x1, y1] = point(angle, TICK_INNER)
              const [x2, y2] = point(angle, TICK_OUTER)
              return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} />
            })}
          </g>

          {/* Ages either side of the centre */}
          <g fill="currentColor" fontSize={18.4} textAnchor="middle" dominantBaseline="central" className="tabular-nums">
            <text x={103.5} y={C}>
              {Math.round(bioAge)}
            </text>
            <text x={186.2} y={C}>
              {chronologicalAge}
            </text>
          </g>

          {/* Hand */}
          <motion.g
            initial={{ rotate: reduceMotion ? handAngle : SWEEP_START }}
            animate={{ rotate: handAngle }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 60, damping: 14 }}
            style={{ originX: `${C}px`, originY: `${C}px`, transformBox: "view-box" }}
          >
            <line
              x1={C}
              y1={C + HAND_TAIL}
              x2={C}
              y2={C - HAND_LENGTH}
              stroke="currentColor"
              strokeWidth={6.5}
              strokeLinecap="round"
            />
          </motion.g>
          <circle cx={C} cy={C} r={13} fill="currentColor" />

          {/* Badge */}
          <g transform={`translate(${C} 235.8)`}>
            <rect x={-badgeWidth / 2} y={-9.1} width={badgeWidth} height={18.2} rx={9.1} fill="var(--primary)" />
            <text
              fill="var(--primary-foreground)"
              fontSize={7.8}
              fontWeight={500}
              textAnchor="middle"
              dominantBaseline="central"
              letterSpacing="0.04em"
              className="uppercase tabular-nums"
            >
              {badge}
            </text>
          </g>

          {/* Readout */}
          <text
            x={C}
            y={273}
            fill="currentColor"
            fontSize={30.7}
            textAnchor="middle"
            dominantBaseline="central"
            className="tabular-nums"
          >
            {readout}
          </text>
        </svg>
      </div>
    )
  }
)

BioClock.displayName = "BioClock"

/** @deprecated Use `BioClockProps`. */
export type ClockGaugeProps = BioClockProps
