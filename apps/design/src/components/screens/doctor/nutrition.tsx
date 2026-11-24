import { AppleIcon, MoonIcon, PencilIcon, PlusIcon, SoupIcon } from "lucide-react"

import {
  DoctorAppShell,
  DoctorCard,
  DoctorCardHeader,
  HeaderIconButton,
  IconDisc,
  ListItem,
  ProgressTrack,
} from "./shared-f"

export const title = "Nutrition & diet"

const macros = [
  { name: "Protein", value: "86 / 120 g", fill: 237 / 329 },
  { name: "Carbs", value: "164 / 220 g", fill: 247 / 329 },
  { name: "Fat", value: "42 / 60 g", fill: 230 / 329 },
]

const meals = [
  { name: "Breakfast", items: "Oats, whey, banana", kcal: "320 kcal", Icon: AppleIcon },
  { name: "Lunch", items: "Dal, rice, paneer bhurji", kcal: "520 kcal", Icon: SoupIcon },
  { name: "Dinner", items: "Grilled fish, greens", kcal: "370 kcal", Icon: MoonIcon },
]

// Figma: Mobile / Nutrition & diet (2016:1976)
export default function Nutrition() {
  return (
    <DoctorAppShell eyebrow="Usha Sethi" title="Nutrition & diet" contentClassName="gap-[18px]">
      <DoctorCard>
        <DoctorCardHeader
          title="Daily targets"
          action={
            <HeaderIconButton label="Edit daily targets">
              <PencilIcon className="size-[18px]" strokeWidth={1.5} />
            </HeaderIconButton>
          }
        />
        <div className="flex items-end gap-2 whitespace-nowrap">
          <p className="text-[44px] leading-[50px]">1,420</p>
          <p className="text-[13px] leading-7 text-foreground/60">/ 1,850 kcal</p>
        </div>
        <ProgressTrack value={253 / 329} label="Calories" className="h-3" />
        {macros.map((m) => (
          <div key={m.name} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between whitespace-nowrap">
              <p className="text-lg leading-[22px]">{m.name}</p>
              <p className="text-[13px] leading-[18px]">{m.value}</p>
            </div>
            <ProgressTrack value={m.fill} label={m.name} />
          </div>
        ))}
      </DoctorCard>

      <DoctorCard className="gap-2.5">
        <DoctorCardHeader
          title="Meal plan · Today"
          action={
            <HeaderIconButton label="Add meal">
              <PlusIcon className="size-[22px]" strokeWidth={1.5} />
            </HeaderIconButton>
          }
        />
        {meals.map(({ name, items, kcal, Icon }) => (
          <ListItem
            key={name}
            icon={
              <IconDisc>
                <Icon className="size-[19px]" strokeWidth={1.5} />
              </IconDisc>
            }
            title={name}
            subtitle={items}
            trailing={<p className="shrink-0 text-xs leading-4 font-medium whitespace-nowrap">{kcal}</p>}
          />
        ))}
      </DoctorCard>
    </DoctorAppShell>
  )
}
