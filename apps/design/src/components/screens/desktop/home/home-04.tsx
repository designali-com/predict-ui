import { ChevronLeftIcon } from "lucide-react"

import { DesktopScreen } from "../desktop-screen"
import { BottomGlow, DashCardHeader, HomeHeader, MetricRow } from "./shared"
import { BigStat, HomeNav, PanelCard, PillTabs, Unit } from "./shared-c"

// Kept local: a plain value imported from a "use client" module is a client
// reference in this server component, not the string.
const ASSETS = "/screens/desktop/home"

export const title = "Body systems"

const systems = [
  "Metabolic",
  "Musculoskeletal",
  "Cardiovascular",
  "Respiratory",
  "Nervous",
  "Digestive",
  "Hormonal",
  "Immune",
].map((s) => ({ value: s.toLowerCase(), label: s }))

const muscleRows = [
  { title: "RFF", description: "Renal Filtration Factor", value: "2.96" },
  { title: "CF", description: "Cardiometabolic Function", value: "2.72" },
  { title: "MHF", description: "Musculoskeletal Health Factor", value: "5.78" },
  { title: "MHF", description: "Musculoskeletal Health Factor", value: "5.78" },
  { title: "MHF", description: "Musculoskeletal Health Factor", value: "5.78" },
  { title: "MHF", description: "Musculoskeletal Health Factor", value: "5.78" },
]

const panel = "top-[269px] h-[677px] w-[429px]"

// Figma: Slide 16:9 - 27 (1874:2875)
export default function HomeDesktop04() {
  return (
    <DesktopScreen>
      <div aria-hidden className="absolute top-[198px] left-0 h-0.5 w-[959px] bg-primary" />
      <button
        type="button"
        aria-label="Back"
        className="absolute top-[183px] left-[calc(50%-885px)] flex size-8 -translate-x-1/2 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
      >
        <ChevronLeftIcon className="size-4" strokeWidth={1} />
      </button>

      <BottomGlow />
      <HomeHeader />

      <p className="absolute top-[871px] left-[calc(50%-8px)] w-[410px] -translate-x-1/2 text-center text-xl">
        Your biological age is 38 — 6 years younger than your chronological age of 44.
      </p>

      <PillTabs label="Body systems" items={systems} defaultValue="musculoskeletal" />

      {/* My muscle health */}
      <PanelCard className={`${panel} left-[47px]`}>
        <DashCardHeader title="My muscle health" link />
        <div className="flex flex-col gap-[27.589px]">
          <BigStat value="36" caption="9 years older" width={136.794} size={110.355} />
          <div className="relative h-[39.084px] w-[369px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${ASSETS}/home-04-muscle-bar.svg`}
              alt=""
              className="absolute top-[-2.35px] left-[-4.06px] h-[48.95px] w-[380.59px] max-w-none"
            />
          </div>
        </div>
        {muscleRows.map((r, i) => (
          <MetricRow key={i} title={r.title} description={r.description} value={<b>{r.value}</b>} />
        ))}
      </PanelCard>

      {/* Musculoskeletal system */}
      <PanelCard className="top-[269px] left-[520px] h-[677px] w-[879px]">
        <DashCardHeader title="Musculoskeletal system" description="2 results are above range." link />
        <div className="relative h-[551px] w-[811px] shrink-0 overflow-hidden rounded-[40px] border border-primary/20">
          <div className="absolute top-[-1px] left-1/2 h-[587px] w-[923px] -translate-x-1/2 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${ASSETS}/home-04-muscles.png`}
              alt="Musculoskeletal model of the upper body"
              className="absolute top-[-1.96%] left-[0.1%] h-[235.45%] w-[99.8%] max-w-none"
            />
          </div>
          <div aria-hidden className="absolute inset-0 bg-primary mix-blend-color" />

          {/* Vertical level slider */}
          <div className="absolute top-[259px] left-[752px] h-[245px] w-3.5 rounded-[7px] bg-secondary" />
          <div className="absolute top-[382px] left-[752px] h-[122px] w-3.5 rounded-[7px] bg-primary" />
        </div>
      </PanelCard>

      {/* Heart */}
      <PanelCard className={`${panel} left-[1442px]`}>
        <DashCardHeader title="Heart" link />
        {Array.from({ length: 9 }, (_, i) => (
          <MetricRow
            key={i}
            title="Blood sugar"
            description="1 result near the limit"
            value={<Unit value="18" unit="ng/mL" />}
          />
        ))}
      </PanelCard>

      <HomeNav defaultTab="twin" tone="primary" />
    </DesktopScreen>
  )
}
