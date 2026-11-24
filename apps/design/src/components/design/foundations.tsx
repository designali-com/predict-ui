"use client"

import * as React from "react"
import { CheckIcon, XIcon } from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"

/* =========================================================
   COLOUR MATHS
   Hex and contrast are worked out from the OKLCH values in
   packages/ui/src/styles/globals.css, so they can't drift.
========================================================= */

type Oklch = [l: number, c: number, h: number]

function oklchToRgb([l, c, h]: Oklch): [number, number, number] {
  const a = c * Math.cos((h * Math.PI) / 180)
  const b = c * Math.sin((h * Math.PI) / 180)
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3
  const linear = [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ].map((v) => Math.min(1, Math.max(0, v)))
  return linear as [number, number, number]
}

function toHex(color: Oklch) {
  return (
    "#" +
    oklchToRgb(color)
      .map((v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055))
      .map((v) => Math.round(v * 255).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  )
}

/** WCAG relative luminance, from linear sRGB. */
function luminance(color: Oklch) {
  const [r, g, b] = oklchToRgb(color)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: Oklch, b: Oklch) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

function formatOklch([l, c, h]: Oklch) {
  return `oklch(${+l.toFixed(3)} ${+c.toFixed(4)} ${+h.toFixed(2)})`
}

/* =========================================================
   TOKENS
========================================================= */

type Token = {
  name: string
  light: Oklch
  dark: Oklch
  usage: string
}

const WHITE: Oklch = [1, 0, 0]
const BLACK: Oklch = [0, 0, 0]

const tokenGroups: { title: string; tokens: Token[] }[] = [
  {
    title: "Surfaces",
    tokens: [
      { name: "background", light: [1, 0, 0], dark: [0, 0, 0], usage: "The page." },
      { name: "card", light: [1, 0, 0], dark: [0, 0, 0], usage: "Cards and panels." },
      { name: "popover", light: [1, 0, 0], dark: [0, 0, 0], usage: "Popovers, menus, and tooltips." },
    ],
  },
  {
    title: "Text",
    tokens: [
      { name: "foreground", light: [0, 0, 0], dark: [1, 0, 0], usage: "Headings and main text." },
      { name: "muted-foreground", light: [0.2, 0, 0], dark: [0.8, 0, 0], usage: "Descriptions, captions, and hints." },
      { name: "card-foreground", light: [0, 0, 0], dark: [1, 0, 0], usage: "Text on cards." },
      { name: "popover-foreground", light: [0, 0, 0], dark: [1, 0, 0], usage: "Text in popovers." },
    ],
  },
  {
    title: "Brand",
    tokens: [
      { name: "primary", light: [0.3247, 0.1762, 297.04], dark: [0.936, 0.0326, 295.31], usage: "Predict Purple (#420080); lavender (#EBE6FE) in dark mode. The main action and brand moments." },
      { name: "primary-foreground", light: [1, 0, 0], dark: [0.3247, 0.1762, 297.04], usage: "Text and icons on primary: white, or Predict Purple on dark-mode lavender." },
      { name: "secondary", light: [0.936, 0.0326, 295.31], dark: [0.253, 0.1037, 297.04], usage: "Lavender (#EBE6FE). Secondary buttons, chips, and soft highlights." },
      { name: "secondary-foreground", light: [0.2002, 0, 0], dark: [0.9, 0, 0], usage: "Text on secondary." },
    ],
  },
  {
    title: "Neutrals",
    tokens: [
      { name: "muted", light: [0.8, 0, 0], dark: [0.2, 0, 0], usage: "Quiet fills, such as skeletons and tracks." },
      { name: "accent", light: [0.7, 0, 0], dark: [0.3, 0, 0], usage: "Hover and selected fills." },
      { name: "accent-foreground", light: [0.3, 0, 0], dark: [0.7, 0, 0], usage: "Text on accent." },
    ],
  },
  {
    title: "Lines and focus",
    tokens: [
      { name: "border", light: [0.9, 0, 0], dark: [0.3, 0, 0], usage: "Dividers and card edges. The default border colour." },
      { name: "input", light: [0.9, 0, 0], dark: [0.3, 0, 0], usage: "Input borders and fills." },
      { name: "ring", light: [0.3247, 0.1762, 297.04], dark: [0.936, 0.0326, 295.31], usage: "Focus rings, in the primary." },
    ],
  },
  {
    title: "Feedback",
    tokens: [
      { name: "destructive", light: [0.58, 0.22, 27], dark: [0.58, 0.22, 27], usage: "Delete actions and errors." },
    ],
  },
  {
    title: "Sidebar",
    tokens: [
      { name: "sidebar", light: [0.9, 0, 0], dark: [0.1, 0, 0], usage: "Sidebar background." },
      { name: "sidebar-foreground", light: [0.1, 0, 0], dark: [0.9, 0, 0], usage: "Sidebar text." },
      { name: "sidebar-primary", light: [0.1, 0, 0], dark: [0.9, 0, 0], usage: "Active item in the sidebar." },
      { name: "sidebar-primary-foreground", light: [0.9, 0, 0], dark: [0.1, 0, 0], usage: "Text on the active item." },
      { name: "sidebar-accent", light: [0.8, 0, 0], dark: [0.2, 0, 0], usage: "Sidebar hover fill." },
      { name: "sidebar-accent-foreground", light: [0.2, 0, 0], dark: [0.8, 0, 0], usage: "Text on sidebar hover." },
      { name: "sidebar-border", light: [0.9, 0, 0], dark: [0.3, 0, 0], usage: "Sidebar dividers." },
      { name: "sidebar-ring", light: [0.7, 0, 0], dark: [0.4, 0, 0], usage: "Focus rings in the sidebar." },
    ],
  },
]

const charts: Token[] = [
  { name: "chart-1", light: [0.992, 0.0052, 297.04], dark: [0, 0.0389, 297.04], usage: "Lowest values and backgrounds." },
  { name: "chart-2", light: [0.936, 0.0326, 295.31], dark: [0.253, 0.1037, 297.04], usage: "" },
  { name: "chart-3", light: [0.902, 0.0897, 297.04], dark: [0.446, 0.1771, 297.04], usage: "" },
  { name: "chart-4", light: [0.805, 0.1475, 297.04], dark: [0.7, 0.11, 297.04], usage: "" },
  { name: "chart-5", light: [0.3247, 0.1762, 297.04], dark: [0.936, 0.0326, 295.31], usage: "Highest values and the main series." },
]

const statuses: (Token & { label: string; when: string })[] = [
  { name: "status-normal", label: "Normal", light: [0.723, 0.219, 149.579], dark: [0.723, 0.219, 149.579], usage: "", when: "Inside the healthy range." },
  { name: "status-mild", label: "Mild", light: [0.795, 0.184, 86.047], dark: [0.795, 0.184, 86.047], usage: "", when: "Out of range, |Z| under 3." },
  { name: "status-moderate", label: "Moderate", light: [0.623, 0.214, 259.815], dark: [0.623, 0.214, 259.815], usage: "", when: "|Z| from 3 to under 4." },
  { name: "status-severe", label: "Severe", light: [0.705, 0.213, 47.604], dark: [0.705, 0.213, 47.604], usage: "", when: "|Z| from 4 to under 5." },
  { name: "status-extreme", label: "Extreme", light: [0.637, 0.237, 25.331], dark: [0.637, 0.237, 25.331], usage: "", when: "|Z| of 5 or more, or past a critical limit." },
]

// Static class names so Tailwind generates them.
const statusClasses: Record<string, { bg: string; badge: string; text: string }> = {
  "status-normal": { bg: "bg-status-normal", badge: "bg-status-normal/15 text-status-normal", text: "text-status-normal" },
  "status-mild": { bg: "bg-status-mild", badge: "bg-status-mild/15 text-status-mild", text: "text-status-mild" },
  "status-moderate": { bg: "bg-status-moderate", badge: "bg-status-moderate/15 text-status-moderate", text: "text-status-moderate" },
  "status-severe": { bg: "bg-status-severe", badge: "bg-status-severe/15 text-status-severe", text: "text-status-severe" },
  "status-extreme": { bg: "bg-status-extreme", badge: "bg-status-extreme/15 text-status-extreme", text: "text-status-extreme" },
}

const chartBg = ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-4", "bg-chart-5"]

/* =========================================================
   SHARED
========================================================= */

function useCopy() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const copy = React.useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(value)
      window.setTimeout(() => setCopied(null), 1200)
    } catch {
      // Clipboard can be blocked, such as in an insecure context.
    }
  }, [])
  return { copied, copy }
}

