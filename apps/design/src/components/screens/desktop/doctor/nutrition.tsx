"use client"

import * as React from "react"
import {
  AppleIcon,
  ArrowUpRightIcon,
  LeafIcon,
  MoonIcon,
  PencilIcon,
  PillIcon,
  PlusIcon,
  SoupIcon,
} from "lucide-react"

import { AppButton as Button } from "@workspace/ui/predict/app/app-glass"

import { Chip, ListTile, Panel, PanelHeader, PatientShell, Tag, Track } from "./shared-i"

export const title = "Nutrition & diet"

/* -------------------------------------------------------------------------- */
/* Daily targets                                                              */
/* -------------------------------------------------------------------------- */

const macros = [
  { name: "Protein", value: "86 / 120 g", fill: 331 / 460 },
  { name: "Carbs", value: "164 / 220 g", fill: 345 / 460 },
  { name: "Fat", value: "42 / 60 g", fill: 322 / 460 },
  { name: "Fiber", value: "19 / 30 g", fill: 290 / 460 },
  { name: "Water", value: "1.8 / 2.5 L", fill: 331 / 460 },
]

function TargetsCard() {
  return (
    <Panel className="absolute top-[170px] left-[47px] h-[780px] w-[520px] gap-5">
      <PanelHeader title="Daily targets" action={PencilIcon} actionLabel="Edit targets" />
      <div className="flex w-full flex-col gap-1">
        <p className="text-[13px] leading-[18px] text-foreground/60">Calories</p>
        <div className="flex items-end gap-2.5 whitespace-nowrap">
          <p className="font-display text-[64px] leading-[72px]">1,420</p>
          <p className="text-sm leading-8 text-foreground/60">/ 1,850 kcal</p>
        </div>
        <Track value={354 / 460} label="Calories" className="h-3 w-[460px]" />
      </div>
      {macros.map((m) => (
        <div key={m.name} className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between whitespace-nowrap">
            <p className="font-display text-xl leading-6">{m.name}</p>
            <p className="text-sm leading-5">{m.value}</p>
          </div>
          <Track value={m.fill} label={m.name} className="w-[460px]" />
        </div>
      ))}
    </Panel>
  )
}

/* -------------------------------------------------------------------------- */
/* Meal plan                                                                  */
/* -------------------------------------------------------------------------- */

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const meals = [
  { icon: AppleIcon, title: "Breakfast", time: "08:00", items: "Oats, whey protein, banana", total: "320 kcal · 28 g" },
  { icon: SoupIcon, title: "Lunch", time: "13:00", items: "Dal, brown rice, paneer bhurji", total: "520 kcal · 34 g" },
  { icon: LeafIcon, title: "Snack", time: "16:30", items: "Greek yoghurt, almonds", total: "210 kcal · 16 g" },
  { icon: MoonIcon, title: "Dinner", time: "20:00", items: "Grilled fish, sautéed greens", total: "370 kcal · 32 g" },
]

function MealPlanCard() {
  const [day, setDay] = React.useState("Wed")
  return (
    <Panel className="absolute top-[170px] left-[591px] h-[780px] w-[640px] gap-4">
      <PanelHeader title="Meal plan · Today" action={PlusIcon} actionLabel="Add meal" />
      <div className="flex items-center gap-2.5">
        {days.map((d) => (
          <Chip key={d} on={d === day} onClick={() => setDay(d)}>
            {d}
          </Chip>
        ))}
      </div>
      {meals.map((m) => (
        <ListTile
          key={m.title}
          icon={m.icon}
          iconDisc={52}
          iconSize={24}
          title={m.title}
          titleExtra={<span className="text-xs leading-4 text-foreground/60">{m.time}</span>}
          subtitle={m.items}
          trailing={<span className="text-[13px] leading-5 font-medium whitespace-nowrap">{m.total}</span>}
          className="h-28"
        />
      ))}
    </Panel>
  )
}

/* -------------------------------------------------------------------------- */
/* Macro split + supplements                                                  */
/* -------------------------------------------------------------------------- */

const split = [
  { name: "Protein", share: 32, tone: "bg-primary" },
  { name: "Carbs", share: 46, tone: "bg-primary/55" },
  { name: "Fat", share: 22, tone: "bg-primary/25" },
]

function MacroSplitCard() {
  return (
    <Panel className="h-[330px] w-full gap-[18px]">
      <PanelHeader title="Macro split" action={ArrowUpRightIcon} actionLabel="Open macro split" />
      <div className="flex h-6 w-full shrink-0 overflow-hidden rounded-full" role="img" aria-label="Protein 32%, carbs 46%, fat 22%">
        {split.map((s) => (
          <div key={s.name} className={`h-full ${s.tone}`} style={{ width: `${s.share}%` }} />
        ))}
      </div>
      {split.map((s) => (
        <div key={s.name} className="flex w-full items-center justify-between text-sm leading-5 whitespace-nowrap">
          <div className="flex items-center gap-2.5">
            <span className={`size-3 rounded-full ${s.tone}`} />
            <p>{s.name}</p>
          </div>
          <p className="font-medium">{s.share}%</p>
        </div>
      ))}
    </Panel>
  )
}

const supplements = [
  { title: "Predict +", subtitle: "1 scoop · after workout" },
  { title: "Whey isolate", subtitle: "1 scoop · breakfast" },
  { title: "Omega-3", subtitle: "1 capsule · dinner" },
]

function SupplementsCard() {
  return (
    <Panel className="h-[426px] w-full gap-3.5">
      <PanelHeader title="Supplements" action={PlusIcon} actionLabel="Add supplement" />
      {supplements.map((s) => (
        <ListTile
          key={s.title}
          icon={PillIcon}
          iconDisc={44}
          iconSize={20}
          title={s.title}
          subtitle={s.subtitle}
          trailing={<Tag>daily</Tag>}
          className="h-[84px]"
          titleClassName="text-xl leading-6"
          subtitleClassName="text-xs leading-[18px]"
        />
      ))}
      <div className="flex w-full justify-end gap-3">
        <Button variant="secondary" className="h-11 border-primary/12 px-[22px] text-sm">
          Edit targets
        </Button>
        <Button variant="app" className="h-11 gap-1 pr-[22px] pl-5 text-sm">
          <PlusIcon className="size-[18px]" strokeWidth={1.5} />
          Add meal
        </Button>
      </div>
    </Panel>
  )
}

// Figma: Desktop / Nutrition & diet (2012:903)
export default function DoctorNutrition() {
  return (
    <PatientShell eyebrow="Usha Sethi" heading="Nutrition & diet">
      <TargetsCard />
      <MealPlanCard />
      <div className="absolute top-[170px] left-[1255px] flex w-[618px] flex-col gap-6">
        <MacroSplitCard />
        <SupplementsCard />
      </div>
    </PatientShell>
  )
}