function Chip({ color, className }: { color: Oklch; className?: string }) {
  return (
    <span
      className={cn("block rounded-md ring-1 ring-black/10 ring-inset dark:ring-white/15", className)}
      style={{ backgroundColor: toHex(color) }}
    />
  )
}

function Rating({ ratio, large = false }: { ratio: number; large?: boolean }) {
  const aa = large ? 3 : 4.5
  const aaa = large ? 4.5 : 7
  const level = ratio >= aaa ? "AAA" : ratio >= aa ? "AA" : large ? "Fail" : ratio >= 3 ? "AA large" : "Fail"
  const pass = level !== "Fail"

  return (
    <span className="flex items-center gap-1.5 tabular-nums">
      <span
        className={cn(
          "flex size-4 items-center justify-center rounded-full text-white",
          pass ? "bg-status-normal" : "bg-status-extreme"
        )}
      >
        {pass ? <CheckIcon className="size-3" /> : <XIcon className="size-3" />}
      </span>
      {ratio.toFixed(2)}:1
      <span className="text-muted-foreground">{level}</span>
    </span>
  )
}

/* =========================================================
   COLOUR COMPONENTS
========================================================= */

function TokenRow({ token }: { token: Token }) {
  const { copied, copy } = useCopy()

  return (
    <tr className="border-t align-top">
      <td className="py-3 pr-4">
        <button
          type="button"
          onClick={() => copy(`--${token.name}`)}
          className="font-mono text-xs hover:underline"
          aria-label={`Copy --${token.name}`}
        >
          {copied ? "Copied" : `--${token.name}`}
        </button>
        <p className="mt-1 text-xs text-muted-foreground">{token.usage}</p>
      </td>
      {(["light", "dark"] as const).map((mode) => (
        <td key={mode} className="py-3 pr-4">
          <div className="flex items-center gap-2">
            <Chip color={token[mode]} className="size-8 shrink-0" />
            <div className="flex flex-col font-mono text-[11px] leading-4">
              <span>{toHex(token[mode])}</span>
              <span className="text-muted-foreground">{formatOklch(token[mode])}</span>
            </div>
          </div>
        </td>
      ))}
    </tr>
  )
}

export function ColorTokens() {
  return (
    <div className="not-prose mt-6 flex flex-col gap-8">
      {tokenGroups.map((group) => (
        <div key={group.title}>
          <p className="mb-2 text-sm font-medium">{group.title}</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-xs">
              <thead className="text-muted-foreground">
                <tr>
                  <th className="w-[45%] pb-2 font-normal">Token</th>
                  <th className="pb-2 font-normal">Light</th>
                  <th className="pb-2 font-normal">Dark</th>
                </tr>
              </thead>
              <tbody>
                {group.tokens.map((token) => (
                  <TokenRow key={token.name} token={token} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

export function StatusColors() {
  return (
    <div className="not-prose mt-6 grid gap-3">
      {statuses.map((status) => {
        const classes = statusClasses[status.name]!
        return (
          <div
            key={status.name}
            className="grid items-center gap-3 rounded-lg border p-3 sm:grid-cols-[3rem_1fr_auto]"
          >
            <span className={cn("block size-12 rounded-md", classes.bg)} />
            <div className="flex flex-col gap-0.5 text-xs">
              <span className="text-sm font-medium">{status.label}</span>
              <span className="text-muted-foreground">{status.when}</span>
              <span className="font-mono text-[11px] text-muted-foreground">
                --{status.name} · {toHex(status.light)} · {formatOklch(status.light)}
              </span>
            </div>
            <span className={cn("w-fit rounded-full px-2.5 py-1 text-xs font-medium", classes.badge)}>
              {status.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function ChartColors() {
  const bars = [28, 46, 64, 82, 100]

  return (
    <div className="not-prose mt-6 grid gap-4 md:grid-cols-[1fr_16rem]">
      <div className="grid grid-cols-5 gap-2">
        {charts.map((token) => (
          <div key={token.name} className="flex flex-col gap-2 text-[11px]">
            <div className="flex overflow-hidden rounded-md">
              <Chip color={token.light} className="h-14 flex-1 rounded-none ring-0" />
              <Chip color={token.dark} className="h-14 flex-1 rounded-none ring-0" />
            </div>
            <span className="font-mono">--{token.name}</span>
            <span className="font-mono text-muted-foreground">
              {toHex(token.light)}
              <br />
              {toHex(token.dark)}
            </span>
          </div>
        ))}
      </div>
      <figure className="flex flex-col rounded-lg border p-4">
        <div className="flex h-32 items-end gap-2">
          {bars.map((height, index) => (
            <div
              key={height}
              className={cn("flex-1 rounded-t-sm", chartBg[index])}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <figcaption className="pt-3 text-xs text-muted-foreground">
          The scale in the current theme. Each swatch shows light on the left and dark on the right.
        </figcaption>
      </figure>
    </div>
  )
}

type Pair = { label: string; fg: [Oklch, Oklch]; bg: [Oklch, Oklch]; large?: boolean }

const pairs: Pair[] = [
  { label: "foreground on background", fg: [[0, 0, 0], [1, 0, 0]], bg: [[1, 0, 0], [0, 0, 0]] },
  { label: "muted-foreground on background", fg: [[0.2, 0, 0], [0.8, 0, 0]], bg: [[1, 0, 0], [0, 0, 0]] },
  { label: "primary-foreground on primary", fg: [[1, 0, 0], [0.3247, 0.1762, 297.04]], bg: [[0.3247, 0.1762, 297.04], [0.936, 0.0326, 295.31]] },
  { label: "primary on background", fg: [[0.3247, 0.1762, 297.04], [0.936, 0.0326, 295.31]], bg: [[1, 0, 0], [0, 0, 0]] },
  { label: "secondary-foreground on secondary", fg: [[0.2002, 0, 0], [0.9, 0, 0]], bg: [[0.936, 0.0326, 295.31], [0.253, 0.1037, 297.04]] },
  { label: "foreground on muted", fg: [[0, 0, 0], [1, 0, 0]], bg: [[0.8, 0, 0], [0.2, 0, 0]] },
  { label: "accent-foreground on accent", fg: [[0.3, 0, 0], [0.7, 0, 0]], bg: [[0.7, 0, 0], [0.3, 0, 0]] },
  { label: "destructive on background", fg: [[0.58, 0.22, 27], [0.58, 0.22, 27]], bg: [[1, 0, 0], [0, 0, 0]] },
  { label: "white on destructive", fg: [WHITE, WHITE], bg: [[0.58, 0.22, 27], [0.58, 0.22, 27]] },
  ...statuses.map((status) => ({
    label: `${status.name} on background`,
    fg: [status.light, status.dark] as [Oklch, Oklch],
    bg: [WHITE, BLACK] as [Oklch, Oklch],
  })),
]

export function ContrastTable() {
  return (
    <div className="not-prose mt-6 overflow-x-auto">
      <table className="w-full min-w-[36rem] text-left text-xs">
        <thead className="text-muted-foreground">
          <tr>
            <th className="pb-2 font-normal">Pair</th>
            <th className="pb-2 font-normal">Light</th>
            <th className="pb-2 font-normal">Dark</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((pair) => (
            <tr key={pair.label} className="border-t">
              <td className="py-2.5 pr-4 font-mono">{pair.label}</td>
              {[0, 1].map((mode) => (
                <td key={mode} className="py-2.5 pr-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-7 w-10 shrink-0 items-center justify-center rounded-md text-xs font-medium ring-1 ring-black/10 ring-inset dark:ring-white/15"
                      style={{ backgroundColor: toHex(pair.bg[mode]!), color: toHex(pair.fg[mode]!) }}
                    >
                      Aa
                    </span>
                    <Rating ratio={contrast(pair.fg[mode]!, pair.bg[mode]!)} large={pair.large} />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* =========================================================
   TYPOGRAPHY COMPONENTS
========================================================= */

const scale = [
  { token: "text-heading-72", px: 72, use: "Hero headlines on marketing pages." },
  { token: "text-heading-64", px: 64, use: "Hero headlines." },
  { token: "text-heading-56", px: 56, use: "Hero headlines on smaller screens." },
  { token: "text-heading-48", px: 48, use: "Page titles on landing pages." },
  { token: "text-heading-40", px: 40, use: "Large section titles." },
  { token: "text-heading-32", px: 32, use: "h1. Page titles in the app." },
  { token: "text-heading-24", px: 24, use: "h2. Section titles." },
  { token: "text-heading-20", px: 20, use: "h3. Sub-sections and large cards." },
  { token: "text-heading-16", px: 16, use: "h4 and p. Body text." },
  { token: "text-heading-14", px: 14, use: "small. Captions and metadata." },
]

// Static class names so Tailwind generates them.
const scaleClass: Record<string, string> = {
  "text-heading-72": "text-heading-72",
  "text-heading-64": "text-heading-64",
  "text-heading-56": "text-heading-56",
  "text-heading-48": "text-heading-48",
  "text-heading-40": "text-heading-40",
  "text-heading-32": "text-heading-32",
  "text-heading-24": "text-heading-24",
  "text-heading-20": "text-heading-20",
  "text-heading-16": "text-heading-16",
  "text-heading-14": "text-heading-14",
}

export function TypeScale() {
  const [sample, setSample] = React.useState("Understand your biology")

  return (
    <div className="not-prose mt-6 flex flex-col gap-3">
      <label className="flex flex-col gap-1.5 text-xs font-medium">
        Sample text
        <input
          value={sample}
          onChange={(event) => setSample(event.target.value)}
          className="h-9 rounded-full border bg-transparent px-4 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
        />
      </label>
      <div className="divide-y rounded-lg border">
        {scale.map((step) => (
          <div key={step.token} className="flex flex-col gap-2 p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-[11px] text-muted-foreground">
              <span className="text-foreground">{step.token}</span>
              <span>
                {step.px}px · {step.px / 16}rem
              </span>
            </div>
            <span
              className={cn(
                "block truncate font-medium tracking-tight text-foreground",
                scaleClass[step.token]
              )}
              style={{ lineHeight: 1.15 }}
            >
              {sample || "Understand your biology"}
            </span>
            <span className="text-xs text-muted-foreground">{step.use}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const weights = [
  { weight: 300, name: "Light", use: "Large display text only." },
  { weight: 400, name: "Regular", use: "Body text and descriptions." },
  { weight: 500, name: "Medium", use: "Headings, labels, and buttons." },
  { weight: 700, name: "Bold", use: "Rare emphasis, such as a key number." },
]

export function FontFamilies() {
  return (
    <div className="not-prose mt-6 grid gap-4 lg:grid-cols-2">
      <div className="flex flex-col gap-4 rounded-lg border p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-medium">Inter</span>
          <span className="font-mono text-[11px] text-muted-foreground">font-sans</span>
        </div>
        <p className="font-sans text-7xl font-medium tracking-tight text-foreground">Aa</p>
        <p className="font-sans text-sm break-all text-foreground">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
          <br />
          abcdefghijklmnopqrstuvwxyz
          <br />
          0123456789 .,:;!?()&amp;@%+−×÷=
        </p>
        <ul className="flex flex-col divide-y border-t">
          {weights.map(({ weight, name, use }) => (
            <li key={weight} className="flex flex-col gap-0.5 py-2.5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-sans text-lg tracking-tight text-foreground" style={{ fontWeight: weight }}>
                  Biological age 45
                </span>
                <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                  {name} {weight}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{use}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-medium">Inter, tabular figures</span>
          <span className="font-mono text-[11px] text-muted-foreground">tabular-nums</span>
        </div>
        <p className="text-7xl font-medium tracking-tight text-foreground tabular-nums">09</p>
        <p className="text-sm break-all text-foreground tabular-nums">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ
          <br />
          abcdefghijklmnopqrstuvwxyz
          <br />
          0123456789 ·−+=%
        </p>
        <dl className="flex flex-col divide-y border-t text-sm tabular-nums">
          {[
            ["Sample ID", "PRD-20481"],
            ["Token", "--status-normal"],
            ["Z-score", "+2.71"],
            ["Unit", "mg·dL⁻¹"],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 py-2.5">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

export function TypeHierarchy() {
  return (
    <div className="not-prose mt-6 rounded-lg border p-6 md:p-8">
      <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">Report</p>
      <p className="mt-2 text-heading-32 leading-tight font-medium tracking-tight text-foreground">
        Your October results
      </p>
      <p className="mt-2 text-sm text-muted-foreground">Collected 12 Oct 2026 · 40 biomarkers</p>
      <div className="mt-8 border-t pt-6">
        <p className="text-heading-20 leading-snug font-medium text-foreground">Inflammation</p>
        <p className="mt-1 text-sm text-muted-foreground">
          hs-CRP is above the healthy range. A recent cold or hard training can raise it.
        </p>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-mono text-heading-32 leading-none font-medium tabular-nums text-foreground">3.5</span>
          <span className="text-sm text-muted-foreground">mg·L⁻¹</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Healthy range 0.2–3.0 mg·L⁻¹</p>
      </div>
    </div>
  )
}

export function NumberStyles() {
  const rows = [
    ["LDL-C", "185.5"],
    ["HDL-C", "35.7"],
    ["TG", "111.1"],
  ]

  return (
    <div className="not-prose mt-6 grid gap-4 sm:grid-cols-2">
      {[
        { label: "Proportional (default)", className: "" },
        { label: "tabular-nums", className: "tabular-nums" },
      ].map((style) => (
        <figure key={style.label} className="rounded-lg border p-4">
          <dl className={cn("flex flex-col gap-1 text-sm text-foreground", style.className)}>
            {rows.map(([name, value]) => (
              <div key={name} className="flex justify-between">
                <dt className="text-muted-foreground">{name}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <figcaption className="pt-3 font-mono text-[11px] text-muted-foreground">{style.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}

const dataStyles = [
  {
    name: "Data/Large",
    sample: "1,248",
    className: "text-heading-32 leading-10 font-semibold tabular-nums",
    spec: "Inter Semibold · 32/40 · 0%",
    use: "Prominent metrics and price values.",
  },
  {
    name: "Data/Medium",
    sample: "36 saved",
    className: "text-heading-24 leading-8 font-semibold tabular-nums",
    spec: "Inter Semibold · 24/32 · 0%",
    use: "Compact metric summaries.",
  },
  {
    name: "Body/Link",
    sample: "Read the methodology",
    className: "text-heading-16 leading-6 underline underline-offset-4",
    spec: "Inter Regular · 16/24 · 0%",
    use: "Underline inline links; use meaningful words.",
    link: true,
  },
]

export function DataStyles() {
  return (
    <div className="not-prose mt-6 grid gap-4 md:grid-cols-3">
      {dataStyles.map((style) => (
        <div key={style.name} className="flex flex-col gap-4 rounded-lg border p-6">
          <span className="text-sm font-medium text-foreground">{style.name}</span>
          {style.link ? (
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              className={cn("text-foreground hover:text-muted-foreground", style.className)}
            >
              {style.sample}
            </a>
          ) : (
            <span className={cn("text-foreground", style.className)}>{style.sample}</span>
          )}
          <div className="text-sm text-muted-foreground">
            <p className="font-mono text-[11px]">{style.spec}</p>
            <p className="text-sm">{style.use}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function GuidanceCard({
  kind,
  title,
  children,
}: {
  kind: "Do" | "Avoid"
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border p-6">
      <p className="text-2xl leading-9 font-medium tracking-tight text-foreground">
        {kind} · {title}
      </p>
      <div className="flex flex-col gap-4 text-base leading-6 text-foreground">{children}</div>
    </div>
  )
}

export function TypeDoAvoid() {
  return (
    <div className="not-prose mt-6 grid gap-4 md:grid-cols-2">
      <GuidanceCard kind="Do" title="separate expression from utility">
        <p>Set the heading in Inter Medium at a heading size, then drop to Inter Regular for the explanation and action.</p>
        <p className="text-heading-32 leading-10 font-medium tracking-tight">A clearer next step</p>
        <p>Explore ideas worth considering.</p>
        <p className="font-medium">View insights</p>
      </GuidanceCard>
      <GuidanceCard kind="Avoid" title="a second typeface">
        <p>
          Do not bring in a serif, script or monospace face for headings, numbers or codes. Hierarchy comes from
          size, weight and spacing, not from switching fonts.
        </p>
        <p className="font-semibold">
          Keep the rule simple: everything is Inter. Headings are Medium; information is Regular; actions are
          Medium.
        </p>
      </GuidanceCard>
      <GuidanceCard kind="Do" title="preserve a calm hierarchy">
        <p>
          Use sentence case. Keep paragraphs left-aligned. Use one main heading per page and a logical sequence of
          subheadings. Use spacing as well as scale to group related information.
        </p>
        <p>Use 16/24 for default reading. Increase the container height when copy grows.</p>
      </GuidanceCard>
      <GuidanceCard kind="Avoid" title="solving layout with smaller text">
        <p>
          Do not justify paragraphs, stretch text, add negative tracking to body copy, or reduce type to make a
          control fit. Avoid long all-caps strings and full paragraphs in semibold.
        </p>
        <p>Do not center long descriptions or force essential information into a single line.</p>
      </GuidanceCard>
    </div>
  )
}
